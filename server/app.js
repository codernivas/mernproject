require("dotenv").config()
require("./db/conn")
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 6005
const session = require("express-session")
const userdb = require("./model/userSchema")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy
const clientid =
  "982960140440-41u3mglhr718qhinc55392008p2t8lou.apps.googleusercontent.com"
const clientsecret = "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"
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

app.use(express.json())

//setup session

app.use(
  session({
    secret: "12345dfghjkldfgnm",
    resave: false,
    saveUninitialized: true,
  })
)

//setup passport

app.use(passport.initialize())
app.use(passport.session())
passport.use(new OAuth2Strategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"]
},
async (accessToken, refreshToken, profile, done) => {
  console.log("profile", profile)
  try {
    let user = await userdb.findOne({ googleId: profile.id })
    if (!user) {
      user = new userdb({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      })
      await user.save()
    }
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
));


passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
)
// app.get("/", (req, res) => {
//   res.status(200).json("server start")
// })
app.listen(PORT, () => {
  console.log(`server start at port no ${PORT}`)
})
