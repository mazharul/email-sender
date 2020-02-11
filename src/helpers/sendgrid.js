'use strict'

const axios = require('axios')
class SendGrid {
  constructor () {
    this.sendgridUrl = process.env.SENDGRID_API_URL
    this.sendgridKey = process.env.SENDGRID_KEY
  }

  async send (body) {
    // Body doesn't need to be processed as our API follows the same schema as SendGrid
    const authHeader = `Bearer ${this.sendgridKey}`
    const option = { headers: { Authorization: authHeader, 'Content-Type': 'application/json' } }
    console.log(this.sendgridUrl)
    const res = await axios.post(this.sendgridUrl, body, option)
    return res
  }
}

module.exports = SendGrid
