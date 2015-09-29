var express = require('express')
var Sequelize = require('sequelize');
var router = express.Router()
// var tweetbank = require('../tweetbank')
var models = require('../models')
var User = models.User;
var Tweets = models.Tweet;


// home
// router.get('/', function(req, res, next) {
//   res.render('index', { tweets: tweetbank.list(), showForm:true })
// })


// // make a tweet
// router.post('/', function(req, res, next) {
//   // res.status(201).json(tweetbank.add(req.body.name, req.body.tweet))
//   res.redirect('/')
// })

// // getting all tweets from user
// router.get('/users/:name', function(req, res, next) {
//   var tweets = tweetbank.find(req.params)
//   // res.json(tweets)
//   res.render('index', { tweets: tweets })
// })

// // get a single tweet
// router.get('/users/:name/tweets/:id', function(req, res, next) {
//   req.params.id = Number(req.params.id)
//   var tweets = tweetbank.find(req.params)
//   res.render('index',{ tweets: tweets})
// })

router.get('/', function(req, res, next) {
  Tweets.findAll({ include: [ User ]})
	.then(function (tweets) {
		var tweetArr = tweets.map(function(element){
			return {text: element.tweet, name: element.User.name};
		});
		// console.log(tweetArr);
		res.render('index', {title: "Twitter.JS", tweets: tweetArr, showForm: true });
	})
  

})

router.get('/users/:name', function(req, res, next) {
 var name = req.params.name
  var tweets = User.findOne({
    where: {name: name}
  }).then(function (user) {
    return user.getTweets();
  })
  .then(function (tweets) {
      var tweet = [{text: tweets[0].dataValues.tweet, name: name}]; // add name here
      //console.log(tweet.name);
      res.render('index', { title: 'Twitter.js - Posts by ' + name, tweets: tweet, name: name, showForm: true });
  });
})

router.get('/users/:name/id/:id', function(req, res, next) {
 	var id = req.params.id;
  	var tweets = Tweets.findAll({include: User, where: {id: id}})
	.then(function (tweets) {
		var name = tweets[0]._previousDataValues.User.dataValues.name
		console.log(tweets[0]._previousDataValues.User.dataValues.name);	
		return tweets;
	})
  	.then(function (tweets) {
      var tweet = [{text: tweets[0].dataValues.tweet, name: name, id: id}]; // add name here
      res.render('index', { title: 'Twitter.js - Tweet with id ' + id, tweets: tweet, name: name, showForm: true });
  	});
})


module.exports = router;