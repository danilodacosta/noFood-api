require('../models/produto-model');

const baseRepository = require('../bin/base/repository-base');

class ProdutoRepository {
   
   constructor() { 
      this._repository = new baseRepository('Produto');
   }

     async create(data) {
        return await this._repository.create(data);       
     }

     async update(id, data) {
         return await this._repository.update(id,data)       
     }

     async getAll() {
        return await this._repository.getAll();
    }

    async getById(id) {
       return await this._repository.findById(id);
    }

    async delete(id) {
        return await this._repository.delete(id);
     }
   
}

module.exports = ProdutoRepository;