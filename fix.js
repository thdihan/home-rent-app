const mongoose = require('mongoose');

async function fixDB() {
  await mongoose.connect('mongodb+srv://thdihan:09082000@bashalagbe.id2olvs.mongodb.net/?appName=bashalagbe');
  console.log("Connected to MongoDB.");
  
  const paymentsCol = mongoose.connection.db.collection('payments');
  
  // Find all payments missing status and update them
  const result = await paymentsCol.updateMany(
    { status: { $exists: false } },
    { $set: { status: 'pending' } }
  );
  
  console.log(`Updated ${result.modifiedCount} payments to have status: 'pending'.`);
  
  const allPayments = await paymentsCol.find().toArray();
  console.log("Current payments:", JSON.stringify(allPayments, null, 2));
  
  process.exit(0);
}

fixDB().catch(console.error);
