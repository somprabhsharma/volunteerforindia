var dbHelper=require('../database/dbHelper');

var user={
	read : function(req,res){
		console.log('0');
		dbHelper._read(req.body.data,function(params){
			res.json(params);
		});
	},
	readByKey : function(req,res){
		console.log(req.body);
		res.send('hello');
	},
	insert : function(req,res){
		console.log(req.body);
		res.send('hello');
	},
	update : function(req,res){
		console.log(req.body);
		res.send('hello');
	},
	delete : function(req,res){
		console.log(req.body);
		res.send('hello');
	},
	
	signUp:function(req,res){
		var username = req.body.username || req.query.username || '';
		var phoneid = req.body.phoneid || req.query.phoneid ||'';
		var email = req.body.email || req.query.email ||'';
		
		if (username==''||phoneid==''||email=='') {
			res.status(401);
			res.json({
				"status":401,
				"message":"All fields are mandatory."
			});
			return;
		}
		var user = {
					"username":username,
					"phoneid":phoneid,
					"email":email,
					"role":"user"
					};
		
		dbHelper.addNewUser(user,function(inserted){ 
			debug('New User added: '+ inserted);
			if(inserted){
				res.json({
					"status":200,
					"message":"success"
				});
				
			}else{
				res.json({
					"status":200,
					"message":"failure"
				});
			}
		});
	}
	
};



module.exports=user;