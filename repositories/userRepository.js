const { Users, UserRoles } = require("../app/models/");

module.exports = {
  async create(args) {
    return Users.create(args)
      .then((user) => {
        return Users.findByPk(user.id, {
          include: [UserRoles],
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  findUser(condition) {
    return Users.findOne({ where: condition });
  },

  findUserByPk(id) {
    return Users.findByPk(id);
  },
};
