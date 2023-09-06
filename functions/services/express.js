'use strict'

const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const errorHandler = require('../middlewares/error-handler')
const apiRouter = require('../routes/api')
const passport = require('passport')
const passportJwt = require('../services/passport')
const path = require('path')
const {onRequest} = require('firebase-functions/v2/https')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(helmet())
app.set('view engine', 'ejs')
app.set('views', path.resolve('views'))

if (config.env !== 'test') app.use(morgan('combined'))

// passport
app.use(passport.initialize())
passport.use('jwt', passportJwt.jwt)

// baseurl
app.get('/', (req, res) => {
  res.send({app: 'Vision Calling'})
})

// render HTML for user password reset
app.get('/verify-password-key', (req, res) => {
  res.render('forgot-password', {
    redirectUrl: '/api/auth/reset-password?key=' + req.query.key
  })
})
// render HTML for showing status of any operation
app.get('/status', (req, res) => {
  res.render('status', {
    status: req.query.status
  })
})
app.use('/api', apiRouter)
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)

exports.start = () => {
//   app.listen(config.port, (err) => {
//     if (err) {
//       console.log(`Error : ${err}`)
//       process.exit(-1)
//     }

//     console.log(`${config.app} is running on ${config.port}`)
//   })
}

exports.app = onRequest(app)
