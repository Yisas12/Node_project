const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('users');
});

//redirigimos al user para que se registre
router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', async(req, res, next) => {

    passport.authenticate('local-register', (error, user) => {
        // Si hay un error, renderizamos de nuevo el formulario con un error
         if (error) {
              return res.render('register', { error: error.message });    
          }
        
        // Si no hay error, redijimos a los usuarios a la ruta que queramos
        return res.redirect('/products');
    })(req); // ¡No te olvides de invocarlo aquí!
    // Invocamos a la autenticación de Passport
  });


//redirigimos al login de user
router.get('/login', (req, res, next) => {
    res.render('login');
});

//invocamos al login si alguien quiere auetnticarse
  router.post('/login', async(req, res, next)=>{
      
        passport.authenticate('local-login', (error, user) => {
            
            if (error) {
                return res.render('register', { error: error.message });    
            }
          
            req.login(user._id,()=>{
                return res.redirect('/products/pages/1');
            })
          // Si no hay error, redijimos a los usuarios a la ruta que queramos
          
        })(req);
});
  

//implementación de signout
/*router.get('/signout', (req, res) =>{
    req.logOut();
    res.redirect('/');
});*/

router.post('/logout', (req, res, next) => {
    if (req.user) {
      // Destruimos el objeto req.user para este usuario
      req.logout();
  
      req.session.destroy(() => {
        // Eliminamos la cookie de sesión al cancelar la sesión
        res.clearCookie('connect.sid');
        // Redirijimos el usuario a la home
        res.redirect('/');
      });
    } else {
      return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
    }
  });

module.exports = router;