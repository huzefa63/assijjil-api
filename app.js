import express from "express"
import cors from 'cors';
import entryRoutes from './routes/entry.js' 
import authRoutes from './routes/auth.js' 
import emailRoutes from './routes/email.js' 
import getEntryRoutes from './routes/getEntry.js' 
import Murajaah from './models/murajaah.js' 
import mongoose from "mongoose";
const app = express();
app.use(cors({origin:process.env.URL,credentials:true}));
app.use(express.json());

// app.post('/entry/jadeed',(req,res,next) => res.status(200));
app.use('/entry',entryRoutes)
app.use('/getEntry',getEntryRoutes)
app.use('/auth',authRoutes)
app.use('/email',emailRoutes)


async function seedData(){
  //  try {
  //    const data = [];
  //    const year = 2026   ;

  //    let month = 0; // 0 = Jan

  //    for (let juz = 1; juz <= 30; juz++) {
  //      for (let i = 1; i <= 3; i++) {
  //        const date = new Date(year, month, i);
  //        date.setHours(0, 0, 0, 0); // set all time to 00:00

  //        data.push({
  //          userId: new mongoose.Types.ObjectId('69ec63a225ad9c6cf3bd3658'),
  //          juz: juz,
  //          que1: Math.floor(Math.random() * 20),
  //          que2: Math.floor(Math.random() * 20),
  //          tambeeh: Math.floor(Math.random() * 7),
  //          talqeen: Math.floor(Math.random() * 7),
  //          marks: Math.floor(Math.random() * 11),
  //          date: date,
  //        });
  //      } 

  //      // move month forward every ~2.5 juz to distribute evenly
  //      if (juz % 2 === 0 && month < 11) {
  //        month++;
  //      }
  //    }

  //    await Murajaah.create(data);
  //  } catch (err) {
  //    console.log(err);
  //  }
  await Murajaah.create([
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 8,
      que1: 7,
      que2: 8,
      tambeeh: 1,
      talqeen: 1,
      marks: 80,
      date: new Date("2026-04-20T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 23,
      que1: 6,
      que2: 7,
      tambeeh: 2,
      talqeen: 1,
      marks: 70,
      date: new Date("2026-04-20T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 22,
      que1: 8,
      que2: 9,
      tambeeh: 0,
      talqeen: 1,
      marks: 88,
      date: new Date("2026-04-20T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 21,
      que1: 5,
      que2: 6,
      tambeeh: 2,
      talqeen: 2,
      marks: 60,
      date: new Date("2026-04-21T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 14,
      que1: 9,
      que2: 8,
      tambeeh: 1,
      talqeen: 0,
      marks: 90,
      date: new Date("2026-04-22T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
    {
      userId: new mongoose.Types.ObjectId("69ec63a225ad9c6cf3bd3658"),
      juz: 20,
      que1: 7,
      que2: 7,
      tambeeh: 1,
      talqeen: 1,
      marks: 75,
      date: new Date("2026-04-25T00:00:00.000Z"),
      month: "April",
      monthNumber: 4,
    },
  ]);
}
// seedData();

// usage


app.use((err, req, res, next) => {
  console.log("🚨 ERROR:", err.message, err.statusCode);

  return res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
  });
});
export default app;