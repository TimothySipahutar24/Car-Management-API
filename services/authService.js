const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const salt = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

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

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  encryptPassword,

  async register(args) {
    try {
      const encryptedPassword = await encryptPassword(args.password);
      const body = {
        userName: args.userName,
        email: args.email,
        password: encryptedPassword,
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

  async login(email, password) {
    try {
      const user = await userRepository.findUser({ email });

      if (!user) {
        return false;
      }

      const { password: encryptedPassword } = user;

      const isAuthenticated = await comparePassword(
        password,
        encryptedPassword
      );

      if (!isAuthenticated) {
        return false;
      }

      //generate token here
      const token = createToken({
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      });

      const data = {
        ...user.dataValues,
        token,
      };

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async authorize(token) {
    try {
      const payload = verifyToken(token);

      const id = payload.id;

      const user = await userRepository.findUserByPk(id);

      return user;
    } catch (err) {
      throw err;
    }
  },
};
