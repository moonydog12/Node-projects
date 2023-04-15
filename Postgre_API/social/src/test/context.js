const { randomBytes } = require('crypto');
const format = require('pg-format');
const { default: migrate } = require('node-pg-migrate');
const pool = require('../pool');
require('dotenv').config({ path: __dirname + '/../../.env' });

const DEFAULT_OPTIONS = {
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork-test',
  user: 'postgres',
  password: process.env.DBpassword,
};

class Context {
  static async build() {
    // Randomly generating a role name to connect to PG as (*) // a role name in pg must start with a letter
    const roleName = 'a' + randomBytes(4).toString('hex');

    // Connect to PG as usual
    await pool.connect(DEFAULT_OPTIONS);

    // Create a new role
    await pool.query(
      format('CREATE ROLE %I WITH LOGIN PASSWORD %L;', roleName, roleName)
    );

    // Create a schema with the same name
    await pool.query(
      format('CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.close();

    // Run our migrations in the new schema
    await migrate({
      schema: roleName,
      direction: 'up',

      // migrate function generates logs to terminal
      log: () => {},

      // Don't lock the DB when running multiple migrations simultaneously
      noLock: true,
      dir: 'migrations',
      databaseUrl: {
        host: 'localhost',
        port: 5432,
        database: 'socialnetwork-test',
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role (*)
    await pool.connect({
      host: 'localhost',
      port: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async reset() {
    return pool.query(`DELETE FROM users;`);
  }

  // Delete the role which was created for testing
  async close() {
    // Disconnect from PG
    await pool.close();

    // Reconnect as our root user
    await pool.connect(DEFAULT_OPTIONS);

    // Delete the role and schema we created
    await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));
    await pool.query(format('DROP ROLE %I', this.roleName));

    // Disconnect
    await pool.close();
  }
}

module.exports = Context;
