var mysql = require('mysql');

var connectionpool = mysql.createPool({
    host:"yourdbserver.rds.amazonaws.com",
	user :"yourUsername",
	password:"yourPassword",
    database :"volunteerforindia"
});

var volunteer_functions = {
    
    login : function(data,cb){
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                var q='';
                if(data.type === 'volunteer'){
                    q="SELECT * from volunteer_master where email=? and password=?";    
                }else{
                    q="SELECT * from ngo_master where email=? and password=?";
                }
                var a=data.email;
                var b = data.password;
                console.log(a,b);
                var query = connection.query(q,[a,b], function(err, rows){
                    if(err){
                        console.log(err);
                        cb({result: 'failure',
                        err:'Sorry'
                        });
                     }
                    console.log('14 '+rows);
                    if(rows.length !== 0){
                        cb({
                        result: 'success',
                        json : rows
                        });
                    }else{
                        cb({
                            result: 'failure',
                            message: 'invalid email and password'
                        });
                        }
                    connection.release();
                });
            }
        });
    },
    getProjects : function(data,cb){
         connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                var q="select a.project_name, a.start_date, a.location, a.project_status, b.skill_name, c.cause_name, d.name from project a, skill b, causes c, ngo_master d where a.cause_id in (select cause_id from volunteer_causes where volunteer_id in (select volunteer_id from volunteer_master where email = 'a@a.com')) and a.ngo_id = d.ngo_id and b.skill_id = a.skill_id and a.cause_id = c.cause_id;";
               
                connection.query(q,function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }else{
                        console.log('db success',rows);
                        cb({
                            "result":"success",
                            "project":rows
                        });
                    }
                    connection.release();
                });
            }
    });
    },
    profile : function(data,cb){
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                connection.query('select * from volunteer_master where email = ?)',data.email,function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }
                    console.log('db success');
                    cb({
                        result: 'success',
                        err:    '',
                        json:   rows
                    });
                    connection.release();
                });
            }
    });
    },
    
    editProfile : function(data,cb){
         connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                connection.query('select * from volunteer_master where email = ?)',data,function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }
                    console.log('db success');
                    cb({
                        result: 'success',
                        err:    '',
                        json:   rows
                    });
                    connection.release();
                });
            }
    });
    },
    
    causes: function(data,cb){
          connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                connection.query('SELECT * FROM cause c,volunteer_causes v where c.cause_id = v.volunteer_id and v.email =? ',data.email,function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }
                    console.log('db success');
                    cb({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    
    },
    myProjects: function(data,cb){
          connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                connection.query('SELECT * FROM cause c,volunteer_causes v where c.cause_id = v.volunteer_id and v.email =? ',data.email,function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }
                    console.log('db success');
                    cb({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    },
    getAll : function(data,cb){
   
    connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                connection.query('SELECT * FROM volunteer_master',function(err,rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                           err:'Sorry'
                        });
                    }
                    console.log('db success');
                    cb({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    
    },
    
    edit : function(req, res){
        
        var id = req.params.id;
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            } else {
                connection.query('SELECT * FROM volunteer_master WHERE id = ?',[id],function(err,rows){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    res.send({
                        result: 'success',
                        err:    '',
                        json:   rows,
                        length: rows.length
                    });
                    connection.release();
                });
            }
        });
    },
    
    /*Save the customer*/
    add : function(d,cb){
        console.log("inside volunteer add" , d);
        var input = JSON.parse(JSON.stringify(d));
        var data = {
                name: input.name,
                email: input.email,
                mob: input.mob,
                city:input.city,
                adhaar_number:input.adhaar_number,
                password:input.password
        };
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                var query = connection.query("INSERT INTO volunteer_master set ? ",data, function(err, rows){
                    if(err){
                    console.error(err);
                    cb({result: 'failure',
                    err:'Sorry'
                    });
                }
                console.log('db success'+rows);
                cb({
                    result: 'success',
                    err:    '',
                    json:   rows
                });
                   
                    connection.release();
                });
            }
        });
    },
    
    getAllUsers : function(cb){
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                var query = connection.query("Select * from volunteer_master", function(err, rows){
                    if(err){
                        console.error(err);
                        cb({result: 'failure',
                        err:'Sorry'
                    });
                }
                console.log('db success'+rows);
                cb({
                    result: 'success',
                    err:    '',
                    json:   rows
                });
                   
                    connection.release();
                });
            }
        });
    },
    addCauses : function(d,cb){
        console.log("inside volunteer add" , d);
        var input = JSON.parse(JSON.stringify(d));
        var data = {
              volunteer_id : input.volunteer_id,
              cause_id : input.cause_id
        };
        connectionpool.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ',err);
                cb({result: 'failure',
                    err:'Sorry'
                });
            } else {
                var query = connection.query("INSERT INTO volunteer_causes set ? ",data, function(err, rows){
                    if(err){
                    console.error(err);
                    cb({result: 'failure',
                    err:'Sorry'
                    });
                }
                console.log('db success'+rows);
                cb({
                    result: 'success',
                    err:    '',
                    json:   rows
                });
                   
                    connection.release();
                });
            }
        });          
    }
    
};

module.exports = volunteer_functions;
