import { Router } from 'express';
import { getAll, createOrder, updateOrder } from '../controllers/orderController.js';
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';

const orderRouter = Router();

orderRouter.use(isAuthenticated)

orderRouter.get('/', getAll);
orderRouter.post('/', isAdmin, createOrder)
orderRouter.put('/:id', updateOrder);

export default orderRouter;
