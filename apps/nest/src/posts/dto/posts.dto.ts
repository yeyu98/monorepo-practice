import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '文章作者' })
  // @IsNotEmpty({ message: '缺少文章作者信息' })
  // @IsString()
  readonly author: string;

  // @IsString()
  @ApiPropertyOptional({ description: '文章内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  // @IsString()
  readonly thumb_url: string;

  @ApiProperty({ description: '文章类型' })
  // @IsNumber()
  readonly type: number;
}
