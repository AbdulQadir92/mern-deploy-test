const Product = require('../models/productModel');
const mongoose = require('mongoose');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ deletedAt: null }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product found' });
    }

    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: 'No such product found' });
    }
}

const createProduct = async (req, res) => {
    const { title, price } = req.body;

    try {
        const product = await Product.create({ title, price, createdBy: 1 });
        res.status(200).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product found' });
    }

    try {
        const product = await Product.findById(id);
        product.updatedBy = 1;
        product.deletedAt = new Date().toISOString();
        product.save();

        const { title, price } = req.body;
        const newProduct = await Product.create({ title, price, createdBy: 1 });
        res.status(200).json({ message: 'Product updated successfully', newProduct });
    } catch (error) {
        res.status(404).json({ error: 'No such product found' });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product found' });
    }

    try {
        const product = await Product.findById(id);
        product.updatedBy = 1;
        product.deletedAt = new Date().toISOString();
        product.save();

        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(404).json({ error: 'No such product found' });
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}