const connection = require('../configs/database')

module.exports = {
  insertOne: data => {
    return new Promise((reslove, reject) => {
      connection.query("INSERT INTO users SET ?", data, (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err, result) => {
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
      connection.query("SELECT * FROM users WHERE id=? LIMIT 1", id, (err, result) => {
        if (!err) {
          resolve(result[0]);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getOneByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users WHERE email=? LIMIT 1", email, (err, result) => {
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
      connection.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, result) => {
        if (!err) {
          reslove(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
