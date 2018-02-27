const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , dotenv = require('dotenv').config()
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0');

const ctrl = require('./controller.js')

const app = new express()
app.use(bodyParser.json())
app.use(cors())
app.use( express.static( __dirname + `/../build` ) );
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// ========== AUTH0 ===============================\\
const {
    AUTH_DOMAIN,
    AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET,
    AUTH_CALLBACK_URL,
    CONNECTION_STRING
} = process.env

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    console.log(profile);
    let {displayName, user_id, picture} = profile;
    const db = app.get('db');
    db.users.find_user([user_id]).then(function(user){
        if(!user[0]){
            db.users.create_user([
                displayName, 
                user_id,
                picture
            ]).then(user => {
                return done(null, user[0].id)
            })
        }
        else {
            return done(null, user[0].id)
        }
    })
}))

passport.serializeUser((id, done) => {
    return done(null, id)
})

passport.deserializeUser((id, done) => {
    console.log(id)
    app.get('db').users.find_session_user([id])
        .then(function (user) {
            return done(null, user[0])
        })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESSREDIRECT,
    failureRedirect: process.env.FAILUREREDIRECT
}))

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('User not found.');
    }
    else {
        res.status(200).send(req.user);
    }
})

app.get('auth/logout', function (req, res) {
    req.logOut();
    res.redirect('/')
})

// ===========NO AUTH REQUIRED ENDPOINTS==========\\

app.get('/api/getAllSales', ctrl.getAllSales)
app.get('/api/getInventory/:id', ctrl.getInventory)


///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENET OUT WHEN AUTH0 READY///
///////////////////////////////////
// app.use((req, res, next) =>{
//     if(!req.session.user){
//         req.session.user = {
//             id: 1,
//             user_name: "harrison ford", 
//             email: "adventureBuilder2049@gmail.com", 
//             name: "adventure", 
//             profile_picture : "http://www.placekitten.com/200/250",
//             auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
//         }
//     }
//     next();
// })

// ===========AUTHENTICATION===========\\

// app.get('/api/loginDummy')

// =============END POINTS=============\\

app.get('/api/getUser', ctrl.getUser)
app.get('/api/getUserSales', ctrl.getUserSales)
app.get('/api/distance', ctrl.getDistance)

app.post('/api/newSale', ctrl.newSale)
app.post('/api/newInventory', ctrl.newInventory)

app.put('/api/updateSale', ctrl.updateSale)
app.put('/api/updateUser', ctrl.updateUser)
app.put('/api/updateInventory', ctrl.updateInventory)

app.delete('/api/deleteSale/:id', ctrl.deleteSale)
app.delete('/api/deleteOneInv', ctrl.deleteOneInv)
//=====================================\\

const SERVER_PORT = process.env.SERVER_PORT

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    
    app.listen(SERVER_PORT, _ => {
        console.log(`The soul of man is the fire of his heart ${SERVER_PORT}`)
    })
});