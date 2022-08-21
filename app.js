const express = require('express')
const app = express()
const port = 3200
var cors = require('cors')
var http = require('http');
var bodyParser = require('body-parser');
const request = require('request')
var querystring = require('querystring')
const fs = require('fs')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/setPersonalData', (req, res) => {
  var data = fs.readFileSync('data.json')
  var myObject = JSON.parse(data)
  myObject.push(req.body)
  var newData = JSON.stringify(myObject)
  fs.writeFile('data.json', newData, err =>{
    // error checking
    if (err) throw err;

    //console.log("New data added.");
  });

  res.send(myObject)
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
  fs.writeFile('data.json', newData, err =>{
    // error checking
    if (err) throw err;

    //console.log("New data added.");
  });

  res.send(myObject)
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
  fs.writeFile('data.json', newData, err =>{
    // error checking
    if (err) throw err;

    //console.log("New data added.");
  });

  res.send(myObject)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})