const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content");

allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    const linkId = elem.id;
    const hrefLinkClick = elem.href;

    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    allTabs.forEach((tab) => {
      const id = tab.id;
      if (id.includes(linkId)) {
        tab.classList.add("tab-content--active");
      } else {
        tab.classList.remove("tab-content--active");
      }
    });
  });
});


function insertName(nombre) {
  var h2Element = document.querySelector('.profile__name h2');
  if (h2Element) {
    h2Element.textContent = nombre;
  } else {
    console.error("No se encontró el elemento h2 dentro de '.profile__name'");
  }
};

function setOrdersAndLeads(ordenesActivas, leadsRecibidos) {
  var ordenesElement = document.getElementById('ordersNumber');
  var leadsElement = document.getElementById('leadsNumber');
  console.log(ordenesElement)
  console.log(leadsElement)
  if (ordenesElement && leadsElement) {
    ordenesElement.innerHTML = ordenesActivas;
    leadsElement.innerHTML = leadsRecibidos;
  } else {
    console.error("No se encontraron los elementos de cantidades");
  }
}

function setWhatsAppNumber(number) {
  const whatsappLink = document.getElementById('whatsapp-number');
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${number}`;
    whatsappLink.textContent = number;
  } else {
    console.error("No se encontró el enlace de WhatsApp con el ID 'client-whatsapp'");
  }
}

function testWhatsapp() {
  const whatsappLink = document.getElementById('whatsapp-number');
  if (whatsappLink) {
    const number = whatsappLink.textContent.trim();
    const whatsappURL = `https://wa.me/${number}`;
    window.open(whatsappURL, '_blank');
  } else {
    console.error("No se encontró el enlace de WhatsApp con el ID 'client-whatsapp'");
  }
}

function setOrderTable(orders, draft) {
  const tbody = draft ? document.getElementById('draft-orders-body') : document.getElementById('orders-body');
  tbody.innerHTML = '';
  orders.forEach(order => {
    const row = document.createElement('tr');

    if (!draft) {
      const orderIdCell = document.createElement('td');
      orderIdCell.textContent = order.orderId;
      row.appendChild(orderIdCell);
    }

    const emailCell = document.createElement('td');
    emailCell.textContent = order.email;
    row.appendChild(emailCell);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = order.quantity;
    row.appendChild(quantityCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = order.delivered ? 'Entregado' : 'Pendiente';
    row.appendChild(statusCell);

    tbody.appendChild(row);
  });
}

function toggleAdminButton(showButton) {
  const adminBtn = document.getElementById('adminBtn');
  if (showButton) {
      adminBtn.style.display = 'block';
  } else {
      adminBtn.style.display = 'none';
  }
}

function redirectToAdmin() {
  window.location.href = 'admin.html';
}



const toggleClientState = (isStarted) => {
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  const startTd = document.getElementById('start-td');
  const stopTd = document.getElementById('stop-td');
  console.log(`El valor es: ${isStarted}`)
  if (!isStarted) {
      startButton.style.display = 'block';
      stopButton.style.display = 'none';
      startTd.style.display = 'table-cell';
      stopTd.style.display = 'none';
  } else {
      startButton.style.display = 'none';
      stopButton.style.display = 'block';
      startTd.style.display = 'none';
      stopTd.style.display = 'table-cell';
  }
};


async function fetchDataFromServer() {
  try {
    const response = await fetch(`${API_URL}/client/data`);

    if (!response.ok) {
      if (response.statusText === "Unauthorized") {
        window.location.href = 'login.html'
      }
      throw new Error('Hubo un problema al obtener los datos del servidor.');
    }

    const data = await response.json();

    console.log(data)

    const nombre = data.name;
    const email = data.email;
    const orders = data.ordersObj;
    const draft = data.draftObj;
    const ordenesActivas = orders.length;
    const leadsRecibidos = data.draft;
    const phone = data.phone;
    const clientState = data.clientState;
    const admin = data.admin;

    toggleAdminButton(admin);
    toggleClientState(clientState);
    insertName(nombre);
    setOrdersAndLeads(ordenesActivas, leadsRecibidos);
    setWhatsAppNumber(phone)
    setOrderTable(orders)
    setOrderTable(draft, true)
  } catch (error) {
    console.error('Error al obtener datos del servidor:', error);
  }
};

async function updatePhoneNumber(phone) {
  const url = `${API_URL}/client/phone`;
  const formData = {
    phone
  };
  console.log(url)
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
      console.log('Número de teléfono actualizado:', data);
    } else {
      throw new Error('Error al actualizar el número de teléfono');
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error.message);
  }
}

async function changeClientState(state) {
  const url = `${API_URL}/client/state`;
  const formData = {
    state
  };
  console.log(url)
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
      toggleClientState(state);
      console.log('Número de teléfono actualizado:', data);
    } else {
      throw new Error('Error al actualizar el número de teléfono');
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error.message);
  }
}


async function editNumber() {
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
      await updatePhoneNumber(newNumber);
      return newNumber;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const newNumber = result.value;
      document.getElementById('whatsapp-number').textContent = newNumber;
      Swal.fire('¡Guardado!', 'El número de WhatsApp ha sido actualizado', 'success');
    }
  });
}

const logout = async () => {
  try {
      const response = await fetch(`${API_URL}/auth/logout`)
      
      if (!response.ok) {
          throw new Error('Error al hacer logout');
      }
      
      window.location.href = 'login.html';
  } catch (error) {
      console.error('Error al hacer logout:', error.message);
  }
};



document.addEventListener('DOMContentLoaded', fetchDataFromServer);
