async function fetchReservations() {
    try {
        const response = await fetch('http://localhost:8000/reservations/catways/reservations'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des réservations');
        }
        const reservations = await response.json();

        const tableBody = document.getElementById('reservation-table-body');
        tableBody.innerHTML = ''; 

        reservations.forEach(reservation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.catwayNumber}</td>
                <td>${reservation.clientName}</td>
                <td>${reservation.boatName}</td>
                <td>${new Date(reservation.checkIn).toLocaleDateString()}</td>
                <td>${new Date(reservation.checkOut).toLocaleDateString()}</td>
                <td>
                    <a href="/edit-reservation?id=${reservation._id}">Modifier</a>
                    <a href="/reservation-details?id=${reservation._id}">Détails</a>
                    <button class="delete-button" data-id="${reservation._id}">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter un gestionnaire d'événements pour les boutons de suppression
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const reservationId = event.target.getAttribute('data-id');

                const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?');
                if (confirmDelete) {
                    try {
                        const response = await fetch(`http://localhost:8000/reservations/catways/reservations/${reservationId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            alert('Réservation supprimée avec succès !');
                            // Rafraîchir la liste après la suppression
                            fetchReservations();
                        } else {
                            alert('Erreur lors de la suppression de la réservation.');
                        }
                    } catch (error) {
                        console.error('Erreur lors de la suppression:', error);
                        alert('Erreur lors de la suppression de la réservation.');
                    }
                }
            });
        });

    } catch (error) {
        console.error('Erreur:', error);
    }
}

window.onload = fetchReservations;
