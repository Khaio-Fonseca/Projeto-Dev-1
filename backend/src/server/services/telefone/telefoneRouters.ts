import { Router } from "express";
import TelefoneController from "./telefoneControllers";
const router = Router();

router.post("/", TelefoneController.create);
router.get("/", TelefoneController.getAll);
router.get("/:id", TelefoneController.getById);
router.put("/:id", TelefoneController.update);
router.delete("/:id", TelefoneController.delete);

export default router;
