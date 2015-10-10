var dbHelper=require('../database/dbHelper');
var dbAccess=require('../database/dbAccess');

var db={
	getProjects : function(req,res){
		dbAccess.getProjects(req.body.email,function(p){
			res.json(p);
		});		
	},
	profile : function(req,res){
		dbAccess.profile(req.body.email,function(p){
			res.json(p);
		});	
	},
	editProfile : function(req,res){
		dbAccess.editProfile(req.body,function(p){
			res.json(p);
		});
	},
	causes : function(req,res){
		dbAccess.causes(req.body,function(p){
			res.json(p);
		});
	},
	myProjects : function(req,res){
		dbAccess.myProjects(req.body,function(p){
			res.json(p);
		});
	},
	addCauses : function(req,res){
		dbAccess.myProjects(req.body,function(p){
			res.json(p);
		});
	}
};



module.exports=db;