import { Controller, Get, Param, Post, Render, Body, Put } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductMvcController {
    constructor(private productService: ProductService) {}

    @Get()
    @Render('index')
    public async index() {
        return {
            products: await this.productService.findAll()
        }
    }

    @Get(":maSanPham")
    @Render('form')
    public async getFormUpdate(@Param('maSanPham') maSanPham: string) {
        return {
            product: await this.productService.findById(maSanPham)
        };
    }

    @Put(":maSanPham")
    public async updadte(@Param('maSanPham') maSanPham: string, @Body() product: Product) {
        return {
            product: await this.productService.update(maSanPham, product)
        };
    }
}
