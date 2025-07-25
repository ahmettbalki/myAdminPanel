const Auth = require("../models/auth.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "Böyle bir kullanıcı zaten var" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({ username, password: hashedPassword, email });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

    res.status(201).json({
      status: "OK",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    console.error("Register hatası:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login isteği alındı:", email, password);
    const user = await Auth.findOne({ email });

    if (!user) {
      console.log("Kullanıcı bulunamadı.");
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı..." });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      console.log("Şifre eşleşmedi.");
      return res.status(401).json({ message: "Girilen şifre yanlış" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    console.log("Token oluşturuldu:", token);

    res.status(200).json({
      status: "OK",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error("Giriş hatası:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Current user hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

const updateUserSettings = async (req, res) => {
  const userId = req.userId;
  const { username, email } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Güncellenecek alanlar
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: "Kullanıcı bilgileri güncellendi.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Kullanıcı güncelleme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};


module.exports = { login, register, getCurrentUser, updateUserSettings };