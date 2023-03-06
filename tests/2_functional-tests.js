const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({locale: "american-to-british", text: "footie in the chippy"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'text', 'response should contain original text');
            assert.property(res.body, 'translation', 'response should contain translation');
            done();
          });
  });
  
  test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({locale: "invalidLocale", text: "footie in the chippy"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error field');
            assert.equal(res.body.error, 'Invalid value for locale field', 'value of error should be "invalid value for locale field"');
            done();
          });
  });
  
  test('Translation with missing text field: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({locale: "british-to-american"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error field');
            assert.equal(res.body.error, 'Required field(s) missing', 'value of error should be "Required field(s) missing');
            done();
          });
  });
  
  test('Translation with missing locale field: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({text: "some text"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error field');
            assert.equal(res.body.error, 'Required field(s) missing', 'value of error should be "Required field(s) missing');
            done();
          });
  });
  
  test('Translation with empty text: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({locale: "american-to-british", text: ""})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'response should contain error field');
            assert.equal(res.body.error, 'No text to translate', 'value of error should be "No text to translate');
            done();
          });
  });
  
  test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({locale: "american-to-british", text: "Dog"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, "translation");
            assert.equal(res.body.translation, "Everything looks good to me!");
            done();
          });
  });
});
