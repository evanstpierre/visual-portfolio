// /docker-entrypoint-initdb.d/02-app-roles-and-users.js
// Runs automatically on first container start when DB is empty.
// Requires env: MONGO_DB, MONGO_APP_R_USER, MONGO_APP_R_PASS, MONGO_APP_RW_USER, MONGO_APP_RW_PASS

const dbName   = process.env.MONGO_DB || "appdb";
const readUser = process.env.MONGO_APP_R_USER || "app_read";
const readPass = process.env.MONGO_APP_R_PASS || "readpass";

print(`🏗️ Initializing database: ${dbName}`);
const db = db.getSiblingDB(dbName);

// ---------- helpers ----------
function upsertRole(roleName, privileges, inheritedRoles = []) {
  const existing = db.getRole(roleName, { showPrivileges: true, showBuiltinRoles: true });
  if (existing) {
    db.updateRole(roleName, { privileges, roles: inheritedRoles });
    print(`🔁 Updated role '${roleName}'.`);
  } else {
    db.createRole({ role: roleName, privileges, roles: inheritedRoles });
    print(`✅ Created role '${roleName}'.`);
  }
}

function ensureUser(user, pwd, roles) {
  const existing = db.getUser(user);
  if (existing) {
    db.updateUser(user, { pwd, roles });
    print(`🔁 Updated user '${user}'.`);
  } else {
    db.createUser({ user, pwd, roles });
    print(`✅ Created user '${user}'.`);
  }
}

// ---------- roles (scoped to ONE collection: 'info') ----------

const infoReadWrite = [
  {
    resource: { db: dbName, collection: "info" },
    actions: ["find", "insert", "update"]
  },

];

// Create/update roles
// upsertRole("app_info_read", infoReadOnly);
upsertRole("app_info_rw", infoReadWrite);

// ---------- users ----------
ensureUser(readUser,  readPass,  [{ role: "app_info_rw", db: dbName }]);


print("🎉 Users & roles configured successfully.");