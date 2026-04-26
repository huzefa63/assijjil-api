import express from 'express';
import { handleJadeedEntry, handleJuzhaaliEntry, handleMurajaahEntry, handleTasmeeEntry } from '../controller/entry.js';
import { protectRoute } from '../controller/auth.js';

const route = new express.Router();

route.post('/jadeed',protectRoute,handleJadeedEntry);
route.post('/murajaah',protectRoute,handleMurajaahEntry);
route.post('/juzhaali',protectRoute,handleJuzhaaliEntry);
route.post('/tasmee',protectRoute,handleTasmeeEntry);

export default route;