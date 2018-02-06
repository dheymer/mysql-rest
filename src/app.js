/**
 * @name: MySQL-REST (server app)
 * @description: Sample of an REST API made in NodeJS, Express and MySQL
 * @version: 1.0
 * @since: 31-01-2018
 * @author: Dheymer Leon
 *          Phone     : +593-98-7982998
 *          Email     : dheymer@gmail.com
 *          IG/TW     : @dheymer
 *          Facebook  : @dheymerleonweb
 *          Skype     : dheymer
 *          LinkedIn  : linkedin.com/in/dheymer
 *          DeviantArt: dheymer.deviantart.com
 *          Website   : dheymer.000webhostapp.com
 */
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// settings
app.set ('port', process.env.PORT || 3000);     // Set the listening port for the DB petitions (3000 by default)

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
require('./routes/userRoutes')(app);

// static files


app.listen(app.get('port'), () => {     // Set the app listening the port for the DB petitions (port 3000 by default)
    console.log('server on port ' + app.get('port').toString());
});