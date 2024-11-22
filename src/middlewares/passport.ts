import * as PassportJWT from 'passport-jwt';
import passport from 'passport';
import {getUserById} from '../utils/auth';

const JwtStrategy = PassportJWT.Strategy;
const { ExtractJwt } = PassportJWT;

const params = {
  secretOrKey: process.env.JWT_SECRET || 'jwtsecrettoken',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(new JwtStrategy(params, (async (jwt_payload, done) => {
    getUserById(jwt_payload.id).then((user) => {
    if (user) {
      return done(null, user, { message: 'user found' });
    }
    return done(null, false, { message: 'No user.' });
  }).catch((error) => done(error, false, { message: 'Incorrect password.' }));
})));
