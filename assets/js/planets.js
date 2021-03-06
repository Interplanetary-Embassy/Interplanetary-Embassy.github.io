var show_planet = false;
var unicorn_planet = false;
var unicorn_names = false;

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
    var data = contract['assignNewPlanet'].getData(parameters.owner, parameters.x, parameters.y, parameters.z, parameters.name, parameters.liason, parameters.url);
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
        //gas_limit: estimated_gas
        gas_limit: 3000000
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
    $('body').on('click', '.galactic-directory', function(e)
    {
        e.preventDefault();
        var title = 'Interplanetary Directory';
        //var contents = '<p>Known planets within the Ropsten universe include:</p>';
        var contents = '<p>Known planets within the <a href="https://etherscan.io/address/0x83EbB03Be2f5AC37a5FF28c685dcf2685E9d6e68" target="_blank">Ethereum</a> universe include:</p><hr>';
        contents+= '<ul class="list-group">';
        
            contents+= '<li class="list-group-item"><a href="?coords=99,99,99">Far Point 9 <label class="label label-default pull-right">[ 99, 99, 99 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=0,0,0">Genesis Prime <label class="label label-default pull-right">[ 0, 0, 0 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=10,9,92">Messiah <label class="label label-default pull-right">[ 10, 9, 92 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=1,2,3">Obviiious <label class="label label-default pull-right">[ 1, 2, 3 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=5,3,79">Smallville <label class="label label-default pull-right">[ 5, 3, 79 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=19,11,89">The Republic of DroneRiders <label class="label label-default pull-right">[ 19, 11, 89 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=92,9,10">Unicornia <label class="label label-default pull-right">[ 92, 9, 10 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=20,5,10">Zatul <label class="label label-default pull-right">[ 20, 5, 10 ]</label></a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=1,13,89">Zion <label class="label label-default pull-right">[ 1, 13, 89 ]</label></a></li>';
        
            /*
            // Pink = 92, 9, 10
            contents+= '<li class="list-group-item"><a href="?coords=93,1,29">Tineedeztroy</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=5,5,5">Thinko</a></li>';
            */
        
            /*
            contents+= '<li class="list-group-item"><a href="?coords=6,6,6">Hellio 1</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=4,4,4">Quartz</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=88,88,88">Gentin</a></li>';
            contents+= '<li class="list-group-item"><a href="?coords=1066,1066,1066">Williamsphere III</a></li>';
            */
        
        contents+= '</ul>';
        $.fn.bloqpress.core.modal(title, contents);
    });
    var show_search = true;
    if(window.location.search)
    {
        var s = window.location.search.split('coords=');
        var action = window.location.search.split('action=');
        if(action.length > 1)
        {
            if(action[1] == 'directory')
            {
                show_search = false;
                $('.galactic-directory').trigger('click');
            }
        }
        else if(s.length > 1)
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
        var liason = $(form).find('#human-owner').val();
        var url = $(form).find('#human-url').val();
        if(x && y && z && min && name && owner && fees && liason && url)
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
            var content = '<alert class="alert alert-block alert-danger">Warning:<br><small>Do not close this pop-up until the process is complete</small><hr>Donation Address<br><small><a href="https://etherscan.io/address/' + temp_keys.address + '" target="_blank">0x' + temp_keys.address + '</a></small></alert>';
            content+= '<alert id="current-generation-status" class="alert alert-block alert-warning">Status:<br><small><strong>Waiting for minimum deposit of ' + min + ' Ether</strong><br>(send to address listed above and shown below as QR code)</small></alert><hr>';
            content+= '<div class="qr-holder wait-for-donation" data-content="' + '0x' + temp_keys.address + '" data-key="' + temp_keys.private + '" data-name="' + name + '" data-owner="' + owner + '" data-x="' + x + '" data-y="' + y + '" data-z="' + z + '" data-min="' + min +'" data-fees="' + fees + '" data-liason="' + liason + '" data-url="' + url + '"></div>';
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
                });
                check_for_donations();
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
                
                if($.isPlainObject(results))
                {
                    $('#search-coordinates alert.alert').html('We found a planet called ' + results.name + ' at these coorindates.<br />Would you like to <a href="?coords='+x+','+y+','+z+'"><code><strong>visit</strong></code></a> this planet?');
                }
                else
                {
                    $('#search-coordinates alert.alert').html('There is no planet at these coordinates.<br >Would you like to <a href="#" class="create-planet" data-x="'+x+'" data-y="'+y+'" data-z="'+z+'"><code><strong>create</strong></code></a> one now?');
                }
                
                setTimeout(function()
                {
                    $('#search-modal').modal('show');
                }, 1000);
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
                x_cord > bloqverse_settings.universe.coordinate_limits
                || x_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid X coordinate - must be between 0 and ' + bloqverse_settings.universe.coordinate_limits);
            }
            else if(
                y_cord > bloqverse_settings.universe.coordinate_limits
                || y_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid Y coordinate - must be between 0 and ' + bloqverse_settings.universe.coordinate_limits);
            }
            else if(
                z_cord > bloqverse_settings.universe.coordinate_limits
                || z_cord < 0
            ){
                $.fn.bloqpress.core.modal('Warning', 'Invalid Z coordinate - must be between 0 and ' + bloqverse_settings.universe.coordinate_limits);
            }
            else
            {
                var abi = web3.eth.contract(unicorn_planet_abi);
                var contract = abi.at(bloqverse_settings.universe.contract);
                var data = contract['assignNewPlanet'].getData(bloqverse_settings.universe.donations, x_coors, y_coors, z_coors,'The Longest Possible Planet Name Someone Would Seriously Consider?', 'The Expected Name is Currently Unknown', 'http://bce.asia?ref=this-could-really-be-anything');
                var blocks_left = contract.BlocksToGo().toNumber();
                var estimated_minimum = web3.toDecimal(web3.fromWei(contract.totalSupply().toNumber() * bloqverse_settings.universe.wei_per_planet), 'ether');
                
                bloqverse_settings.universe.min_donation = web3.toDecimal(web3.fromWei(contract.MinimumDonation().toNumber()), 'ether');
                
                var wei_to_send = parseInt(web3.toWei(bloqverse_settings.universe.min_donation));
                var gas_price = web3.eth.gasPrice;
                
                var estimated_gas = web3.eth.estimateGas({
                    from: bloqverse_settings.universe.donations,
                    to: bloqverse_settings.universe.contract,
                    data: data,
                    value: wei_to_send
                });

                var fees = gas_price * estimated_gas;
                var total_fees = web3.toDecimal(web3.fromWei(fees), 'ether');

                var total_wei_required = parseInt(fees) + parseInt(wei_to_send);
                var total_eth_required = web3.toDecimal(web3.fromWei(total_wei_required), 'ether');

                var title = 'Generate New Planet';
                var contents = '<alert class="alert alert-block alert-info">Only ' + blocks_left + ' Blocks Remain Before Minimum Donation Fee Increases<br />(when it is estimated to increase to ' + estimated_minimum + ' ether)</alert><p>Generate planet at X = '+x_coors+', Y = '+y_coors+', and Z = '+z_coors+' by giving it a name and making a minimum donation of ' + bloqverse_settings.universe.min_donation + ' Ether - whilst also paying the estimated gas price of '+total_fees+' - for a <strong>minimum total</strong> of at least <strong>'+total_eth_required+'</strong> Ether. Please note that as a registered non-profit - all donations received by the <a href="http://bce.asia" target="_blank">Blockchain Embassy</a> are used to help promote blockchain technology awareness throughout asia.</p><p><strong>Simply fill out the form below to get started:</strong></p><hr>';
                contents+= '<form id="generate-new-planet" data-x="'+x_coors+'" data-y="'+y_coors+'" data-z="'+z_coors+'" data-min="'+total_eth_required+'" data-fees="' + total_fees + '">';
                    contents+= '<input type="text" id="planet-name" class="form-control" autocomplete="off" placeholder="What would you like to call this planet...?" /><hr>';
                    contents+= '<input type="text" id="planet-owner" class="form-control" autocomplete="off" placeholder="Ethereum address to which ownership of the planet should be assigned...?" /><hr>';
                    contents+= '<input type="text" id="human-owner" class="form-control" autocomplete="off" placeholder="Human Liason on Earth...?" /><hr>';
                    contents+= '<input type="text" id="human-url" class="form-control" autocomplete="off" placeholder="Interweb Liason Link (URL)...?" /><hr>';
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
    $.fn.bloqpress.plugins.ethereum.contracts.get(bloqverse_settings.universe.contract, unicorn_planet_abi, function(contract)
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
        var liason = $(qr).attr('data-liason');
        var url = $(qr).attr('data-url');
        if(x && y && z && name && owner && address && key && min && fees && liason && url)
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
                    
                    if(
                        typeof obj.balance != 'undefined'
                        && obj.balance >= min_wei
                    ){
                        $(qr).removeClass('wait-for-donation');
                        
                        var min_donation = parseInt(parseFloat(bloqverse_settings.universe.min_donation) * 1000000000000000000);
                    
                        var abi = web3.eth.contract(unicorn_planet_abi);
                        var contract = abi.at(bloqverse_settings.universe.contract);
                        var data = contract['assignNewPlanet'].getData(owner, x_cord, y_cord, z_cord, name, liason, url);

                        var gas_price = web3.eth.gasPrice;
                        
                        var new_contract_cost = web3.eth.estimateGas({
                            from: address,
                            to: bloqverse_settings.universe.contract,
                            data: data,
                            value: obj.balance
                        });

                        contract_cost = new_contract_cost * gas_price;
                        
                        var tx_value = obj.balance - contract_cost;
                        var tx_eth_value = parseFloat(tx_value / 1000000000000000000);
                        
                        prepare_for_planet_creation(
                            x_cord, y_cord, z_cord, 
                            name, liason, url, owner, 
                            tx_eth_value, address, key, 
                            function(hash)
                            {
                                var title = 'Error';
                                var contents = 'Unable to process this transaction';
                                if(hash)
                                {
                                    title = 'New Life Spawned ...';
                                    contents = '<p>The planet of <strong>' + name + ' has been <a href="https://etherscan.io/tx/' + hash + '" target="_blank">generated</a> on the Ethereum blockchain!</p>';
                                    contents = '<p>However, please note that it may take a minute or two for the transaction to confirm and visiting the planet before the transaction has been confirmed could result in temporary page errors. You could wait until <a href="https://etherscan.io/tx/' + hash + '" target="_blank">this transaction</a> has received its first confirmation - or try your luck now:</p>';
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

function prepare_for_planet_creation(x_co, y_co, z_co, planet_name, liason, url, planet_owner, tx_value, holding_address, holding_key, callback)
{
    console.log('prepare');
    assign_new_planet(
        unicorn_planet_abi, 
        bloqverse_settings.universe.contract, 
        {
            x: parseInt(x_co),
            y: parseInt(y_co),
            z: parseInt(z_co),
            name: planet_name,
            owner: planet_owner,
            liason: liason,
            url: url
        },
        holding_address, 
        holding_key, 
        tx_value,
        bloqverse_settings.universe.donations,
        callback
    );
}

function get_eth_planet(x_cord, y_cord, z_cord, callback)
{
    $('#viewportFrame').addClass('loading');
    $('#search-modal').modal('hide');
    $.fn.bloqpress.plugins.ethereum.contracts.get(bloqverse_settings.universe.contract, unicorn_planet_abi, function(contract)
    {
        var planet_exists = contract.exists(x_cord, y_cord, z_cord).toString();
        if(planet_exists === 'true')
        {
            var planet_id = contract.buildTokenId(x_cord, y_cord, z_cord).toPrecision();
            var total_planets = contract.totalSupply().toString();
            var plannet_owner = contract.ownerOfPlanet(x_cord, y_cord, z_cord).toString();
            var planet_name = contract.planetName(x_cord, y_cord, z_cord).toString();
            var planet_liason = contract.GetLiasonName(x_cord, y_cord, z_cord).toString();
            var planet_url = contract.GetLiasonURL(x_cord, y_cord, z_cord).toString();
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
                liason: planet_liason,
                url: planet_url,
                owner: plannet_owner,
                total: total_planets
            };
            var animal_seed = parseInt(unicorn_planet.dna[0].substring(0, 10));
            unicorn_planet.seed = parseInt(unicorn_planet.id.substring(0, 10));
            // 13 & 14 + 15 & 16 now free for something else???
            // Perhaps start with planet background ...???
            var primary_species = random_planetary_life(animal_seed).split(' ');
            var species_type = primary_species[0];
            var species_animal = primary_species[1];
            var next_species = random_planetary_life(animal_seed - (animal_seed / 2)).split(' ');
            var second_species_type = next_species[0];
            var second_species_animal = next_species[1];
            unicorn_planet.animals = {
                seed: animal_seed,
                species: random_planetary_life(animal_seed),
                type: species_type,
                animal: species_animal,
                second_species: next_species,
                second_type: second_species_type,
                second_animal: second_species_animal
            };
            unicorn_names = new unicorn_name_generator(unicorn_vocabulary, unicorn_planet.seed);
            unicorn_planet.space = [
                parseInt(unicorn_planet.id.substring(10, 12)),
                parseInt(unicorn_planet.id.substring(12, 14)),
                parseInt(unicorn_planet.id.substring(14, 16))
            ];
            unicorn_planet.oceans = [
                parseInt(unicorn_planet.id.substring(16, 18)),
                parseInt(unicorn_planet.id.substring(18, 20)),
                parseInt(unicorn_planet.id.substring(20, 22))
            ];
            unicorn_planet.rural = [
                parseInt(unicorn_planet.id.substring(22, 24)),
                parseInt(unicorn_planet.id.substring(24, 26)),
                parseInt(unicorn_planet.id.substring(26, 28))
            ];
            unicorn_planet.urban = [
                parseInt(unicorn_planet.id.substring(28, 30)),
                parseInt(unicorn_planet.id.substring(30, 32)),
                parseInt(unicorn_planet.id.substring(32, 34))
            ];
            unicorn_planet.sun = [
                parseInt(unicorn_planet.id.substring(34, 36)),
                parseInt(unicorn_planet.id.substring(36, 38)),
                parseInt(unicorn_planet.id.substring(38, 40))
            ];
            unicorn_planet.species = [
                parseInt(unicorn_planet.id.substring(40, 42)),
                parseInt(unicorn_planet.id.substring(42, 44)),
                parseInt(unicorn_planet.id.substring(44, 46))
            ];
            unicorn_planet.second_species = [
                parseInt(unicorn_planet.id.substring(46, 48)),
                parseInt(unicorn_planet.id.substring(48, 50)),
                parseInt(unicorn_planet.id.substring(50, 52))
            ];
            var space = ntc.name(rgbToHex(unicorn_planet.space[0], unicorn_planet.space[1], unicorn_planet.space[2]));
            var sun = ntc.name(rgbToHex(unicorn_planet.sun[0], unicorn_planet.sun[1], unicorn_planet.sun[2]));
            var oceanic = ntc.name(rgbToHex(unicorn_planet.oceans[0], unicorn_planet.oceans[1], unicorn_planet.oceans[2]));
            var rural = ntc.name(rgbToHex(unicorn_planet.rural[0], unicorn_planet.rural[1], unicorn_planet.rural[2]));
            var urban = ntc.name(rgbToHex(unicorn_planet.urban[0], unicorn_planet.urban[1], unicorn_planet.urban[2]));
            var species = ntc.name(rgbToHex(unicorn_planet.species[0], unicorn_planet.species[1], unicorn_planet.species[2]));
            var next_species = ntc.name(rgbToHex(unicorn_planet.second_species[0], unicorn_planet.second_species[1], unicorn_planet.second_species[2]));
            unicorn_planet.space.push(space[0]);
            unicorn_planet.space.push(space[1]);
            unicorn_planet.sun.push(sun[0]);
            unicorn_planet.sun.push(sun[1]);
            unicorn_planet.oceans.push(oceanic[0]);
            unicorn_planet.oceans.push(oceanic[1]);
            unicorn_planet.rural.push(rural[0]);
            unicorn_planet.rural.push(rural[1]);
            unicorn_planet.urban.push(urban[0]);
            unicorn_planet.urban.push(urban[1]);
            unicorn_planet.animals.color = species[1];
            unicorn_planet.animals.second_color = next_species[1];
            unicorn_planet.rulers = {
                male: generate_unicorn_name('male'),
                female: generate_unicorn_name('female')
            };
            
            var space_gradient = 'radial-gradient(ellipse at bottom, ' + sun[0] + ' 0%, ' + space[0] + ' 100%)';
            $('#space').css({background: space_gradient});
            
            callback(unicorn_planet);
        }
        else
        {
            unicorn_planet = false;
            callback(unicorn_planet);
        }
    });
}