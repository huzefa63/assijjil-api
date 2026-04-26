import catchAsync from "../utils/catchAsync.js";
import Jadeed from "../models/jadeed.js";
import User from "../models/user.js";
import Murajaah from "../models/murajaah.js";
import Juzhaali from "../models/juzhaali.js";
import Tasmee from "../models/tasmee.js";
import { getStartWeekDate } from "../helper/date.js";
import mongoose from "mongoose";

export const handleGetJadeed = catchAsync(async (req, res, next) => {
  const id  = req.user;
  const user = await User.findById(id);
  if(!user) return res.status(400).json({message:'user not found'})
  let jadeed = { surah: "", ayah: "" };
  if (user) {
    jadeed.ayah = user.jadeedAyah;
    jadeed.surah = user.jadeedSurah;
  }

  const weeklyJadeed = await getWeeklyData(Jadeed, id);

  const to = new Date(new Date().setHours(23, 59, 59, 999));
  const today = new Date();
  const lastMonth = new Date(
    new Date().setMonth(today.getMonth() !== 0 ? today.getMonth() - 1 : 11),
  ).setHours(0, 0, 0, 0);

  const fromMonth = new Date(lastMonth);

  const MonthlyJadeed = await Jadeed.find({
    userId: id,
    date: {
      $gte: fromMonth,
      $lte: to,
    },
  });

  const weeklyJadeedPages =
    weeklyJadeed.reduce((curr, pre) => curr + pre.lines, 0) / 15;
  const monthlyJadeedPages =
    MonthlyJadeed.reduce((curr, pre) => curr + pre.lines, 0) / 15;

  res.status(200).json({
    ok: true,
    jadeed,
    weeklyJadeedPages: weeklyJadeedPages.toFixed(1),
    monthlyJadeedPages: monthlyJadeedPages.toFixed(1),
  });
});

export const handleGetWeeklyMurajaah = catchAsync(async (req, res, next) => {
  const id = req.user;
  const weekStart = getStartWeekDate();
  const murajaah = await Murajaah.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
        $and: [
          { date: { $gte: weekStart } },
          { date: { $lte: new Date(new Date().setHours(23, 59, 59, 999)) } },
        ],
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        entries: { $push: "$$ROOT"},
      },
    },
    {
      $project: {
        day: {
          $arrayElemAt: [
            ["sun","mon", "tue", "wed", "thur", "fri", "sat"],
            {$subtract:["$_id",1]}
        ],
        },
        dayNo:"$_id",
        entries: 1,
      },
    },
    {
      $sort:{dayNo:1}
    }
  ]);
  // console.log(murajaah);
  res.status(200).json({ok:true,murajaah});
});
// export const handleGetWeeklyMurajaah = catchAsync(async (req, res, next) => {
//   const id = req.user;

//   const murajaah = await getWeeklyData(Murajaah, id);
//   console.log(murajaah)
//   res.status(200).json({
//     ok: true,
//     murajaah,
//   });
// });
 
export const handleGetWeeklyJuzhaali = catchAsync(async (req, res, next) => {
  const id = req.user;

  const juzhaali = await getWeeklyData(Juzhaali, id);

  res.status(200).json({
    ok: true,
    juzhaali,
  });
});

export const handleGetWeeklyTasmee = catchAsync(async (req, res, next) => {
  const id = req.user;

  const tasmee = await getWeeklyData(Tasmee, id);

  res.status(200).json({
    ok: true,
    tasmee,
  });
});

async function getWeeklyData(model, id) {
  const from = getStartWeekDate();
  const to = new Date(new Date().setHours(23, 59, 59, 999));
  const data = await model.find({
    userId: id,
    date: {
      $gte: from,
      $lte: to,
    },
  }).sort({date:1});
  return data;
}

export const getYearlyAvgJadeed = catchAsync(async (req, res, next) => {
  const id = req.user;

  const today = new Date();
  const current = new Date();

  current.setFullYear(today.getFullYear() - 1);
  current.setHours(0, 0, 0, 0);
  const yearlyAvgJadeed = await Jadeed.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
        date: { $gte: current },
      },
    },
    {
      $group: {
        _id: "$month",
        monthNumber: { $first: "$monthNumber" },
        lines: { $sum: "$lines" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        pages: { $divide: ["$lines", 15] },
        monthNumber: 1,
      },
    },
    { $sort: { monthNumber: 1 } },
  ]);

  res.status(200).json({ ok: true, yearlyAvgJadeed });
});

export const getYearlyAvgJuz = catchAsync(async (req, res, next) => {
  const id = req.user;

  const today = new Date();
  const current = new Date();

  current.setFullYear(today.getFullYear() - 1);
  current.setHours(0, 0, 0, 0);

  const murajaah = await Murajaah.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
        $and: [{date:{ $gte: current }},{date:{$lte:new Date(today.setHours(0,0,0,0))}}],
      },
    },
    {
      $group:{
        _id:'$juz',
        marks:{$avg:'$marks'}
      }
    },
    {
      $project:{
        _id:0,
        juz:"$_id",
        marks:{$round:["$marks",0]}
      }
    },
    {
      $sort:{juz:1}
    }
  ]);
  res.status(200).json({ ok: true, murajaah });
});

export const getAllEntryOfJuz = catchAsync(async (req, res, next) => {
  const {juz } = req.params;
  const {page} = req.query;
  const id = req.user;
  console.log(typeof juz)
  const skip = (page - 1) * 10;  
  const today = new Date();
  const current = new Date();

  current.setFullYear(today.getFullYear() - 1);
  current.setHours(0, 0, 0, 0);
  current.setDate(1);

  const stats = await Murajaah.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
        juz:Number(juz),
      },
    },
    {
      $group: {
        _id: "$juz",
        avgMarks: { $avg: "$marks" },
        timesRecited: { $sum: 1 },
        timesPassed: {
          $sum: {
            $cond: [{ $gte:['$marks',7]} ,1, 0],
          },
        },
        timesFailed:{
          $sum:{
            $cond:[
              {$lte:["$marks",6]},1,0
            ]
          }
        }
      },
    },
  ]);

  // const totalRes = await Murajaah.countDocuments({
  //   userId: new mongoose.Types.ObjectId(id),
  //   date: { $gte: current },
  //   juz:juz
  // });
  const paginatedJuz = await Murajaah.find({
    userId:new mongoose.Types.ObjectId(id),
    date:{$gte:current},
    juz:juz
  }).limit(10).skip(skip).sort({date:1});
  console.log(stats)
  
  // console.log(finalRes)
  res.status(200).json({ ok: true, juz:paginatedJuz,totalRes:stats[0].timesRecited,stats });
});