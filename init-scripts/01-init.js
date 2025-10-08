// 01-init.js
var dbName = _getEnv("MONGO_INITDB_DATABASE") || "appdb";
var appUser = "appuser";
var appPass = "apppass";
var appDb = db.getSiblingDB(dbName);

// 1) Create or confirm user
try {
  appDb.createUser({ user: appUser, pwd: appPass, roles: [{ role: "readWrite", db: dbName }] });
  print(">>> user:create OK (" + appUser + ")");
} catch (e) {
  if (e && ("" + e).match(/already exists/i)) {
    print(">>> user:create skipped (already exists)");
  } else {
    print(">>> user:create ERROR: " + e);
    throw e;
  }
}

// 2) Seed (idempotent upserts)
var inlineSeed = [
  {
    name: "Sara Hepperle",
    footer: "Toronto, ON",
    contact: { title: "Contact", address: "sarahepperle@gmail.com", subject: "Hi Sara! Lets Connect" },
    about: {
      title: "About",
      heading: "Designer / Developer",
      texts: [
        { id: 1, content: "Sample about paragraph 1." },
        { id: 2, content: "Sample about paragraph 2." }
      ],
      contact_list: [
        { name: "LinkedIn", link: "https://linkedin.com/in/sara" },
        { name: "GitHub", link: "https://github.com/sara" }
      ]
    },
    work: {
      title: "Work",
      heading: "Experience",
      texts: [
        { id: 1, content: "Sample about paragraph 1." },
        { id: 2, content: "Sample about paragraph 2." }
      ],
      jobs: [
        { name: "City of Toronto", title: "Analyst", date: "2024" },
        { name: "Hydro One", title: "Policy", date: "2025" }
      ]
    }
  }
];

inlineSeed.forEach(function (doc) {
  var res = appDb.info.updateOne({ name: doc.name }, { $set: doc }, { upsert: true });
  if (res.upsertedId) {
    print(">>> seed:insert name=" + doc.name);
  } else if (res.matchedCount && res.modifiedCount) {
    print(">>> seed:update name=" + doc.name);
  } else if (res.matchedCount) {
    print(">>> seed:noop   name=" + doc.name + " (already up-to-date)");
  } else {
    print(">>> seed:unknown result for name=" + doc.name + " => " + tojson(res));
  }
});

// 3) Summaries
var count = appDb.info.countDocuments();
print(">>> seed:count info=" + count);

var usersAdmin = db.getSiblingDB("admin").getUsers().map(function (u) { return u.user + "@" + u.db; });
var usersApp   = appDb.getUsers().map(function (u) { return u.user + "@" + u.db; });
print(">>> users:admin=[" + usersAdmin.join(", ") + "]");
print(">>> users:" + dbName + "=[" + usersApp.join(", ") + "]");

print(">>> init:done");