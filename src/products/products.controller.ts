import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.getProduct(productId);
  }

  @Post()
  async addProduct(@Body()
  body: {
    title: string;
    description: string;
    price: number;
  }) {
    const product = await this.productService.insertProduct(
      body.title,
      body.description,
      body.price,
    );
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() body: { title: string; description: string; price: number },
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      body.title,
      body.description,
      body.price,
    );
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    await this.productService.deleteProduct(productId);
    return null;
  }
}
