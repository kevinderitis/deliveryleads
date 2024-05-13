import { Router } from 'express';
import { getAll, createOrder, updateOrder, stopOrder, deleteOrder, activateOrder } from '../controllers/orderController.js';
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';

const orderRouter = Router();

orderRouter.use(isAuthenticated)

orderRouter.get('/', getAll);
orderRouter.post('/', isAdmin, createOrder)
orderRouter.put('/:id', updateOrder);
orderRouter.put('/stop/:id', stopOrder);
orderRouter.put('/activate/:id', activateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;
