const setupEnvironment = () => {
  process.env.QUEUE_URL = 'https://your.queue.url'
  process.env.SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
  process.env.SENDGRID_KEY = 'ABbbGtjk5667'
  process.env.MAILGUN_URL = 'https://api.mailgun.net/v3/sandbox53f85d1e46d0466b99d1c2033f2d479c.mailgun.org/messages'
  process.env.MAILGUN_USER = 'api'
  process.env.MAILGUN_KEY = '78747804'
}

const restoreEnvironment = () => {
  process.env.QUEUE_URL = ''
  process.env.SENDGRID_API_URL = ''
  process.env.SENDGRID_KEY = ''
  process.env.MAILGUN_URL = ''
  process.env.MAILGUN_USER = ''
  process.env.MAILGUN_KEY = ''
}

module.exports = {
  mock: setupEnvironment,
  restore: restoreEnvironment
}
