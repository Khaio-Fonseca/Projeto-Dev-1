
import express from 'express';
import representanteController from './representanteControllers';

const router = express.Router();

// Rota para obter todos os representantes
//router.get('/', representanteController.getRepresentantes);

// Rota para obter um representante específico
//router.get('/:id', representanteController.getRepresentanteById);

// Rota para criar um novo representante
router.post('/:id_cliente', representanteController.create);

// Rota para atualizar um representante existente
//router.put('/:id', representanteController.updateRepresentante);

// Rota para excluir um representante
router.delete('/:id', representanteController.delete);

export default router;
