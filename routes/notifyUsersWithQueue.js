const { sendMessagesToQueue } = require('../utils/producer');

const notifyUsersWithQueue = async (_, res) => {
  try {
    console.log('============ Notify users with Queue ============');

    const userIds = Array.from({ length: 15 }, (_, i) => i + 1);
    await sendMessagesToQueue(
      'main-topic',
      userIds.map((id) => ({
        value: JSON.stringify({
          id,
        }),
      }))
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to notify users' });
  }
};

module.exports = { notifyUsersWithQueue };
