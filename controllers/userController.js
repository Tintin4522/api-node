async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/users');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const users = await response.json();

        // Trier les utilisateurs par nom d'utilisateur
        users.sort((a, b) => a.name.localeCompare(b.name));

        const tableBody = document.getElementById('user-table-body');
        tableBody.innerHTML = ''; 

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.firstname}</td>
                <td>${user.email}</td>
                <td>
                    <a href="/edit-user?id=${user._id}">Modifier</a>
                    <button class="delete-button" data-id="${user._id}">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter un gestionnaire d'événements pour les boutons de suppression
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.getAttribute('data-id');

                const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
                if (confirmDelete) {
                    try {
                        const response = await fetch(`http://localhost:8000/users/users/${userId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            alert('Utilisateur supprimé avec succès !');
                            // Rafraîchir la liste après la suppression
                            fetchUsers();
                        } else {
                            alert('Erreur lors de la suppression de l\'utilisateur.');
                        }
                    } catch (error) {
                        console.error('Erreur lors de la suppression:', error);
                        alert('Erreur lors de la suppression de l\'utilisateur.');
                    }
                }
            });
        });

    } catch (error) {
        console.error('Erreur:', error);
    }
}

window.onload = fetchUsers;
