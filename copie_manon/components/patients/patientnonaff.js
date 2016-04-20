/*  On définit dans ce fichier notre balise cabinetMedical*/

/* récupérer le template et le stocker dans la variable template
 stock le contenu de la page html en une chaine de caractères.*/
var template = require("./patientnonaff.html");

// récupérer le CSS et l'agréger selon la règle du GulpFile
// require("./cabinetMedical.css");


// CONTROLLER
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);
    var ctrlPatientNonAff = function(proxyNF)   {

        // Cette fonction sera appelée pour instancier un cabinet
        var self = this;
        console.log("ouaiche ");
        proxyNF.getData(this.src).then( function(cabinetJS) {
            
            self.patNonAff = cabinetJS.patientsNonAffectes;
            console.log(self.patNonAff);
        });
    }

    // Définition du type de controller
    ctrlPatientNonAff.$inject = [proxyNF];         // Injection de dépendances

    moduleAngular.component( "cabinetPatientna", { // pas de "-" dans le parametre
        template    : template,
        bindings    : {
            titre    : "@", // pour indiquer que la source est du texte 
            src      : "@"
        },
        controller    : ctrlPatientNonAff
    });
};
