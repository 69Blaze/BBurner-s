// countdown.js - Odpočet do 1. září 2025 s evropskou časovou synchronizací

// Funkce pro inicializaci odpočtu
function initializeCountdown() {
    // Nastavení cílového data - pondělí 1. září 2025 v evropském časovém pásmu (CEST/CET)
    const targetDate = new Date('2025-09-01T00:00:00+02:00'); // CEST (UTC+2)
    
    // Spuštění odpočtu
    startCountdown(targetDate);
}

// Funkce pro odpočet
function startCountdown(targetDate) {
    function updateCountdown() {
        // Získání aktuálního času s ohledem na evropské časové pásmo
        const now = new Date();
        
        // Převod na evropský čas (UTC+1 nebo UTC+2 v závislosti na letním čase)
        const europeTimeOffset = getEuropeanTimeOffset(now);
        const europeNow = new Date(now.getTime() + (europeTimeOffset * 60 * 60 * 1000));
        
        // Výpočet rozdílu mezi aktuálním a cílovým časem
        const distance = targetDate - europeNow;

        // Výpočty pro dny, hodiny, minuty a sekundy
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Zobrazení výsledků, pokud elementy existují
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }

        // Pokud je odpočet ukončen
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (document.getElementById('days')) {
                document.getElementById('days').innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
            }
        }
    }

    // Spustíme časovač při načtení stránky a poté každou sekundu
    let countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Okamžité volání pro inicializaci
}

// Funkce pro získání offsetu evropského času (CET/CEST)
function getEuropeanTimeOffset(date) {
    // Evropský letní čas (CEST) je od poslední neděle v březnu do poslední neděle v říjnu
    const year = date.getFullYear();
    
    // Začátek letního času (poslední neděle v březnu)
    const march = new Date(year, 2, 31, 2, 0, 0); // Březen je 2 (0-indexováno)
    const startDST = new Date(march.setDate(31 - march.getDay()));
    
    // Konec letního času (poslední neděle v říjnu)
    const october = new Date(year, 9, 31, 2, 0, 0); // Říjen je 9 (0-indexováno)
    const endDST = new Date(october.setDate(31 - october.getDay()));
    
    // Zkontrolujeme, zda je aktuální datum v rozsahu letního času
    if (date >= startDST && date < endDST) {
        return 2; // CEST (UTC+2)
    } else {
        return 1; // CET (UTC+1)
    }
}

// Spuštění po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
});