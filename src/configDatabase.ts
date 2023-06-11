import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = { 
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: "postgres",
    password: "cjmd140102",
    database: "notesApp",
    autoLoadEntities: true,
    synchronize: true,
    logging: true
};