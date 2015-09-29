// pull in the Sequelize library
var Sequelize = require('sequelize');
var express = require('express')
var router = express.Router()
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});



// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

  var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

// home
router.get('/', function(req, res, next) {
	res.send('hello')
  // res.render('index', { tweets: tweetbank.list(), showForm:true })

})




// Tweet.findAll({ include: [ User ]})
// 	.then(function (tweets) {
// 		var newArr = tweets.map(function(element){
// 			return {text: element.tweet, name: element.User.name};
// 		});
// 		console.log(newArr);
// 		//console.log(JSON.stringify(tweets));
// 		//return tweets;
// 	})


// Tweet.findAll({ where: {id: id}})
// .then(function (tweets) {	
// 	console.log(tweets);
// })

	// .then(function (tweets) {
	// something = tweets[0].dataValues.tweet;
//  	console.log(Object.keys(tweets["1"]));
//  	console.log(tweets["1"]["dataValues"]["tweet"]);
//  	//loop through tweets

//  	//getbyId to get name
 		
// });

// getting all tweets from user
// router.get('/users/:name', function(req, res, next) {
//  var name = req.params.name
  
// User.findAll()
// .then(function (user) {
// 	console.log(user);
//     return user.getTweets();
// 	})
// 	.then(function (tweets) {
//      	console.log(tweets);
// 	});
// })


// // get a single tweet
// router.get('/users/:name/tweets/:id', function(req, res, next) {
//   req.params.id = Number(req.params.id)
//   var tweets = tweetbank.find(req.params)
//   res.render('index',{ tweets: tweets})
// })




// User.findOne().then(function (user) {
//     console.log('this iS IT', user); // big old crazy object, but no name or id anywhere in there
// });

// User.findOne().then(function (user) {
//     console.log("THIS IS NAME", user.name); // produces correct result. wat.
// });

// User.findOne().then(function (user) {
//     console.log("data values", user.datavalues);
// });

// User.findOne().then(function (user) {
//     console.log("user get", user.get({plain: true}))
// });

// User.findOne().then(function (user) {
//     return user.getTweets();
// })
// .then(function (tweets) {
//     console.log('json', JSON.stringify(tweets)); // another way of just logging the plain old values
// });

module.exports = {
    User: User,
    Tweet: Tweet

};