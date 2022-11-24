const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    price: String
});

module.exports = mongoose.model('products', newSchema);