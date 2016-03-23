var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: 'rzgrETaxjppLCFkbAWsaZlPHs',
		consumerSecret: 'UMJJmcfK8agJLqnWKlznyKAu5gboClech2b1ABrG2BF8os0sMP',
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
            
            
            done(null, user);
	}))
};




