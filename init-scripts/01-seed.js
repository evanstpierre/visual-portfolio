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
          { id: 1, content: "I’m in my final term of the BCom Co-op program at Toronto Metropolitan University. I’ve been active in student leadership and serve as a corporate relations associate for the Women in Law Society." },
          { id: 2, content: "In Winter 2025, I completed an academic exchange at Copenhagen Business School in Denmark and received the International Exchange Student Scholarship for my academic performance. I loved travelling Europe and experience different cultures." },
          { id: 3, content: "Outside of school, I love discovering new neighbourhoods and searching for the best bakeries in Toronto. I’m a passionate baker—especially sourdough, cookies, pies, and cakes. When I’m not baking, you’ll probably find me at the beach with Nelson (my dog) and an iced matcha latte." }
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
          { id: 3, content: "Strong background in communication and stakeholder engagement, creating clear messaging, coordinating initiatives, and building positive relationships across teams.Strong background in communication and stakeholder engagement, creating clear messaging, coordinating initiatives, and building positive relationships across teams." }
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

// print("✅ Seeded/updated info collection.");