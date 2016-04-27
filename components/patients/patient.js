// Template HTML
var template = require("./patient.html");
var templateFormulaire = require("./formulairePatient.html");

require("./patient.css");
require("./formulairePatient.css");

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);

    var controllerPatients = function($http, proxyNF, $mdDialog, $mdMedia) {

        var ctrl = this;

        // variable pour montrer / cacher un élément
        ctrl.show = false; 


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

        ctrl.sexe = [{
            sexe: 'M'
        }, {
            sexe: 'F'
        }];

        ctrl.affecterInfirmier = {
            "patient": "",
            "infirmier": ""
        };


        // Ajouter un nouveau patient
        ctrl.submitPatient = function() {
            console.log(ctrl.newPatient);
            proxyNF.addNewPatient(ctrl.newPatient).then(function() {
                ctrl.onValidation();
                alert('Patient créé !');
            });
        }

        // Prends la valeur des id patients & infirmier passé par le ng-model a la méthode affecterInfirmier
        ctrl.assignerInfirmier = function() {

            if (ctrl.affecterInfirmier.infirmier !== "" && ctrl.affecterInfirmier.patient !== "") {

                // donner l'id du patient selectionné
                console.log("donnée envoyées au serveur:", ctrl.affecterInfirmier);

                proxyNF.affecterPatient(ctrl.affecterInfirmier).then(function() {
                    ctrl.onValidation();
                    alert('Patient Affecté !');
                    // Remettre à "undefinied" après affectation
                    clearValue(); 
                });
            }

        };



        // Pas implémenté sur le serveur
        ctrl.supprimerPatient = function(id) {
            console.log("patient supprimé");
            // var identifiant = {'patientNumber': id}
            // var confirm = $mdDialog.confirm()
            //   .title('Voulez-vous définitivement supprimer ce patient?')
            //   .ariaLabel('Suppression patient')
            //   .ok('supprimer')
            //   .cancel('annuler');
            // $mdDialog.show(confirm).then(function() {
            //     proxyNF.supprimerPatient(identifiant).then( function(){
            //         ctrl.updateInfirmiers();
            //     });
            // });
        }


        // Remettre à "undefined" la valeur des champs du bloque assignation infirmier
        ctrl.clearValue = function() {

            console.log("ctrl.clearValue = function() {");

            ctrl.affecterInfirmier.infirmier = undefined;
            ctrl.affecterInfirmier.patient = undefined;

        };


    };

    //Construire une balise <cabinet-patient>
    moduleAngular.component("cabinetPatient", {
        'template': template,
        bindings: {
            data: "<",
            onValidation: "&"
        },
        'controller': controllerPatients
    });

    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component("cabinetNouveauPatient", {
        'template': templateFormulaire,
        bindings: {
            data: "<",
            // permet d'appeler une méthode dans patient.js depuis un autre controlleur
            onValidation: "&"
        },
        'controller': controllerPatients
    });
}
