import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductMvcController } from './product-mvc.controller';

@Module({
  controllers: [ProductController, ProductMvcController],
  providers: [ProductService]
})
export class ProductModule {}
