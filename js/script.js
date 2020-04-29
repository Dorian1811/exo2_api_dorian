// Si le bouton est cliqué
$('button').click(function(){
                
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

    }

    // Code permettant de mettre en place la demande de geolocalisation au navigateur
    navigator.geolocation.getCurrentPosition(success, error, options);

});
