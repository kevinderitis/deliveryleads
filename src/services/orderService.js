import { getAllOrders, updateOrderById, createNewOrder, getOldestActiveOrder, updateOrderByOrderId, getOrdersByClientEmail, getActiveOrdersCountByClientEmail } from "../dao/orderDAO.js";
import { getClientByEmailService } from './clientService.js';
// import { createPaymentPreference } from "./mpService.js";

const generateOrderId = () => {
    const uniqueIdentifier = Math.floor(100000 + Math.random() * 900000);
    let orderId = `${Date.now().toString()}-${uniqueIdentifier}`;
    return orderId;
}

export const createOrderService = async (quantity, email) => {
    try {
        const client = await getClientByEmailService(email);

        if (!client) {
            throw new Error('El cliente con el correo electrónico proporcionado no existe');
        };
        const orderId = generateOrderId();
        const response = await createNewOrder(quantity, email, orderId);
        // const preference = await createPaymentPreference(quantity, email);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllOrdersService = async () => {
    try {
        const response = await getAllOrders();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getClientOrders = async email => {
    try {
        const response = await getOrdersByClientEmail(email);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getClientActiveOrdersQuantity = async email => {
    try {
        const response = await getActiveOrdersCountByClientEmail(email);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateOrderByIdService = async (orderId, newData) => {
    try {
        const response = await updateOrderById(orderId, newData)
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateOrderByOrderIdService = async (orderId, newData) => {
    try {
        const updatedOrder = await updateOrderByOrderId(orderId, newData);
        if (!updatedOrder) {
            throw new Error('Pedido no encontrado');
        }
        console.log('Pedido actualizado:', updatedOrder);
        return updatedOrder;
    } catch (error) {
        console.error('Error al actualizar el pedido por orderId:', error.message);
        throw new Error('No se pudo actualizar el pedido');
    }
};


export const getOrderId = async (orderId) => {
    try {
        const order = await getOrder(orderId);
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOldestActiveOrderService = async () => {
    try {
        const oldestActiveOrder = await getOldestActiveOrder();
        return oldestActiveOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
