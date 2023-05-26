const categoryModel = require('../models/categories.model')
const response = require("../helpers/response");

module.exports = {
  async getCategories(req, res) {
    try {
      const { search } = req.query
      const result = await categoryModel.getAll(search);
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
  async getCategoryById(req, res) {
    const { id } = req.params
    try {
      const result = await categoryModel.getOneById(id);
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
  async deleteCategoryById(req, res) {
    const { id } = req.params
    try {
      await categoryModel.deleteOne(id);
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
  async addCategory(req, res) {
    const body = req.body
    try {
      const result = await categoryModel.insertOne(body);
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
  async updateCategory(req, res) {
    const body = req.body
    const { id } = req.params
    try {
      await categoryModel.updateOne(body, Number(id));
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
