'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      let translation;
      

      if (text == undefined || locale == undefined){
        res.json({error: 'Required field(s) missing'});
        return;
      }
      
      if (text == ""){
        res.json({error: 'No text to translate'});
        return;
      }

      if (locale == "american-to-british"){
        translation = translator.americanToBritish(text);
      } else if (locale == "british-to-american") {
        translation = translator.britishToAmerican(text);
      } else {
        res.json({error: 'Invalid value for locale field'});
        return;
      }

      if (text == translation){
        res.json({text, translation: "Everything looks good to me!"})
        return;
      } else {
        res.json({text, translation});
      }
    });
};
