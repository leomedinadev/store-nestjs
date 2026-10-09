import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { Brand } from 'src/modules/products/entities/brand.entity';

describe('BrandService', () => {
    let service: BrandService;
    const repository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        merge: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        jest.resetAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BrandService,
                { provide: getRepositoryToken(Brand), useValue: repository },
            ],
        }).compile();

        service = module.get<BrandService>(BrandService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the brand with its products', async () => {
        const brand = { id: 1, name: 'Nike' };
        repository.findOne.mockResolvedValue(brand);

        await expect(service.findOne(1)).resolves.toBe(brand);
        expect(repository.findOne).toHaveBeenCalledWith({
            where: { id: 1 },
            relations: ['products'],
        });
    });

    it('should throw NotFoundException when the brand does not exist', async () => {
        repository.findOne.mockResolvedValue(null);

        await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('should not save anything when updating a brand that does not exist', async () => {
        repository.findOne.mockResolvedValue(null);

        await expect(service.update(99, { name: 'X' })).rejects.toThrow(NotFoundException);
        expect(repository.save).not.toHaveBeenCalled();
    });

    it('should create and save a brand', async () => {
        const payload = { name: 'Adidas', image: 'https://example.com/adidas.png' };
        repository.create.mockReturnValue(payload);
        repository.save.mockResolvedValue({ id: 2, ...payload });

        await expect(service.create(payload)).resolves.toEqual({ id: 2, ...payload });
        expect(repository.save).toHaveBeenCalledWith(payload);
    });
});
