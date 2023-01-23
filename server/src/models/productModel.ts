import mongoose, { Document } from 'mongoose'

export interface ProductDocument extends Document  {
  id: number
  name: string
  image: string
  price: number
  description: string
  rating: number
  category: string
}

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    //required: true,
  },
  name: {
    type: String,
    index: true,
    requried: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
  },
  image: {
    type: String,
    required: [true, "image is required"],
},

  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ProductDocument>('Product', ProductSchema);