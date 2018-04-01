var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "testsql"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("Select * from test;", function (err, result,fields) {
//     if (err) throw err;
//     result.forEach(function(res) {
//       fields.forEach(function(field){
//         console.log(res);
//         console.log(field.name);
//         var champ=field.name;
//         var val = res[champ];
//         console.log(val);
//       });
//     });
//   });
// });
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express'});
});

router.post('/', function(req, res, next){
  var champs=[];
  var valeurs=[];
  reg=new RegExp("<.[^<>]*>", "gi" );
  // console.log("code sql : "+req.body.codehidden);
  codeSQL=strip_tags(req.body.codehidden);

  // console.log("code sql : "+codeSQL);
  if(codeSQL){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(codeSQL, function (err, result,fields) {
        if (err){
          throw err;
          res.render('index',{error: err});
        }
        fields.forEach(function(field){
          champs.push(field.name);
        });

        for (var i in result){
          var ligne=[];
          fields.forEach(function(field){
            ligne.push(result[i][field.name]);
          });
          valeurs.push(ligne);
        }
        console.log(champs);
        console.log(valeurs);
        res.render('index',{champs: champs,valeurs: valeurs});
      });
    });
  }
});
function strip_tags(html)
{
  //PROCESS STRING
  if(arguments.length < 3) {
    html=html.replace(/<\/?(?!\!)[^>]*>/gi, '');
  } else {
    var allowed = arguments[1];
    var specified = eval("["+arguments[2]+"]" );
    if(allowed){
      var regex='</?(?!(' + specified.join('|') + '))\b[^>]*>';
      html=html.replace(new RegExp(regex, 'gi'), '');
    } else{
      var regex='</?(' + specified.join('|') + ')\b[^>]*>';
      html=html.replace(new RegExp(regex, 'gi'), '');
    }
  }
  //CHANGE NAME TO CLEAN JUST BECAUSE
  var clean_string = html;
  //RETURN THE CLEAN STRING
  return clean_string;
}
module.exports = router;
