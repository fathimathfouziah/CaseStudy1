//mongodb+srv://fouziah:fouziahh@cluster0.xg9rl.mongodb.net/Casestudydb?retryWrites=true&w=majority
const express = require('express')
const mongoose = require('mongoose');
const applicantModel = require('./src/models/applicant')
const applicantroute= require('./src/routes/applicantroute')

mongoose.connect('mongodb+srv://fouziah:fouziahh@cluster0.xg9rl.mongodb.net/Casestudydb?retryWrites=true&w=majority')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = 5001
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    // res.setheader("Access-Control-Allow-Origin", "*");
    // res.setheader("Access-Control-Allow-Methods: GET POST DELETE PUT")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use('/api/auth', applicantroute);


app.listen(PORT, () => {
    console.log(`I am list at port ${PORT}`)
})

