const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Number,
        required: true
    },
    updatedBy: {
        type: Number
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);