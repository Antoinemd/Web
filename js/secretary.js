
// feuille de style principale
require("./secretary.css");

// chargement d'angular et angularMaterials
var angular = require("angular");
var angularMaterial = require("angular-material");

require( "angular-material/angular-material.css" );

// on créer un module "cabinet" qui va agréger toutes les fonctinnalités déclarées dans angularMaterial
// angularMaterial a déjà pleins de balises prédéfinies

// créer un module d'affichage des patients
var modAng = angular.module("cabinet",[angularMaterial]);
// require("../components/infirmiers/infirmier.js")(modAng);

// require("../components/menu/menu.js")(modAng);
require("../components/cabinetMedical/cabinetMedical.js")(modAng);
// require("../components/patients/patient.js")(modAng);

