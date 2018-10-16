import config from '../../config'

const { webServer } = config

const callGetEventsEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/events/${payload.id}`,
  {
    method: 'POST',
    body: JSON.stringify({ query: payload.query }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export default callGetEventsEndpoint
