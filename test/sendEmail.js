'use strict'
/* eslint-disable no-unused-expressions */
/* global describe it before after beforeEach */
// tests for queueMails
// Generated by serverless-mocha-plugin

const AWS = require('aws-sdk-mock')
const mochaPlugin = require('serverless-mocha-plugin')
const aws = require('aws-sdk')
AWS.setSDKInstance(aws)

const expect = mochaPlugin.chai.expect
const wrappedSendgrid = mochaPlugin.getWrapper('sendEmail', '/src/delivery/sendgrid/handler.js', 'sendEmail')
const wrappedMailGun = mochaPlugin.getWrapper('sendEmail', '/src/delivery/mailgun/handler.js', 'sendEmail')

const mockServices = require('./setups/external-service')

const fixtures = require('./fixtures/index')
const setupEnvironment = require('./setups/environment')
const queueUrl = 'https//your.queue.url'

describe('Send Email related tests', () => {
  before((done) => {
    setupEnvironment.mock()
    done()
  })

  after((done) => {
    setupEnvironment.restore()
    done()
  })

  beforeEach((done) => {
    setupEnvironment.mock()
    // Mock the SQS.deleteMessage method
    AWS.mock('SQS', 'deleteMessage', (params, callback) => {
      callback(null, {
        QueueUrl: queueUrl,
        ReceiptHandle: 'your.receipt.handle'
      })
    })

    done()
  })

  describe('SendGrid  - Email provider tests', () => {
    it('Should exit the lambda if there are no records in the event', () => {
      return wrappedSendgrid.run({}).catch((error) => {
        expect(error.message).to.be.eq('No record to process')
      })
    })

    it('Should return a successful response', () => {
      mockServices.mockSendGridSuccess()
      return wrappedSendgrid.run(fixtures.sqsPayload).then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.have.property('success').to.equal('ok')
      })
    })
  })

  describe('Mailgun - Email provider tests', () => {
    it('Should exit the lambda if there are no records in the event', () => {
      return wrappedMailGun.run({}).catch((error) => {
        expect(error.message).to.be.eq('No record to process')
      })
    })

    it('Should return a successful response', () => {
      mockServices.mockMailGunSuccess()
      return wrappedMailGun.run(fixtures.sqsPayload).then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.have.property('success').to.equal('ok')
      })
    })
  })
})
