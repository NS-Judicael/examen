let expression = "";

// CHIFFRES
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

// OPERATEURS
function addition(){ ajouter("+"); }
function soustraire(){ ajouter("-"); }
function multiplier(){ ajouter("*"); }
function diviser(){ ajouter("/"); }
function virgule(){ ajouter("."); }

// AJOUT
function ajouter(val) {

    let last = expression[expression.length - 1];

    if ((val == "+" || val == "-" || val == "*" || val == "/") &&
        (last == "+" || last == "-" || last == "*" || last == "/")) {
        return;
    }

    expression += val;

    document.getElementById("operation").innerText = expression;
}

// AC
function effacer() {
    expression = "";
    document.getElementById("operation").innerText = "";
    document.getElementById("resultat").innerText = "0";
}

// DEL
function supprimer() {
    expression = expression.substring(0, expression.length - 1);
    document.getElementById("operation").innerText = expression;
}

// %
function pourcentage() {
    expression = (parseFloat(expression) / 100).toString();
    document.getElementById("resultat").innerText = expression;
}

// CALCUL
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
                        alert("Erreur division par 0");
                        return;
                    }
                    resultat /= num;
                    break;
            }

            operateur = c;
            nombre = "";
        }
    }

    document.getElementById("resultat").innerText = resultat;

    sauvegarder(expression + " = " + resultat);

    expression = resultat.toString();
}

// LOCAL STORAGE (JSON + limite 50)
function sauvegarder(calc) {

    let hist = localStorage.getItem("hist");
    let tab = [];

    if (hist != null) {
        tab = JSON.parse(hist);
    }

    tab.push(calc);

    if (tab.length > 50) {
        tab.splice(0, 1);
    }

    localStorage.setItem("hist", JSON.stringify(tab));

    afficherHistorique();
}

// AFFICHAGE
function afficherHistorique() {

    let hist = localStorage.getItem("hist");

    if (hist == null) return;

    let tab = JSON.parse(hist);

    let html = "";

    for (let i = 0; i < tab.length; i++) {
        html += "<p>" + tab[i] + "</p>";
    }

    document.getElementById("liste").innerHTML = html;
}

afficherHistorique();