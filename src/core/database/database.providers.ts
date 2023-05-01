import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { Car } from 'src/modules/cars/car.entity';
import { Box } from 'src/modules/boxes/box.entity';
import { Visit } from 'src/modules/visits/visit.enity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config: any;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize: Sequelize = new Sequelize(config);
        sequelize.addModels([User, Car, Box, Visit]);
        await sequelize.sync();
        return sequelize;
    },
}];