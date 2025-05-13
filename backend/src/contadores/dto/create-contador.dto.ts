import { IsInt } from 'class-validator';

export class CreateContadorDto {
  @IsInt()
  CONTADOR: number;
}