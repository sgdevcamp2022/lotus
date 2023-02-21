import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async validateUser(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authServerUrl = this.configService.get<string>('AUTH_SERVER_ORIGIN');
    const { data } = await lastValueFrom(
      this.httpService
        .get(`${authServerUrl}/auth/my`, {
          headers: {
            Authorization: req.get('authorization'),
          },
        })
        .pipe(
          catchError((err) => {
            throw new HttpException(err.response.data, err.response.status);
          }),
        ),
    );
    req.body.user = data.data;
    return true;
  }
}
