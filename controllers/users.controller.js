const customerModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const response = require("../helpers/response");

const dotenv = require("dotenv");

dotenv.config();

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
      const jwtToken = jwt.sign({
        id: result.id,
        name: result.name,
        email: result.email
      }, process.env.SECRET_KEY, { expiresIn: '1d' })
      const data ={
        token: jwtToken,
        user: result
      }
      return response({
        res,
        data,
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
  async register(req, res) {
    const { name, email, phone_number, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordWithHash = bcrypt.hashSync(password, salt);
    const dataUser = {
      name,
      email,
      phone_number,
      password: passwordWithHash,
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
        message: "Register berhasil, silahkan login!",
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
  async setAgeAndGender(req, res) {
    const { gender, age } = req.body;
    const { id } = req.user
    const dataUser = {
      gender,
      age
    };
    try {
      await customerModel.updateOne(dataUser, id);
      return response({
        res,
        data: null,
        code: 200,
        message: "Success",
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
  async getProfile(req, res) {
    const { id } = req.user
    try {
      const result = await customerModel.getOneById(id);
      if(!result) {
        return response({
          res,
          data: null,
          code: 404,
          message: "Data tidak ditemukan!",
        });
      }
      delete result.password;
      return response({
        res,
        data: result,
        code: 200,
        message: "Success",
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
  async updateProfile(req, res) {
    const body = req.body;
    const { id } = req.user
    try {
      await customerModel.updateOne(body, id);
      return response({
        res,
        data: null,
        code: 200,
        message: "Success",
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
