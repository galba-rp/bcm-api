const express = require ('express'); //package import
const app = express(); //run the package
const mongoose = require('mongoose');
require ('dotenv/config');
const bodyParser = require('body-parser');
const cors = require ('cors');



// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Import routes
const teamsRoutes = require('./routes/teams');
app.use ('/', teamsRoutes);


//routes
app.get('/', (req, res) => {
    res.send('here we are');
});



//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
{ useUnifiedTopology: true, useNewUrlParser: true },
 ()=> console.log('connected to db'))


app.listen(3000); //start listening on the server on port 3000