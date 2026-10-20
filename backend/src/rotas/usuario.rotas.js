import { Router } from 'express';
import registrar from "../controllers/usuario.controllers.js";
const router = Router();

router.post('/usuarios', registrar);

export default router;