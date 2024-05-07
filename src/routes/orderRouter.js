import { Router } from 'express';
import { getAll, createOrder, updateOrder } from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter.get('/', getAll);
orderRouter.post('/', createOrder)
orderRouter.put('/:id', updateOrder);

export default orderRouter;
