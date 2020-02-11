'use strict'

const { sendMail } = require('../schemas/sendMail.schema')
const JsonSchema = require('jsonschema').Validator
const v = new JsonSchema()
const jsonResponse = require('../helpers/misc')

module.exports.queueMails = async (event, context, callback) => {
  // aws-sdk-mock wouldn't mock SQS if it is not initialised inside
  const Queue = require('../helpers/queue')
  const Q = new Queue()
  try {
    const body = JSON.parse(event.body)
    await v.validate(body, sendMail, { throwError: true })
    await Q.sendMessage(body)
    callback(null, jsonResponse(201, body))
  } catch (error) {
    callback(null, jsonResponse(error.statusCode ? error.statusCode : 400, error))
  }
}
