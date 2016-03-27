var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: 'ZGd37HB9BBc7LVf6T9xvDqaJY',
		consumerSecret: 'i6XKXePnPfnhGz2Hz9GGfr8evPMAZCQIrFTaoBIKpxojefAXK7',
		callbackURL: 'https://pic-wall.herokuapp.com/auth/twitter/callback',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, done){
			var user = {};
            user.displayName = profile._json.name;
            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.id = profile.id;
            user.service = "Twitter";
            
            
            done(null, user);
	}))
};




