import mongoose from 'mongoose';

const ContactListSchema = new mongoose.Schema({
  name: String,
  link: String
}, { _id: false });

const TextSchema = new mongoose.Schema({
  id: Number,
  content: String
}, { _id: false });

const JobSchema = new mongoose.Schema({
  name: String,
  title: String,
  date: String
}, { _id: false });

const InfoSchema = new mongoose.Schema({
  name: String,
  footer: String,

  profilePic: {
    data: Buffer,
    contentType: {
      type: String,
      default: 'image/jpeg'
    }
  },

  resume: {
    data: Buffer,
    contentType: {
      type: String,
      default: 'application/pdf'
    }
  },

  contact: {
    title: String,
    address: String,
    subject: String
  },

  about: {
    title: String,
    heading: String,
    texts: [TextSchema],
    contact_list: [ContactListSchema]
  },

  work: {
    title: String,
    heading: String,
    texts: [TextSchema],
    jobs: [JobSchema]
  }

}, { timestamps: true });

export default mongoose.models.Info || mongoose.model('Info', InfoSchema);