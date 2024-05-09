import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getClientByEmail, createNewClient } from '../dao/clientDAO.js';

passport.use(new GoogleStrategy({
  clientID: '67919584822-le7eavsn03i2tl1617g1tal3du6vb96n.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    let email = profile.emails[0].value;
    let name = profile.displayName;
    try {
      let user = await getClientByEmail(email);

      if (!user) {
        let newUser = await createNewClient(name, email);
        console.log('Nuevo usuario creado:', newUser);
        return done(null, newUser);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;