const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creamos el esquema de un producto 
const productSchema = new Schema(
    {
        name: {type:String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        color: {type: String, required:true},
        storage: {type:String, required: true},
        image: {type: String, required: true},
    },
    {
        //así guardamos las fechas de creación y actualización de los documentos
        timestamps: true,
    }
);

//creamos y exportamos el modelo product
const Product = mongoose.model('Product', productSchema);
module.exports = Product;