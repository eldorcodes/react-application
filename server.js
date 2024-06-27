const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const port = 4000;

const JobApplications = require('./models/User');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors())

mongoose.connect(keys.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Mongo error',err))


app.post(`/applications`,(req,res) => {
    console.log(req.body);
    new JobApplications({
        fullname:req.body.fullName,
        nationality:req.body.nationality,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email,
        date:new Date().toString()
    }).save()
    .then(() => {
        console.log('User data successfully saved into mongoDB')
    })
    .catch(e => console.log(e))
})

app.get('/apps',(req,res) => {
    JobApplications.find({})
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/:id',(req,res) => {
    let id = req.params.id;
    console.log(id);
    JobApplications.findByIdAndDelete(id)
    .then(() => {
        res.json({message:'success'})
    })
    .catch(err => console.log(err))
})
// new comments
app.listen(port,(err) => {
    if (err) {
        throw err
    }
    console.log(`Server started on port ${port}`);
});