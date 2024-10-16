document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/users/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        const newUser = await response.json();
        alert(`Utilisateur créé avec succès: ${newUser.name}`);
        // Optionnel: rediriger vers la liste des utilisateurs
        window.location.href = '/list-user';
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la création de l\'utilisateur.');
    }
});
