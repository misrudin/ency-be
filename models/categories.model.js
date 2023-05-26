const connection = require('../configs/database')

module.exports = {
  insertOne: data => {
    return new Promise((reslove, reject) => {
      connection.query("INSERT INTO categories SET ?", data, (err, result) => {
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
      const query = `SELECT * FROM categories WHERE name LIKE '%${search || ''}%'`
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
      const query = `SELECT * FROM categories c WHERE c.id=${id} LIMIT 1`
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
      connection.query("UPDATE categories SET ? WHERE id = ?", [data, id], (err, result) => {
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
      connection.query("DELETE FROM categories WHERE id = ?", id, (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
