import { Router } from 'express';
import { getAll, updateClient, createClient, getData, updatePhone, updateClientState, updateUserPhone, setTelegramChatId, updateWelcomeMessage, getClientByTgId, getAdminPhones } from '../controllers/clientController.js';
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';

const clientRouter = Router();

clientRouter.get('/', isAdmin, getAll);
clientRouter.get('/data/:tgchatid', getClientByTgId);
clientRouter.get('/data', isAuthenticated, getData);
clientRouter.post('/', createClient);
clientRouter.put('/:id/data', updateClient);
clientRouter.put('/phone', isAuthenticated, updatePhone);
clientRouter.put('/message/:email', isAuthenticated, updateWelcomeMessage);
clientRouter.post('/user/phone', updateUserPhone);
clientRouter.put('/state', isAuthenticated, updateClientState);
clientRouter.post('/telegram', setTelegramChatId);
clientRouter.get('/admin/phones', getAdminPhones);

export default clientRouter;
