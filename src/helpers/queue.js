'use strict'
const AWS = require('aws-sdk')

class Queue {
  constructor () {
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
    this.queueUrl = process.env.QUEUE_URL
  }

  async sendMessage (body) {
    const param = {
      MessageBody: JSON.stringify(body),
      QueueUrl: this.queueUrl
    }

    const res = await this.sqs.sendMessage(param).promise()

    return res
  }

  async deleteMessage (handle) {
    const param = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: handle
    }

    const res = await this.sqs.deleteMessage(param).promise()

    return res
  }
}

module.exports = Queue
