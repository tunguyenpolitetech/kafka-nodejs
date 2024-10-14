const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9094'],
  logLevel: 0,
  retry: {
    initialRetryTime: 1000,
    retries: 8,
  },
});

const producer = kafka.producer();

const initKafkaProducer = async () => {
  try {
    await producer.connect();
  } catch (error) {
    console.error(`Error init Kafka Producer: ${error.message}`);
  }
};

const disconnectKafkaProducer = async () => {
  await producer.disconnect();
  process.exit(0);
};

const sendMessagesToQueue = async (topic, messages) => {
  try {
    await producer.send({
      topic,
      messages,
    });
  } catch (error) {
    console.error(`Error on sending message: ${error.message}`);
  }
};

module.exports = {
  disconnectKafkaProducer,
  initKafkaProducer,
  sendMessagesToQueue,
};
