const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

exports.setEnvironment = (app) => {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = 'mongodb+srv://roman:vRiB8vahSH9!Vfa@pickuppals.3erwn.mongodb.net/pickuppals?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'my-development-secret'
    console.log('setting development environment')
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}