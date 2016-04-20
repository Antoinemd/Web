// Template HTML
var template = require( "./patient.html" );
var templateFormulaire = require("./formulairePatient.html");
require( "./patient.css" );
require("./formulairePatient.css");

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);

    var controllerPatients = function( $http, proxyNF, $mdDialog/*, $mdMedia*/) {

        var ctrl=this;


        ctrl.newPatient = {
            "patientNumber": "",
            "patientName": "",
            "patientForname":"",
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



        this.submitPatient = function(){
            console.log(ctrl.newPatient);
            proxyNF.addNewPatient(ctrl.newPatient);
            if(ctrl.check == true && ctrl.affecterInfirmier.infirmier!=="") {
                ctrl.affecterInfirmier.patient = ctrl.newPatient.patientNumber;
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
            }
        };

            // boite dialogue 
     ctrl.showAlert = function(ev) {
           var existePatient = false;

           ctrl.data.objectPatients.forEach(function(patient){
                console.log(patient.id);
                if(patient.id == ctrl.newPatient.patientNumber) {
                    existePatient = true;
                }
           });
           if (!existePatient){
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Information')
                    .textContent(ctrl.newPatient.patientForname +' '+ctrl.newPatient.patientName+ ' a été ajouté avec succès aux patients')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Retour!')
                    .targetEvent(ev)
                    );
            console.log("salut");

            }else{
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Alerte')
                    .textContent("Le patient \" " + ctrl.newPatient.patientForname +' '+ctrl.newPatient.patientName+' \" est déjà enregistré(e)')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Retour!')
                    .targetEvent(ev)
                    );
          };
      };
  };

    // Construire une balise <cabinet-patient>
    // moduleAngular.component( "cabinetPatient", {
    //     'template'    : template,   // nom de la variable template.
    //     bindings    : {
    //         data: "<",  // type: données
    //     },
    //     'controller'    : controllerPatients
    // });

    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component( "cabinetNouveauPatient", {
        'template'    : templateFormulaire,
        bindings    : {
            data: "<"
        },
        'controller'    : controllerPatients
    });
}