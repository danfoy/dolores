/**
* The below code describes a test to ensure that the herald doesn't change.
* This is because at one point it delivered a new randomized string every time,
* which is unwanted because it means I can't use it to reference instances
* between discord/console.
*/

// import { expect } from 'chai';
// import loginQuote from '../utils/loginQuote.js';

// describe('util.loginQuote', function() {

// it('returns a string', function() {
//   expect(loginQuote).to.be.a('string');
// });

// it('returns the same quote every time', function() {
//   const loginQuote1 = loginQuote;
//   const loginQuote2 = loginQuote;
//   const loginQuote3 = loginQuote;

//   expect(loginQuote === loginQuote1).to.be.true;
//   expect(loginQuote1 === loginQuote2).to.be.true;
//   expect(loginQuote2 === loginQuote3).to.be.true;
// });

// });
