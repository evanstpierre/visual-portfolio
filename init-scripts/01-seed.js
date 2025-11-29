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
    $set: {
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
          { id: 1, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae augue ac arcu convallis varius. Sed at libero eu risus bibendum tincidunt. Curabitur tempus sem id finibus." },
          { id: 2, content: "Praesent cursus, odio sed faucibus vulputate, sem ipsum ultricies tellus, vel malesuada tortor libero vitae magna. Fusce accumsan, nisi nec sagittis posuere, eros metus porta nulla." },
          { id: 3, content: "Ut ac justo ut erat gravida laoreet. Nunc at magna porta, suscipit sem in, consequat purus. Integer sodales, sapien vitae blandit vehicula, ligula risus efficitur quam." }
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
          { id: 1, content: "Fusce sit amet augue nec sapien hendrerit ullamcorper. Morbi malesuada, elit ut blandit luctus, magna justo sollicitudin velit, a tristique arcu risus at nisi." },
          { id: 2, content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin eget lorem sit amet velit facilisis placerat in eget risus." },
          { id: 3, content: "Etiam cursus, turpis sit amet dapibus efficitur, justo augue dictum nunc, nec rutrum metus ante non neque. Praesent tincidunt justo nec diam consectetur vulputate." }
        ],
        heading: "Work Experience",
        jobs: [
          { name: "CIBC", title: "Governance Anaylist", date: "25" },
          { name: "HydroOne", title: "Internal Coms. Intern", date: "24" },
          { name: "City of Toronto", title: "Pool Manager", date: "22/25" }
        ],
      },
    },
  },
  { upsert: true }
);

print("✅ Seeded/updated info collection.");