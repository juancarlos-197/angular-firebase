'use strict';


function Usuario() {
    this.arrayUsuarios = {
        'usuarios': [
            {
                'id': 1,
                'nombre': 'Nombre Usuario 1',
                'edad': 10,
                'estado': 'Activo'
            },
            {
                'id': 2,
                'nombre': 'Nombre Usuario 2',
                'edad': 20,
                'estado': 'Inactivo'
            },
            {
                'id': 3,
                'nombre': 'Nombre Usuario 3',
                'edad': 30,
                'estado': 'Activo'
            },
        ]
    };
}

Usuario.prototype.getListUsuarios = function () {
    //return  { 'nombre': 'yamid', 'apellido': 'noguera' };
    return this.arrayUsuarios.usuarios;

}

Usuario.prototype.addUsuario = function (nuevoUsuario) {
    this.arrayUsuarios.usuarios.push(nuevoUsuario);
    return this.getListUsuarios();
}


Usuario.prototype.findById = function (id) {

    var usuario = this.arrayUsuarios.usuarios.filter(function (m) {
        return m.id == id;
    })[0];
    if (!usuario) {
        return { "error": "Usuario no encontrado" };
    } else {
        return usuario;
    }
}

module.exports = Usuario;

