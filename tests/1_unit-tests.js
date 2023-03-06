const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();

//this function will remove the highlighting HTML tags, making text easier to parse
function noTags(string){
  return string.replace(/<span class="highlight">/g, "").replace(/<\/span>/g, "");
}

suite('Unit Tests', () => {
  test('Translate Mangoes are my favorite fruit. to British English', function () {
    const translation = noTags(translator.americanToBritish("Mangoes are my favorite fruit."));
    assert.equal(translation, "Mangoes are my favourite fruit.");
  });
  
  test('Translate I ate yogurt for breakfast. to British English', function () {
    const translation = noTags(translator.americanToBritish("I ate yogurt for breakfast."));
    assert.equal(translation, "I ate yoghurt for breakfast.");
  });
  
  test("Translate We had a party at my friend's condo. to British English", function () {
    const translation = noTags(translator.americanToBritish("We had a party at my friend's condo."));
    assert.equal(translation, "We had a party at my friend's flat.");
  });
  
  test("Translate Can you toss this in the trashcan for me? to British English", function () {
    const translation = noTags(translator.americanToBritish("Can you toss this in the trashcan for me?"));
    assert.equal(translation, "Can you toss this in the bin for me?");
  });
  
  test("Translate The parking lot was full. to British English", function () {
    const translation = noTags(translator.americanToBritish("The parking lot was full."));
    assert.equal(translation, "The car park was full.");
  });
  
  test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
    const translation = noTags(translator.americanToBritish("Like a high tech Rube Goldberg machine."));
    assert.equal(translation, "Like a high tech Heath Robinson device.");
  });
  
  test("Translate To play hooky means to skip class or work. to British English", function () {
    const translation = noTags(translator.americanToBritish("To play hooky means to skip class or work."));
    assert.equal(translation, "To bunk off means to skip class or work.");
  });
  
  test("Translate No Mr. Bond, I expect you to die. to British English", function () {
    const translation = noTags(translator.americanToBritish("No Mr. Bond, I expect you to die."));
    assert.equal(translation, "No Mr Bond, I expect you to die.");
  });
  
  test("Translate Dr Grosh will see you now. to British English", function () {
    const translation = noTags(translator.americanToBritish("Dr. Grosh will see you now."));
    assert.equal(translation, "Dr Grosh will see you now.");
  });
  
  test("Translate Lunch is at 12:15 today. to British English", function () {
    const translation = noTags(translator.americanToBritish("Lunch is at 12:15 today."));
    assert.equal(translation, "Lunch is at 12.15 today.");
  });
  
  test("Translate We watched the footie match for a while. to American English", function () {
    const translation = noTags(translator.britishToAmerican("We watched the footie match for a while."));
    assert.equal(translation, "We watched the soccer match for a while.");
  });
  
  test("Translate Paracetamol takes up to an hour to work. to American English", function () {
    const translation = noTags(translator.britishToAmerican("Paracetamol takes up to an hour to work."));
    assert.equal(translation, "Tylenol takes up to an hour to work.");
  });
  
  test("Translate First, caramelise the onions. to American English", function () {
    const translation = noTags(translator.britishToAmerican("First, caramelise the onions."));
    assert.equal(translation, "First, caramelize the onions.");
  });
  
  test("Translate I spent the bank holiday at the funfair. to American English", function () {
    const translation = noTags(translator.britishToAmerican("I spent the bank holiday at the funfair."));
    assert.equal(translation, "I spent the public holiday at the carnival.");
  });
  
  test("Translate I had a bicky then went to the chippy. to American English", function () {
    const translation = noTags(translator.britishToAmerican("I had a bicky then went to the chippy."));
    assert.equal(translation, "I had a cookie then went to the fish-and-chip shop.");
  });
  
  test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
    const translation = noTags(translator.britishToAmerican("I've just got bits and bobs in my bum bag."));
    assert.equal(translation, "I've just got odds and ends in my fanny pack.");
  });
  
  test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
    const translation = noTags(translator.britishToAmerican("The car boot sale at Boxted Airfield was called off."));
    assert.equal(translation, "The swap meet at Boxted Airfield was called off.");
  });
  
  test("Translate Have you met Mrs Kalyani? to American English", function () {
    const translation = noTags(translator.britishToAmerican("Have you met Mrs Kalyani?"));
    assert.equal(translation, "Have you met Mrs. Kalyani?");
  });
  
  test("Translate Prof Joyner of King's College, London. to American English", function () {
    const translation = noTags(translator.britishToAmerican("Prof Joyner of King's College, London."));
    assert.equal(translation, "Prof. Joyner of King's College, London.");
  });
  
  test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
    const translation = noTags(translator.britishToAmerican("Tea time is usually around 4 or 4.30."));
    assert.equal(translation, "Tea time is usually around 4 or 4:30.");
  });
  
  test("Highlight translation in Mangoes are my favorite fruit.", function () {
    const translation = translator.americanToBritish("Mangoes are my favorite fruit.");
    assert.include(translation, '<span class="highlight">favourite</span>');
  });
  
  test("Highlight translation in I ate yogurt for breakfast.", function () {
    const translation = translator.americanToBritish("I ate yogurt for breakfast.");
    assert.include(translation, '<span class="highlight">yoghurt</span>');
  });
  
  test("Highlight translation in We watched the footie match for a while.", function () {
    const translation = translator.britishToAmerican("We watched the footie match for a while.");
    assert.include(translation, '<span class="highlight">soccer</span>');
  });
  
  test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
    const translation = translator.britishToAmerican("Paracetamol takes up to an hour to work.");
    assert.include(translation, '<span class="highlight">Tylenol</span>');
  });

  
  //Reloads the page after it crashes when finishing the tests
  //This is necessary because Replit is bugged
  const server = require('../server');
  after(function() {
  chai.request(server)
    .get('/')
  });
});
