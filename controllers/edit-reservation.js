let reservationId;

async function fetchReservation() {
    const urlParams = new URLSearchParams(window.location.search);
    reservationId = urlParams.get('id');

    if (!reservationId) {
        alert('ID de réservation manquant dans l\'URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/reservations/catways/reservations/${reservationId}`);
        if (response.ok) {
            const reservation = await response.json();
            document.getElementById('catwayNumber').value = reservation.catwayNumber;
            document.getElementById('clientName').value = reservation.clientName;
            document.getElementById('boatName').value = reservation.boatName;
            document.getElementById('checkIn').value = reservation.checkIn.split('T')[0]; 
            document.getElementById('checkOut').value = reservation.checkOut.split('T')[0]; 
        } else {
            alert('Réservation introuvable');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la réservation:', error);
        alert('Erreur lors de la récupération des détails de la réservation.');
    }
}

async function updateReservation(event) {
    event.preventDefault();

    const updatedReservation = {
        catwayNumber: document.getElementById('catwayNumber').value,
        clientName: document.getElementById('clientName').value,
        boatName: document.getElementById('boatName').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
    };

    try {
        const response = await fetch(`http://localhost:8000/reservations/catways/reservations/${reservationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReservation),
        });

        if (response.ok) {
            alert('Réservation mise à jour avec succès !');
            window.location.href = '/list-reservations'; 
        } else {
            alert('Erreur lors de la mise à jour de la réservation.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation:', error);
        alert('Erreur lors de la mise à jour de la réservation.');
    }
}

window.onload = () => {
    fetchReservation();
    document.getElementById('edit-form').addEventListener('submit', updateReservation);
};
