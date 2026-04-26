import express from 'express';
import mongoose, { Mongoose } from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    juzList: {
      required: true,
      validate:{
        validator:(arr) => {
          return arr.length <= 4; 
        },
        message:'cannot add more than 4 juz tasmee per day'
      },
      type: [
        {
          juz:{
            required:true,
            type:Number,
          },
          pages: {
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
        },
      ],
    },
    date: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true },
); 

// schema.pre("findOneAndUpdate", async function (next) {
//   const doc = await this.model.findOne(this.getQuery());

//   console.log(doc.juzList); // ✅ now works

//   next();
// });

const model = mongoose.model('Tasmee',schema);
export default model;
