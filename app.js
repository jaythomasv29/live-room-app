const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); //gets data from form
const path = require('path');

//Database connection from export
const db = require('./config/database');

//Test DB
db.authenticate()
.then( function(){
    console.log('Database connected...')
})
    .catch(function(err){
        console.log('Error: ' + err)
    })

const app = express();

//Handlebars template engine
app.engine('handlebars', exphbs({defaultLayout: 'main' }))
//set view engine
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//Set staic folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/classes', require('./routes/classes'))
//loads index homepage route
app.get('/', function(req, res){
    res.render('index', {layout: 'landing'});
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));