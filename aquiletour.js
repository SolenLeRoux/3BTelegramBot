// Fonction qui en fonction de la date, dit à qui c'est de vider les
// poubelles :D

var etage = [
    ["B301", "Stepan"],
    ["B302", "Arnaud"],
    ["B303", "Haoliang"],
    ["B304", "Jiayi"],
    ["B305", "Guillaume"],
    ["B306", "Antoine"],
    ["B307", "Shoulong"],
    ["B308", "Yusu"],
    ["B309", "Raymond"],
    ["B310", "Edmond"],
    ["B311", "Vincent"],
    ["B312", "David"],
    ["B313", "Tatiana"],
    ["B314", "Owain"],
    ["B315", "Gaëlle"],
    ["B316", "Younes"],
    ["B317", "Solen"],
    ["B318", "Samy"],
    ["B319", "Gabriel"],
    ["B320", "Côme"],
    ["B321", "Maxime"],
    ["B322", "Kylian"],
    ["B323", "Martin"],
    ["B324", "Guillaume"]
];

exports.aQuiLeTour = function (date) {
    var debut = date - 1491177600; // on passe de Unix au nb de secondes depuis le 3 avril 2017
    var semaine = parseInt(debut / 604800); // on passe aux nombres de semaines s'étant écoulées depuis
    var tour = (semaine % 11) + 4;
    return [etage[tour * 2], etage[tour * 2 + 1]]
};