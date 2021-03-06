// Utilisation de $http pour charger le XML
var ProxyNF = function($http) {             

    console.log("le service proxyNF est istancié."); 
    
    /*  on a getData qui est une methode de proxyNF cette methode attends une promise 
        et elle instancie et renvoie l'objet cabinetJS (resultat du traitement)
    */
    this.getData = function(src){

        return $http.get(src).then(processData);
    }

    function processData(response){

        require( "./secretary.css" );

        // Déclaration de notre objet cabinetJS
        var cabinetJS = { patientsNonAffectes : [],
                          patientsAffectes : [],
                          infirmiers : {}
                        };




        var parser = new DOMParser();

        //retourne une liste de Node
        var doc = parser.parseFromString(response.data, "text/xml");

        //transforme infirmiersXML en tableau, pour permettre le parcours du forEach
        var infirmiersXML = Array.prototype.slice.apply(doc.querySelectorAll("infirmier"), []);
        var patientsXML = Array.prototype.slice.apply(doc.querySelectorAll("patient"),[]);

        //passer en argument la fonction à appliquer à chq infirmier
        //construction du tableau d'objets "infirmiers"
        infirmiersXML.forEach(function(infirmierXML) {
            cabinetJS.infirmiers[infirmierXML.getAttribute("id")] = {
                name:   infirmierXML.querySelector("nom").textContent,
                prenom: infirmierXML.querySelector("prenom").textContent,
                photo:  infirmierXML.querySelector("photo").textContent,
                idInfirmier: infirmierXML.getAttribute("id"),
                patients :[]
            }
        });

        // Traitement 
        patientsXML.forEach(function(patientXML){        

            // var tmp;        
            var pat =  {
                name:       patientXML.querySelector("nom").textContent,
                prenom:     patientXML.querySelector("prenom").textContent,
                sexe:       patientXML.querySelector("sexe").textContent,
                naiss:      patientXML.querySelector("naissance").textContent,
                id:         patientXML.querySelector("numero").textContent,
                

                adresse:    {
                    // etage:  (tmp=patientXML.querySelector("adresse>etage").textContent) !== null ? tmp : "n/a",
                    // numero: (tmp=patientXML.querySelector("adresse>numero").textContent) !== null ? tmp : "n/a",
                    rue:    patientXML.querySelector("adresse>rue").textContent,
                    ville:  patientXML.querySelector("adresse>ville").textContent,
                    cp:     patientXML.querySelector("adresse>codePostal").textContent
                },
                // renseigne sur l'ID de infirmier qui s'occupe du patient, si null: le patient "n'appartient" à aucune infirmier: il n'a pas subi d'intervention !
                inf:    patientXML.querySelector("visite").getAttribute("intervenant")
            };

            var numIntervenant = patientXML.querySelector("visite");

            if(numIntervenant===null){
                cabinetJS.patientsNonAffectes.push(pat);
            } else {

                var id = numIntervenant.getAttribute("intervenant");

                if(typeof cabinetJS.infirmiers[id] !== "undefined"){
                    cabinetJS.infirmiers[id].patients.push(pat);
                } else {
                    cabinetJS.patientsNonAffectes.push(pat);
                }
            }
           
        }); // fin de patientsXML

        return cabinetJS;
    }   // fin de processData

    // Ajoute dans le XML un nouveau patient
    this.addNewPatient = function(newPatient){
        return $http({
            method: 'POST',
            url: "/addPatient",
            data: newPatient,
            header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            // success callback
            function successCallback(response){
                console.log("Noyau Fonctionnel: Nouveau patient ajouté => OK", response);
                },
            // error callback
            function errorCallback(response){
                console.log("Noyau Fonctionnel: Patient non ajouté => Erreur", response);
                }
            );
        };

        

    // Affecte à un patient un id d'infirmier
    this.affecterPatient = function(affecterInfirmier) {
        return $http({
            method: 'POST',
            url: "/affectation",
            data: affecterInfirmier
        }).then(
            function successCallback(response) {
                console.log("Noyau Fonctionnel: Affectation succeed => OK", response);
            },
            function errorCallback(response) {
                console.log("proxy.js => Affectation failed", response);
            }
        );
    }





};  // fin de proxyNF

ProxyNF.$inject = ["$http"]; // Injection de dépendances

/**
 * Attend un module en parametre puis créé un NF si nécéssaire et
 *  l'enregistre comme service dans le module
 * @param {type} mod
 * @returns {module.exports.id|String}
 */

 // sert à créer un servvice que l'on peut appeler de n'importe quel autre fichier
module.exports = function (modAng) {
    var id = "proxyNF"; // identifiant de service

    // enregistre la fonction ci-dessus comme service avec comme id proxyNF
    modAng.service(id, ProxyNF);

    return id;

    // dans le fichier à appeler
};