import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 这里为什么不使用interface来定义dto呢？因为我们要通过装饰器给swagger里的字段添加说明如果使用interface就无法实现
// 为什么不能直接使用PostsEntity来定义dto呢? 因为DTO并不包含 entity 的所有字段
export class CreatePostsDto {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;
  @ApiProperty({ description: '文章作者' })
  readonly author: string;
  @ApiPropertyOptional({ description: '文章内容' })
  readonly content: string;
  @ApiPropertyOptional({ description: '文章封面' })
  readonly thumb_url: string;
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
