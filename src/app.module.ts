import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './modules/clientes/clientes.module';
import { OrdenesModule } from './modules/ordenes/ordenes.module';
import { TecnicosModule } from './modules/tecnicos/tecnicos.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientesModule,
    OrdenesModule,
    TecnicosModule,
    DatabaseModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
