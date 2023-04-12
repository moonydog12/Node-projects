const pg = require('pg');

class Pool {
  _pool = null;

  // 創造一個 client 來連接資料庫
  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1;');
  }

  // 關閉DB連線
  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
