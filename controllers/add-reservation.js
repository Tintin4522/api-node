async function fetchCatways() {
    try {
        const response = await fetch('http://localhost:8000/catways/catways');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }
        const catways = await response.json();
        console.log('Catways récupérés:', catways); 

        if (catways.length === 0) {
            console.warn('Aucun catway trouvé.');
            return;
        }

        catways.sort((a, b) => {
            return a.catwayNumber - b.catwayNumber; 
        });

        const catwaySelect = document.getElementById('catwaySelect');
        catwaySelect.innerHTML = '';

        catways.forEach(catway => {
            const option = document.createElement('option');
            option.value = catway._id; 
            option.textContent = `${catway.catwayNumber} - ${catway.type}`;
            catwaySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catways:', error);
    }
}

async function addReservation(event) {
    event.preventDefault();

    const catwayId = document.getElementById('catwaySelect').value; 
    const clientName = document.getElementById('clientName').value;
    const boatName = document.getElementById('boatName').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    const reservationData = {
        catwayNumber: document.getElementById('catwaySelect').options[document.getElementById('catwaySelect').selectedIndex].text.split(' - ')[0],
        clientName,
        boatName,
        checkIn,
        checkOut,
        catwayId,
    };

    try {
        const response = await fetch('http://localhost:8000/reservations/catways/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            alert('Réservation ajoutée avec succès !');
            window.location.href = '/list-reservations';
        } else {
            const errorResponse = await response.json();
            alert(`Erreur lors de l'ajout de la réservation: ${errorResponse.message}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation:', error);
        alert('Erreur lors de l\'ajout de la réservation.');
    }
}

window.onload = () => {
    fetchCatways(); 
    document.getElementById('add-reservation-form').addEventListener('submit', addReservation);
};
