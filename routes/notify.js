const { sendEmail } = require('../utils/sendMail');

const notifyUsers = async (_, res) => {
  try {
    console.log('============ Notify users ============');
    const userIds = Array.from({ length: 15 }, (_, i) => i + 1);
    for (const id of userIds) {
      await sendEmail(id);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to notify users' });
  }
};

module.exports = { notifyUsers };
