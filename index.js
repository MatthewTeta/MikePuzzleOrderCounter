const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const GPIO = require('./GPIO')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

GPIO.init()

app.post('/increment', (req, res) => {
    console.log("increment")
    GPIO.increment()
    .then(count => res.send(count.toString()))
    .catch(err => res.status(504).send(err))
})

app.post('/decrement', (req, res) => {
    console.log("decrement")
    GPIO.decrement()
    .then(count => res.send(count.toString()))
    .catch(err => res.status(504).send(err))
})

app.post('/set', (req, res) => {
    console.log("set")
    GPIO.set(req.body.count || 0)
    .then(count => res.send(count.toString()))
    .catch(err => res.status(504).send(err))
})

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
