import mongoose, { Document } from 'mongoose';

export interface BlogDocument extends Document {
  id: string;
  title: string;
  image: string;
  author: string;
  publishDate: string;
  body: string;
}

const blogSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    trim: true,
    required: true
  },
  publishDate: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default mongoose.model<BlogDocument>('Blog', blogSchema);