const registerRoutes = require('./api/register/register-routes.js')
const authRoutes = require('./api/auth/auth-routes.js')

exports.registerRoutes = (app) => {
    app.use('/api', registerRoutes)
    app.use('/api', authRoutes)
}