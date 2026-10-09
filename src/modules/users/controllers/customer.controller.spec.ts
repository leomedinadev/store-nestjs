import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
    let controller: CustomerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
        })
            // Las dependencias (repositorios, servicios, config) se simulan
            .useMocker(() => ({}))
            .compile();

        controller = module.get<CustomerController>(CustomerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
