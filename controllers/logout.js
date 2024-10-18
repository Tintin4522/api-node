document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8000/users/logout', {
            method: 'POST',
            credentials: 'include' 
        });

        if (response.ok) {
            window.location.href = '/';
        } else {
            alert('Erreur lors de la déconnexion');
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
    }
});