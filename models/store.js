var mongoose  =  require('mongoose');  
   
var storeSchema = new mongoose.Schema({  
    file_url:{  
        type:String,
        required:true  
    }
});  
   
module.exports = {
  Store: mongoose.model("stores", storeSchema),
 
};