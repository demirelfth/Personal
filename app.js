const express = require('express')
const app = express()
const port = 3200
var cors = require('cors')
var http = require('http');
var bodyParser = require('body-parser');
const request = require('request')
var querystring = require('querystring');
const fs = require('fs');
var rootDir = 'data.json';
var session = require('express-session');

// set up rate limiter for dos attack: maximum of five request per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1*60*100, // 1 minute
  max: 5
});

// apply rate limiter to all requests
app.use(limiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: "secret",
  cookie: {
      httpOnly: true,
      secure: true
  }
}));


app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/setPersonalData', (req, res) => {
  var data = fs.readFileSync('data.json')
  var myObject = JSON.parse(data)
  myObject.push(req.body);
  var newData = JSON.stringify(myObject)
  try{
    fs.writeFile(rootDir, newData, err =>{

    });
    res.send("Unknown data from user-side.");
    return;
  }catch(e){
    res.send(myObject);
    return;
  }
})

app.post('/deletePersonalData', (req, res) => {
  var data = fs.readFileSync('data.json')
  var myObject = JSON.parse(data)
  //myObject.push(req.body)
  for(let [i, personal] of myObject.entries()){
    if(personal.name == req.body.name && personal.surname == req.body.surname && personal.email == req.body.email){
      myObject.splice(i, 1);
    }
  }

  var newData = JSON.stringify(myObject)
  try{
    fs.writeFile(rootDir, newData, err =>{
      
    });
    res.send("Unkown data from user-side.");
    return;
  }catch(e){
    res.send(myObject);
    return;
  }
})

app.post('/updatePersonalData', (req, res) => {
  var data = fs.readFileSync('data.json')
  var myObject = JSON.parse(data)
  //myObject.push(req.body)
  for(let [i, personal] of myObject.entries()){
    if(personal.name == req.body.prevName && personal.surname == req.body.prevSurname && personal.email == req.body.prevEmail){
      myObject[i].name = req.body.name;
      myObject[i].surname = req.body.surname;
      myObject[i].email = req.body.email;
    }
  }

  var newData = JSON.stringify(myObject)
  try{
    fs.writeFile(rootDir, newData, err =>{

    });
    res.send("Unkwon data from user-side.");
    return;
  }catch(e){
    res.send(myObject);
    return;
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})