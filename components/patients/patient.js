// Template HTML
var template = require( "./patient.html" );
var templateFormulaire = require("./formulairePatient.html");
var templatePatNonAff = require("./patientnonaff.html");

require( "./patient.css" );
require("./formulairePatient.css");

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);

    var controllerPatients = function( $http, proxyNF, $mdDialog, $mdMedia) {

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

        ctrl.check = false; // a modifier ? supprimer ?
        ctrl.affecterInfirmier = {
            "patient": "",
            "infirmier": ""
        };



        this.test = function(){
            console.log("PATATE de patients");
        }

        // Ajouter un nouveau patient
        this.submitPatient = function(){
            console.log(ctrl.newPatient);
            proxyNF.addNewPatient(ctrl.newPatient);
            }
        };

        this.submitInfirmier = function(){

            console.log("dsfkljfsdjf");

            if(ctrl.affecterInfirmier.infirmier!=="") {
                ctrl.affecterInfirmier.patient = ctrl.newPatient.patientNumber;
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
        }
      };


    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component( "cabinetPatient", {
        'template'    : template,
        bindings    : {
            data: "<"
        },
        'controller'    : controllerPatients
    });



    //Construire une balise <cabinet-nouveau-patient>
    moduleAngular.component( "cabinetNouveauPatient", {
        'template'    : templateFormulaire,
        bindings    : {
            data: "<"
        },
        'controller'    : controllerPatients
    });
}