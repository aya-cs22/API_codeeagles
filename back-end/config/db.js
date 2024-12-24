// const mongoose = require('mongoose');

// const dbConnection = async () => {
//   try {
//     console.log('Connecting to DB:', process.env.DB_URI);
//     await mongoose.connect(process.env.DB_URI, {
//       connectTimeoutMS: 100000,
//       serverSelectionTimeoutMS: 100000,
//     });
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error.message || error);
//   }
// };

// module.exports = dbConnection;
const mongoose = require('mongoose');

const dbConnection = async (retries = 5) => {
  while (retries) {
    try {
      console.log('Connecting to DB:', process.env.DB_URI);
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
      });
      console.log('Database connected successfully');
      break; // الخروج عند النجاح
    } catch (error) {
      console.error('Database connection error:', error.message || error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) throw new Error('Failed to connect to database');
      await new Promise(res => setTimeout(res, 5000)); // الانتظار قبل المحاولة التالية
    }
  }
};

module.exports = dbConnection;
