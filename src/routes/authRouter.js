import { Router } from 'express';
import passport from '../config/passport.js';
import { login, signup } from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login.html' }),
    function (req, res) {
        res.redirect('/index.html');
    });

authRouter.post('/login', login);

authRouter.post('/signup',signup);


export default authRouter;
