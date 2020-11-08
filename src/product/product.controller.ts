import { Controller, Get, Param } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('/api/v1/products')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Get()
    public findAll(): Promise<Array<any>> {
        return this.productService.findAll();
    }

    @Get(':maSanPham')
    public findById(@Param('maSanPham') maSanPham: string): Promise<Product> {
        return this.productService.findById(maSanPham);
    }
}
