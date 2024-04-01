import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // 다른 모듈에서 DatabaseService를 사용할 수 있게 내보냅니다.
})
export class DatabaseModule {}
