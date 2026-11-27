import { Router } from "express";
import { listar, adicionar, remover } from "../controllers/favoritos.controllers.js";

const router = Router();

router.post('/adicionar', adicionar);
router.get('/listar/:usuario_id', listar);
router.delete('/remover/:usuario_id/:pokemon_id', remover);

export default router;