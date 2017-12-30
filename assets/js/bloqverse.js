var bloqverse_settings = {
    universe: {
        meta: 'bce'
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
                var ocean = planet.oceans[4].toLowerCase();
                var islands = planet.rural[4].toLowerCase();
                var cities = planet.urban[4].toLowerCase();
                var species = planet.animals.species.toLowerCase();
                var species_intro = '( ' + cities + ' cities are forming on the islands of ' + islands + ' that lie scattered across a ' + ocean + ' ocean where the ' + species + ' have become the primary species )';
                var header_html = '<h4 class="planet-name">The Planet known as ' + planet.name + ' is Evolving ...</h4><small>' + species_intro + '</small>';
                var footer_html = '<p><b class="biome-key ocean-biome" style="border-color: '+planet.oceans[3]+';">Oceans <i class="stat">??</i>%</b> ';
                footer_html+= '<b class="biome-key rural-biome" style="border-color: '+planet.rural[3]+';">Rural <i class="stat">??</i>%</b> ';
                footer_html+= '<b class="biome-key urban-biome" style="border-color: '+planet.urban[3]+';">Urban <i class="stat">??</i>%</b></p>';
                footer_html+= '<p><a href="#" class="btn btn-default btn-xs search-again">search for life</a> ';
                footer_html+= '<a href="#" class="btn btn-default btn-xs planet-info">learn more about this planet</a></p>';
                
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
                var rulers_array = (planet.rulers.male + ' ' + planet.rulers.female).split(' ');
                
                var planet_dna = '' + planet.dna[0] + planet.dna[1] + planet.dna[2] + '';
                
                var planet_meta = '';
                $.each(ocean_array, function(i)
                {
                    planet_meta+= '' + ocean_array[i].toLowerCase() + ', ';
                });
                $.each(island_array, function(i)
                {
                    planet_meta+= '' + island_array[i].toLowerCase() + ', ';
                });
                $.each(city_array, function(i)
                {
                    planet_meta+= '' + city_array[i].toLowerCase() + ', ';
                });
                $.each(animal_array, function(i)
                {
                    planet_meta+= '' + animal_array[i].toLowerCase() + ', ';
                });
                $.each(rulers_array, function(i)
                {
                    planet_meta+= '' + rulers_array[i].toLowerCase() + ', ';
                });
                $.each(name_array, function(i)
                {
                    planet_meta+= '' + name_array[i].toLowerCase() + ', ';
                });
                planet_meta+= '' + bloqverse_settings.universe.meta;
                
                $(modal).find('.modal-title').text(planet.name);
                $(modal).find('.universe-contract').text(unicorn_planet_contract_address);
                $(modal).find('.primary-species').text(planet.animals.species);
                $(modal).find('.planet-owner').text(planet.owner);
                $(modal).find('.universal-coordinates').text(coords);
                $(modal).find('.ruling-monarch').text(planet.rulers.male);
                $(modal).find('.next-monarch').text(planet.rulers.female);
                $(modal).find('.planet-dna').text(planet_dna);
                $(modal).find('.planet-meta').text(planet_meta);
                
                $('#header').show();
                $('#footer').show();
            }
            
        }
    }
}

$(document).ready(function()
{
    bloqverse.html.buttons();
});