const sendMail = {
  $id: 'sendMail.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Send Mail Schema',
  description: 'Send mail service',
  type: 'object',
  properties: {
    personalizations: {
      type: 'array',
      description: 'Details of the emails to send to and subject',
      items: { $ref: '#/definitions/personalizations' }
    },
    from: {
      type: 'object',
      items: { $ref: '#/definitions/toEmailAddresses' }
    },
    subject: {
      type: 'string'
    },
    content: {
      type: 'array',
      items: { $ref: '#/definitions/mailContent' },
      minItems: 1
    }
  },
  required: ['personalizations', 'from', 'subject', 'content'],
  definitions: {
    toEmailAddresses: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        }
      },
      required: ['email']
    },
    mailContent: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['text/plain']

        },
        value: { type: 'string' }
      },
      required: ['type', 'value']
    },
    personalizations: {
      type: 'object',
      properties: {
        to: {
          type: 'array',
          items: { $ref: '#/definitions/toEmailAddresses' },
          description: 'Email details of the customer(s)',
          minItems: 1
        },
        cc: {
          type: 'array',
          items: { $ref: '#/definitions/toEmailAddresses' },
          description: 'Email details of the customer(s) to CC'
        },
        bcc: {
          type: 'array',
          items: { $ref: '#/definitions/toEmailAddresses' },
          description: 'Email details of the customer(s) to CC'
        }
      },
      required: ['to']
    }
  }
}

module.exports = {
  sendMail
}
