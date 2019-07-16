const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage().then(async () => {
      try {
        await mongoose.connect('dummyURI', {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
        });
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });
  } else {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      console.log(`MongoDB Connected..`);
    } catch (err) {
      console.error(err.message);
      //Exit process with failure
      process.exit(1);
    }
  }
};

const closeDB = () => {
  mongoose.connection.close(false, () => {
    console.log('MongoDb connection closed.');
    process.exit(0);
  });
};

module.exports = {
  connectDB,
  closeDB,
};
