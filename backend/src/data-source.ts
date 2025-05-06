import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3308,
    database: 'AguaNuevaFCT2',
    username: 'root',
    password: 'MyS3curePassword',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
});