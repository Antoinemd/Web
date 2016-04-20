//template
// Pas de template html

// récupérer le CSS et l'agréger selon la règle du GulpFile
require("./menu.css");

// CONTROLLER
module.exports = function(moduleAngular) {

	// var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);
    var controllerMenu = function(proxyNF)   {

    }

    // Définition du type de controller
    //controllerMenu.$inject = [proxyNF];         // Injection de dépendances

    moduleAngular.component( "cabinetMenu", {   // pas de "-" dans le parametre
        //template    : template,
        bindings    : {
            titre    : "@"                          // pour indiquer que la source est du texte 
        },
        controller    : controllerMenu          // nom du controlleur
    });
};