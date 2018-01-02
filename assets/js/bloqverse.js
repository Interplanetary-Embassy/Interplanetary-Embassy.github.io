var bloqverse_settings = {
    universe: {
        name: 'bce.asia',
        contract: '0x99311dd2f159320e6ce94d4427a184b4cc080de5',
        donations: '0x4867C28C13901000a59749595118141FB8D7B88d',
        coordinate_limits: 99,
        min_donation: 0.09
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
                
                var animal_array = planet.animals.species.split(' ');
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
                
                var planet_intro = 'In that vast depths of ' + space + ' space the planet of ' + planet.name + ' orbits a nearby ' + sun + ' sun. On the planet surface ' + cities + ' cities have starting developing on the islands of ' + islands + ' that lie scattered across a ' + ocean + ' ocean. Under the leadership of ' + planet.rulers.male + '; these ' + species + ' have become the dominant species:';
                
                $(modal).find('.modal-title').text(planet.name);
                $(modal).find('.universe-contract').text(bloqverse_settings.universe.contract);
                $(modal).find('.primary-species').text(planet.animals.species);
                $(modal).find('.planet-owner').text(planet.owner);
                $(modal).find('.universal-coordinates').text(coords);
                $(modal).find('.ruling-monarch').text(planet.rulers.male);
                $(modal).find('.next-monarch').text(planet.rulers.female);
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