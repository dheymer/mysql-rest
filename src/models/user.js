/**
 * @name: MySQL-REST (user data model)
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

const mysql = require('mysql');

connection = mysql.createConnection({           // Creating the MySQL connection, using the MySQL server connection data
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testapirest'
});

let userModel = {};                             // Define the table class as an empty object.

/**
 * The READ function for the GET route of the API
 * @param {*} callback The function's callback
 */
userModel.getUsers = (callback) => {
    if (connection){                                // If there's a MySQL connection
        connection.query(                           // Execute the corresponding SELECT query...
            'SELECT * FROM users ORDER BY id',
            (err,rows) => {                         // ...and send the response to the callback of the function
                if (err){                           // If the query result is an error, return the error
                    throw(err);
                }else{                              // ...otherwise, return the resulting rows to the callback
                    callback (null, rows);
                }
            }
        )
    }
};

/**
 * The CREATE function for the POST route of the API
 * @param {*} userData The user's data to insert in the table
 * @param {*} callback The function's callback
 */
userModel.insertUser = (userData, callback) => {
    if (connection){                                // If there's a MySQL connection
        connection.query(                           // Excecute the corresponding INSERT query...
            'INSERT INTO users SET ?', userData,    // But using the user's data sent as params
            (err, result) => {                      // Send the response to the callback of the function
                if(err){                            // If the query result is an error, return the error
                    throw err;
                }else{                              // ...otherwise, return the id of the inserted user
                    callback (null, {
                        'insertId':result.insertId
                    });
                }
            }
        );
    }
}

/**
 * The UPDATE function for the PUT route of the API
 * @param {*} userData The user's data to edit in the table
 * @param {*} callback The function's callback
 */
userModel.updateUser = (userData, callback) => {
    if (connection){    // If there's a MySQL connection
        // Excecute the corresponding UPDATE query, using the user's data sent as params
        const sql = `                                           
            UPDATE users SET
            username = ${connection.escape(userData.username)},
            password = ${connection.escape(userData.password)},
            email = ${connection.escape(userData.email)}
            WHERE id = ${connection.escape(userData.id)}
        `;
        connection.query(sql, (err, result) => {    // Send the response to the callback of the function
            if (err){                               // If the query result is an error, return the error
                throw err;
            }else{                                  // ...otherwise, return a success message
                callback(null, {
                    "msg": "success"
                });
            }
        });
    }
}

/**
 * The DELETE function for the DELETE route of the API
 * @param {*} id The id of the user to delete
 * @param {*} callback The function's callback
 */
userModel.deleteUser = (id, callback) => {
    if (connection){                // If there's a MySQL connection
        // Create the SELECT query to check if the user exist in the table
        const sqlExist = `
            SELECT * FROM users WHERE id = ${connection.escape(id)}
        `;
        connection.query(sqlExist, (err, row) => {          // Excecute the SELECT query
           if(row){                                         // If the user exist in the database
                // Create the DELETE query, with the user's id as parameter
                const sql = `
                    DELETE FROM users WHERE id = ${id}
                `;
                // Excecute the DELETE query and send the response to the callback
                connection.query(sql, (err, result) => {
                    if (err){                               // If the query results in an error, return the error
                        throw err;
                    }else{                                  // Otherwise, return the "deleted" message
                        callback(null, {
                            "msg":"deleted"
                        });
                    }
                });
           }else{                                           // If the user doesn't exist in the database
                callback(null, {
                    "msg": "not exists"                     // Return the message indicating that user doesn't exist
                });
           }
        });
    }

}

// Export the module as data model
module.exports = userModel;