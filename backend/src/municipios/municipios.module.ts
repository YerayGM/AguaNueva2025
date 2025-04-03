import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';

@Module({
  providers: [MunicipiosService]
})
export class MunicipiosModule {}
