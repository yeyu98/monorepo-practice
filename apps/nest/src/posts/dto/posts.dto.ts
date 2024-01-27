import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostsDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string;

  @ApiProperty({ description: '文章作者' })
  @IsNotEmpty({ message: '缺少文章作者信息' })
  @IsString()
  readonly author: string;

  @ApiPropertyOptional({ description: '文章内容' })
  @IsString()
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly thumb_url: string;

  @ApiProperty({ description: '文章类型' })
  @IsNumber()
  readonly type: number;
}
