class Collection {
    constructor(model) {
        this.model = model;
    }

    async add(obj) {
        try{
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch(error){
             console.log(error);
        }
    }

    async read(data_id) {
        let records = null;
        if (data_id) {
            records = await this.model.findOne({ where: { id: data_id } });
        } else {
            records = await this.model.findAll();
        }
        return records;
    }

    async update(obj, data_id) {
        try {
            let foundFood = await this.model.findOne({ where: { id: data_id } });
            let updatedFood = await foundFood.update(obj);
            return updatedFood;
        } catch (error) {
            console.log(error);
        }
     
    }
    
    async delete(data_id) {
        let record = await this.model.destroy({ where: { id: data_id } });
        return record;
    }

    async readFoodIngredients(id) {
        let record = await this.model.findOne({
            where: { foodId : id }
        });
        return record;   
}
    async readFoodRecipes(id, model) {
         let record = await this.model.findAll({
           where: { id },
           include: model,
        });
      return record;
      }
          // async readCustomerOrders(id) {
    //     let record = await this.model.findAll({
    //         where: { customerId: id }
    //     })
    //     return record;
    // }
     }

module.exports = Collection;