import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/modules/products/entities/brand.entity';
import { Category } from 'src/modules/products/entities/category.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { Order } from 'src/modules/users/entities/order.entity';
import { OrderItem } from 'src/modules/users/entities/order-item.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, password, port } = configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: user,
                    password,
                    database: dbName,
                    synchronize: false,
                    autoLoadEntities: false,
                    entities: [Brand, Category, Product, User, Customer, Order, OrderItem]
                };
            },
            inject: [config.KEY],
        }),
    ],
    providers: [
        {
            provide: 'API_KEY',
            useFactory: (configService: ConfigType<typeof config>) => configService.apiKey,
            inject: [config.KEY],
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, password, port } = configService.postgres;
                const client = new Client({
                    user,
                    host,
                    database: dbName,
                    password,
                    port,
                });
                client.connect();
                return client;
            },
            inject: [config.KEY],
        },
    ],
    exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}

/**
 * synchronize: false =>  solo para ambiente de  desarrollo (synchronize)
 * esto hace que los cambios que hagamos sobre nuestro modelo de clases impacte directamente en las tablas.
 *
 * autoLoadEntities: false, => lee automaticamente todas las entidades, pero declrarlo true suele ser mas comodo para desarrollo,
 * para cuando sea false (entornos productivos) se deben declarar todas las entidades en la siguiente propiedad (entities: [Brand])
 */
