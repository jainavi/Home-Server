import expres from 'express';

import { shutdown } from '../controllers/power.controller';

const route = expres.Router();

route.post('/shutdown', shutdown);

export default route;
