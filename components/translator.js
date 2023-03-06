const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  //this function returns a regex that matches stuff only surrounded by whitespace or at the beginning/end
  regexGenerator(match){
    let regex;
    if (/(Mr|Ms|Mrs|Mx|Prof|Dr)\./i.test(match)){
      regex = new RegExp("\\b" + match, "gi"); //this one is necessary like this for titles/honorifics
    } else {
      regex = new RegExp("\\b" + match + "\\b", "gi");
    }
    return regex;
  }
  
  //this function performs all the translations
  dialecticallyReplace(inputString, dictionaryObj, invertedOrder){
    let regex;
    if (invertedOrder) {
      for (let word in dictionaryObj){
        regex = this.regexGenerator(dictionaryObj[word]);
        inputString = inputString.replaceAll(regex, `<span class="highlight">${word}</span>`);
      }
      return inputString;
    }
    
    for (let word in dictionaryObj){
      regex = this.regexGenerator(word);
      inputString = inputString.replaceAll(regex, `<span class="highlight">${dictionaryObj[word]}</span>`); 
    }
    return inputString;
  }

  
  
  americanToBritish(input){
    let translation;

    //replace dialect-exclusive words/expressions with equivalents
    translation = this.dialecticallyReplace(input, americanOnly, false);

    //correct spelling of shared words/expressions for the new dialect
    translation = this.dialecticallyReplace(translation, americanToBritishSpelling, false);


    //correct spelling of titles
    translation = this.dialecticallyReplace(translation, americanToBritishTitles, false);

    //correct spelling of times
    translation = translation.replaceAll(/(?<!\S)(0?[1-9]|1[012]):([0-5][0-9])(?!\S)/g, '<span class="highlight">$1.$2</span>'); //for 12 hs
    translation = translation.replaceAll(/(?<!\S)([01]?[0-9]|2[0-3]):([0-5][0-9])(?!\S)/g, '<span class="highlight">$1.$2</span>'); //for 24 hs

    
    //capitalize first letter of the whole input
    if (translation.startsWith('<span class="highlight">')){
      translation = translation.slice(0,24) + translation.charAt(24).toUpperCase() + translation.slice(25);
    } else {
      translation = translation.charAt(0).toUpperCase() + translation.slice(1);
    }
    
    
    return translation;
  }
  


  
  
  britishToAmerican(input){
    let translation;
    
    //replace dialect-exclusive words/expressions with equivalents
    translation = this.dialecticallyReplace(input, britishOnly, false);

    //correct spelling of shared words/expressions for the new dialect
    translation = this.dialecticallyReplace(translation, americanToBritishSpelling, true);

    //correct spelling of titles
    translation = this.dialecticallyReplace(translation, americanToBritishTitles, true);

    //correct spelling of times
    translation = translation.replaceAll(/(0?[1-9]|1[012])\.([0-5][0-9])/g, '<span class="highlight">$1:$2</span>'); //for 12 hs
    translation = translation.replaceAll(/([01]?[0-9]|2[0-3])\.([0-5][0-9])/g, '<span class="highlight">$1:$2</span>'); //for 24 hs

    
    //capitalize first letter of the whole input
    if (translation.startsWith('<span class="highlight">')){
      translation = translation.slice(0,24) + translation.charAt(24).toUpperCase() + translation.slice(25);
    } else {
      translation = translation.charAt(0).toUpperCase() + translation.slice(1);
    }
    
    

    return translation;
  }
  
}

module.exports = Translator;