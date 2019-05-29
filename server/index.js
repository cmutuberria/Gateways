const express = require('express');
const morgan = require('morgan');
const cors= require('cors');
const app = express();
const {mongoose}=require('./database');


// Settings
app.set('port', process.env.PORT ||3001);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors({origin:'http://localhost:4200/'}));
app.use(cors());

//Routes

app.use('/api/gateway',require('./routes/routes'));


//Starting the server
app.listen(app.get('port'), ()=>{
});

module.exports=app