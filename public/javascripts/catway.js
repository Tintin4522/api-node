async function fetchCatways() {
    try {
        const response = await fetch('http://localhost:8000/catways');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }
        const catways = await response.json();
        console.log('Catways récupérés:', catways);
        const tableBody = document.getElementById('catway-table-body');

        catways.forEach(catway => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${catway.catwayNumber}</td>
                <td>${catway.type}</td>
                <td>${catway.catwayState}</td>
                <td>
                    <a href="/edit-catway?id=${catway.catwayNumber}">Modifier</a>
                    <a href="/catway-details?id=${catway.catwayNumber}">Détails</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

window.onload = fetchCatways;
