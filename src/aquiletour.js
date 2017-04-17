// Fonction qui en fonction de la date, dit à qui c'est de vider les
// poubelles :D

exports.aQuiLeTour = function (etage, date) {
    const debut = date - 1491177600; // on passe de Unix au nb de secondes depuis le 3 avril 2017
    const semaine = parseInt(debut / 604800); // on passe aux nombres de semaines s'étant écoulées depuis
    const tour = (semaine % 11) + 4;
    return [etage[tour * 2], etage[tour * 2 + 1]]
};