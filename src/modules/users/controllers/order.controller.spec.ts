import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
    })
            // Las dependencias (repositorios, servicios, config) se simulan
            .useMocker(() => ({}))
            .compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
