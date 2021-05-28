const express = require('express');
const router = express.Router();

const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find(); // carga todo el contenido de la colección exportada en task.js
    console.log(tasks);
    res.render('index', {
      tasks // renderiza index pasando tasks como parametro
    });
})

router.post('/add', async (req, res) => {
    const task = new Task(req.body); //arma un nuevo task con el contenido del body
    await task.save(); //guarda el task en db
    res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
      });
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/')
})

router.get('/done/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id})
    res.redirect('/');
})

module.exports = router;