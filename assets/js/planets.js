var show_planet = false;
var unicorn_planet = false;
var unicorn_names = false;

var unicorn_planet_contract_address = '0x83EbB03Be2f5AC37a5FF28c685dcf2685E9d6e68';
var unicorn_planet_donation_address = '0x1aFa7039c7c0c896E6e76e43E536E925b5Fc871d';
var testnet_unicorn_planet_contract_address = '0x27728d9a0a4dEDA56d4eCF0CBBd4F473ae878e0A';

var planet_contract_settings = {
    coordinate_limits: 99,
    min_donation: 0.1
};

// IPFS Animal = https://ipfs.infura.io/ipfs/Qma3GU1jqWdeNYZqB9qyzcy6SGA41wkd8DuhLHd1Li12oQ/animals.json
// IPFS Adjectives = https://ipfs.infura.io/ipfs/QmWhkhtxiwWvfU4oCx5nuxTWvUQAtn3j2fVyveF7ogkmQi/adjectives.json

function generate_unicorn_name(gender)
{
    var name = false;
    if(gender == 'male' || gender == 'female')
    {
        name = unicorn_names.getName(gender);
    }
    return name;
}

function unicorn_name_generator(obj, seed)
{
	this.obj = obj;
	//Creates a random integer between 0 and max
	function randInt(max){
        if(typeof seed != 'undefined')
        {
            var number = parseInt(seed);
            var random = new XorShift128(parseInt(number));
            var num = random.integer(0, (max -1));
            return num;
        }
        else
        {
            var num = Math.floor(Math.random()*max);
            return num;
        }
    }
	function parseRule(rule){return rule.substr(1).split('$');}//substr removes the initial '$'
	function trim(str){return str.replace(/^\s+|\s+$/g,"");}
	function badName(name, illegal)
	{
		if(illegal)
		{
			var count = illegal.length;
			for(var i=0; i < count; i++)
				if(name.indexOf(illegal[i]) > -1)return true;
		}
		return false;
	}
	
	unicorn_name_generator.prototype.getName = function(cast)
	{
		var structure = this.obj[cast.toLowerCase()];
		var rule = parseRule(structure.rule);
		var ruleCount = rule.length;
		var name;
		do
		{
			name = '';
			for(var i=0; i < ruleCount; i++)
			{
				var percent = parseInt(rule[i]);
				if(isNaN(percent))
				{
					if(rule[i] == '_')name += ' ';
					else
					{
						var segCount = structure[rule[i]].length;
						name += structure[rule[i]][randInt(segCount)];
					}
				}
				else if(randInt(100) > percent && i < (ruleCount-1))i++;
			}
		}
		while(badName(name.toLowerCase(), structure.illegal));
		return trim(name);
	}
	unicorn_name_generator.prototype.setNameObj = function(obj){this.obj = obj;}
}

function random_planetary_life(seed)
{
    var this_seed = unicorn_planet.seed;
    if(seed) this_seed = seed;
    var random = new XorShift128(parseInt(this_seed));
    var random_animal = interplanetary_animals[random.integer(0, (interplanetary_animals.length - 1))];
    var random_adjective = interplanetary_adjectives[random.integer(0, (interplanetary_adjectives.length - 1))];
    var dominent_species = random_adjective + ' ' + random_animal;
    return dominent_species;
}

function assign_new_planet(abi_options, contract_address, parameters, from_address, from_key, amount, to_address, callback)
{
    var abi = web3.eth.contract(abi_options);
    var contract = abi.at(contract_address);
    var data = contract['assignNewPlanet'].getData(parameters.owner, parameters.x, parameters.y, parameters.z, parameters.name);
    var ether_to_send = web3.fromDecimal(web3.toWei(amount), 'ether');
    var wei_to_send = parseInt(web3.toWei(amount));
    var gas_price = web3.eth.gasPrice;
    var estimated_gas = web3.eth.estimateGas({
        from: from_address,
        to: contract_address,
        data: data,
        value: wei_to_send
    });
    var settings = {
        gas_price: gas_price.toNumber(),
        gas_limit: estimated_gas
    }
    var private_key = new Buffer(from_key, 'hex');
    var temp_nonce = web3.eth.getTransactionCount(from_address);
    var raw_tx = {
        nonce: temp_nonce,
        gasPrice: settings.gas_price,
        gasLimit: settings.gas_limit,
        to: contract_address, 
        value: ether_to_send,
        data: data
    }
    var total_fees = gas_price * estimated_gas;
    var total_wei_required = total_fees + wei_to_send;
    var tx = new EthJS.Tx(raw_tx);
    tx.sign(private_key);
    var serialized_tx = tx.serialize();
    web3.eth.sendRawTransaction('0x' + serialized_tx.toString('hex'), function(err, hash) 
    {
        if(
            hash
            && typeof callback == 'function'
        ){
            callback(hash);
        }
        else
        {
            callback(false);
        }
    });
}

$(document).ready(function()
{
    var show_search = true;
    if(window.location.search)
    {
        var s = window.location.search.split('coords=');
        if(s.length > 1)
        {
            show_planet = true;
            var cord_array = s[1].split(',');
            if(cord_array.length === 3)
            {
                $('#header').hide();
                $('#footer').hide();
                show_search = false;
                get_eth_planet(cord_array[0], cord_array[1], cord_array[2], function(res)
                {
                    
                });
            }
        }
    }
    if(show_search === true) $('#search-modal').modal('show');
    $('body').on('submit', 'form#generate-new-planet', function(e)
    {
        e.preventDefault();
        var form = this;
        var x = $(form).attr('data-x');
        var y = $(form).attr('data-y');
        var z = $(form).attr('data-z');
        var min = $(form).attr('data-min');
        var fees = $(form).attr('data-fees');
        var name = $(form).find('#planet-name').val();
        var owner = $(form).find('#planet-owner').val();
        if(x && y && z && min && name && owner && fees)
        {
            // Time to calculate the temporary keys ...
            // var temp_seed = 'temp-seed-for-bloqverse-bce-001';
            var temp_seed = x + '|' + y + '|' + z + '|' + name + '|' + owner;
            var obj = CryptoJS.SHA3(temp_seed, { outputLength: 512 });
            var temp_obj = ethUtil.sha3(temp_seed);
            var hash = obj.toString().substring(0, 32);

            var eth_wallet = new Wallet(temp_obj);
            var temp_keys = {
                address: eth_wallet.getAddress().toString('hex'),
                private: eth_wallet.privKey.toString('hex'),
                public: eth_wallet.getPublicKey().toString('hex')
            };
            
            var title = 'Start Minting Planet';
            var content = '<alert class="alert alert-block alert-danger">Warning:<br><small>Do not close this pop-up until the process is complete</small></alert><hr>';
            content+= '<alert class="alert alert-block alert-info">Temporary Holding Address:<br><small><a href="https://etherscan.io/address/' + temp_keys.address + '" target="_blank">0x' + temp_keys.address + '</a></small></alert><hr>';
            content+= '<alert id="current-generation-status" class="alert alert-block alert-warning">Status:<br><small><strong>Waiting for minimum deposit of ' + min + ' Ether</strong><br>(to be sent to address listed above and shown below as QR code)</small></alert><hr>';
            content+= '<div class="qr-holder wait-for-donation" data-content="' + '0x' + temp_keys.address + '" data-key="' + temp_keys.private + '" data-name="' + name + '" data-owner="' + owner + '" data-x="' + x + '" data-y="' + y + '" data-z="' + z + '" data-min="' + min +'" data-fees="' + fees + '"></div>';
            $.fn.bloqpress.core.modal(title, content, 'default-modal', function()
            {
                $('body').find('.qr-holder').each(function()
                {
                    if($(this).find('img').length > 0)
                    {
                        $(this).find('img').remove();
                    }
                    $(this).qrcode({
                        render: 'image',
                        text: $(this).attr('data-content')
                    });
                    check_for_donations();
                });
            });
        }
    });
    $('body').on('submit', 'form#search-coordinates', function(e)
    {
        e.preventDefault();
        var form = this;
        var x = $(form).find('#x-cord').val();
        var y = $(form).find('#y-cord').val();
        var z = $(form).find('#z-cord').val();
        if(x && y && z)
        {
            $(form).find('button[type="submit"]').addClass('loading');
            $('#viewportFrame').find('canvas').hide();
            $('#header').hide();
            $('#footer').hide();
            
            get_eth_planet(x, y, z, function(results)
            {
                $('#viewportFrame').removeClass('loading'); 
                $('#viewportFrame').find('canvas').show();
                $('#header').show();
                $('#footer').show();
                $(form).show();
                $(form).find('button[type="submit"]').removeClass('loading');
                $('#search-modal').modal('show');
                if($.isPlainObject(results))
                {
                    $('#search-coordinates alert.alert').html('We found a planet called ' + results.name + ' at these coorindates.<br />Would you like to <a href="?coords='+x+','+y+','+z+'"><code><strong>visit</strong></code></a> this planet?');
                }
                else
                {
                    $('#search-coordinates alert.alert').html('There is no planet at these coordinates.<br >Would you like to <a href="#" class="create-planet" data-x="'+x+'" data-y="'+y+'" data-z="'+z+'"><code><strong>create</strong></code></a> one now?');
                }
            });
        }
    });
    $('body').on('click', '.share-planet', function(e)
    {
        e.preventDefault();
        var button = this;
        $.fn.bloqpress.core.modal(false, false, 'social-modal');
    });
    $('body').on('click', '.create-planet', function(e)
    {
        e.preventDefault();
        var button = this;
        var x_coors = $(button).attr('data-x');
        var y_coors = $(button).attr('data-y');
        var z_coors = $(button).attr('data-z');
        if(x_coors && y_coors && z_coors)
        {
            var x_cord = parseInt(x_coors);
            var y_cord = parseInt(y_coors);
            var z_cord = parseInt(z_coors);
            
            $('#search-modal').modal('hide');
            
            if(
                x_cord > planet_contract_settings.coordinate_limits
                || x_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid X coordinate - must be between 0 and ' + planet_contract_settings.coordinate_limits);
            }
            else if(
                y_cord > planet_contract_settings.coordinate_limits
                || y_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid Y coordinate - must be between 0 and ' + planet_contract_settings.coordinate_limits);
            }
            else if(
                z_cord > planet_contract_settings.coordinate_limits
                || z_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid Z coordinate - must be between 0 and ' + planet_contract_settings.coordinate_limits);
            }
            else
            {

                var abi = web3.eth.contract(unicorn_planet_abi);
                var contract = abi.at(unicorn_planet_contract_address);
                var data = contract['assignNewPlanet'].getData(unicorn_planet_donation_address, x_coors, y_coors, z_coors,'The Longest Possible Planet Name Someone Would Seriously Consider?');
                var wei_to_send = parseInt(web3.toWei(0.1));
                var gas_price = web3.eth.gasPrice;

                var estimated_gas = web3.eth.estimateGas({
                    from: unicorn_planet_donation_address,
                    to: unicorn_planet_contract_address,
                    data: data,
                    value: wei_to_send
                });

                var fees = gas_price * estimated_gas;
                var total_fees = web3.toDecimal(web3.fromWei(fees), 'ether');
                var total_wei_required = fees + wei_to_send;
                var total_eth_required = parseFloat(web3.toDecimal(web3.fromWei(total_wei_required), 'ether')).toFixed(2);

                var title = 'Generate New Planet';
                var contents = '<p>Generate planet at X = '+x_coors+', Y = '+y_coors+', and Z = '+z_coors+' by giving it a name and making a minimum donation of 0.1 Ether - whilst also paying the estimated gas price of '+total_fees+' - for a <strong>minimum total</strong> of at least <strong>'+total_eth_required+'</strong> Ether. Please note that as a registered non-profit - all donations received by the <a href="http://bce.asia" target="_blank">Blockchain Embassy</a> are used to help promote blockchain technology awareness throughout asia. Simply fill out the form below to get started:</p><hr>';
                contents+= '<form id="generate-new-planet" data-x="'+x_coors+'" data-y="'+y_coors+'" data-z="'+z_coors+'" data-min="'+total_eth_required+'" data-fees="' + total_fees + '">';
                    contents+= '<input type="text" id="planet-name" class="form-control" autocomplete="off" placeholder="What would you like to call this planet...?" /><hr>';
                    contents+= '<input type="text" id="planet-owner" class="form-control" autocomplete="off" placeholder="Ethereum address to which ownership of the planet should be assigned...?" /><hr>';
                    contents+= '<button type="submit" class="btn btn-block btn-primary">Start Planet Generation Process</button>';
                contents+= '</form>';
                $.fn.bloqpress.core.modal(title, contents);
            }
        }
    });
    $('body').on('click', '.search-again', function(e)
    {
        e.preventDefault();
        $('#search-modal').modal('toggle');
    });
    $('body').on('click', '.galactic-directory', function(e)
    {
        e.preventDefault();
        var title = 'Interplanetary Directory';
        //var contents = '<p>Known planets within the Ropsten universe include:</p>';
        var contents = '<p>Known planets within the <a href="https://etherscan.io/address/0x83EbB03Be2f5AC37a5FF28c685dcf2685E9d6e68" target="_blank">Ethereum</a> universe include:</p><hr>';
        contents+= '<ul class="list-group">';
        
            contents+= '<li class="list-group-item"><a href="?coords=0,0,0">Genesis Prime</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=6,6,6">Hellio 1</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=1,2,3">Obviiious</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=5,3,79">Smalltopia</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=4,4,4">Quartz</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=88,88,88">Gentin</a></li>';
        
            /*
            contents+= '<li class="list-group-item"><a href="?coords=5935,7318,1022">Republic of Ropsten</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=0,9,3">Ropsten Republic</a></li>';
            */
        
        contents+= '</ul>';
        $.fn.bloqpress.core.modal(title, contents);
    });
    $.fn.bloqpress.plugins.ethereum.contracts.get(unicorn_planet_contract_address, unicorn_planet_abi, function(contract)
    {
        var total_planets = contract.totalSupply().toString();
        $('#footer .planet-stats').append('<br><small>' + total_planets + ' Planets Currently Stored on The Ethereum Blockchain</small>');
    });
});

function check_for_donations(check_count)
{
    
    if(typeof check_count == 'undefined') check_count = 0;
    check_count++;
    
    $('.wait-for-donation').each(function(i)
    {
        var qr = this;
        var x = $(qr).attr('data-x');
        var y = $(qr).attr('data-y');
        var z = $(qr).attr('data-z');
        var name = $(qr).attr('data-name');
        var owner = $(qr).attr('data-owner');
        var address = $(qr).attr('data-content');
        var key = $(qr).attr('data-key');
        var min = $(qr).attr('data-min');
        var fees = $(qr).attr('data-fees');
        if(x && y && z && name && owner && address && key && min && fees)
        {
            var x_cord = parseInt(x);
            var y_cord = parseInt(y);
            var z_cord = parseInt(z);
            
            // Check if addresses are valid ...?
            if(!web3.isAddress(owner))
            {
                $.fn.bloqpress.core.modal('Warning', 'Invalid owner address');
            }
            else if(!web3.isAddress(address))
            {
                $.fn.bloqpress.core.modal('Warning', 'Invalid holding address');
            }
            else
            {
                // Check balance of address
                $.fn.bloqpress.plugins.ethereum.addresses.get(address, [], function(obj)
                {
                    var current_ether = 0;
                    var min_wei = parseInt(parseFloat(min) * 1000000000000000000);
                    var min_donation = parseInt(parseFloat(planet_contract_settings.min_donation) * 1000000000000000000);
                    
                    
                    
                    
                    var abi = web3.eth.contract(unicorn_planet_abi);
                    var contract = abi.at(unicorn_planet_contract_address);
                    var data = contract['assignNewPlanet'].getData(owner, x_cord, y_cord, z_cord, name);

                    var gas_price = web3.eth.gasPrice;
                    var new_contract_cost = web3.eth.estimateGas({
                        from: address,
                        to: unicorn_planet_contract_address,
                        data: data,
                        value: obj.balance
                    });
                    
                    contract_cost = new_contract_cost * gas_price;
                    
                    if(
                        typeof obj.balance != 'undefined'
                        && obj.balance >= min_wei
                    ){
                        $(qr).removeClass('wait-for-donation');
                        var tx_value = obj.balance - contract_cost;
                        var tx_eth_value = parseFloat(tx_value / 1000000000000000000);
                        
                        prepare_for_planet_creation(
                            x_cord, y_cord, z_cord, 
                            name, owner, 
                            tx_eth_value, address, key, 
                            function(hash)
                            {
                                var title = 'Error';
                                var contents = 'Unable to process this transaction';
                                if(hash)
                                {
                                    title = 'New Life Spawned ...';
                                    contents = '<p>The planet of <strong>' + name + ' has been <a href="https://etherscan.io/tx/' + hash + '" target="_blank">generated</a> on the Ethereum blockchain!</p>';
                                    contents+= '<hr><a href="?coords=' + x_cord + ',' + y_cord + ',' + z_cord + '" class="btn btn-block btn-xl btn-primary">Visit Planet</a>';
                                }
                                $.fn.bloqpress.core.modal(title, contents);
                            }
                        )
                    }
                    else
                    {
                        if(
                            typeof obj.balance != 'undefined'
                            && obj.balance > 0
                        ){
                            current_ether = parseFloat(obj.balance / 1000000000000000000);
                        }

                        if(check_count > 1)
                        {
                            $('#current-generation-status').html('Balance: <strong>' + current_ether + '</strong> Ether<br><small>Waiting for minimum required donation of ' + min + ' Ether - Will check again in 30 seconds</small>');
                        }

                        setTimeout(function()
                        {
                            check_for_donations(check_count);
                        }, 30000);
                    }
                });
            }
        }
    });
}

function prepare_for_planet_creation(x_co, y_co, z_co, planet_name, planet_owner, tx_value, holding_address, holding_key, callback)
{
    assign_new_planet(
        unicorn_planet_abi, 
        unicorn_planet_contract_address, 
        {
            x: parseInt(x_co),
            y: parseInt(y_co),
            z: parseInt(z_co),
            name: planet_name,
            owner: planet_owner
        },
        holding_address, 
        holding_key, 
        tx_value,
        unicorn_planet_donation_address,
        callback
    );
}

function get_eth_planet(x_cord, y_cord, z_cord, callback)
{
    $('#viewportFrame').addClass('loading');
    $('#search-modal').modal('hide');
    $.fn.bloqpress.plugins.ethereum.contracts.get(unicorn_planet_contract_address, unicorn_planet_abi, function(contract)
    {
        var planet_exists = contract.exists(x_cord, y_cord, z_cord).toString();
        if(planet_exists === 'true')
        {
            var planet_id = contract.buildTokenId(x_cord, y_cord, z_cord).toPrecision();
            var total_planets = contract.totalSupply().toString();
            var plannet_owner = contract.ownerOfPlanet(x_cord, y_cord, z_cord).toString();
            var planet_name = contract.planetName(x_cord, y_cord, z_cord).toString();
            var dna = contract.planetLife(x_cord, y_cord, z_cord);
            var dna_strings = [];
            $.each(dna, function(i)
            {
                dna_strings.push(dna[i].toPrecision());
            });
            unicorn_planet = {
                coordinates: [
                    x_cord,
                    y_cord,
                    z_cord
                ],
                dna: [
                    dna_strings[0],
                    dna_strings[1],
                    dna_strings[2]
                ],
                id: planet_id,
                name: planet_name,
                owner: plannet_owner,
                total: total_planets
            };
            var animal_seed = parseInt(unicorn_planet.dna[0].substring(0, 12));
            unicorn_planet.seed = parseInt(unicorn_planet.id.substring(0, 12));
            // 13 & 14 + 15 & 16 now free for something else???
            // Perhaps start with planet background ...???
            unicorn_planet.animals = {
                seed: animal_seed,
                species: random_planetary_life(animal_seed)
            };
            unicorn_names = new unicorn_name_generator(unicorn_vocabulary, unicorn_planet.seed);
            unicorn_planet.oceans = [
                parseInt(unicorn_planet.id.substring(17, 19)),
                parseInt(unicorn_planet.id.substring(20, 22)),
                parseInt(unicorn_planet.id.substring(23, 25))
            ];
            unicorn_planet.rural = [
                parseInt(unicorn_planet.id.substring(26, 28)),
                parseInt(unicorn_planet.id.substring(29, 31)),
                parseInt(unicorn_planet.id.substring(32, 34))
            ];
            unicorn_planet.urban = [
                parseInt(unicorn_planet.id.substring(35, 37)),
                parseInt(unicorn_planet.id.substring(38, 40)),
                parseInt(unicorn_planet.id.substring(41, 43))
            ];
            var oceanic = ntc.name(rgbToHex(unicorn_planet.oceans[0], unicorn_planet.oceans[1], unicorn_planet.oceans[2]));
            var rural = ntc.name(rgbToHex(unicorn_planet.rural[0], unicorn_planet.rural[1], unicorn_planet.rural[2]));
            var urban = ntc.name(rgbToHex(unicorn_planet.urban[0], unicorn_planet.urban[1], unicorn_planet.urban[2]));
            unicorn_planet.oceans.push(oceanic[0]);
            unicorn_planet.oceans.push(oceanic[1]);
            unicorn_planet.rural.push(rural[0]);
            unicorn_planet.rural.push(rural[1]);
            unicorn_planet.urban.push(urban[0]);
            unicorn_planet.urban.push(urban[1]);
            unicorn_planet.rulers = {
                male: generate_unicorn_name('male'),
                female: generate_unicorn_name('female')
            };
            callback(unicorn_planet);
        }
        else
        {
            unicorn_planet = false;
            callback(unicorn_planet);
        }
    });
}