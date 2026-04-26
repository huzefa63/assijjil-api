import express from 'express';
import mongoose, { Mongoose } from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startPage: {
      required: true,
      type: Number,
    },
    endPage: {
      required: true,
      type: Number,
    },
    tambeeh: {
      required: true,
      type: Number,
    },
    talqeen: {
      required: true,
      type: Number,
    },
    marks: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true },
); 

const model = mongoose.model('Juzhaali',schema);
export default model;
