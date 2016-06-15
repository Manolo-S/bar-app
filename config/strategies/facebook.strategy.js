var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID:'253847631639707',
		clientSecret: 'd82e658c447ee595f8e02927f49b5427',
		callbackURL: 'https://local-bars.herokuapp.com/auth/facebook/callback',
		passReqToCallback: true
	},
	function (req, accessToken, refreshToken, profile, done){
			var user = {};
            user.displayName = profile.displayName;
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.id = profile.id;
            
            done(null, user);
	}))
}



