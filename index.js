const express = require('express');
const dotenv = require('dotenv');
const { startKafkaConsumer } = require('./utils/consumer');
const { initKafkaProducer, disconnectKafkaProducer } = require('./utils/producer');
const { notifyUsers } = require('./routes/notify');
const { notifyUsersWithQueue } = require('./routes/notifyUsersWithQueue');

dotenv.config({
  path: './.env',
});

const app = express();
app.use(express.json());

app.post('/notify', notifyUsers);
app.post('/notify-with-queue', notifyUsersWithQueue);

const port = process.env.PORT || 4044;
app.listen(port, async () => {
  const totalConsumers = Number(process.env.NUMBER_OF_CONSUMERS) || 1;

  await startKafkaConsumer(totalConsumers);
  await initKafkaProducer();

  console.log(`Server running on port ${port}`);

  process.on('SIGINT', disconnectKafkaProducer);
  process.on('SIGTERM', disconnectKafkaProducer);
});
