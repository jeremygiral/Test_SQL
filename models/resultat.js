var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema=new Schema({
  test: {type: Schema.Types.ObjectId,ref: 'Test'},
  user: {type: Schema.Types.ObjectId,ref: 'User'},
  score: {type: Number},
  isValable: {type: Boolean, default: true}
});

module.exports=mongoose.model('Resultat',schema);
