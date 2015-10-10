var db = require('./dbAccess');

var dbHelper={
	addNewUser : function(data,cb){
		db.add(data,function(param){
			cb(param);
		});
	}
};

module.exports=dbHelper;