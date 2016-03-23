var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID:'609917432488997',
		clientSecret: '62f6253087724631415c2e93108f7b75',
		callbackURL: 'https://pic-wall.herokuapp.com/auth/facebook/callback',
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



