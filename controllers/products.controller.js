module.exports = {
  getProductList(req, res) {
    const data = getDataProductFromDB();
    return response({
      res,
      data,
      code: EStatus.success,
      message: "",
    });
  },
};
