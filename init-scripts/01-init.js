
const dbName = process.env.MONGO_DB;
const readUser = process.env.MONGO_APP_R_USER;
const readPass = process.env.MONGO_APP_R_PASS;
const writeUser = process.env.MONGO_APP_RW_USER;
const writePass = process.env.MONGO_APP_RW_PASS;

print(`🏗️ Initializing database: ${dbName}`);
const db = db.getSiblingDB(dbName);

function ensureUser(user, pwd, role) {
  const existing = db.getUser(user);
  if (existing) {
    db.updateUser(user, { roles: [{ role, db: dbName }] });
    print(`🔁 Updated user '${user}' with ${role} on '${dbName}'.`);
  } else {
    db.createUser({ user, pwd, roles: [{ role, db: dbName }] });
    print(`✅ Created user '${user}' with ${role} on '${dbName}'.`);
  }
}

ensureUser(readUser, readPass, "read");
ensureUser(writeUser, writePass, "readWrite");

print("🎉 Users created successfully.");