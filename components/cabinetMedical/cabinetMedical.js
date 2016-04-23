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

            // ctrl.inf = cabinetJS.infirmiers;
            // ctrl.patNonAff = cabinetJS.patientsNonAffectes;
            ctrl.data = cabinetJS;

         
        });

        // Mettre à jour les données
        this.updateInfirmiers = function() {
            proxyNF.getData(this.src).then( function(cabinetJS) {
            ctrl.data = cabinetJS;
            console.log("CabinetMedical.js => mise à jour des données");
        });
        };


        this.affectectationPatient = function($data) {
            ctrl.affecterInfirmier ={
                "patient": $data,
                "infirmier": ctrl.ongletInfirmierActif
            }
            proxyNF.affecterPatient(ctrl.affecterInfirmier).then(
                function(){
                    console.log("cabinetMedical.js => drop de patient !");
                    ctrl.updateInfirmiers();
                });
        }


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
            src: "@",

        },
        controller: controllerCabinetMedical
    });
};
