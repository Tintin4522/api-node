document.getElementById('add-catway-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const newCatway = {
        catwayNumber: document.getElementById('catwayNumber').value,
        type: document.getElementById('type').value,
        catwayState: document.getElementById('catwayState').value,
    };

    try {
        const response = await fetch('http://localhost:8000/catways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCatway),
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Catway ajouté avec succès !';
            document.getElementById('add-catway-form').reset(); // Réinitialiser le formulaire
        } else {
            const errorData = await response.json();
            document.getElementById('message').innerText = 'Erreur: ' + errorData.message;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Erreur lors de l\'ajout du catway.';
        console.error('Erreur:', error);
    }
});
