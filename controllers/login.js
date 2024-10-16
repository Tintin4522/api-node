document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const result = await response.json();
        alert(result.message);
        window.location.href = '/menu'; 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion.');
    }
});
