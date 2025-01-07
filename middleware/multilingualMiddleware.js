const messages = require('../utils/multilingual');

const setLocale = (req, res, next) => {
    const locale = req.query.lang || 'en'; // Default to English if no language is provided
    req.locale = locale;
  
    // Helper function for translations
    req.t = (key) => messages[locale]?.[key] || messages['en'][key] || key;
  
    next();
  };
  
  module.exports = {
    setLocale,
  };
  