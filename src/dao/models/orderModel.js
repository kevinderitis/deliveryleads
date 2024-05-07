import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },
  quantity: {
    type: Number,
    min: 0
  },
  email: {
    type: String
  },
  delivered: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
