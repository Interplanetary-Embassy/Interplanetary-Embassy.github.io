var bloqverse_settings = {
    universe: {
        name: 'bce.asia',
        contract: '0xcE85675eA91F8AFe2a67869A8b1F9136187DC772',
        donations: '0xf725a9b6B83445105F14A60968410eC8000dc0c1',
        coordinate_limits: 99,
        wei_per_planet: 100000000000000
    }
};

var bloqverse = {
    html: {
        buttons: function()
        {
            $('body').on('click', '.planet-info', function(e)
            {
                e.preventDefault();
                $.fn.bloqpress.core.modal(false, false, 'planet-modal');
            });
        },
        loader: function(css)
        {
            $('#viewportFrame').removeClass('loading');
            $('#viewportFrame').addClass(css);
        },
        update: function(planet, header, footer, modal)
        {
            if(
                $.isPlainObject(planet)
                && $(header).length > 0
                && $(footer).length > 0
                && $(modal).length > 0
            ){
                var space = planet.space[4].toLowerCase();
                var sun = planet.sun[4].toLowerCase();
                var ocean = planet.oceans[4].toLowerCase();
                var islands = planet.rural[4].toLowerCase();
                var cities = planet.urban[4].toLowerCase();
                var species = planet.animals.species.toLowerCase();
                var species_intro = '( ' + cities + ' cities are forming on the islands of ' + islands + ' that lie scattered across a ' + ocean + ' ocean where the ' + species + ' have become the primary species )';
                var header_html = '<h4 class="planet-name"><strong>' + planet.name + '</strong> is evolving</h4><small>' + species_intro + '</small>';
                var footer_html = '<p><b class="biome-key ocean-biome" style="border-color: '+planet.oceans[3]+';">Oceans <i class="stat">??</i>%</b> ';
                footer_html+= '<b class="biome-key rural-biome" style="border-color: '+planet.rural[3]+';">Rural <i class="stat">??</i>%</b> ';
                footer_html+= '<b class="biome-key urban-biome" style="border-color: '+planet.urban[3]+';">Urban <i class="stat">??</i>%</b></p>';
                footer_html+= '<p><a href="#" class="btn btn-default btn-xs search-again">search for life</a> ';
                footer_html+= '<a href="#" class="btn btn-default btn-xs galactic-directory">known planets</a> ';
                footer_html+= '<a href="#" class="btn btn-default btn-xs share-planet">share</a> ';
                footer_html+= '<a href="#" class="btn btn-default btn-xs planet-info">planet stats</a></p>';
                
                document.title = planet.name + ' | Interplanetary Embassy';

                $(header).html(header_html);
                $(footer).html(footer_html);
                
                // MODAL INFO:
                
                var coords = '[ ' + unicorn_planet.coordinates[0] + ', ';
                coords+= unicorn_planet.coordinates[1] + ', ';
                coords+= unicorn_planet.coordinates[2] + ' ]';
                
                var species = planet.animals.type + ' ' + planet.animals.color + ' ' + planet.animals.animal;
                var next_species = planet.animals.second_type + ' ' + planet.animals.second_color + ' ' + planet.animals.second_animal;
                
                var animal_array = species.split(' ');
                var animals_array = next_species.split(' ');
                var ocean_array = ocean.split(' ');
                var island_array = islands.split(' ');
                var city_array = cities.split(' ');
                var name_array = planet.name.split(' ');
                var space_array = space.split(' ');
                var sun_array = sun.split(' ');
                var rulers_array = (planet.rulers.male + ' ' + planet.rulers.female).split(' ');
                
                var planet_dna = '' + planet.dna[0] + planet.dna[1] + planet.dna[2] + '';
                
                var planet_meta = '';
                $.each(ocean_array, function(i)
                {
                    var this_value = ocean_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(island_array, function(i)
                {
                    var this_value = island_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(city_array, function(i)
                {
                    var this_value = city_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(animal_array, function(i)
                {
                    var this_value = animal_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(animals_array, function(i)
                {
                    var this_value = animals_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(rulers_array, function(i)
                {
                    var this_value = rulers_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(name_array, function(i)
                {
                    var this_value = name_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(space_array, function(i)
                {
                    var this_value = space_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                $.each(sun_array, function(i)
                {
                    var this_value = sun_array[i].toLowerCase();
                    if(this_value != 'of' && this_value != 'the' && planet_meta.indexOf(this_value) < 0)
                    {
                        planet_meta+= '' + this_value + ', ';
                    }
                });
                planet_meta+= '' + bloqverse_settings.universe.name;
                
                var ruling_family = planet.rulers.male;
                var next_in_line = planet.rulers.female;
                
                var ruling_number = parseInt(planet.animals.seed);
                var ruling_random = new XorShift128(parseInt(ruling_number));
                var ruling_class = ruling_random.integer(0, 1);
                
                if(ruling_class > 0)
                {
                    ruling_family = planet.rulers.female;
                    next_in_line = planet.rulers.male;
                }
                
                var planet_intro = 'In that vast depths of ' + space + ' space the planet of ' + planet.name + ' orbits a nearby ' + sun + ' sun. On the planet surface ' + cities + ' cities have started developing on the islands of ' + islands + ' that lie scattered across a ' + ocean + ' ocean. Under the leadership of ' + ruling_family + '; these ' + species + ' have become the dominant species. The whispered rumours of a ' + next_species + ' rebellion by ' + next_in_line + ' brings the planet of ' + planet.name + ' to the brink of war.';
                
                $(modal).find('.modal-title').text(planet.name);
                $(modal).find('.universe-contract').text(bloqverse_settings.universe.contract);
                $(modal).find('.primary-species').text(species);
                $(modal).find('.next-species').text(next_species);
                $(modal).find('.planet-owner').text(planet.owner);
                $(modal).find('.human-liason').text(planet.liason);
                $(modal).find('.human-liason').attr('href', planet.url);
                $(modal).find('.universal-coordinates').text(coords);
                $(modal).find('.ruling-monarch').text(ruling_family);
                $(modal).find('.next-monarch').text(next_in_line);
                $(modal).find('.planet-dna').text(planet_dna);
                $(modal).find('.planet-meta').text(planet_meta);
                $(modal).find('.planet-intro').text(planet_intro);
                
                $('#header').show();
                $('#footer').show();
                
                // Update social meta
                $('.btn-social-icon').each(function(i)
                {
                    var button = this;
                    var pattern = $(button).attr('data-pattern');
                    if(pattern)
                    {
                        var pattern = JSON.parse(JSON.stringify(pattern.replace('$URL', window.location.href)));
                        if(pattern.indexOf('$TITLE') > -1)
                        {
                            var pattern = JSON.parse(JSON.stringify(pattern.replace('$TITLE', planet.name + ' of The Interplanetary Embassy')));
                        }
                    }
                    $(button).attr('href', pattern);
                });
            }
            
        }
    }
}

$(document).ready(function()
{
    bloqverse.html.buttons();
});