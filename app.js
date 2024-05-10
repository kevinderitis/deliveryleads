import express from 'express';
import leadRouter from './src/routes/leadRouter.js';
import orderRouter from './src/routes/orderRouter.js';
import clientRouter from './src/routes/clientRouter.js';
import paymentRouter from './src/routes/paymentRouter.js';
import authRouter from './src/routes/authRouter.js';
import draftOrderRouter from './src/routes/draftOrderRouter.js';
import session from 'express-session';
import passport from './src/config/passport.js';
import cors from 'cors';
import config from './src/config/config.js';

const app = express();

app.use(cors({
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: config.SECRET_PASSPORT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/lead', leadRouter)
app.use('/order', orderRouter)
app.use('/client', clientRouter)
app.use('/payment', paymentRouter)
app.use('/auth', authRouter)
app.use('/draft', draftOrderRouter)

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))