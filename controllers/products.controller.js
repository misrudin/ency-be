const productModel = require('../models/products.model')
const response = require("../helpers/response");

module.exports = {
  async getProducts(req, res) {
    try {
      const { search } = req.query
      const result = await productModel.getAll(search);
      if(result.length === 0) {
        return response({
          res,
          data: null,
          code: 404,
          message: "Data tidak ditemukan!",
        });
      }
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
  async getProductById(req, res) {
    const { id } = req.params
    try {
      const result = await productModel.getOneById(id);
      if(!result) {
        return response({
          res,
          data: null,
          code: 404,
          message: "Data tidak ditemukan!",
        });
      }
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
  async deleteProductById(req, res) {
    const { id } = req.params
    try {
      await productModel.deleteOne(id);
      return response({
        res,
        code: 200,
        message: "Success",
      });
    } catch (err) {
      return response({
        res,
        code: 400,
        message: err.message,
      });
    }
  },
  async addProduct(req, res) {
    const body = req.body
    try {
      const result = await productModel.insertOne(body);
      return response({
        res,
        data: {
          id: result.insertId,
          ...body
        },
        code: 200,
        message: "Success",
      });
    } catch (err) {
      return response({
        res,
        code: 400,
        message: err.message,
      });
    }
  },
  async updateProduct(req, res) {
    const body = req.body
    const { id } = req.params
    try {
      await productModel.updateOne(body, Number(id));
      return response({
        res,
        code: 200,
        message: "Success",
      });
    } catch (err) {
      return response({
        res,
        code: 400,
        message: err.message,
      });
    }
  },
};
