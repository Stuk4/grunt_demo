var express 	= 	require('express');
var app     	= 	express();
var bodyparser 	= 	require('body-parser');
var mongoose 	= 	require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var http 		= 	require('http')
var auth  		=   require('basic-auth');	


//agregamos basic auth
app.use(function(req, res, next) {

    var user = auth(req);

    if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

var port = process.env.PORT||8080;


var Bear = require('./model/bear')


var router = express.Router();


/*router.use(function(req, res, next){
   
   // do logging
   console.log('something is happ...');
   next();	

});
*/

router.get('/', function(req, res){

	res.json({message : 'Hi'});

});

router.route('/bears/:bear_id')
	.get(function(req, res){

		Bear.findById(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);
			res.json(bear);
		});

	});

router.route('/bears')

  .post(function(req,res){

	var bear = new Bear();
	console.log(req.body.name);
	bear.name = req.body.name;

	bear.save(function(err){
		if(err)
			res.send(err);
		res.json({message : 'Bear Created!'});
	});

	}).

  	get(function(req, res){

  		Bear.find(function(err, bears){

  			if(err)
  				res.send(err);

  			res.json(bears);

  		});

  	});

app.use('/api', router);

app.listen(port);
console.log('start...')