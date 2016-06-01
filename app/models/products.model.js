"use strict";
class ProductModel {
    constructor(prodImage = "", prodName = "", prodDescription = "", prodUrl = "", prodId = "") {
        this.prodImage = prodImage;
        this.prodName = prodName;
        this.prodDescription = prodDescription;
        this.prodUrl = prodUrl;
        this.prodId = prodId;
    }
}
exports.ProductModel = ProductModel;
