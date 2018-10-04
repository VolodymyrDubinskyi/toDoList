const mongoose = require('mongoose')

module.exports = {
  get: (query, type) => new Promise(async (resolve) => {
    await type.find(query)
      .exec(async (err, comeBack) => {
        if (err) throw err;
        resolve(comeBack)
      });
  }),

  remove: (query, type) => new Promise(async (resolve) => {
    const db = await type.findOneAndRemove(query)
    resolve(db)
  }),

  insert: (body, Type) => new Promise(async (resolve) => {
    const newObj = new Type({
      ...body,
      _id: new mongoose.Types.ObjectId(),
    })
    await newObj.save()
    resolve(newObj)
  }),

  update: (id, changes, Type) => new Promise(async (resolve) => {
    await Type.findById(id, async (err, obj) => {
      const key = Object.keys(changes)[0]
      if (obj) {
        obj[key] = changes[key] //eslint-disable-line
        await obj.save()
      }
      resolve(obj)
    })
  }),
}
