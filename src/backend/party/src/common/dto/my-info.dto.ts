import { PickType } from '@nestjs/swagger';
import { Users } from '../../entities/Users';

export class MyInfoDto extends PickType(Users, [
  'email',
  'nickname',
  'provider',
  'stoveNo',
]) {
  userId: number;
}
