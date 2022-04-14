
const express = require('express')
const app = express()
const helmet = require('helmet')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth2')
const path = require('path')
require('dotenv').config()
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const myrouter = require('./routes/requests.route')
const {getInit} = require('./controllers/allreqs')
const cors = require('cors')

const config = {
	callbackURL: '/auth/google/callback',
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	cookey1: process.env.COOKIE_KEY_1,
	cookey2:process.env.COOKIR_KEY_2,
	user:process.env.user,
	password:process.env.password

}

const authOptions = {
	callbackURL: config.callbackURL,
	clientID: config.clientID,
	clientSecret: config.clientSecret 
}

const verifyCallback = (accessToken, refreshToken, profile, done) => {
	console.log('google profile:', profile);
	done(null, profile)
}

// const isVerified = (req, res, next) => {
// 	console.log(req.user);
// 	if (!req.user) { return res.redirect('/login') }
// 	next()
// }

 const mongoConnect=()=>{
 	dburl=`mongodb+srv://${config.user}:${config.password}@cluster0.ec3ss.mongodb.net/TODOSdatabase?retryWrites=true&w=majority`
 	mongoose.connect(dburl, {
 		useNewUrlParser: true,
 		useUnifiedTopology: true,
 	}, (err)=>{
 		if (err) return err
 		app.listen(process.env.PORT  || 3500, ()=>{
 			console.log('started listenig at port ');
 			
 		})
 	})
 }

passport.use(new Strategy(authOptions, verifyCallback))

passport.serializeUser((user, done)=>{
	done(null, user.id)
})

passport.deserializeUser((id, done)=>{
	done(null, id)
})
app.use(cors())
app.use(helmet({crossOriginEmbedderPolicy: false}))

app.use(cookieSession({
	name:'session',
	maxAge:60*60*24*1000*30,
	keys:[config.cookey1, config.cookey2]
}))

app.use(passport.session())

app.use(passport.initialize())

app.get('/auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/failure',
	successRedirect: '/',
	session: true,
	scope:['email']
}), (req, res) => {
	console.log('authentication function called');
})

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/login.html'))
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req, res, next)=>{
	if (!req.user) { return res.redirect('/login') }
	next()
}
)
app.set('view engine', 'ejs')

app.use('/api/v1', myrouter)



app.use(express.static(__dirname + '/views/'))
// app.get('/auth/google', passport.authenticate('google',{
// 	scope:['email']
// }))

app.get('/', getInit)

mongoConnect()
