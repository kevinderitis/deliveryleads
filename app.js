import express from 'express';
import leadRouter from './src/routes/leadRouter.js';
import orderRouter from './src/routes/orderRouter.js';
import clientRouter from './src/routes/clientRouter.js';
import paymentRouter from './src/routes/paymentRouter.js';
import authRouter from './src/routes/authRouter.js';
import session from 'express-session';
import passport from './src/config/passport.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'cadenasegura',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/lead', leadRouter)
app.use('/order', orderRouter)
app.use('/client', clientRouter)
app.use('/payment', paymentRouter)
app.use('/auth', authRouter)

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))