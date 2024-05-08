import { getAllClients, updateClientById, createNewClient, getClientByEmail } from "../dao/clientDAO.js";
import { getClientActiveOrdersQuantity } from "../services/orderService.js";

export const getAll = async (req, res) => {
    try {
        const clients = await getAllClients();

        if (!clients || clients.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clientes' });
        }

        res.status(200).json(clients);
    } catch (error) {
        console.error('Error al obtener todos los clientes:', error.message);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

export const getData = async (req, res) => {
    let email = req.user ? req.user.email : req.session.user.email;
    try {
        const client = await getClientByEmail(email);
        const ordersQuantity = await getClientActiveOrdersQuantity(email);
        // const clientOrders = await getClientOrders(email);
        const deliveredLeads = 10;

        if (!client) {
            return res.status(404).json({ message: 'No se encontraron clientes' });
        }

        const clientDTO = {
            name: client.name ? client.name : client.email,
            email: client.email,
            orders: ordersQuantity,
            leads: deliveredLeads,
            phone: client.phone,
            // ordersObj: clientOrders
        };

        res.status(200).json(clientDTO);
    } catch (error) {
        console.error('Error al obtener todos los clientes:', error.message);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

export const updateClient = async (req, res) => {
    const clientId = req.params.id;
    const newData = req.body;

    try {
        const updatedClient = await updateClientById(clientId, newData);

        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(200).json(updatedClient);
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error.message);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

export const createClient = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const newClient = await createNewClient(name, email, password, phone);
        res.status(200).json(newClient);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error interno al crear el cliente' });
    }
};
