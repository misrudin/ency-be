const labelsModel = require('../models/labels.model')
const response = require("../helpers/response");

module.exports = {
  async getLabels(req, res) {
    try {
      const result = await labelsModel.getAll();
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
  async getLabelById(req, res) {
    const { id } = req.params
    try {
      const result = await labelsModel.getOneById(id);
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
  async deleteLabelById(req, res) {
    const { id } = req.params
    try {
      await labelsModel.deleteOne(id);
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
  async addLabel(req, res) {
    const body = req.body
    try {
      const result = await labelsModel.insertOne(body);
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
  async updateLabel(req, res) {
    const body = req.body
    const { id } = req.params
    try {
      await labelsModel.updateOne(body, Number(id));
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
