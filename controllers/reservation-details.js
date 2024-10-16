async function fetchReservation() {
    const urlParams = new URLSearchParams(window.location.search);
    const reservationId = urlParams.get('id'); 

    const response = await fetch(`http://localhost:8000/reservations/catways/reservations/${reservationId}`);
    if (response.ok) {
        const reservation = await response.json();
        document.getElementById('catwayNumber').innerText = reservation.catwayNumber; 
        document.getElementById('clientName').innerText = reservation.clientName;
        document.getElementById('boatName').innerText = reservation.boatName; 
        document.getElementById('checkIn').innerText = reservation.checkIn; 
        document.getElementById('checkOut').innerText = reservation.checkOut; 
    }
}

window.onload = fetchReservation; 
