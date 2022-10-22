const { Cars } = require("../app/models");

module.exports = {
  findAll() {
    return Cars.findAll();
  },

  create(body) {
    return Cars.create(body);
  },

  update(body, id) {
    return Cars.update(body, { where: { id } });
  },

  delete(id) {
    return Cars.destroy({ where: { id } });
  },

  findById(id) {
    return Cars.findByPk(id);
  },

  getTotalCar() {
    return Cars.count();
  },
};
