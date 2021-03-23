const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');

// Creamos los salts de bcrypt
const saltRounds = 10;

//estrategia de registro
passport.use(
  'local-register',
  new LocalStrategy( //estrategia de registro para los usuarios
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => { 
        /*vemos si el usuario existe o no para mandar errores o registrarlo 
        Esta función async lo que hace es ejecutarse tan rápido como el código lo requiera*/
      try {
        // Primero buscamos si el usuario existe en nuestra DB
        const previousUser = await User.findOne({ email: email });
        
        // Si hay usuario previamente, lanzamos un error
        if (previousUser) {
          const error = new Error('The user is already registered!');
          return done(error);
        }

        // Si no existe el usuario, vamos a "hashear" el password antes de registrarlo
       /*el await lo que hace es hacer esperar a la función async hasta 
       que no termine de hacer el hash de la contraseña, en este caso*/
        const hash = await bcrypt.hash(password, saltRounds);

        // Creamos el nuevo user y lo guardamos en la DB
        const newUser = new User({
          name: req.body.name,
          email: email,
          password: hash,
        });

        const savedUser = await newUser.save();
        
        // Invocamos el callback con null donde iría el error y el usuario creado
        done(null, savedUser);
      } catch (err) {
        // Si hay un error, resolvemos el callback con el error
        return done(err);
      }
    }
  )
);

//estrategia de login
passport.use(
    'local-login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async(req, email, password, done) =>{
            try{
                //buscamos el usuario en la base de datos
                const userFinded = await User.findOne({email: email});

                //si ese usuario existe
                if(userFinded != null){
                    //si el usuario existe y la contraseña introducida es la misma que la que tiene en la bd
                    const bc = await bcrypt.compare(password, userFinded.password);

                    if(bc){
                      return done(null, userFinded);
                        
                    }
                    else{
                        console.log('Invalid Password');
                        return done(null, false);
                    }
                }
                else{
                    console.log('User Not Found with email '+ email);
                    //return done(null, false, req.flash('message', 'User Not found.'));
                    return done(null, false);
                }
            }catch(err){
                //si hay algún error
                return done(err);
            }
        }
    )
);

passport.serializeUser(async(user, done) =>{
  done(null, user);
  
});

passport.deserializeUser(async(user, done)=>{
  try{
    return done(null, user);
  }catch(err){
    return done(err);
  }
});