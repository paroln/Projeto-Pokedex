import rotasUsuarios from './rotas/usuario.rotas.js';
import express from 'express'
import cors from 'cors'

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', rotasUsuarios);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});