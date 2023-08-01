let fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(data) {
        try {
            let array = [];
            let content = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            console.log('contenido:', content);
            if (!content) {
                data.id = 1;
            } else {
                array = JSON.parse(content);
                data.id = array.length + 1;
            }
            array.push(data);
            await fs.promises.writeFile(`${this.nombre}`, JSON.stringify(array));
            return data.id;
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            let obj = JSON.parse(data).find(item => item.id == id);
            return obj;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            let obj = JSON.parse(data);
            return obj;
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            let obj = JSON.parse(data);
            let index = obj.findIndex(item => item.id == id);
            obj.splice(index, 1);
            let res = await fs.promises.writeFile(`${this.nombre}`, JSON.stringify(obj));
            console.log('Se eliminó el producto');
            return res;
        } catch (error) {
            return error;
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.nombre}`, '');
            console.log('Se eleminió todo el contenido');
        } catch (error) {
            return error;
        }
    }
}

module.exports = Contenedor;