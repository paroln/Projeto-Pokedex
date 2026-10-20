import { Router } from 'express';
import registrar from "../controllers/usuarios.controller.js";
const router = Router();

router.post('/usuarios', registrar);

export default router;