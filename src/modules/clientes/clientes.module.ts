import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from './entities';
import { ClientesController } from './controllers/clientes/clientes.controller';
import { ClientesService } from './services/clientes/clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clientes])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
