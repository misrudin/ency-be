const connection = require('../configs/database')

module.exports = {
  insertOne: data => {
    return new Promise((reslove, reject) => {
      connection.query("INSERT INTO products SET ?", data, (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getAll: (search) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products WHERE name LIKE '%${search || ''}%'`
      connection.query(query, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getOneById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products c WHERE c.id=${id} LIMIT 1`
      connection.query(query, (err, result) => {
        if (!err) {
          resolve(result[0]);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateOne: (data, id) => {
    return new Promise((reslove, reject) => {
      connection.query("UPDATE products SET ? WHERE id = ?", [data, id], (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteOne: (id) => {
    return new Promise((reslove, reject) => {
      connection.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
