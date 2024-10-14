async function fetchCatways() {
    try {
        const response = await fetch('http://localhost:8000/catways');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }
        const catways = await response.json();

        // Trier les catways par catwayNumber
        catways.sort((a, b) => a.catwayNumber - b.catwayNumber);

        const tableBody = document.getElementById('catway-table-body');
        tableBody.innerHTML = ''; 

        catways.forEach(catway => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${catway.catwayNumber}</td>
                <td>${catway.type}</td>
                <td>${catway.catwayState}</td>
                <td>
                    <a href="/edit-catway?id=${catway._id}">Modifier</a>
                    <a href="/catway-details?id=${catway._id}">Détails</a>
                    <button class="delete-button" data-id="${catway._id}">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter un gestionnaire d'événements pour les boutons de suppression
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const catwayId = event.target.getAttribute('data-id');

                const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce catway ?');
                if (confirmDelete) {
                    try {
                        const response = await fetch(`http://localhost:8000/catways/${catwayId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            alert('Catway supprimé avec succès !');
                            // Rafraîchir la liste après la suppression
                            fetchCatways();
                        } else {
                            alert('Erreur lors de la suppression du catway.');
                        }
                    } catch (error) {
                        console.error('Erreur lors de la suppression:', error);
                        alert('Erreur lors de la suppression du catway.');
                    }
                }
            });
        });

    } catch (error) {
        console.error('Erreur:', error);
    }
}

window.onload = fetchCatways;
