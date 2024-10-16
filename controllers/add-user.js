document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const firstname = document.getElementById('firstname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/users/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, firstname, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur du serveur:', errorData);
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        const newUser = await response.json();
        alert(`Utilisateur créé avec succès: ${newUser.name}`);
        window.location.href = '/list-user';
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la création de l\'utilisateur.');
    }
});
