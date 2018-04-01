var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema=new Schema({
  numero: {type: Number},
  test: {type: Schema.Types.ObjectId,ref: 'Test'},
  temps: {type: Number},
  image: {type: String},
  consigne: {type: String},
  typeQuestion: {type: String},
  listeQCM: [{type:String}],
  reponses: [{type: String}],
  defautCode: {type: String},
  point: {type: Number},
  isValable: {type: Boolean, default: true}
});

module.exports=mongoose.model('Question',schema);
