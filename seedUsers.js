//conectamos bd
const mongoose = require('mongoose');

//obtenemos el schema
const User = require('./models/User');

//construimos los users
const users = [
    {
        name: 'Administrador',
        email: 'admin@admin.com',
        password: 'soyunadmin',
        cart: []
    },
    {
        name: 'user1',
        email: 'user1@user.com',
        password: 'soyeluser1',
        cart: []
    }
];

const userDocuments = users.map(user => new User(user));

const DB_URL = 'mongodb://localhost:27017/upgrade_class_3';

mongoose
.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  // Utilizando User.find() obtendremos un array con todos los users de la db
  const allUsers = await User.find();
  
  // Si existen users previamente, dropearemos la colección
  if (allUsers.length) {
    await User.collection.drop();
  }
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
  // Usaremos el array userDocuments
  // para llenar nuestra base de datos con todos los users.
  await User.insertMany(userDocuments);
})
.catch((err) => console.log(`Error creating data: ${err}`))
// Por último nos desconectaremos de la DB.
.finally(() => mongoose.disconnect());