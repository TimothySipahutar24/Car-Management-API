const authService = require("../../../../services/authService");
const carService = require("../../../../services/authService");

module.exports = {
  async register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    authService.register(email, password);
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password = req.body.password;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      user.encryptedPassword,
      password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }

    res.status(201).json({
      id: user.id,
      email: user.email,
      token: "iniToken", // Kita bakal ngomongin ini lagi nanti.
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },
};
