// Voeg een event listener toe aan de knop voor het toevoegen van een nieuw wachtwoord
document.getElementById("submit--btn").addEventListener("click", addPassword);

// Voeg een event listener toe aan de knop voor het tonen of verbergen van alle wachtwoorden
document.getElementsByClassName("toonAlles__btn")[0].addEventListener("click", toggleAllPasswords);

// Voeg een event listener toe aan de knop voor het wisselen van de volgorde van artikelen
document.getElementById("js--fab").addEventListener("click", toggleArticles);

var allPasswordsVisible = false; // Houdt bij of alle wachtwoorden momenteel zichtbaar zijn
var articles = document.getElementsByClassName("passManager"); // Haal alle artikelen op
var isReversed = false; // Houdt bij of de volgorde van artikelen omgekeerd is

// Functie om de volgorde van artikelen te wisselen
function toggleArticles() {
    if (articles.length > 1) {
        var parent = articles[0].parentNode;

        // Verwissel de artikelen in de DOM
        if (isReversed) {
            // Zet het eerste artikel weer voor het tweede in de normale volgorde
            parent.insertBefore(articles[0], articles[1]);
        } else {
            // Zet het tweede artikel voor het eerste in de omgekeerde volgorde
            isReversed = true;
            parent.insertBefore(articles[1], articles[0]);
        }

        // Toggle de vlag om bij te houden of de volgorde is omgekeerd
        isReversed = !isReversed;
    }
}

// Functie om een nieuw wachtwoord toe te voegen
function addPassword() {
    var urlName = document.getElementById("urlInput").value; // Verkrijg de URL-invoer
    var password = document.getElementById("passwordInput").value; // Verkrijg de wachtwoordinvoer

    // Controleer of beide velden zijn ingevuld
    if (urlName && password) {
        // Maak een nieuw lijstitem aan
        var listItem = document.createElement("li");

        // Maak een koptekst aan voor de URL
        var urlText = document.createElement("h2");
        urlText.classList.add("url");
        urlText.innerText = urlName;

        // Maak een container voor de wachtwoordknoppen en -tekst
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("passList__div");

        // Maak een paragraaf aan voor het wachtwoord met verstopte tekst
        var passwordText = document.createElement("p");
        passwordText.classList.add("password");
        passwordText.innerText = "•".repeat(password.length); // Het wachtwoord met bolletjes
        passwordText.setAttribute("data-password", password); // Sla het originele wachtwoord op in een data-attribuut

        // Maak een knop om het wachtwoord te tonen
        var showButton = document.createElement("button");
        showButton.classList.add("toon__Btn");
        showButton.innerText = "Toon";
        showButton.addEventListener("click", function () {
            togglePasswordVisibility(passwordText, showButton); // Voeg de functionaliteit toe om het wachtwoord te tonen of te verbergen
        });

        // Maak een knop om het wachtwoord te verwijderen
        var removeButton = document.createElement("button");
        removeButton.classList.add("verwijder__Btn");
        removeButton.innerText = "Verwijder";
        removeButton.addEventListener("click", function () {
            document.getElementById("passwordList").removeChild(listItem); // Verwijder het item uit de lijst
        });

        // Voeg alle elementen samen in het lijstitem
        buttonContainer.appendChild(passwordText);
        buttonContainer.appendChild(showButton);
        buttonContainer.appendChild(removeButton);
        listItem.appendChild(urlText);
        listItem.appendChild(buttonContainer);

        // Voeg het nieuwe lijstitem toe aan de wachtwoordenlijst
        document.getElementById("passwordList").appendChild(listItem);

        // Leeg de invoervelden voor een nieuwe invoer
        document.getElementById("urlInput").value = '';
        document.getElementById("passwordInput").value = '';
    } else {
        alert("Vul alstublieft beide velden in."); // Toon een waarschuwing als de velden niet zijn ingevuld
    }
}

// Functie om de zichtbaarheid van een enkel wachtwoord te wisselen
function togglePasswordVisibility(passwordText, showButton) {
    var originalPassword = passwordText.getAttribute("data-password"); // Verkrijg het originele wachtwoord uit het data-attribuut

    // Controleer of het wachtwoord momenteel gemaskeerd is
    if (passwordText.innerText === "•".repeat(originalPassword.length)) {
        passwordText.innerText = originalPassword; // Toon het originele wachtwoord
        showButton.innerText = "Verberg"; // Verander de knoptekst naar "Verberg"
    } else {
        passwordText.innerText = "•".repeat(originalPassword.length); // verstop wachtwoord opnieuw
        showButton.innerText = "Toon"; // Zet de knoptekst terug naar "Toon"
    }
}

// Functie om de zichtbaarheid van alle wachtwoorden te wisselen
function toggleAllPasswords() {
    var passwordItems = document.getElementsByClassName("password"); // Verkrijg alle wachtwoord-items
    var showButtons = document.getElementsByClassName("toon__Btn"); // Verkrijg alle toon-knoppen

    // Loop door elk wachtwoord-item en wijzig de zichtbaarheid
    for (var i = 0; i < passwordItems.length; i++) {
        var passwordItem = passwordItems[i];
        var originalPassword = passwordItem.getAttribute("data-password"); // Verkrijg het originele wachtwoord

        if (allPasswordsVisible) {
            passwordItem.innerText = "•".repeat(originalPassword.length); // Verberg alle wachtwoorden
            showButtons[i].innerText = "Toon"; // Zet alle knoppen terug naar "Toon"
        } else {
            passwordItem.innerText = originalPassword; // Toon alle wachtwoorden
            showButtons[i].innerText = "Verberg"; // Zet alle knoppen naar "Verberg"
        }
    }

    // Toggle de zichtbaarheid vlag
    allPasswordsVisible = !allPasswordsVisible;

    // Verander de knoptekst van de "Toon Alles" knop op basis van de huidige staat
    document.getElementsByClassName("toonAlles__btn")[0].innerText = allPasswordsVisible ? "Verberg Alles" : "Toon Alles";
}

// Initialiseer het standaard wachtwoord bij het laden van de pagina
function initializeDefaultPassword() {
    var defaultPasswordText = document.getElementById("passwordList").getElementsByClassName("password")[0]; // Verkrijg de wachtwoordtekst van het eerste item
    var defaultShowButton = document.getElementById("passwordList").getElementsByClassName("toon__Btn")[0]; // Verkrijg de toon-knop van het eerste item

    // Verstop het standaard wachtwoord
    defaultPasswordText.innerText = "•".repeat(defaultPasswordText.innerText.length);
    defaultPasswordText.setAttribute("data-password", "M0oiWw"); // Sla het originele wachtwoord op in een attribuut

    // Voeg de toggle-functionaliteit toe aan de standaard knop
    defaultShowButton.addEventListener("click", function () {
        togglePasswordVisibility(defaultPasswordText, defaultShowButton); // Voeg de functionaliteit toe om het wachtwoord te tonen of te verbergen
    });

    // Voeg de verwijder-functionaliteit toe aan de standaard knop
    var defaultRemoveButton = document.getElementById("passwordList").getElementsByClassName("verwijder__Btn")[0];
    defaultRemoveButton.addEventListener("click", function () {
        document.getElementById("passwordList").removeChild(document.getElementById("passwordList").getElementsByTagName("li")[0]); // Verwijder het eerste item uit de wachtwoordenlijst
    });
}

// Initialiseer het standaard wachtwoord bij het laden van de pagina
initializeDefaultPassword();
