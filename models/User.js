//conectamos a la bd
const mongoose = require('mongoose');

//cogemos el schema de un usuario
const Schema = mongoose.Schema;

const userSchema= new Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        cart: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;