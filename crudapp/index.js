const express = require('express');
const  mongoose = require('mongoose');
const app = express();
const User = require('./models/index.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/crud", { useUnifiedTopology:true, useNewUrlParser:true});

const connection = mongoose.connection;
connection.once('open', function(){
    console.log('connection successfully')
})

app.set('view engine', 'ejs');
app.set('views', 'views')

app.get('/', function(req, res){

    res.render('insert')
});

app.post('/insert', function(req, res){
        
    const product = new User({
       
        name: req.body.Name,
        brand: req.body.Brand,
        category: req.body.Category,
        price: req.body.Price
       
    })
    product.save(() => {
        res.redirect('/show')
    })
});

app.get('/show', function(req, res){

    User.find({}, function(err, result){
        res.render('show', {products:result});
    })
   
});

app.get('/delete/:id', async function(req, res){

       await User.findByIdAndDelete(req.params.id);
        res.redirect('/show');
});

app.get('/edit/:id',  (req, res) => {

        User.findById({_id:req.params.id}, req.body, {new: true}, (err, result) => {
            if(err){
                console.log('err');
            }else{
                res.render('edit', {products:result});
            }
        })
        
});

app.post('/edit/:id', (req, res) => {

   User.findOneAndUpdate({_id:req.params.id},req.body, (err, docs) => {
        if(err){
            console.log('err');
        }else{
            
            res.redirect('/show');
        }
    });
            //   console.log(updateduser);


    //  await User.findByIdAndUpdate(req.params.id, req.body);              
    //   console.log(req.body);
     
        // res.redirect('/show');
        
    
});

app.listen(4000, function(){
    console.log('Go to port number 4000');
});