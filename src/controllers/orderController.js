import { createOrderService, getAllOrdersService, updateOrderByIdService } from "../services/orderService.js";

export const getAll = async (req, res) => {
    try {
        const orders = await getAllOrdersService();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener todas las órdenes:', error.message);
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const newData = req.body;

    try {
        const updatedOrder = await updateOrderByIdService(orderId, newData);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error al actualizar la orden por ID:', error.message);
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};

export const createOrder = async (req, res) => {
    const { quantity, email } = req.body;

    try {
        const preference = await createOrderService( quantity, email);
        res.status(200).json({ preference });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Error interno al crear la orden' });
    }
};
