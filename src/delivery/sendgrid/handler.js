'use strict'

module.exports.sendEmail = async (event, context, callback) => {
  // To mock using nock and aws-sdk-mock we need to initialise these files here
  const SendGrid = require('../../helpers/sendgrid')
  const service = new SendGrid()
  const Queue = require('../../helpers/queue')
  const Q = new Queue()

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

  // This below line is an easy way to test the failover
  // return callback(new Error('Please retry'))
}
