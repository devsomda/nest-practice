import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import JWT from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization.split(' ');
    const token = authorization && authorization[1];

    if (!token) {
      throw new UnauthorizedException('로그인이 필요한 서비스입니다.');
    }

    try {
      const { JWT_KEY } = process.env;
      const verified = JWT.verify(token, JWT_KEY);
      request.user = verified.nickname; // 요청 객체에 정보 추가
      console.log('인증 성공');
      return true;
    } catch (error) {
      throw new UnauthorizedException('로그인이 필요한 서비스입니다.');
    }
  }
}
