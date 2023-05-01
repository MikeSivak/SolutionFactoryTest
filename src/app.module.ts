import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { BoxesModule } from './modules/boxes/boxes.module';
import { VisitsModule } from './modules/visits/visits.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './modules/cronjobs/cronjobs.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CarsModule,
    BoxesModule,
    VisitsModule,
    ScheduleModule.forRoot(),
    CronjobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
