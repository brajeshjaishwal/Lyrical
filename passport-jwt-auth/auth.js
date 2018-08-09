var passport = require('passport')
var ExtractJwt = require('passport-jwt').ExtractJwt
var Strategy_JWT = require('passport-jwt').Strategy

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrkey: process.env.JWT_SECRET,
    failOnError: true,
    passReqToCallback: true,
}

const JWTStrategy = new Strategy_JWT(opts, {

})

const initialize = () => {
    passport.use('jwt', JWTStrategy)
    passport.initialize()
}

const authenticate = () => {

}

const login = () => {

}

