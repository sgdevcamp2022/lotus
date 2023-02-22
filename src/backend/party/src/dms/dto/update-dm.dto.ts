import { PartialType } from '@nestjs/mapped-types';
import { CreateDmDto } from './create-dm.dto';

export class UpdateDmDto extends PartialType(CreateDmDto) {}
