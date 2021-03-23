//añadimos la bd
const mongoose = require('mongoose');

//añadimos el schema
const Product = require('./models/Product');

//creamos los productos a mano
const products = [
    {
        name: 'iPhone 12 Pro',
        price: 999.00,
        description: 'Apple mobile phone with iOS',
        color: 'Blue Pacific',
        storage: '128GB',
        image: 'iphone12pro.jpg',
    },
    {
        name: 'iPhone 12',
        price: 850.00,
        description: 'Apple mobile phone with iOS',
        color: 'Black',
        storage: '128GB',
        image: 'iphone12.jpg',
    },
    {
        name: 'iPhone 11 Pro',
        price: 799.00,
        description: 'Apple mobile phone with iOS',
        color: 'Gold',
        storage: '128GB',
        image: 'iphone11pro.jpg',
    },
    {
        name: 'iPhone 11',
        price: 650.00,
        description: 'Apple mobile phone with iOS',
        color: 'To choose',
        storage: '128GB',
        image: 'iphone11.jpg',
    },
    {
        name: 'Macbook Air M1',
        price: 1399.00,
        description: 'Apple Macbook Air with M1 chip based on ARM architecture',
        color: 'Space Grey',
        storage: '256GB',
        image: 'macbookair.jpg',
    },
    {
        name: 'Macbook Pro M1',
        price: 1799.00,
        description: 'Apple Macbook Pro with M1 chip based on ARM architecture',
        color: 'Silver White ',
        storage: '512GB',
        image: 'macbookpro.jpeg',
    },
    {
        name: 'Mac Mini',
        price: 650.00,
        description: 'Apple Mac Mini computer with M1 chip based on ARM architecture',
        color: 'Space Grey',
        storage: '256GB',
        image: 'macmini.jpg',
    },
    {
        name: 'iPad Pro',
        price: 879.00,
        description: 'Apple iPad Pro with 11 inches retina led display',
        color: 'Space Grey',
        storage: '128GB',
        image: 'ipadpro11p.jpg',
    },
    {
        name: 'iPad Mini 4',
        price: 300.00,
        description: 'Apple iPad Mini with 7.9 inches retina display',
        color: 'Silver',
        storage: '128GB',
        image: 'ipadmini4.jpg',
    },
    {
        name: 'iPad',
        price: 379.00,
        description: 'Apple iPad (recommended for students) with 10.2 inches led display. It doesn`t include Apple Pencil',
        color: 'Silver',
        storage: '128GB',
        image: 'ipad.jpg',
    },
    {
        name: 'Apple Watch Series 6',
        price: 449.00,
        description: 'Apple Watch series 6 40mm',
        color: 'Black',
        storage: '128GB',
        image: 'watch6.jpg',
    },
    {
        name: 'Apple Watch SE',
        price: 250.00,
        description: 'Apple Watch SE 40mm',
        color: 'Rose Gold',
        storage: '128GB',
        image: 'watchse.jpg',
    },
    {
        name: 'AirPods 2',
        price: 189.00,
        description: 'Apple AirPods second generation wireless in-ear headphones with bluetooth 5.0',
        color: 'White',
        storage: '-',
        image: 'airpods2.png',
    },
    {
        name: 'AirPods Pro',
        price: 279.00,
        description: 'Apple AirPods Pro wireless in-ear headphones with bluetooth 5.0 and noise cancelling',
        color: 'White',
        storage: '-',
        image: 'airpodspro.png',
    },
    {
        name: 'AirPods Pro Max',
        price: 649.00,
        description: 'Apple AirPods Pro Max headphones with noise cancelling and bluetooth 5.0',
        color: 'Space Grey',
        storage: '-',
        image: 'airpodspromax.jpg',
    },
    {
        name: 'HomePod',
        price: 399.00,
        description: 'Apple most advanced speaker with bluetooth',
        color: 'Space Grey',
        storage: '-',
        image: 'homepod.jpg',
    },
    {
        name: 'HomePod Mini',
        price: 99.00,
        description: 'Apple most advanced speaker with bluetooth, but mini :)',
        color: 'Silver',
        storage: '-',
        image: 'homepodmini.jpg',
    },
    {
        name: 'Beats Solo Pro',
        price: 299.00,
        description: 'Apple Beats Solo Pro headphones with H1 chip, bluetooth 5.0 and noise cancelling',
        color: 'Beige',
        storage: '-',
        image: 'beatssolopro.png',
    },
    {
        name: 'Beats Solo 3',
        price: 149.00,
        description: 'Apple Beats Solo 3 headphones with bluetooth 4.0',
        color: 'Black',
        storage: '-',
        image: 'beatssolo3.png',
    },
    {
        name: 'Beats Flex',
        price: 49.00,
        description: 'Apple Beats Flex wireless in-ear headphones with Apple W1 chip',
        color: 'Yellow',
        storage: '-',
        image: 'beatsflex.png',
    },
    {
        name: 'Beats Studio 3 Wireless',
        price: 199.00,
        description: 'Apple Beats Studio 3 Wireless headphones with Apple W1 chip and bluetooth 4.0',
        color: 'Black',
        storage: '-',
        image: 'beatsstudio3wireless.png',
    },
    {
        name: 'Beats Powerbeat Pro',
        price: 199.00,
        description: 'Apple Beats Powerbeat Pro in-ear headphones with bueltooth 5.0',
        color: 'Black',
        storage: '128GB',
        image: 'beatspowerbeatpro.jpg',
    },
    {
        name: 'Mackbook Pro 16',
        price: 2499.00,
        description: 'Apple Macbook Pro with 16 inches retina display',
        color: 'Space Grey',
        storage: '512GB',
        image: 'macbookpro16.jpg',
    },
    {
        name: 'iMac',
        price: 1499.00,
        description: 'Apple iMac with 21.5 inches retina display',
        color: 'Silver',
        storage: '256GB',
        image: 'imac.jpg',
    },
    {
        name: 'iMac Pro',
        price: 5499.00,
        description: 'Apple iMac Pro with 27 inches 5K retina display',
        color: 'Space Grey',
        storage: '1TB',
        image: 'iMacpro.jpg',
    },
    {
        name: 'Mac Pro',
        price: 59409.00,
        description: 'Apple Mac Pro with 28 cores, 1.5TB of RAM, two Radeon Pro Vega II',
        color: 'Silver',
        storage: '8TB',
        image: 'macpro.jpg',
    },
];

const productDocuments = products.map(product => new Product(product));

const DB_URL = 'mongodb://localhost:27017/upgrade_class_3';

mongoose
.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  // Utilizando Product.find() obtendremos un array con todos los productos de la db
  const allProducts = await Product.find();
  
  // Si existen productos previamente, dropearemos la colección
  if (allProducts.length) {
    await Product.collection.drop();
  }
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
  // Usaremos el array productDocument
  // para llenar nuestra base de datos con todos los productos.
  await Product.insertMany(productDocuments);
})
.catch((err) => console.log(`Error creating data: ${err}`))
// Por último nos desconectaremos de la DB.
.finally(() => mongoose.disconnect());