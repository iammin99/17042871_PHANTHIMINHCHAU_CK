import { Test, TestingModule } from '@nestjs/testing';
import { ProductMvcController } from './product-mvc.controller';

describe('ProductMvcController', () => {
  let controller: ProductMvcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductMvcController],
    }).compile();

    controller = module.get<ProductMvcController>(ProductMvcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
