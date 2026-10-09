import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';

describe('BrandsController', () => {
    let controller: BrandsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BrandsController],
        })
            // Las dependencias (repositorios, servicios, config) se simulan
            .useMocker(() => ({}))
            .compile();

        controller = module.get<BrandsController>(BrandsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
