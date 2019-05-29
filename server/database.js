const mongoose = require('mongoose');

const URI = 'mongodb://localhost/gateways'

mongoose.connect(URI, {useNewUrlParser: true});

module.exports = mongoose;