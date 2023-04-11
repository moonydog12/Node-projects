const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

// 選項 1
// module.exports = {
//   find() {},
//   findById() {},
//   insert() {},
// };

// 選項 2
// class UserRepo {
//   find() {}
//   findById() {}
//   insert() {}
// }

// 選項 3
class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');

    return toCamelCase(rows);
  }

  static async findById(id) {
    // Warning: Really Big security issue!
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id};`);
    return toCamelCase(rows)[0];
  }

  static async insert() {}

  static async update() {}

  static async delete() {}
}

module.exports = UserRepo;
