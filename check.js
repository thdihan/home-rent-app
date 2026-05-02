const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://localhost:27017/bashalagbe');
  const payments = await mongoose.connection.db.collection('payments').find().toArray();
  console.log("ALL PAYMENTS:", JSON.stringify(payments, null, 2));
  process.exit(0);
}
check().catch(console.error);
