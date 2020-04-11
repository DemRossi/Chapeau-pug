const passport = require("passport")
const User = require("../models/User")
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
