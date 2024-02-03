<!--
 * @Author: yeyu98
 * @Date: 2024-01-23 22:51:59
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 14:47:12
 * @Description: 
-->
# problems
nest里模块指的是什么呢？
params /:id 要怎么获取到路径上的id呢？
query ?id=1 又要怎么设置且怎么获取呢？

HttpException 继承自 Error 在nest里属于最基本的异常
PostsRo的作用是什么？用于定义接口的返回值类型
@InjectRepository是个参数装饰器，具体的作用是什么？
结合forFeature()定义的实体对应的仓库，我们可以通过@InjectRepository将实体注入到服务中去；


HTTP请求抛出的异常可以使用自定义的去写，那么数据库相关的操作抛出的异常要怎么去接呢？
使用 QueryFailedError 再实现一个过滤器；


BeforeInsert直接使用传入的DTO save不生效？
使用了BeforeInsert需要先实例化一下DTO才可以生效，也就是说需要一个新的对象才能生效；
password 一直为空？
是因为在定义实体的时候需要给每个Column指定类型或字符长度或默认值之类的否则自动创建表的时候无法创建；

# points

providers：服务提供者，在providers提供的服务可以被其他模块共享；
controllers：处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理；
imports：导入模块的列表，从其他模块里导入一些其他模块的服务；
exports：导出模块列表，如果想要被其他模块使用当前模块的服务就可以在这里导出；

Controller：控制器一般用于设置路由，响应服务
@Controller：每个Controller都需要通过这个注解来标识以及使用控制器，通过传入路由路径来定义路由；


## HTTP方法处理装饰器
### HTTP方法装饰器
@Get()
```
  //  1.固定路径：
  // get 匹配路由 http://localhost:3000/app/list
  @Get('list')
  getList(): string {
    return "I'm get list";
  }
  // 2.通配符路径(?+* 三种通配符 )
  // 匹配路由 * http://localhost:3000/app/user_xxx
  @Get('user_*')
  getUser(): string {
    return 'getUser';
  }
```
@Post()
```
  // post 匹配路由 http://localhost:3000/app/list
  @Post('list')
  fetchList(): string {
    return "I'm post list";
  }
```
@Put()
```
  // 3.带参数路径
  @Put('/list/:id')
  update(): string {
    return 'update';
  }
```


### 路由路径

* 固定路径
* 通配符路径(?+* 三种通配符 )
* params 参数路径：当params参数路由先定义时如果还有相同的方法以及路由会优先匹配 params参数路由已经满足了就不会往下再匹配了（路由匹配是至上而下的先定义先匹配）

### 全局路由前缀
可以在main.ts文件中通过app.setGlobalPrefix('api')添加；

### nest cli命令
nest g [文件类型] [文件名]
创建顺序Module --> Controller --> Service

### 数据库操作
#### 建表相关装饰器
@Entity：标识当前类是一个实体；
@Column：定义列的数据类型；
@PrimaryGeneratedColumn 设置某一列为主键并自动生成，有几种生成id的方式increment（自增）、uuid（随机生成唯一标识）、rowid、identity；


##### Entity
实体定义完使用的时候需要在当前module中引入&
在定义实体的时候需要给每个Column指定类型或字符长度或默认值之类的否则自动创建表的时候无法创建；
```
@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
```
在appModule中也需要引入一下实体否则会报以下错误：
![Alt text](image.png)
```
imports: [
  // 数据库连接配置这里目前不太理解为什么这么做
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [envConfig.path],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql', // 数据库类型
      entities: [PostsEntity], // 数据表实体
      ...
    }),
  }),
]
```


实体设置的三种方式（在创建完实体之后就需要在数据库里设置一下）
- 单独定义：就是每次手动的往 entities: [PostsEntity] 这个数据里添加；
  ```
  TypeOrmModule.forRoot({
    //...
    entities: [PostsEntity, UserEntity],
  }),
  ```
- 自动引入：就是每次创建了实体之后就会自动往entities数组中添加
  ```
  TypeOrmModule.forRoot({
    //...
    autoLoadEntities: true,
  }),
  ```
- 配置路径自动引入：就是根据路径自动匹配加载对应的实体
  
  ```
   TypeOrmModule.forRoot({
    //...
    entities: ['dist/**/*.entity{.ts,.js}'],
  }),
  ```

##### @Column
定义列的数据类型；
##### @PrimaryGeneratedColumn 
用于设置某一列为主键并自动生成，有几种生成id的方式increment（自增）、uuid（随机生成唯一标识）、rowid、identity；



### 查询
typeorm 提供了两种查询方式 
- 通过api查询比如findById、findOne之类的；
- 通过createQueryBuilder创建查询，用这种方式查询的好处在于灵活可以随意拼接查询条件；
  ```
  qb.where('1 = 1');
  qb.orderBy('post.create_time', 'DESC');
  const count = await qb.getCount();
  const { pageSize = 10, pageNum = 1 } = query;
  qb.limit(pageSize);
  qb.offset(pageSize * (pageNum - 1));
  ```

## 过滤器
### Exception filters 异常过滤器
- 除了定义异常过滤器，我们也可以通过 `throw new HttpException('文章不存在', 401)`来单个定义异常此时nest会帮我们美化返回给客户端的异常信息，但不太符合实际的数据结构规范；
- 因此当应用中出现异常时，我们可以通过在全局`自定义过滤器`来控制响应返回给客户端的异常信息或数据结构；
- 在过滤器中需要实现catch()方法；

## 拦截器
- 和过滤器有点类似，过滤器可以通过@Injectable()单独注入到某个Controller中；
- 在拦截器中需要实现intercept()方法；



## 接口
### 配置接口文档 swagger
在main.ts文件中引入如下代码
```
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const config = new DocumentBuilder()
  .setTitle('文章平台')
  .setDescription('文章平台接口文档')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('docs', app, document);
```
之后通过你的地址+docs就可以访问了
### 接口标签（给接口分类）
使用@ApiTag('xxx') 根据不同的controller来做接口分类；
### 接口说明（给接口添加一些描述）
使用@ApiOperation('xxx') 根据不同的controller给每个接口添加一些描述；
### 接口传参
#### DTO
-DTO：数据传输对象，可以简单理解为入参，一般会包含表entity的部分数据或全部数据；
- DTO 一般会使用类来定义，主要有两个原因： 
  1.我们需要通过装饰器给swagger里的字段添加说明如果使用interface就无法实现；
  2.DTO并不包含 entity 的所有字段；
- DTO定义swagger的入参描述需要通过 ApiProperty, ApiPropertyOptional（可选）

#### 数据验证（一般在DTO层做数据校验）
管道：具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口。
有两个类型
- 转换：将输入的数据转换为需要的数据输出（那么我是不是需要在管道里面写不同的处理逻辑啊？？）；
- 验证：对输入的数据进行数据验证，不通过校验就通过异常抛出，是controller的前置操作如果不通过验证也就不会进入到controller层；
Nest.js自带了三个开箱即用的管道（就不用自己写啦~~）：ValidationPipe、ParseIntPipe和ParseUUIDPipe, 其中ValidationPipe 配合class-validator就可以完美的实现我们想要的效果（对参数类型进行验证，验证失败抛出异常）；
