require('./passport.js'); // Requerimos nuestro archivo de configuración
require('dotenv').config();
require('./db.js'); //incluimos el archivo de configuración de la base de datos

const express = require('express');
const path = require('path');
const session = require('express-session');
//const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser=require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

//para el register de users
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//definimos los engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave:false,
  saveUninitialized: false,
  //store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Incluimos también el user.routes para que nos lleve a la pantalla de registro
const userRouter = require('./routes/user.routes');
const appRoutes = require('./routes/app.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

const authMiddleware = require('./middlewares/auth.middleware');


app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});

//redirigimos a la pantalla de app.routes
app.use('/', appRoutes);

//esta va a ser nuestra home, que es en la que se registran o auntentican los users
app.use('/users', userRouter);

//middleware inicio de sesión

// Aquí tendremos los endpoints y rutas de los productos
app.use('/products', productRoutes);

app.use('/cart', [authMiddleware.isAuthenticated], cartRoutes);

app.use('*', (req, res, next) => {
  const error = new Error('Route not found'); 
  error.status = 404;
  next(error); // Lanzamos la función next() con un error
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});