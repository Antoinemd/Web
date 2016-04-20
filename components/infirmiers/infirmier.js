// /*  On définit dans ce fichier notre balise cabinetInfirmier*/

// /* récupérer le template et le stocker dans la variable template
//  stock le contenu de la page html en une chaine de caractères.*/
// var template = require("./infirmier.html");

// // récupérer le CSS et l'agréger selon la règle du GulpFile
// require("./infirmier.css");


// // CONTROLLER
// module.exports = function(moduleAngular) {

//     var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);
//     var controllerInfirmier = function(proxyNF)   {

//         // Cette fonction sera appelée pour instancier un cabinet
//         var self = this;
//         proxyNF.getData( this.src ).then( function(cabinetJS) {
//             self.inf = cabinetJS.infirmiers;
//             self.patNonAff = cabinetJS.patientsNonAffectes;
//         });
//     }

// // Définition du type de controller
//     controllerInfirmier.$inject = [proxyNF];         // Injection de dépendances

//     moduleAngular.component( "cabinetInfirmier", {   // pas de "-" dans le parametre
//         template    : template,
//         bindings    : {
//             titre    : "@",                          // pour indiquer que la source est du texte 
//             src      : "@"  
//         },
//         controller    : controllerInfirmier          // nom du controlleur
//     });
// };




// // require("./infirmier.css");
// // var template = require("./infirmier.html");
// // var controller = function(proxyNF){
// //     //...
// // }
// // module.exports = function(angularModule){
// //     angularModule.component("infirmier", {
// //         controller : controller,
// //         template : template,
// //         // balise data qui contient un objet "<"
// //         bindings : {data : "<"}
// //     });
// // }

