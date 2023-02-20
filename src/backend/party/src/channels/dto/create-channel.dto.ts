import { PickType } from '@nestjs/swagger';
import { Channels } from '../../entities/Channels';

export class CreateChannelDto extends PickType(Channels, ['url', 'name']) {}
