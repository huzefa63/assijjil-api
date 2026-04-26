import catchAsync from "../utils/catchAsync.js";
import Jadeed from "../models/jadeed.js";
import Murajaah from "../models/murajaah.js";
import Juzhaali from "../models/juzhaali.js";
import Tasmee from "../models/tasmee.js";
import User from "../models/user.js";

export const handleJadeedEntry = catchAsync(async (req, res, next) => {
  const { surah, ayah, lines, date } = req.body;
  const id = req.user;
  await User.findByIdAndUpdate(id,{jadeedAyah:ayah,jadeedSurah:surah});
  await Jadeed.create({ surah, ayah, lines, date, userId: id });
  return res.status(200).json({ ok:true });
});

export const handleMurajaahEntry = catchAsync(async (req, res, next) => {
  const {  juz, que1, que2, date, tambeeh, talqeen, marks } = req.body;
  const id = req.user;
  const isLimit = await Murajaah.find({userId:id,date});
  if(isLimit.length === 4) return res.status(400).json({ok:false,status:'limit'})
  await Murajaah.create({userId:id,juz,que1,que2,date,tambeeh,talqeen,marks});
  return res.status(200).json({ status: "ok" });
});

export const handleJuzhaaliEntry = catchAsync(async (req, res, next) => {
  console.log('juzhaali entry')
  const { startPage, endPage, tambeeh, talqeen, marks, date } = req.body;
  const id = req.user;
  const isJuzhaali = await Juzhaali.findOne({date});
  if(isJuzhaali) return res.status(400).json({status:'exists'});
  await Juzhaali.create({userId:id,startPage,endPage,tambeeh,talqeen,marks,date});
  return res.status(200).json({ ok: true });
});

export const handleTasmeeEntry = catchAsync(async (req, res, next) => {
  
  const { juz, pages, tambeeh, talqeen, marks, date } = req.body;
  const id = req.user;
  const doc = await Tasmee.findOne({date});
  if(doc?.juzList?.length < 4) {
    doc.juzList.push({ juz, pages, tambeeh, talqeen, marks });
    await doc.save();
  }
  if(doc?.juzList?.length >= 4) return res.status(400).json({status:'limit'});
  // const isTasmee = await Tasmee.findOneAndUpdate(
  //   { date },
  //   { $push: { juzList: { juz, pages, tambeeh, talqeen, marks } } },
  //   {returnDocument:true},
  // );
  if(!doc) await Tasmee.create({userId:id,date,juzList:{juz,pages,tambeeh,talqeen,marks,date}});
  res.status(201).json({ok:true});
});