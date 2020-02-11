const nock = require('nock')

// nock.disableNetConnect()

const mockSendGridSuccess = () => {
  nock('https://api.sendgrid.com/v3')
    .post('/mail/send')
    .reply(201, (uri, requestBody) => requestBody)
}

const mockMailGunSuccess = () => {
  nock('https://api.mailgun.net/v3/sandbox53f85d1e46d0466b99d1c2033f2d479c.mailgun.org')
    .post('/messages')
    .reply(201, (uri, requestBody) => requestBody)
}

module.exports = {
  mockSendGridSuccess,
  mockMailGunSuccess
}
