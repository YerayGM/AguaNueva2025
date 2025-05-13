import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMunicipioDto {
  @IsNotEmpty()
  @IsString()
  MUNICIPIO: string;
}