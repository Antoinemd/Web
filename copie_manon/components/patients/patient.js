// Template HTML
var template = require("./patient.html");
var templateFormulaire = require("./formulairePatient.html");

require("./patient.css");
require("./formulairePatient.css");

// Définition du composant
module.exports = function (moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);

    var controllerPatients = function ($http, proxyNF, $mdDialog, $mdMedia) {

        var ctrl = this;

        // console.log("var controllerPatients = function ($http, proxyNF, $mdDialog, $mdMedia) {");
        // console.log("data");
        // console.log(this.data);

        ctrl.newPatient = {
            "patientNumber": "",
            "patientName": "",
            "patientForname": "",
            "patientSex": "",
            "patientBirthday": "",
            "patientFloor": "",
            "patientStreetNumber": "",
            "patientStreet": "",
            "postalCode": "",
            "patientCity": ""
        };

        ctrl.sexe = [{sexe: 'M'}, {sexe: 'F'}];

        ctrl.check = false; // a modifier ? supprimer ?
        ctrl.affecterInfirmier = {
            "patient": "",
            "infirmier": ""
        };


        this.test = function () {
            console.log("PATATE de patients");
            ctrl.testcabinet();
        }

        this.supprimer = function () {
            console.log("on delete un patient");
        }


        // Ajouter un nouveau patient
        this.submitPatient = function () {
            console.log(ctrl.newPatient);
            proxyNF.addNewPatient(ctrl.newPatient).then();
        }



        // Mettre  à jour les données infirmiers
        this.updateInfirmiers = function() {
            proxyNF.getData(this.src).then( function(cabinetJS) {
            ctrl.data = cabinetJS;
            console.log("CabinetMedical.js => mise à jour des données");
        });
        };

        this.submitInfirmier = function () {
            if (ctrl.affecterInfirmier.infirmier !== "") {
                ctrl.affecterInfirmier.patient = ctrl.newPatient.patientNumber;
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
            }
        };
        this.supprimerPatient = function(id) {
            var identifiant = {'patientNumber': id}
            var confirm = $mdDialog.confirm()
              .title('Voulez-vous définitivement supprimer ce patient?')
              .ariaLabel('Suppression patient')
              .ok('supprimer')
              .cancel('annuler');
            $mdDialog.show(confirm).then(function() {
                proxyNF.supprimerPatient(identifiant).then( function(){
                    ctrl.updateInfirmiers();
                });
            });
        }



    };

    


    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component("cabinetPatient", {
        'template': template,
        bindings: {
            data: "<"
        },
        'controller': controllerPatients
    });


    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component("cabinetNouveauPatient", {
        'template': templateFormulaire,
        bindings: {
            data: "<",
            // permet d'appeler la méthode dans le controleur du cabinetMedical
            onvalidation: "&"
        },
        'controller': controllerPatients
    });
}