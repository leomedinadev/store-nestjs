import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
    let controller: CategoriesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
        })
            // Las dependencias (repositorios, servicios, config) se simulan
            .useMocker(() => ({}))
            .compile();

        controller = module.get<CategoriesController>(CategoriesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
