<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>exo2 api</title>
        <style>
            h1, h2{
                text-align: center;
            }
            .but{
                text-align: center;
            }
            .overlay{
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0,0,0,0.6);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .todaysWeather{
                text-align: center;
            }
        </style>
    </head>
    <body>
        <!-- <a href="https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf"> -->
        <h1>Exercice Météo</h1>
        <h2>Lien pour récupérer les données météo d'une position via coordonnées GPS (longitude et latitude):<br><a href="https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY">https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY</a><br>(remplacer XXX par la latitude et YYY par la longitude)<br><br>PDF explicatif de l'API :<br>https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf</h2>
     
        <div class="but">
            <button>Récupérer coordonnées GPS</button>
        </div>

        <div class="todaysWeather">
    
        </div>
        
        
        <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
        <script src="js/script.js"></script>
    </body>
</html>