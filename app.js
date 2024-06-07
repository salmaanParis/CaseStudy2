// Task1: initiate app and run server at 3000
const express = require('express')
const app = new express()
const morgan = require('morgan')
app.use(morgan('dev'))
require('dotenv').config()
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
require('./db/dbconnect')
const empData = require('./model/empData')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try {
        const data = await empData.find()
        // data = 'HELLO WELCOME'
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await empData.find({ _id: `${id}` })
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try {
        var item = req.body
        const data = new empData(item)
        const savedData = await data.save()
        res.status(200).send('Post successful')
    } catch (error) {
        res.status(404).send(error)
    }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await empData.deleteOne({ _id: `${id}` })
        res.status(200).send(`Deleted one record`)
    } catch (error) {
        res.status(404).send(error)
    }
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    try {
        var itemName = req.body.eName;
        var itemLocation = req.body.eLocation;
        var itemPosition = req.body.ePosition;
        var itemSalary = req.body.eSalary;
        data = await empData.updateOne( { eName: `${itemName}`}, { $set: { 
            eName:`${itemName}`,
            eLocation:`${itemLocation}`,
            ePosition:`${itemPosition}`,
            eSalary:`${itemSalary}`} } )
        res.status(200).send('Update successful')
    } catch (error) {
        res.status(404).send(error)
    }
})


// Updating an employee data by using api '/api/employeelist/:id'

app.put('/api/employeelist/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        var itemName = req.body.eName;
        var itemLocation = req.body.eLocation;
        var itemPosition = req.body.ePosition;
        var itemSalary = req.body.eSalary;
        data = await empData.updateOne( { _id:`${id}`}, { $set: { 
            eName:`${itemName}`,
            eLocation:`${itemLocation}`,
            ePosition:`${itemPosition}`,
            eSalary:`${itemSalary}`} } )
        res.status(200).send('Update using id successful')
    } catch (error) {
        res.status(404).send(error)
    }
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}:`)
})


