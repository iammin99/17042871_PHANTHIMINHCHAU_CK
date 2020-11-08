import { Controller, Get, Param, Render } from '@nestjs/common';
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
}
