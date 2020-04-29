function setOverlay(){
    $('body').append(`<div class="overlay"><img src="img/ajax-loader.svg"</img></div>`);
}

function removeOverlay(){
    $('.overlay').remove();
}

function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
  
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Si le bouton est cliqué
$('button').click(function(e){

    e.preventDefault();

    setOverlay();

    $('.todaysWeather').append('<h1>Météo actuelle sur votre position :</h1>');

    // Options de la geolocalisation
    let options = {
        enableHighAccuracy: true,       // Activation de la haute précision
        timeout: 5000,                  // Temps en ms avant timeout
        maximumAge: 0                   // Desactive le cache gps
    }

    // Fonction qui sera appelée si la localisation n'a pas pu être récupérée (e.code contient le code de l'erreur)
    let error = function(e){
        if(e.code == e.TIMEOUT){
            alert('Temps expiré')
        } else if(e.code == e.PERMISSION_DENIED){
            alert('Vous avez refusé le geolocalisation');
        } else if(e.code == e.POSITION_UNAVAILABLE){
            alert('Localisation impossible');
        } else {
            alert('Problème inconnu');
        }

        removeOverlay();
    }

    // Fonction qui sera appelée si la localisation a reussi (p contient les coordonnées de localisation)
    let success = function(p){

        let latitude = p.coords.latitude;
        let longitude = p.coords.longitude;

        console.log('Votre latitude actuelle est ' + latitude + ' et votre longitude est ' + longitude);

        $.ajax({
            type:'GET',
            url: 'https://www.prevision-meteo.ch/services/json/lat='+ latitude +'lng='+ longitude,
            dataType: 'json',
            success: function(data){

                $('.todaysWeather').append('<p>'+data.current_condition['condition']+'<img src='+data.current_condition['icon']+'></img></p>');
                $('.todaysWeather').append('<p>Lever de soleil : '+data.city_info['sunrise']+' / Coucher de soleil : '+data.city_info['sunset']+'</p>');
                $('.todaysWeather').append('<p>Température : '+data.current_condition['tmp']+' °C</p>');
                $('.todaysWeather').append('<p>Humidité : '+data.current_condition['humidity']+' %</p>');
                $('.todaysWeather').append('<p>Vent : '+data.current_condition['wnd_spd']+'km/h, Direction '+data.current_condition['wnd_dir']+'</p>');
                $('.todaysWeather').append('<p>Pression barométrique : '+data.current_condition['pressure']+' hPa</p>');


                $('.todaysWeather').after('<div class="forecast" style="border-top: 1px solid grey; border-right: 1px solid black; border-bottom: 1px solid grey; border-left: 1px solid grey; width: 25%; padding-left: 10px;"></div>');

                $('.forecast').append('<p style="padding-top: 25px; font-weight: bold; ">'+data.fcst_day_1['day_long']+' ('+data.fcst_day_1['date']+')</div>');
                $('.forecast').append('<p style="padding-bottom: 20px;">'+data.fcst_day_1['condition']+'<img src='+data.fcst_day_1['icon']+'></img></p>');
                $('.forecast').append('<p style="padding-bottom: 20px;">Température : de '+data.fcst_day_1['tmin']+' °C à '+data.fcst_day_1['tmax']+'°C</p>');     
                
                $('.forecast').append('<p style="padding-top: 25px; font-weight: bold ">'+data.fcst_day_2['day_long']+' ('+data.fcst_day_2['date']+')</div>');
                $('.forecast').append('<p style="padding-bottom: 20px;">'+data.fcst_day_2['condition']+'<img src='+data.fcst_day_2['icon']+'></img></p>');
                $('.forecast').append('<p style="padding-bottom: 20px;">Température : de '+data.fcst_day_2['tmin']+' °C à '+data.fcst_day_2['tmax']+'°C</p>');

                $('.forecast').append('<p style="padding-top: 25px; font-weight: bold ">'+data.fcst_day_3['day_long']+' ('+data.fcst_day_3['date']+')</div>');
                $('.forecast').append('<p style="padding-bottom: 20px;">'+data.fcst_day_3['condition']+'<img src='+data.fcst_day_3['icon']+'></img></p>');
                $('.forecast').append('<p style="padding-bottom: 20px;">Température : de '+data.fcst_day_3['tmin']+' °C à '+data.fcst_day_3['tmax']+'°C</p>');

                $('.forecast').append('<p style="padding-top: 25px; font-weight: bold ">'+data.fcst_day_4['day_long']+' ('+data.fcst_day_4['date']+')</div>');
                $('.forecast').append('<p style="padding-bottom: 20px;">'+data.fcst_day_4['condition']+'<img src='+data.fcst_day_4['icon']+'></img></p>');
                $('.forecast').append('<p style="padding-bottom: 20px;">Température : de '+data.fcst_day_4['tmin']+' °C à '+data.fcst_day_4['tmax']+'°C</p>');

                //for(let i=0; i<4; i++){}

                },
                error: function(){
                    $('body').prepend('<p class="error" style="color:red">Problème de connexion</p>');
                },
                complete: function(){
    
                    removeOverlay();
    
            }
        });

    }

    // Code permettant de mettre en place la demande de geolocalisation au navigateur
    navigator.geolocation.getCurrentPosition(success, error, options);

});
