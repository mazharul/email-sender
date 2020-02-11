'use strict'

const Queue = require('../../helpers/queue')
const Q = new Queue()
const SendGrid = require('../../helpers/sendgrid')
const service = new SendGrid()

module.exports.sendEmail = async (event, context, callback) => {
  const hasRecord = event && event.Records
  if (!hasRecord) {
    return callback(new Error('No record to process'))
  }

  console.log(event)
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

  // This below line is an easy way to test the failover
  // return callback(new Error('Please retry'))
}
