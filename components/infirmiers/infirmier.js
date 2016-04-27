// Template HTML
var template = require( "./infirmier.html" );
require( "./infirmier.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require("../../js/noyauFonctionnel.js")(moduleAngular);

    var ctrlInfirmiers = function( ) {

    }
    // balise <cabinet-infirmier>
    moduleAngular.component( "cabinetInfirmier", {
        'template'    : template,
        bindings    : {
            data    : "<"
        },
        controller    : ctrlInfirmiers
    })
}