import mongoose, { Schema, Document } from "mongoose";

interface IText {
  id: number;
  content: string;
}

interface IContactList {
  name: string;
  link: string;
}

interface IJob {
  name: string;
  title: string;
  date: string;
}

export interface IProfile extends Document {
  name: string;
  footer: string;
  contact: {
    title: string;
    address: string;
    subject: string;
  };
  resume: {
    title: string;
    href: string;
  };
  about: {
    title: string;
    texts: IText[];
    heading: string;
    contact_list: IContactList[];
  };
  work: {
    title: string;
    texts: IText[];
    heading: string;
    jobs: IJob[];
  };
}

const TextSchema = new Schema<IText>({
  id: { type: Number, required: true },
  content: { type: String, required: true },
});

const ContactListSchema = new Schema<IContactList>({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const JobSchema = new Schema<IJob>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
});

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    footer: { type: String },

    contact: {
      title: { type: String },
      address: { type: String },
      subject: { type: String },
    },

    resume: {
      title: { type: String },
      href: { type: String },
    },

    about: {
      title: { type: String },
      texts: [TextSchema],
      heading: { type: String },
      contact_list: [ContactListSchema],
    },

    work: {
      title: { type: String },
      texts: [TextSchema],
      heading: { type: String },
      jobs: [JobSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);