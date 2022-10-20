import express from 'express';
import { getEmployes, createEmploye, getEmploye, deleteEmploye, updateEmploye } from '../controller/employe.controller.js';

const employeRoutes = express.Router();

employeRoutes.route('/')
  .get(getEmployes)
  .post(createEmploye);

employeRoutes.route('/:id')
  .get(getEmploye)
  .put(updateEmploye)
  .delete(deleteEmploye);

export default employeRoutes;
