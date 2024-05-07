import express from 'express';
import leadRouter from './src/routes/leadRouter.js';
import orderRouter from './src/routes/orderRouter.js';
import clientRouter from './src/routes/clientRouter.js';
import paymentRouter from './src/routes/paymentRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/lead', leadRouter)
app.use('/order', orderRouter)
app.use('/client', clientRouter)
app.use('/payment', paymentRouter)

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))