import express, { Router } from 'express';
import LeadCtrl from "../controller/lead.ctrl";
import container from "../ioc";
import fs from "fs";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadCtrl = container.get("lead.ctrl");
router.post("/", leadCtrl.sendCtrl);
router.get("/qr", (req, res) => {
  const qrPath = "./tmp/qr.svg";
  
  // Verificar si el archivo existe
  fs.access(qrPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Error al acceder al archivo:", err);
      res.status(404).send("Archivo QR No encontrado");
      return;
    }
    
    // Leer el contenido del archivo
    fs.readFile(qrPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        res.status(500).send("Error interno del servidor");
        return;
      }

      // Enviar el contenido del archivo como respuesta
      res.header("Content-Type", "image/svg+xml");
      res.send(data);
    });
  });
});

export { router };
