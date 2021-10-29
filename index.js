const express = require('express');
const app = express();
const mongo = require('mongodb');
const mongoclient = mongo.MongoClient;
const port = process.env.PORT||3500 ;
var cors = require('cors');
const mongourl = "mongodb+srv://sumanth:12345@sumanth.w8xsd.mongodb.net/grofers?retryWrites=true&w=majority";
var db;

app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Welcome To the grofers api</h1>");
})

app.get('/category', (req, res) =>{
    db.collection('category').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})


// http://localhost:3500/menudata?categoryId=2
app.get('/menudata', (req, res) =>{

    var query = {};
    if(req.query.categoryId){
        query = {category_id: Number(req.query.categoryId)}
    }
    db.collection('menudata').find(query).toArray((err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})

mongoclient.connect(mongourl, (err, client) => {
    if (err) {console.error("error while connecting to the mongodb server");}
    db = client.db('grofers');
    app.listen(port, () => {
        console.log(`app is listening in ${port}`);
    })
})

