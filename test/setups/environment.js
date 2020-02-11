const setupEnvironment = () => {
  process.env.QUEUE_URL = 'https://your.queue.url'
}

const restoreEnvironment = () => {
  process.env.QUEUE_URL = ''
}

module.exports = {
  mock: setupEnvironment,
  restore: restoreEnvironment
}
