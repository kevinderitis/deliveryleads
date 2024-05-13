const logout = async () => {
    try {
        const response = await fetch(`/auth/logout`);
        
        if (!response.ok) {
            throw new Error('Error al hacer logout');
        }
        
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al hacer logout:', error.message);
    }
  };
  

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch data');
    }
};

const renderClients = (clients) => {
    const tableBody = document.getElementById('client-rows');
    tableBody.innerHTML = clients.map((client) => {
        return `<tr>
            <td class="client-profile">
                <span class="profile-info">
                    <span class="profile-info__name">${client.name}</span>
                </span>
            </td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
        </tr>`;
    }).join('');
};

function redirectToAdmin() {
    window.location.href = 'admin.html';
  }
  

const renderPagination = (numberOfPages, start) => {
    const pagination = document.querySelector('.pagination');
    const linkList = [];

    for (let i = 0; i < numberOfPages; i++) {
        const pageNumber = i + 1;
        linkList.push(`<li><a href="?page=${pageNumber}" ${pageNumber == start ? 'class="active"' : ''} title="page ${pageNumber}">${pageNumber}</a></li>`);
    }

    pagination.innerHTML = linkList.join('');
};

const init = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page') || 1;

    try {
        const clients = await fetchData(`/client`);
        renderClients(clients);
        renderPagination(Math.ceil(clients.length / itemsOnPage), page);
    } catch (error) {
        console.error('Initialization error:', error);
    }
};

init();


