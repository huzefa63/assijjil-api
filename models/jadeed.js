import express from 'express';
import mongoose, { Mongoose } from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    surah: {
      required: true,
      type: String,
    },
    ayah: {
      required: true,
      type: Number,
    },
    lines: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      type: Date,
    },
    month:String,
    monthNumber:Number,
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

const model = mongoose.model('Jadeed',schema);
export default model;
