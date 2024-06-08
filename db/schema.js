const { sqliteTable, text } = require("drizzle-orm/sqlite-core");

module.exports.users = sqliteTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});
