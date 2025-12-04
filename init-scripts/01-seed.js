// 02-seed.js
const dbName =
  process.env.MONGO_DB ||        // <- your app DB (myapp)
  process.env.MONGO_INITDB_DATABASE ||
  "myapp";

print(`🏗️ Seeding initial data into database: ${dbName}`);
db = db.getSiblingDB(dbName);

// idempotent upsert so re-runs don't duplicate
db.info.updateOne(
  { _seedKey: "profile_v1" },
  {
    $set:{
      _seedKey: "profile_v1",
      name: "Sara Hepperle",
      footer: "Toronto, CA",
      contact: {
        title: "Contact",
        address: "sarahepperle@gmail.com",
        subject: "Lets Connect! From sarahepperle.com",
      },
      resume: { title: "Resume", href: "" },
      about: {
        title: "About",
        texts: [
          { id: 1, content: "I’m in my final term of the Bachelor of Commerce Co-op program at Toronto Metropolitan University. I’ve been active in student leadership with the TMU Women in Law Society and developed an interest in law and ethics." },
          { id: 2, content: "In Winter 2025, I completed an exchange at Copenhagen Business School and received the International Exchange Student Scholarship. I loved traveling Europe and experiencing different cultures." },
          { id: 3, content: "Outside school, I love exploring new neighbourhoods and finding Toronto’s best bakeries. I’m a passionate baker, I love going to the the beach with Nelson (my dog) and a matcha latte." }
        ],
        heading: "Contact Information",
        contact_list: [
          { name: "LinkedIn", link: "https://www.linkedin.com/in/sara-hepperle/" },
          { name: "Email", link: "mailto:sarahepperle@gmail.com" }
        ],
      },
      work: {
        title: "Work",
        texts: [
          { id: 1, content: "Experience supporting governance and business operations by improving processes, organizing information, and helping teams maintain consistency and compliance." },
          { id: 2, content: "Strong background in communication and stakeholder engagement, creating clear messaging, coordinating initiatives, and building positive relationships across teams." },
          { id: 3, content: "Strong background in communication and stakeholder engagement, creating clear messaging, coordinating initiatives, and building positive relationships across teams." }
        ],
        heading: "Work Experience",
        jobs: [
          { name: "CIBC", title: "Governance Analyst", date: "25" },
          { name: "Hydro One", title: "Internal Comms. Intern", date: "24" },
          { name: "City of Toronto", title: "Pool Manager", date: "22-25" }
        ],
      },
    },
  },
  { upsert: true }
);

// ─────────────────────────────────────────────────────────────
// Seed users collection (for login + passwordHash)
// ─────────────────────────────────────────────────────────────

// bcrypt hash from ENV
const adminPasswordHash = process.env.USER_PASS;

db.users.updateOne(
  { _seedKey: "admin_v1" }, // idempotent upsert key
  {
    $set: {
      _seedKey: "admin_v1",
      id: 1,                       // numeric ID for your code
      email: "admin@sarahepperle.com",
      role: "ADMIN",
      passwordHash: adminPasswordHash,
    },
  },
  { upsert: true }
);

print("✅ Seeded/updated info and users collections.");

// print("✅ Seeded/updated info collection.");