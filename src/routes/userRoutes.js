/**
 * @name: MySQL-REST (user routes)
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
const User = require('../models/user');

module.exports = app => {
    /**
     * List users route
     */
    app.get('/users', (req,res) => {
        User.getUsers((err,data) => {               // Excecute the READ function
            res.json(data);                         // And return the response as a JSON object
        });
    });

    /**
     * Add users route
     */
    app.post('/users', (req, res) => {
        var userData = {                            // Define and organize the user data as an object
            id: null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };

        User.insertUser(userData, (err, data) => {  // Excecute the CREATE function, using the userData as parameter
            if (data && data.insertId){             // If the function returned an insertId
                res.status(200).json({              // Send the response for status 200 (success), as a JSON object
                    success: true,                  
                    msg: 'Usuario Insertado',
                    data: data
                });
            }else{                                  // Send the response for status 500 (server error), as a JSON object
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    /**
     * Update users route
     */
    app.put('/users/:id', (req, res) => {
        var userData = {                            // Define and organize the user data as an object
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };
        User.updateUser(userData, (err, data) => {  // Excecute the UPDATE function, using the userData as parameter
            if (data && data.msg){                  // If it could update
                res.json(data);                     // return the data as a JSON object
            }else{                                  // otherwise
                res.json({                          // return the error message
                    success: false,
                    msg: 'error'
                });
            }
        });
    });

    /**
     * Delete users route
     */
    app.delete('/users/:id', (req, res) => {
        // Excecute the DELETE function, using the user's ID as parameter
        User.deleteUser(req.params.id, (err, result) => {
            // If it could delete or if the user doesn't exist
            if (result && result.msg === 'deleted' || result.msg === 'not exists'){
                res.json({                          // Send the response for status 200 (success) as JSON object
                    "success": "true",
                    "msg":result.msg
                });
            }else{                                  // otherwise
                res.status(500).json({              // Send the response for status 500 (server error), as a JSON object
                    "msg":"Error"
                })
            }
        });
    });
};