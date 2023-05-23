const response = (data) => {
  const result = {};
  result.code = data.code;
  result.meta = data.meta;
  result.data = data.data || null;
  result.message = data.message || null;
  return data.res.status(data.code).json(result);
}

module.exports = response