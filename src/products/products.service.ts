import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  private products: Product[] = [];

  async getProducts() {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productId: string) {
    // const product = this.products.find(p => p.id == productId);
    let product;
    try {
      product = await this.productModel.findById(productId);
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async insertProduct(title: string, description: string, price: number) {
    // const id = this.products.length + 1;
    // const product = new Product(id, title, description, price);
    // this.products.push(product);
    const product = new this.productModel({ title, description, price });
    await product.save();
    return product._id as string;
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.getProduct(id);
    //const productIndex = this.getProductIndex(id);
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    product.save();
    //his.products[productIndex] = updatedProduct;
    return product.id;
  }

  async deleteProduct(id: string) {
    //const index = this.getProductIndex(id);
    //this.products.splice(index, 1);
    try {
      const result = await this.productModel.deleteOne({ _id: id }).exec();
      if (result.n === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // private getProductIndex(id: string) {
  //   const index = this.products.findIndex(p => p.id == id);
  //   if (index == -1) {
  //     throw new NotFoundException();
  //   }
  //   return index;
  // }
}
