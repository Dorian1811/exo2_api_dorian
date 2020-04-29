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
        </style>
    </head>
    <body>


        <h1>Exercice Météo</h1>
        <h2>Lien pour récupérer les données météo d'une position via coordonnées GPS (longitude et latitude):<br><a href="https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY">https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY</a><br>(remplacer XXX par la latitude et YYY par la longitude)<br><br>PDF explicatif de l'API :<br><a href="https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf">https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf</h2>
     
        <div class="but">
            <button>Récupérer coordonnées GPS</button>
        </div>

        
        <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
        <script src="js/script.js"></script>
    </body>
</html>