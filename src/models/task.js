//models/tasks para detallar la forma en que serán enviados los datos

const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('tasks',TaskSchema) // model toma el esquema y lo guarda en una colección de Mongo