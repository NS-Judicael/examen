let expression = "";

// fonction pour les bouton CHIFFRES
function appuyer0(){ ajouter("0"); }
function appuyer1(){ ajouter("1"); }
function appuyer2(){ ajouter("2"); }
function appuyer3(){ ajouter("3"); }
function appuyer4(){ ajouter("4"); }
function appuyer5(){ ajouter("5"); }
function appuyer6(){ ajouter("6"); }
function appuyer7(){ ajouter("7"); }
function appuyer8(){ ajouter("8"); }
function appuyer9(){ ajouter("9"); }

//fonction pour les bouton OPERATEURS
function addition(){ ajouter("+"); }
function soustraire(){ ajouter("-"); }
function multiplier(){ ajouter("*"); }
function diviser(){ ajouter("/"); }
function virgule(){ ajouter("."); }

// fonction pour AJOUTER le valeur du boutton cliquer a l'expression
function ajouter(valeur) {

    let dernier = expression[expression.length - 1];

    if ((valeur == "+" || valeur == "-" || valeur == "*" || valeur == "/") &&
        (dernier == "+" || dernier == "-" || dernier == "*" || dernier == "/")) {
        return;
    }

    expression += valeur;

    document.getElementById("operation").innerHTML = expression;
}

// fonction pour le bouton AC
function effacer() {
    expression = "";
    document.getElementById("operation").innerHTML = "";
    document.getElementById("resultat").innerHTML = "0";
}

//fonction pour le bouton DEL
function supprimer() {
    expression = expression.substring(0, expression.length - 1);
    document.getElementById("operation").innerHTML = expression;
}

//fonction pour le boutton %
function pourcentage() {
    expression = (parseFloat(expression) / 100).toString();
    document.getElementById("resultat").innerHTML = expression;
}

//fonction pour le boutton = et enregistrement dans historique
function egal() {

    let resultat = 0;
    let nombre = "";
    let operateur = "+";

    for (let i = 0; i < expression.length; i++) {

        let c = expression[i];

        if ((c >= '0' && c <= '9') || c == '.') {
            nombre += c;
        }

        if (c == "+" || c == "-" || c == "*" || c == "/" || i == expression.length - 1) {

            let num = parseFloat(nombre);

            switch (operateur) {

                case "+":
                    resultat += num;
                    break;

                case "-":
                    resultat -= num;
                    break;

                case "*":
                    resultat *= num;
                    break;

                case "/":
                    if (num == 0) {
                        document.getElementById("resultat").innerHTML = "ERREUR";
                        expression= " ";
                        return;
                    }
                    resultat /= num;
                    break;
            }

            operateur = c;
            nombre = "";
        }
    }

    //affiche ERREUR au lieu de NAN
    if (isNaN(resultat)){
        document.getElementById("resultat").innerHTML="ERREUR";
        return;
    }

    document.getElementById("resultat").innerHTML = resultat;

    sauvegarder(expression + " = " + resultat);

    expression = resultat + "";
}

// fonction pour sauvegarder les calcul 
function sauvegarder(valiny) {

    let historique = localStorage.getItem("historique");
    let stock = [];

    if (historique != null) {
        stock = JSON.parse(historique);
    }

    stock.push(valiny);

    if (stock.length > 50) {
        stock.splice(0, 1);
    }

    localStorage.setItem("historique", JSON.stringify(stock));

    afficherHistorique();
}

// fonction pour AFFICHAGE des Historique
function afficherHistorique() {

    let historique = localStorage.getItem("historique");

    if (historique == null) return;

    let stock = JSON.parse(historique);

    let affichage = "";

    for (let i = 0; i < stock.length; i++) {
        affichage += "<p>" + stock[i] + "</p>";
    }

    document.getElementById("liste").innerHTML = affichage;
}

// fonction pour vider les Historique
function viderHistorique (){
    localStorage.removeItem("historique");
    document.getElementById("liste").innerHTML=" ";
}
afficherHistorique();


