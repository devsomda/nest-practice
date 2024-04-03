import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { loginDto, signupDto } from './auth.dto';
import JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DatabaseService) {}

  async signup(userData: signupDto) {
    const connection = await this.dbService.getPool().getConnection();
    try {
      await connection.query(`INSERT INTO user_table SET ?`, userData);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async login(userData: loginDto) {
    const connection = await this.dbService.getPool().getConnection();
    try {
      const [row] = await connection.query(
        `select * from user_table where nickname = ?`,
        [userData.nickname],
      );
      const user = row[0];
      if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

      if (user.password !== userData.password) {
        throw new BadRequestException('비밀번호를 확인해 주세요.');
      }

      // JWT 반환 로직 추가
      const { JWT_KEY } = process.env;
      const token = JWT.sign({ nickname: userData.nickname }, JWT_KEY, {
        expiresIn: '10m',
      });
      return { accessToken: `bearer ${token}` };
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  async helloUser(user) {
    return `안녕하세요, ${user}`;
  }
}
