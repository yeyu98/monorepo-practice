/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:25:19
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 16:57:02
 * @FilePath: \monorepo-practice\apps\nest\src\auth\auth.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    console.log(
      '🥳🥳🥳 ~~ useFactory:',
      configService.get('SECRET', 'test88888888'),
    );

    return {
      secret: configService.get('SECRET', 'test88888888'),
      signOptions: { expiresIn: '24h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtService],
})
export class AuthModule {}
