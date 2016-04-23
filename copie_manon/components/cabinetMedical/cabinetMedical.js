/*  On définit dans ce fichier notre balise cabinetMedical*/

/* récupérer le template et le stocker dans la variable template
 stock le contenu de la page html en une chaine de caractères.*/
var template = require("./cabinetMedical.html");


// récupérer le CSS et l'agréger selon la règle du GulpFile
require("./cabinetMedical.css");


// CONTROLLER
module.exports = function (moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);
    var controllerCabinetMedical = function (proxyNF) {

        // Cette fonction sera appelée pour instancier un cabinet
        var ctrl = this;
        proxyNF.getData(this.src).then(function (cabinetJS) {

            ctrl.inf = cabinetJS.infirmiers;
            ctrl.patNonAff = cabinetJS.patientsNonAffectes;
            ctrl.data = cabinetJS;

            // console.log("ctrl.inf");
            // console.log(ctrl.inf);
            // console.log("ctrl.patNonAff");
            // console.log(ctrl.patNonAff);
        });


        


        this.test = function () {
            console.log("PATATE de cabinet");
        }

    }


    


    require("../menu/menu.js")(moduleAngular);
    require("../patients/patient.js")(moduleAngular);

    // Définition du type de controller
    controllerCabinetMedical.$inject = [proxyNF];         // Injection de dépendances

    moduleAngular.component("cabinetMedical", { // pas de "-" dans le parametre
        template: template,
        bindings: {
            titre: "@", // pour indiquer que la source est du texte 
            src: "@"
        },
        controller: controllerCabinetMedical
    });
};
