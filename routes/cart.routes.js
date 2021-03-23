const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

const router = express.Router();

/*router.get('/', async(req, res, next) =>{
  try{
    const uId = req.user;
    const user = await User.findById(uId).populate('products');
    const uCart = user.userCart;

    return res.status(200).render('cart', {uCart});

  }catch(err){
    next(err);
  }
});*/

router.get('/', async (req, res, next) => {
  try {
    const uId = req.user;
    const carts = await User.findById(uId).populate('products');
    const carritoUser = carts.cart;

    res.render('cart', {carritoUser});
    //return res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
});

router.put('/add/:pId', async(req, res, next) =>{
  try{
    const uId = req.user; //body para hacerlo con el postman
    const pid = req.params.productId;
    const updateCart = await User.findByIdAndUpdate(
      uId,
      {$push: {cart: pid}},
      {new: true}
    );

    res.render('products/pages/1');
    //return res.status(200).json(updateCart);
  }catch(err){
    next(err);
  }
});

router.put('/add-product', async (req, res, next) => {
  try {
    const uId = req.user;
    const productId = req.body.productId;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $push: { products: productId } },
      { new: true }
    );

    return res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;