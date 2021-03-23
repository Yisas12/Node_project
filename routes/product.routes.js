const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const Product = require('../models/Product');
const authm = require('../middlewares/auth.middleware');

const router = express.Router();

//mostrar todos los productos
router.get('/', async (req, res) => {
	try {
    const aut = req.isAuthenticated();
    //console.log(aut);
    const products = await Product.find();
    res.render('products', { title: 'products', products});
    
	} catch (err) {
		return res.status(500).json(err);
	}
});


router.get('/pages/:page', async (req, res) => {
  const paginaSize = 10;
  const paginaActual = +req.params.page;//+req.query.page;
  const productQuery = Product.find();
  const parametroPaginas = paginaSize * (paginaActual - 1);

  if(paginaSize && paginaActual) {
    productQuery
    .skip(paginaSize * (paginaActual - 1))
    .limit(paginaSize)
  }
  try {
    const products = await productQuery.exec();
    res.render('products', {products, parametroPaginas});
    
  } catch (e) {
    res.status(500).send();
  }
});

//por id
router.get('/id', (req, res, next)=>{
  res.render('porId');
});

router.post('/id', async(req, res, next)=>{
    try{
      const id = req.body.id;
      const product = await Product.findById(id);

      return res
      .status(200)
      .render('productId', { title: 'Product', product: product, id: id });
      
    }catch(err){
      //return res.status(500).json(err);
      next(err);
    }
});

router.get('/price', (req, res, next)=>{
  res.render('porPrecio');
});

router.post('/price', async(req, res, next)=>{
    const price = req.body.price;

    try{
      const products = await Product.find({price: price});

      //return res.status(200).json(product);
      return res
      .status(200)
      .render('productPrice', { title: 'Product', products: products, price: price });
      
    }catch(err){
      //return res.status(500).json(err);
      next(err);
    }
});

router.get('/create', (req, res) =>{
  res.render('prInsert');
});

router.post('/create', async(req, res, next) => {
  try {
    // Crearemos una instancia de producto con los datos enviados
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      color: req.body.color,
      storage: req.body.storage,
      image: req.body.image
    });

    // Guardamos el producto en la DB
    const createdProduct = await newProduct.save();
   return res.redirect('/products');
  } catch (err) {
		// Lanzamos la función next con el error para que gestione todo Express
    next(err);
  }
});

/*Proteger una ruta
/* GET Home Page 
router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });
   
  // As with any middleware it is quintessential to call next()
  // if the user is authenticated
  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
}*/

module.exports = router;