const DB = require('../services/db');
const EventSeq = require('../sequelize/event')

module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    if (!user[0].name) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { query } = ctx.request.body
      const eventData = await DB.get(query, EventSeq)
      ctx.body = JSON.stringify(eventData)
    }
  },

  create: async (event, user, boardId, payload) => {
    DB.insert({
      event,
      userName: user.name,
      userId: user.id,
      boardId,
      payload: JSON.stringify(payload),
      time: `${(new Date()).getTime()}`,
    }, EventSeq)
  },
}
