'use strict'

const axios = require('axios')
const FormData = require('form-data')

class MailGun {
  constructor () {
    this.mailgunUser = process.env.MAILGUN_USER
    this.mailgunKey = process.env.MAILGUN_KEY
    this.mailgunUrl = process.env.MAILGUN_URL
  }

  async send (body) {
    const data = await this.prepareBody(body)
    const options = {
      url: this.mailgunUrl,
      method: 'POST',
      auth: {
        username: this.mailgunUser,
        password: this.mailgunKey
      },
      data: data,
      headers: data.getHeaders()
    }

    const res = await axios(options)

    return res
  }

  async prepareBody (body) {
    const to = this.composeEmailAddresses(body, 'to')
    const cc = this.composeEmailAddresses(body, 'cc')
    const bcc = this.composeEmailAddresses(body, 'bcc')
    const text = this.getTextBody(body)
    const form = new FormData()
    form.append('from', body.from.email)
    form.append('to', to)
    form.append('subject', body.subject)
    form.append('text', text)
    form.append('cc', cc)
    form.append('bcc', bcc)

    return form
  }

  // TODO: fix the eslint for const issue; it should be let
  getTextBody (body) {
    let text = ''
    body.content.map((obj) => {
      if (obj.type === 'text/plain') {
        text = obj.value
      }
    })
    return text
  }

  // TODO: fix the eslint for const issue; it should be let
  // TODO: too many if-else; re-do the function
  composeEmailAddresses (body, filter) {
    const t = []
    const processedEmails = []
    body.personalizations.map((obj, index, arr) => {
      if (filter === 'to') {
        if (obj.to) {
          obj.to.map((e) => {
            t.push(e)
          })
        }
      }

      if (filter === 'cc') {
        if (obj.cc) {
          obj.cc.map((e) => {
            t.push(e)
          })
        }
      }

      if (filter === 'bcc') {
        if (obj.bcc) {
          obj.bcc.map((e) => {
            t.push(e)
          })
        }
      }
    })

    t.map((obj) => {
      const email = obj.name ? `${obj.name} <${obj.email}>` : `${obj.email}`
      processedEmails.push(email)
    })

    return processedEmails.join()
  }
}

module.exports = MailGun
