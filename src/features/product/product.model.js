let pid =1;
export default class ProductModel {
    constructor(name, quantity,id){
        this.name = name;
        this.quantity = quantity;
        this._id = id;
    }
    static getAll(){
      return products;
    }

    static add(product){
      product.id = products.length + 1;
      products.push(product);
      return product;
    }
    static get(id){
      const result = products.find((p) => p.id == id);
      return result;
    }

    static filter(minPrice,maxPrice, category){
      const result = products.filter((product) => {
        return (
          (!minPrice ||
            product.price >= minPrice) &&
          (!maxPrice ||
            product.price <= maxPrice) &&
          (!category ||
            product.category == category)
        );
      });
      return result;
    }
    static rateProduct(userId, productId,rating){
      //1. validate user and product
      const user = UserModel.getAll().find((u) => u.id == userId);
      if(!user){
        throw new ApplicationError("user not found",404);
      }

      const product = products.find((p) => p.id == productId);
      if(!product){
        throw new ApplicationError("product not found",400);
      }
      //2. check if there are any ratings and if not then add ratings array
      if(!product.ratings){
        product.ratings = [];
        product.ratings.push({userId : userId,rating : rating});
      }else {
        //check if user rating is already available
        
        const existingRatingIndex = product.ratings.findIndex(r => r.userId == userId);
        if(existingRatingIndex >= 0){
          product.ratings[existingRatingIndex] = {userId : userId,rating:rating};
        }else{
          //no existing rating then add rating
          product.ratings.push({userId : userId,rating : rating});
        }
      }

    }
}

var products = [];

