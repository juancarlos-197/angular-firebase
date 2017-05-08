'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newUsuarios;

describe('Usuarios API:', function() {
  describe('GET /api/usuarioss', function() {
    var usuarioss;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarioss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          usuarioss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(usuarioss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/usuarioss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/usuarioss')
        .send({
          name: 'New Usuarios',
          info: 'This is the brand new usuarios!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUsuarios = res.body;
          done();
        });
    });

    it('should respond with the newly created usuarios', function() {
      expect(newUsuarios.name).to.equal('New Usuarios');
      expect(newUsuarios.info).to.equal('This is the brand new usuarios!!!');
    });
  });

  describe('GET /api/usuarioss/:id', function() {
    var usuarios;

    beforeEach(function(done) {
      request(app)
        .get(`/api/usuarioss/${newUsuarios._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          usuarios = res.body;
          done();
        });
    });

    afterEach(function() {
      usuarios = {};
    });

    it('should respond with the requested usuarios', function() {
      expect(usuarios.name).to.equal('New Usuarios');
      expect(usuarios.info).to.equal('This is the brand new usuarios!!!');
    });
  });

  describe('PUT /api/usuarioss/:id', function() {
    var updatedUsuarios;

    beforeEach(function(done) {
      request(app)
        .put(`/api/usuarioss/${newUsuarios._id}`)
        .send({
          name: 'Updated Usuarios',
          info: 'This is the updated usuarios!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUsuarios = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsuarios = {};
    });

    it('should respond with the updated usuarios', function() {
      expect(updatedUsuarios.name).to.equal('Updated Usuarios');
      expect(updatedUsuarios.info).to.equal('This is the updated usuarios!!!');
    });

    it('should respond with the updated usuarios on a subsequent GET', function(done) {
      request(app)
        .get(`/api/usuarioss/${newUsuarios._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let usuarios = res.body;

          expect(usuarios.name).to.equal('Updated Usuarios');
          expect(usuarios.info).to.equal('This is the updated usuarios!!!');

          done();
        });
    });
  });

  describe('PATCH /api/usuarioss/:id', function() {
    var patchedUsuarios;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/usuarioss/${newUsuarios._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Usuarios' },
          { op: 'replace', path: '/info', value: 'This is the patched usuarios!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUsuarios = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUsuarios = {};
    });

    it('should respond with the patched usuarios', function() {
      expect(patchedUsuarios.name).to.equal('Patched Usuarios');
      expect(patchedUsuarios.info).to.equal('This is the patched usuarios!!!');
    });
  });

  describe('DELETE /api/usuarioss/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/usuarioss/${newUsuarios._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usuarios does not exist', function(done) {
      request(app)
        .delete(`/api/usuarioss/${newUsuarios._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
