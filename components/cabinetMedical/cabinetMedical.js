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
        
        var ctrl = this;

        proxyNF.getData(this.src).then(function (cabinetJS) {
            ctrl.data = cabinetJS;         
        });


        // Mettre à jour les données
        this.updateInfirmiers = function() {
            proxyNF.getData(this.src).then( function(cabinetJS) {
            ctrl.data = cabinetJS;

            console.log(ctrl.data);
            console.log(cabinetJS);
            console.log("CabinetMedical.js => Données mises à jour !");
        });
        };


        this.test = function () {
            console.log("PATATE de cabinet");
        }

    }


    require("../menu/menu.js")(moduleAngular);
    require("../patients/patient.js")(moduleAngular);
    require("../infirmiers/infirmier.js")(moduleAngular);

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
