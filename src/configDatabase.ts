import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const TypeOrmModuleAsyncConfig: TypeOrmModuleAsyncOptions = {

    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            database: process.env.DB_DATABASE,
            username: "postgres",
            password: "cjmd140102",
            entities: ["src/note/infrastructure/entities/*.ts"],
            synchronize: true,
            logging: true
        };
    }




}


/*
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    logging: true
};*/