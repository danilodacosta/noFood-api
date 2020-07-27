require('../models/categoria-model');

const baseRepository = require('../bin/base/repository-base');

class categoriaRepository {

   constructor() { 
      this._repository = new baseRepository('Categoria');
   }

     async create(data) {
        return await this._repository.create(data);       
     }

     async update(id, data) {
         return await this._repository.update(id, data)       
     }

     async getAll() {
        return await this._repository.getAll();
    }

    async getById(id) {
       return await this._repository.getById(id);
    }

    async delete(id) {
        return await this._repository.delete(id);
     }
   
}

module.exports = categoriaRepository;