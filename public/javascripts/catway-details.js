async function fetchCatway() {
    const urlParams = new URLSearchParams(window.location.search);
    const catwayId = urlParams.get('id');

    const response = await fetch(`http://localhost:8000/catways/${catwayId}`);
    if (response.ok) {
        const catway = await response.json();
        document.getElementById('catwayNumber').innerText = catway.catwayNumber;
        document.getElementById('type').innerText = catway.type;
        document.getElementById('catwayState').innerText = catway.catwayState;
    } else {
        alert('Erreur lors de la récupération des détails du catway.');
    }
}

window.onload = fetchCatway;