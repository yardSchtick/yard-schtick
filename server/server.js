const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , dotenv = require('dotenv').config()
    , massive = require('massive')
    , session = require('express-session')

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

// ===========NONE AUTH REQUIRED ENDPOINTS==========\\

app.get('/api/getAllSales', ctrl.getAllSales)
app.get('/api/getInventory/:id', ctrl.getInventory)


///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENET OUT WHEN AUTH0 READY///
///////////////////////////////////
app.use((req, res, next) =>{
    if(!req.session.user){
        req.session.user = {
            id: 1,
            user_name: "harrison ford", 
            email: "adventureBuilder2049@gmail.com", 
            name: "adventure", 
            profile_picture : "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    next();
})

// ===========AUTHENTICATION===========\\

app.get('/api/loginDummy')

// =============END POINTS=============\\

app.get('/api/getUser', ctrl.getUser)
app.get('/api/getUserSales', ctrl.getUserSales)

app.post('/api/newSale', ctrl.newSale)

app.put('/api/updateSale', ctrl.updateSale)
app.put('/api/updateUser', ctrl.updateUser)


//=====================================\\

const port = process.env.PORT

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    
    app.listen(port, _ => {
        console.log(`The soul of man is the fire of his heart ${port}`)
    })
});