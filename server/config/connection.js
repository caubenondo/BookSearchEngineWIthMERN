const mongoose = require('mongoose');
// change mongodb atlas access everywhere
//work
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
