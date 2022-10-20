import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import EMPLOYES_QUERY from '../query/employe.query.js';

const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export const getEmployes = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching employe`);
  database.query(EMPLOYES_QUERY.SELECT_EMPLOYES, (error, results) => {
    if (!results) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No employes found`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `employes retrieved`, { employes: results }));
    }
  });
};

export const createEmploye = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating employe`);
  database.query(EMPLOYES_QUERY.CREATE_EMPLOYE_PROCEDURE, Object.values(req.body), (error, results) => {
    if (!results) {
      logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
    } else {
      const employe = results[0][0];
      res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `employe created`, { employe }));
    }
  });
};

export const getEmploye = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching employe`);
  database.query(EMPLOYES_QUERY.SELECT_EMPLOYE, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `employe by id ${req.params.id} was not found`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `employe retrieved`, results[0]));
    }
  });
};

export const updateEmploye = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching employe`);
  database.query(EMPLOYES_QUERY.SELECT_EMPLOYE, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `employe by id ${req.params.id} was not found`));
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating employe`);
      database.query(EMPLOYES_QUERY.UPDATE_EMPLOYE, [...Object.values(req.body), req.params.id], (error, results) => {
        if (!error) {
          res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `employe updated`, { id: req.params.id, ...req.body }));
        } else {
          logger.error(error.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
        }
      });
    }
  });
};

export const deleteEmploye = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting employe`);
  database.query(EMPLOYES_QUERY.DELETE_EMPLOYE, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `employe deleted`, results[0]));
    } else {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `employe by id ${req.params.id} was not found`));
    }
  });
};

export default HttpStatus;


