import { PartialType } from '@nestjs/swagger';
import { CreateLoafDto } from './create-loaf.dto';

export class UpdateLoafDto extends PartialType(CreateLoafDto) {}
