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


        this.save = function() {
            alert('Infirmier affecté !');
        };


        this.supprimer = function () {
            console.log("on delete un patient");
        }

        this.test = function(vartest){
            console.log("fonction de test:");
            console.log(vartest);
        }


        // Ajouter un nouveau patient  
        this.submitPatient = function(){
            console.log(ctrl.addNewPatient);
            proxyNF.addNewPatient(ctrl.addNewPatient).then(
                function(){
                    console.log("patient.js => test d'affectation");
                    // ctrl.onValidation();
                });
            // if(ctrl.check == true && ctrl.affecterInfirmier.infirmier!=="") {
            //     ctrl.affecterInfirmier.patient = ctrl.addNewPatient.patientNumber;
            //     proxyNF.affecterPatient(ctrl.affecterInfirmier).then(
            //     function(){
            //         console.log("patient.js => test d'affectation");
            //         console.log(ctrl.onValidation);
            //         ctrl.onValidation();
            //     });
            // }

        };



        // Mettre  à jour les données infirmiers
        this.updateInfirmiers = function() {
            proxyNF.getData(this.src).then( function(cabinetJS) {
            ctrl.data = cabinetJS;
            console.log("CabinetMedical.js => maj data terminées    ");
        });
        };


        this.assignerInfirmier = function () {
            if (ctrl.affecterInfirmier.infirmier !== "") {

                // donner l'id du patient selectionné
                ctrl.affecterInfirmier.patient = ctrl.newPatient.patientNumber; // 
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
            }
        };
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
            this.save = function() {
                alert('Form was valid!');
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
            // permet d'appeler la méthode dans le controleur du cabinetMedical
            onValidation: "&"
        },
        'controller': controllerPatients
    });
}