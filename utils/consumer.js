const { Kafka } = require('kafkajs');
const { sendEmail } = require('./sendMail');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9094'],
  logLevel: 0,
  retry: {
    initialRetryTime: 1000,
    retries: 8,
  },
});

const MAX_RETRIES = 3;

const consumeWithRetry = async (message, retries = 0) => {
  try {
    const data = JSON.parse(message.value);
    // console.log('start with id ', data.id);
    await sendEmail(data.id);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await consumeWithRetry(message, retries + 1);
    } else {
      console.info(`Max retries exceed, Message will be added to Dead-letter queue`);
      await sendMessagesToKafka('dlq-topic', [{ key: message.key?.toString(), value: message.value.toString() }]);
    }
  }
};

const startKafkaConsumer = async (numberOfConsumers = 1) => {
  await Promise.all(
    Array.from({ length: numberOfConsumers }, async (_, i) => {
      try {
        const consumer = kafka.consumer({
          groupId: 'test-group',
          maxWaitTimeInMs: 100,
        });

        await consumer.connect();
        await consumer.subscribe({ topic: 'main-topic', fromBeginning: true });

        await consumer.run({
          eachMessage: async ({ message }) => consumeWithRetry(message),
        });
      } catch (error) {
        console.error(`Error init Kafka Consumer ${i + 1}: ${error.message}`);
      }
    })
  );
};

module.exports = {
  startKafkaConsumer,
};
