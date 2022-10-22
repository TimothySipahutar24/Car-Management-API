const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const salt = 10;

async function encryptPassword(password) {
  try {
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, encryptedPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  encryptPassword,
  async registerAsMember(args) {
    try {
      const encryptedPassword = await encryptPassword(args.password);
      const body = {
        userName: args.userName,
        email: args.email,
        password: encryptPassword,
        role_id: 3,
      };
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      return err;
    }
  },

  async registerAsAdmin(args) {
    try {
      const encryptedPassword = await encryptPassword(args.password);
      const body = {
        userName: args.userName,
        email: args.email,
        password: encryptPassword,
        role_id: 2,
      };
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      return err;
    }
  },
};
