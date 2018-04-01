var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema=new Schema({
  nom: {type: String},
  langage: {type: String},
  isValable: {type: Boolean, default: true}
});

module.exports=mongoose.model('Test',schema);
