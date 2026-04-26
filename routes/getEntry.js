import express from 'express';
import { getAllEntryOfJuz, getYearlyAvgJadeed, getYearlyAvgJuz, handleGetJadeed, handleGetWeeklyJuzhaali, handleGetWeeklyTasmee } from '../controller/getEntry.js';
import { protectRoute } from '../controller/auth.js';
import { handleGetWeeklyMurajaah } from '../controller/getEntry.js';

const route = new express.Router();

route.get('/jadeed',protectRoute,handleGetJadeed);
route.get('/weeklyMurajaah',protectRoute,handleGetWeeklyMurajaah);
route.get('/yearlyAvgJuz',protectRoute,getYearlyAvgJuz);
route.get('/weeklyJuzhaali',protectRoute,handleGetWeeklyJuzhaali);
route.get('/weeklyTasmee',protectRoute,handleGetWeeklyTasmee);
route.get('/yearlyAvgJadeed',protectRoute,getYearlyAvgJadeed);
route.get('/juz/:juz',protectRoute,getAllEntryOfJuz);

export default route;