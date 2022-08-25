const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const  mysql = require('mysql2');
const nodemailer = require('nodemailer');
const { resourceLimits } = require('worker_threads');
const app = express();
const PORT = process.env.PORT || 8080;

// conexion a la base de datos
const conexion = mysql.createConnection({
host: process.env.HOST,
user: process.env.USER,
port: process.env.PORT,
password: process.env.PASSWORD,
database: process.env.DATABASE
});


conexion.connect((err) => {
if (err) {
  console.error('Error en la conexion: ${err.stack}')
  return;
}
console.log(`Conectado a la base de datos ${process.env.DATABASE}`);
});


// configurar middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// configuracion del motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))
//connection.end();


app.get('/', (req, res, next) => {
res.render('index', {
  titulo: 'bienvenidos a la app de la utn',
  //style: 'formulario.css'
})
});

app.get('/formulario', (req, res, next) => {
  res.render('formulario', {
    titulo: 'formulario para productos'
  });
});


app.get('/productos', (req, res, next) => {

  //let sql = 'SELECT * FROM producto';
  let datos = {};
  //conexion.query(sql, datos, (error, result) => {
   //if (error) throw error;
    res.render('productos', {
         titulo: 'formulario de productos',
         results: {},
    });
  //});
});

app.post('/formulario', (req, res) => {
// desestructuracion de datos
//const {nombre, apellido, dni} = req.body;
// asigno datos a las variables enviadas desde el front
//let nombre = req.body.nombre;
//let precio = req.body.precio;
//res.send(`tus datos han sido recibidos: nombre: ${nombre} y //apellido: ${apellido} y dni: ${dni}`)


const { nombre, precio } = req.body;

 console.log(nombre, precio);

 if(nombre == '' || precio == '') {
  let validacion = 'rellene los campos correctamente..';
  res.render('formulario', {
    titulo: 'formulario de productos',
    validacion
  });
 }else{

   let datos = {
      nombre: nombre,
     precio: precio
   };

   let sql = 'INSERT INTO producto SET ?';

    conexion.query(sql, datos, (error, result) => {
     if (error) throw error;
      res.render('formulario', {
           titulo: 'formulario de productos'
                  });
            });
         }
  });


app.get('/contacto', (req, res) => {
  res.render('contacto', {
    titulo: 'Formulario para suscripcion'
  })
});

app.post('/contacto', (req, res) => {

  const { nombre, email } = req.body;
  let fecha = new Date();
  //let dia = fecha.getFullYear();

  if (nombre == '' || email == '') {
    let validacion = 'Rellene la suscripción correctamente.';
    res.render('contacto', {
      titulo: 'Formulario para suscripcion',
      validacion
    });
   }else{

    console.log(nombre);
    console.log(process.env.PASSWORD_GMAIL);

      async function envioMail(){
     
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465, 
          secure: true,
          auth: { 
            user: process.env.USERMAIL, 
            pass: process.env.PASSWORD_GMAIL  //16 caracteres que da gmail
            }
        });

        let envio = await transporter.sendMail({
            from: process.env.USERMAIL,
            to: `${email}`,
            subject: 'Gracias por suscribirte a nuestra empresa',
            html: `Muchas gracias por contactarse con nosotros, estaremos enviando su pedido a la brevedad. <br>
             Todas nuestras promociones ya estarán a su disposición. <br>
             ${fecha}`
        });




        //res.send(`Tu nombre es ${nombre} y tu email registrado es ${email}`);
        res.render('enviado', {
            titulo: 'mail enviado',
            nombre, 
            email
        })  
    }
    envioMail();
  }

})

app.listen(PORT, () => {
 // console.log(`el servidor esta trabajando en el Puerto ${PORT}`);
});
