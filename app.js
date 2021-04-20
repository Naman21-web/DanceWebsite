const express = require('express')
const path = require('path')
const fs = require('fs');
const bodyparser  = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app =express();
const port = 800;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const con = "This is best content on internet so for so use it wisely"
    const params = {'title':'This is dance website','content' : con}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const con = "This is best content on internet so for so use it wisely"
    const params = {'title':'This is dance website','content' : con}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body)
            myData.save().then(()=>{//.then() used to save data in mongodb
                res.send("Form submitted succesfully")
            }).catch(()=>{
                res.status(400).send("Item was not send to database")
            })
 
   // const params = {"message":"Your form has been submitted succesfully"}
    //res.status(200).render('contact.pug',params)
})
-
app.listen(port,()=>{
    console.log(`running at port ${port}`)
})