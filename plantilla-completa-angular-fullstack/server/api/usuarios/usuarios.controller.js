
var i, x={nada:"nada"};

var todosUsuarios = {usuarios:[{id:"1",nombre:"Pedro Nel",apellido:"Fernandez"},
    {id:"2",nombre:"Carlos",apellido:"Marx"},
    {id:"3",nombre:"Rodrigo",apellido:"Álvarez"}]};

export function lista(req,res){
    return res.json(todosUsuarios);
}

export function add(req, res){
    todosUsuarios.usuarios.push({id:req.body.id, nombre: req.body.nombre,apellido:req.body.apellido});
    return res.json(todosUsuarios);
}

export function busqueda(req,res){
    
    x = buscar(req.body.id);
    
    if(x==undefined){
        x={error: "no encontrado"};
    }

    return res.json(x);
}

function buscar(ide){
    
    for (i in todosUsuarios.usuarios) {
        var usuTemp = todosUsuarios.usuarios[i];
        if(usuTemp.id == ide){
            return {id: usuTemp.id, nombre: usuTemp.nombre, apellido: usuTemp.apellido};
        }

    }
}

