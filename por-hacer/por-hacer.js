const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        } else {
            console.log('Data almacenada');
        }
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();

    borrado = listadoPorHacer.filter(tarea => tarea.descripcion === descripcion);
    listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // let borrado = listadoPorHacer.slice(index);
    guardarDB();
    return borrado;
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}