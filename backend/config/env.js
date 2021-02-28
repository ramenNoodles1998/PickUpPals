const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

exports.setEnvironment = (app) => {
    process.env.NODE_ENV = 'development'
    //change this db url
    process.env.DB_URL = 'mongodb://localhost:27017/vue-db'
    process.env.TOKEN_SECRET = 'my-development-secret'
    console.log('setting development environment')
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}