'use strict'
const draftNotification = (type, sender, receiver, visionCode = '', agoraToken = '', msg = '') => {
  try {
    const body = type === 'call' ? `Incoming call invitation` : `${msg.lastMessage}`
    const title = sender.name

    const notificationData = {
      message: {
        data: {
          title: title,
          body: body,
          type: type,
          senderId: sender._id,
          receiverId: receiver._id,
          visionCode: visionCode,
          agoraToken: agoraToken,
          msgId: msg._id
        },
        token: receiver.fcmToken
      },
      type: type,
      senderId: sender._id,
      receiverId: receiver._id,
      visionCode: visionCode,
      agoraToken: agoraToken,
      sent: false,
      error: null
    }

    return notificationData
  } catch (error) {
    return error
  }
}

exports.draftNotification = draftNotification
