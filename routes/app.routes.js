const express = require('express');
const router = express.Router();

//pagina de bienvenida
router.get('/', (req, res)=>{
    res.render('welcome');
});

/*router.get('/users/register', (req, res, next) => {
    res.render('register');
});*/

/*accedemos al register
router.get('/register', (req, res, next) => {
    res.render('register');
});

//accedemos al login
router.get('/login', (req, res, next) => {
    res.render('login');
});*/


//redirigimos al user para que se registre
/*router.get('/register', (req, res, next) => {
    res.render('register');
});

//invocamos al passport.authenticate si alguien quiere registrarse y después redirigimos a /products
router.post('/register', (req, res, next) => {
    // Invocamos a la autenticación de Passport
    passport.authenticate('register', (error, user) => {
      // Si hay un error, renderizamos de nuevo el formulario con un error
      if (error) {
              return res.render('register', { error: error.message });    
          }
  
      // Si no hay error, redijimos a los usuarios a la ruta que queramos
      return res.redirect('/products');
    })(req); // ¡No te olvides de invocarlo aquí!
});


//redirigimos al login de user
router.get('/login', (req, res, next) => {
    res.render('login');
});
//invocamos al login si alguien quiere auetnticarse
  router.post('/login', (req, res, next) =>{
    passport.authenticate('login', {
        successRedirect: '/products',
        failureRedirect: '/users/login',
        failureFlash: true

    })
});
  

//implementación de signout
router.get('/signout', (req, res) =>{
    req.logOut();
    res.redirect('/');
});
*/
module.exports = router;