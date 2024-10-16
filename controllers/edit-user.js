let userId;

async function fetchUser() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    if (!userId) {
        alert('ID d\'utilisateur manquant dans l\'URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/users/users/${userId}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            // Le mot de passe ne doit pas être pré-rempli pour des raisons de sécurité.
        } else {
            alert('Utilisateur introuvable');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        alert('Erreur lors de la récupération des détails de l\'utilisateur.');
    }
}

async function updateUser(event) {
    event.preventDefault();

    const updatedUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value ? document.getElementById('password').value : undefined // Ne pas envoyer le mot de passe s'il est vide
    };

    try {
        const response = await fetch(`http://localhost:8000/users/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            alert('Utilisateur mis à jour avec succès !');
            window.location.href = '/list-user'; 
        } else {
            alert('Erreur lors de la mise à jour de l\'utilisateur.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        alert('Erreur lors de la mise à jour de l\'utilisateur.');
    }
}

window.onload = () => {
    fetchUser();
    document.getElementById('edit-form').addEventListener('submit', updateUser);
};
