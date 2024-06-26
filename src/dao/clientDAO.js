import Client from './models/clientModel.js';
import { getUserByEmail } from './userDAO.js';

import db from './db.js';

const createNewClient = async (name, email, password, phone) => {
    try {
        const newClient = new Client({
            name,
            email,
            password,
            phone
        });
        await newClient.save();
        console.log('Cliente creado exitosamente:', newClient);
        return newClient;
    } catch (error) {
        console.error('Error al crear el cliente:', error.message);
        throw new Error('No se pudo crear el cliente');
    }
};

const getAllClients = async () => {
    try {
        const clients = await Client.find().sort({ _id: -1 });
        console.log('Clientes encontrados:', clients);
        return clients;
    } catch (error) {
        console.error('Error al obtener clientes:', error.message);
        throw new Error('No se pudieron obtener los clientes');
    }
};

const getClientById = async (clientId) => {
    try {
        const client = await Client.findById(clientId);
        if (!client) {
            throw new Error('Cliente no encontrado');
        }
        console.log('Cliente encontrado:', client);
        return client;
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error.message);
        throw new Error('No se pudo encontrar el cliente');
    }
};

const updateClientById = async (clientId, newData) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(clientId, newData, {
            new: true,
        });
        if (!updatedClient) {
            throw new Error('Cliente no encontrado');
        }
        console.log('Cliente actualizado:', updatedClient);
        return updatedClient;
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error.message);
        throw new Error('No se pudo actualizar el cliente');
    }
};

const updateClientPhoneByEmail = async (phone, email) => {
    try {
        const updatedClient = await Client.findOneAndUpdate({ email }, { phone }, {
            new: true,
        });
        if (!updatedClient) {
            throw new Error('Cliente no encontrado');
        }
        console.log('Cliente actualizado:', updatedClient);
        return updatedClient;
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error.message);
        throw new Error('No se pudo actualizar el cliente');
    }
};

const updateClientStateByEmail = async (state, email) => {
    try {
        const updatedClient = await Client.findOneAndUpdate({ email }, { state }, {
            new: true,
        });
        if (!updatedClient) {
            throw new Error('Cliente no encontrado');
        }
        console.log('Cliente actualizado:', updatedClient);
        return updatedClient;
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error.message);
        throw new Error('No se pudo actualizar el cliente');
    }
};

const deleteClientById = async (clientId) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(clientId);
        if (!deletedClient) {
            throw new Error('Cliente no encontrado');
        }
        console.log('Cliente eliminado:', deletedClient);
        return deletedClient;
    } catch (error) {
        console.error('Error al eliminar cliente por ID:', error.message);
        throw new Error('No se pudo eliminar el cliente');
    }
};

const getClientByEmail = async (email) => {
    try {
        const client = await Client.findOne({ email: email });
        if (!client) {
            console.log('Cliente no encontrado')
        }
        return client;
    } catch (error) {
        console.error('Error al obtener cliente por correo electrónico:', error.message);
        throw new Error('No se pudo encontrar el cliente');
    }
};

const isAdmin = async (email) => {
    try {
        const client = await getUserByEmail(email);
        if (!client) {
            console.log('Cliente no encontrado')
        }
        return client ? true : false;
    } catch (error) {
        console.error('Error al obtener cliente por correo electrónico:', error.message);
        throw new Error('No se pudo encontrar el cliente');
    }
};

export { createNewClient, getAllClients, getClientById, updateClientById, deleteClientById, getClientByEmail, updateClientPhoneByEmail, updateClientStateByEmail, isAdmin };
