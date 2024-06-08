const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");
const { migrate } = require("drizzle-orm/better-sqlite3/migrator");

const sqlite = new Database("sqlite.db");
exports.db = drizzle(sqlite);

migrate(exports.db, { migrationsFolder: "drizzle" });
