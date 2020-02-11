'use strict'

module.exports.sendEmail = async (event, context, callback) => {
  const Queue = require('../../helpers/queue')
  const Q = new Queue()

  const MailGun = require('../../helpers/mailgun')
  const service = new MailGun()

  const hasRecord = event && event.Records
  if (!hasRecord) {
    return callback(new Error('No record to process'))
  }

  try {
    const record = event.Records[0]
    const handle = record.receiptHandle
    const body = JSON.parse(record.body)
    await service.send(body)

    await Q.deleteMessage(handle)
    return callback(null, { success: 'ok' })
  } catch (err) {
    console.log(err)
    return callback(err)
  }
}
