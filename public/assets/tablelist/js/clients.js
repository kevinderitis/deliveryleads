let clients = [];
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

const createUser = async (name, email) => {
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Create user error:', error);
        throw new Error('Failed to create user');
    }
};

async function updatePhoneNumber(phone, newPhone, email) {
    const url = `/client/user/phone`;
    const formData = {
        phone,
        newPhone,
        email
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Número de teléfono actualizado:', data);
        } else {
            throw new Error('Error al actualizar el número de teléfono');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
    }
}

async function updateNickname(newNickname, email) {
    const url = `/client/user/nickname`;
    const formData = {
        newNickname,
        email
    };
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Nombre de cajero actualizado:', data);
        } else {
            throw new Error('Error al actualizar el nombre de cajero');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
    }
}

async function editNumber(email, phone) {
    Swal.fire({
        title: 'Editar número',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Ingresa nuevo numero">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: async () => {
            const newNumber = Swal.getPopup().querySelector('#swal-input1').value;
            if (!newNumber) {
                Swal.showValidationMessage('Por favor ingresa un número de WhatsApp');
            }
            await updatePhoneNumber(phone, newNumber, email);

        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Guardado!',
                text: 'El número de WhatsApp ha sido actualizado',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    });
}

async function editNickname(email) {
    Swal.fire({
        title: 'Editar nombre de cajero',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Ingresa nuevo nombre">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: async () => {
            const newNickname = Swal.getPopup().querySelector('#swal-input1').value;
            if (!newNickname) {
                Swal.showValidationMessage('Por favor ingresa un nuevo nombre');
            }
            console.log(newNickname)
            // await updateNickname(newNickname, email);
            return newNickname;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Guardado!',
                text: 'El nombre del cajero fue actualizado',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    });
}

async function newClient() {
    Swal.fire({
        title: 'Agregar nuevo cliente',
        html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Ingresa nombre">
        <input id="swal-input-email" class="swal2-input" placeholder="Ingresa email">
      `,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: async () => {
            const name = Swal.getPopup().querySelector('#swal-input-name').value;
            const email = Swal.getPopup().querySelector('#swal-input-email').value;

            if (!name || !email) {
                Swal.showValidationMessage('Por favor ingresa el nombre y el email');
                return false;
            }

            try {
                await createUser(name, email);
                return { name, email };
            } catch (error) {
                Swal.showValidationMessage(`Error al crear el usuario: ${error.message}`);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Guardado!',
                text: 'El nuevo cliente ha sido creado',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    });
}

const renderClients = (clients) => {
    const tableBody = document.getElementById('client-rows');
    tableBody.innerHTML = clients.map((client) => {
        return `
        <tr>
          <td>${client._id}</td>
          <td class="client-profile">
            <span class="profile-info">
              <span class="profile-info__name">${client.name}</span>
            </span>
          </td>
          <td>${client.nickname}
          <button class="edit-nickname" data-email="${client.email}"" style="background-color: transparent;">
          <i class="fas fa-pencil-alt"></i>
          </button>
          </td>
          <td>${client.email}</td>
          <td>${client.phone}</td>
          <td>
            <button class="edit-btn" data-email="${client.email}" data-phone="${client.phone}" style="background-color: transparent;">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="edit-welcome-message-btn" data-email="${client.email}" style="background-color: transparent;">
              Editar Mensaje
            </button>
          </td>
        </tr>`;
    }).join('');

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const email = this.getAttribute('data-email');
            const phone = this.getAttribute('data-phone');
            editNumber(email, phone);
        });
    });

    document.querySelectorAll('.edit-welcome-message-btn').forEach(button => {
        button.addEventListener('click', function () {
            const email = this.getAttribute('data-email');
            const client = clients.find(client => client.email === email);
            editWelcomeMessage(client);
        });
    });

    document.querySelectorAll('.edit-nickname').forEach(button => {
        button.addEventListener('click', function () {
            const email = this.getAttribute('data-email');
            editNickname(email);
        });
    });
};

const editWelcomeMessage = async (client) => {
    try {
        const result = await Swal.fire({
            title: 'Editar Mensaje de Bienvenida',
            html: `
          <textarea id="swal-input-welcome-message" class="swal2-textarea" style="height: 150px;" placeholder="Mensaje de bienvenida">${client.textmessage || ''}</textarea>
        `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: async () => {
                const newMessage = Swal.getPopup().querySelector('#swal-input-welcome-message').value;
                console.log(client.email);
                console.log(newMessage);
                await updateWelcomeMessage(client.email, newMessage);
                return newMessage;
            }
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Guardado!',
                text: 'El mensaje de bienvenida ha sido actualizado',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    } catch (error) {
        console.error('Error al editar mensaje de bienvenida:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar el mensaje de bienvenida',
        });
    }
};

const updateWelcomeMessage = async (email, newMessage) => {
    try {
        const response = await fetch(`/client/message/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ welcomeMessage: newMessage })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(`Actualizando mensaje de bienvenida para ${email} con:`, newMessage);
    } catch (error) {
        console.error('Error al actualizar mensaje de bienvenida en el backend:', error);
        throw new Error('Failed to update welcome message');
    }
};

const filterClients = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    console.log(clients);
    const filteredClients = clients.filter(client => {
        const clientName = client.name ? client.name.toLowerCase() : '';
        const clientEmail = client.email ? client.email.toLowerCase() : '';
        return clientName.includes(searchInput) || clientEmail.includes(searchInput);
    });
    renderClients(filteredClients);
};


function redirectToAdmin() {
    window.location.href = 'admin.html';
}

function redirectToOrders() {
    window.location.href = 'orders.html';
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
        clients = await fetchData(`/client`);
        renderClients(clients);
        renderPagination(Math.ceil(clients.length / itemsOnPage), page);
    } catch (error) {
        console.error('Initialization error:', error);
    }
};

init();


