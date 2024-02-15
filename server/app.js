require("dotenv").config()
require("./db/conn")
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 6005
const session = require("express-session")
const userdb = require("./model/userSchema")
const passport = require("passport")
const path = require("path")
const jwt = require("jsonwebtoken")
const empCollection = require("./model/model")
const template_path = path.join(__dirname, "./template/views")
app.set("view engine", "hbs")
app.set("views", template_path)
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
app.set("view engine", "ejs")
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.render("index")
})

//register
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password
    if (password) {
      const empData = new empCollection({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
      })
      const postData = await empData.save()
      res.status(200).send(postData) // Send success response
    } else {
      res.status(400).send("Password is missing") // Send error response with 400 status code
    }
  } catch (error) {
    console.error("Error occurred during registration:", error)
    res.status(500).send("Internal Server Error") // Send generic error response with 500 status code
  }
})
// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await empCollection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send("Invalid email or password");
    }

    // If the user is authenticated, generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, "my_secret_key");

    // Send the token back to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).send("Internal Server Error");
  }
});
//JWT login

app.post("/api/login", async (req, res) => {
  const user = { id: 3 }
  const token = jwt.sign({ user }, "my_secret_key")
  res.json({token:token})
})

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
passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile.email_verified)
      try {
        let user = await userdb.findOne({ googleId: profile.id })
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            email_verified: profile.email_verified,
            accessToken: accessToken,
          })
          await user.save()
        }
        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// )

app.get("/auth/google", (req, res, next) => {
  // Clear session before initiating Google authentication
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err)
      return next(err)
    }
    // Initiate Google authentication
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next)
  })
})

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/login",
  })
)
app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user })
  } else {
    res.status(400).json({ message: "Not authorized" })
  }
})

// app.get("/", (req, res) => {
//   res.status(200).json("server start")
// })

app.listen(PORT, () => {
  console.log(`server start at port no ${PORT}`)
})
