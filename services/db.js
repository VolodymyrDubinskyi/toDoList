module.exports = {
  get: (query, typeNew) => new Promise(async (resolve) => {
    typeNew.findAll({ where: { ...query } }).then((data) => {
      const callBack = data.map(eachObj => eachObj.dataValues)
      resolve(callBack)
    })
  }),

  remove: (query, typeNew) => new Promise(async (resolve) => {
    const removed = typeNew.destroy({
      where: { ...query },
    })
    resolve(removed)
  }),

  insert: (body, typeNew) => new Promise(async (resolve) => {
    const resolveObj = typeNew.sync({ force: false }).then(() => typeNew.create({ ...body }));
    const obj = await resolveObj
    resolve(obj.dataValues)
  }),

  update: (id, changes, typeNew) => new Promise(async (resolve) => {
    typeNew.update(
      { ...changes },
      { where: { id } },
    )

    typeNew.findAll({ where: { id } }).then((data) => {
      const callBack = data.map(eachObj => eachObj.dataValues)
      resolve(callBack[0])
    })
  }),
}
