const User = require('../models/user');

module.exports = app => {
    // List users route
    app.get('/users', (req,res) => {
        //res.json([]);
        User.getUsers((err,data) => {
            res.json(data);
        });
    });

    // Add users route
    app.post('/users', (req, res) => {
        //console.log(req.body);
        var userData = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId){
                res.status(200).json({
                    success: true,
                    msg: 'Usuario Insertado',
                    data: data
                });
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    // Update users route
    app.put('/users/:id', (req, res) => {
        var userData = {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };
        User.updateUser(userData, (err, data) => {
            if (data && data.msg){
                res.json(data);
            }else{
                res.json({
                    success: false,
                    msg: 'error'
                });
            }
        });
    });

    // Delete users route
    app.delete('/users/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, result) => {
            if (result && result.msg === 'deleted' || result.msg === 'not exists'){
                res.json({
                    "success": "true",
                    "msg":result.msg
                });
            }else{
                res.status(500).json({
                    "msg":"Error"
                })
            }
        });
    });
};