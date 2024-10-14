let catwayId;

async function fetchCatway() {
    const urlParams = new URLSearchParams(window.location.search);
    catwayId = urlParams.get('id');

    if (!catwayId) {
        alert('ID de catway manquant dans l\'URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/catways/${catwayId}`);
        if (response.ok) {
            const catway = await response.json();
            document.getElementById('catwayNumber').value = catway.catwayNumber;
            document.getElementById('type').value = catway.type;
            document.getElementById('catwayState').value = catway.catwayState;
        } else {
            alert('Catway introuvable');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du catway:', error);
        alert('Erreur lors de la récupération des détails du catway.');
    }
}

async function updateCatway(event) {
    event.preventDefault();

    const updatedCatway = {
        catwayNumber: document.getElementById('catwayNumber').value,
        type: document.getElementById('type').value,
        catwayState: document.getElementById('catwayState').value,
    };

    try {
        const response = await fetch(`http://localhost:8000/catways/${catwayId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCatway),
        });

        if (response.ok) {
            alert('Catway mis à jour avec succès !');
            window.location.href = '/list-catways'; 
        } else {
            alert('Erreur lors de la mise à jour du catway.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du catway:', error);
        alert('Erreur lors de la mise à jour du catway.');
    }
}

window.onload = () => {
    fetchCatway();
    document.getElementById('edit-form').addEventListener('submit', updateCatway);
};
