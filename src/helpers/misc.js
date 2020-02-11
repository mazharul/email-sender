const mapToJsonResponse = (statusCode, body) => {
  const data = {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return data
}

module.exports = mapToJsonResponse
