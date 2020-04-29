function setOverlay(){
    $('body').append(`<div class="overlay"><img src="img/ajax-loader.svg"</img></div>`);
}

function removeOverlay(){
    $('.overlay').remove();
}


// Si le bouton est cliqué
$('button').click(function(e){

    e.preventDefault();
                
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
            data : 'city_info',
            success: function(p){
                
                $('.todaysWeather').append('<p>'+p.current_condition['condition']+'<img src='+p.current_condition['icon']+'></img></p>');
                $('.todaysWeather').append('<p>Lever de soleil : '+p.city_info['sunrise']+' / Coucher de soleil : '+p.city_info['sunset']+'</p>');
                $('.todaysWeather').append('<p>Température : '+p.current_condition['tmp']+' °C</p>');
                $('.todaysWeather').append('<p>Humidité : '+p.current_condition['humidity']+' %</p>');
                $('.todaysWeather').append('<p>Vent : '+p.current_condition['wnd_spd']+'km/h, Direction '+p.current_condition['wnd_dir']+'</p>');
                $('.todaysWeather').append('<p>Pression barométrique : '+p.current_condition['pressure']+' hPa</p>');
                    
                    


                },
                error: function(){
                    $('body').prepend('<p class="error" style="color:red">Problème de connexion</p>');
                },
                beforeSend: function(){
    
                    setOverlay();
    
                },
                complete: function(){
    
                    removeOverlay();
    
            }
        });

    }

    // Code permettant de mettre en place la demande de geolocalisation au navigateur
    navigator.geolocation.getCurrentPosition(success, error, options);

});
