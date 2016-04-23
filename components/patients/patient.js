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

        ctrl.check = false; 


        ctrl.affecterInfirmier = {
            "patient": "",
            "infirmier": ""
        };

        // console.log(ctrl.affecterInfirmier());


        // Ajouter un nouveau patient
        this.submitPatient = function () {
            console.log(ctrl.newPatient);
            proxyNF.addNewPatient(ctrl.newPatient).then( function(){
                ctrl.onValidation();
                alert('Patient créé ! Press F5');
            });
        }





        this.submitInfirmier = function () {
            if (ctrl.affecterInfirmier.infirmier !== "") {
                ctrl.affecterInfirmier.patient = ctrl.newPatient.patientNumber;
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
            }
        };


        // Remettre à "undefined" la valeur des champs du bloque assignation infirmier
        this.clearValue = function() {;
            console.log("raz des champs");
            ctrl.myModel = undefined;
        };


        // Prends la valeur des id patients & infirmier passé par le ng-model a la méthode affecterInfirmier
        this.assignerInfirmier = function () {
            
            
            if(ctrl.affecterInfirmier.infirmier!=="" && ctrl.affecterInfirmier.patient!=="") {

                // donner l'id du patient selectionné
                console.log("donnée envoyées au serveur:",ctrl.affecterInfirmier);

                // ctrl.affecterInfirmier.patient = ctrl.nouveauPatient.patientNumber;
               
                proxyNF.affecterPatient(ctrl.affecterInfirmier).then(function(){
                    
                    ctrl.onValidation();
                    alert('Patient Affecté ! Press F5');
                    });
                }
            
        };

            // Pas implémenté sur le serveur
        this.supprimerPatient = function(id) {
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

          // this.clearValue = function() {
          //   ctrl.myModel = undefined;
          //   };

            
    };

    


    //Construire une balise <cabinet-patient>
    moduleAngular.component("cabinetPatient", {
        'template': template,
        bindings: {
            data: "<",
            onValidation:"&"
        },
        'controller': controllerPatients
    });


    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component("cabinetNouveauPatient", {
        'template': templateFormulaire,
        bindings: {
            data: "<",
            // permet d'appeler une méthode dans patient.js depuis un autre controlleur
        },
        'controller': controllerPatients
    });
}