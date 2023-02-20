import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Channel = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { url: request.body.url, name: request.body.name };
  },
);
