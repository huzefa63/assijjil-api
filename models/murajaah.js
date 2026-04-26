import express from 'express';
import mongoose, { Mongoose } from 'mongoose';

function arrayLimit(val){
    return val.length <= 10;
}

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    juz: {
      type: Number,
      required: true,
    },
    que1: {
      type: Number,
      required: true,
    },
    que2: {
      type: Number,
      required: true,
    },
    tambeeh: {
      type: Number,
      required: true,
    },
    talqeen: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    month: String,
    monthNumber: Number,
    // validate: [arrayLimit, "only 10 entry"],
  },
  { timestamps: true },
); 

schema.pre('save',function(){
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const currMonth = months[this.date.getMonth()]
  this.month = currMonth;
  this.monthNumber = this.date.getMonth() + 1;
})

const Model = mongoose.model('Murajaah',schema);
export default Model;
