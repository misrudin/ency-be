const customerModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const response = require("../helpers/response");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const result = await customerModel.getOneByEmail(email);

      if (!result) {
        return response({
          res,
          data: null,
          code: 400,
          message: "Email atau password tidak cocok!",
        });
      }

      const isPasswordMatch = await bcrypt.compareSync(
        password,
        result.password
      );
      if (!isPasswordMatch) {
        return response({
          res,
          data: null,
          code: 400,
          message: "Email atau password tidak cocok!",
        });
      }
      delete result.password
      const token = jwt.sign({
        name: result.name,
        email: result.email,
        id: result.id
      }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const data ={
        token,
        user: result
      }
      return response({
        res,
        data,
        code: 200,
        message: "",
      });
    } catch (err) {
      console.log("Error", err);
      return response({
        res,
        data: null,
        code: 400,
        message: err.message,
      });
    }
  },
  async register(req, res) {
    const { name, email, phone_number, password, gender } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordWithHash = bcrypt.hashSync(password, salt);
    const dataUser = {
      name,
      email,
      phone_number,
      password: passwordWithHash,
      gender,
    };
    try {
      const user = await customerModel.getOneByEmail(email);
      if(user) {
        if(user.email === email || user.phone_number === phone_number) {
          return response({
            res,
            data: null,
            code: 400,
            message: "Email atau nomor hp sudah digunakan!",
          });
        }
      }
      const result = await customerModel.insertOne(dataUser);
      delete dataUser.password
      return response({
        res,
        data: {
          id: result.insertId,
          ...dataUser
        },
        code: 200,
        message: "",
      });
    } catch (err) {
      return response({
        res,
        data: null,
        code: 400,
        message: err.message,
      });
    }
  },
};
