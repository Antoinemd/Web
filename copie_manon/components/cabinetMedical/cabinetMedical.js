/*  On définit dans ce fichier notre balise cabinetMedical*/

/* récupérer le template et le stocker dans la variable template
 stock le contenu de la page html en une chaine de caractères.*/
var template = require("./cabinetMedical.html");


// récupérer le CSS et l'agréger selon la règle du GulpFile
require("./cabinetMedical.css");


// CONTROLLER
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);
    var controllerCabinetMedical = function(proxyNF)   {

        // Cette fonction sera appelée pour instancier un cabinet
        var self = this;
        proxyNF.getData( this.src ).then( function(cabinetJS) {
            self.inf = cabinetJS.infirmiers;
        });
    }

    // Définition du type de controller
    controllerCabinetMedical.$inject = [proxyNF];         // Injection de dépendances

    moduleAngular.component( "cabinetMedical", { // pas de "-" dans le parametre
        template    : template,
        bindings    : {
            titre    : "@", // pour indiquer que la source est du texte 
            src      : "@"
        },
        controller    : controllerCabinetMedical
    });
};
