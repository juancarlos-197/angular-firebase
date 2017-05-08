'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var usuariosCtrlStub = {
  index: 'usuariosCtrl.index',
  show: 'usuariosCtrl.show',
  create: 'usuariosCtrl.create',
  upsert: 'usuariosCtrl.upsert',
  patch: 'usuariosCtrl.patch',
  destroy: 'usuariosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usuariosIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './usuarios.controller': usuariosCtrlStub
});

describe('Usuarios API Router:', function() {
  it('should return an express router instance', function() {
    expect(usuariosIndex).to.equal(routerStub);
  });

  describe('GET /api/usuarioss', function() {
    it('should route to usuarios.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'usuariosCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/usuarioss/:id', function() {
    it('should route to usuarios.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'usuariosCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/usuarioss', function() {
    it('should route to usuarios.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'usuariosCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/usuarioss/:id', function() {
    it('should route to usuarios.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'usuariosCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/usuarioss/:id', function() {
    it('should route to usuarios.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'usuariosCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/usuarioss/:id', function() {
    it('should route to usuarios.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'usuariosCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
