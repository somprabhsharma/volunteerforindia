var dbHelper=require('../database/dbAccess');

var db={
    
	signUp:function(req,res){
		console.log('1');
		if(req.body === null){
			res.status(401);
			res.json({
				"result":"failure",
				"message":"All fields are mandatory."
			});
		}
		
		dbHelper.add(req.body.data,function(params){
			res.json(params);
		});
		
	},
	loginUser : function(req,res){
	    var email = req.body.data.email || '';
	    var password = req.body.data.password || '';
	    var type = req.body.data.type || '';
	    
	    if (email === ''||password === ''||type === '') {
			res.status(401);
			res.json({
				"result":"failure",
				"message":"All fields are mandatory."
			});
		}
		else{
			dbHelper.login(req.body.data,function(p){
				console.log("success");
				console.log('12',p.result);
			
				if(p.result === 'success'){
					
					dbHelper.getProjects(email,function(p){
						res.send(p);
					});
				
				}
				
			});
		}
		

	},
	getAllUsers : function(req,res){
		dbHelper.getAllUsers(function(p){
			res.json(p);	
		});
	}
	
};



module.exports=db;