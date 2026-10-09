import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './order-item.controller';

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
    })
            // Las dependencias (repositorios, servicios, config) se simulan
            .useMocker(() => ({}))
            .compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
