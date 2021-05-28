const path = require('path')
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express();

//connecting to db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('db ok'))
    .catch(err => console.log(err))

//importing routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views')) //Se declara dónde se buscaran los HTML cuando sean llamados por una ruta - path.join concatena el directorio dependiendo OS
app.set('view engine', 'ejs') // se declara que los HTML tendran extensión .ejs

//middlewares
app.use(morgan('dev')); //Activar morgan con script "dev"
app.use(express.urlencoded({extended: false})) //entiende formularios HTML

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})