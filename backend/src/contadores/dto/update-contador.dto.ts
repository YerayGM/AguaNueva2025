import { PartialType } from '@nestjs/swagger';
import { CreateContadorDto } from './create-contador.dto';

export class UpdateContadorDto extends PartialType(CreateContadorDto) {}