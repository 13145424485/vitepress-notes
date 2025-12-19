# ThreadLocal多线程

ThreadLocal叫做线程变量，意思是ThreadLocal中填充的变量属于当前线程，该变量对其他线程而言是隔离的，也就是说该变量是当前线程独有的变量。ThreadLocal为变量在每个线程中都创建了一个副本，那么每个线程可以访问自己内部的副本变量。

ThreadLoal 变量，线程局部变量，同一个 ThreadLocal 所包含的对象，在不同的 Thread 中有不同的副本。这里有几点需要注意：

因为每个 Thread 内有自己的实例副本，且该副本只能由当前 Thread 使用。这是也是 ThreadLocal 命名的由来。
既然每个 Thread 有自己的实例副本，且其它 Thread 不可访问，那就不存在多线程间共享的问题。
1.ThreadLocal 提供了线程本地的实例。它与普通变量的区别在于，每个使用该变量的线程都会初始化一个完全独立的实例副本。2.ThreadLocal 变量通常被private static修饰。当一个线程结束时，它所使用的所有 ThreadLocal 相对的实例副本都可被回收。

总的来说，ThreadLocal 适用于每个线程需要自己独立的实例且该实例需要在多个方法中被使用，也即变量在线程间隔离而在方法或类间共享的场景


## ThreadLocal与Synchronized的区别

ThreadLocal<T>其实是与线程绑定的一个变量。ThreadLocal和Synchonized都用于解决多线程并发访问。

但是ThreadLocal与synchronized有本质的区别：

1、Synchronized用于线程间的数据共享，而ThreadLocal则用于线程间的数据隔离。

2、Synchronized是利用锁的机制，使变量或代码块在某一时该只能被一个线程访问。而ThreadLocal为每一个线程都提供了变量的副本

，使得每个线程在某一时间访问到的并不是同一个对象，这样就隔离了多个线程对数据的数据共享。

而Synchronized却正好相反，它用于在多个线程间通信时能够获得数据共享。

一句话理解ThreadLocal，threadlocl是作为当前线程中属性ThreadLocalMap集合中的某一个Entry的key值Entry（threadlocl,value），虽然不同的线程之间threadlocal这个key值是一样，但是不同的线程所拥有的ThreadLocalMap是独一无二的，也就是不同的线程间同一个ThreadLocal（key）对应存储的值(value)不一样，从而到达了线程间变量隔离的目的，但是在同一个线程中这个value变量地址是一样的。


```java
public class UserHolder {
    private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();
    //每个请求线程 都可以独立存储和获取用户信息，互不干扰

    public static void saveUser(UserDTO user){
        tl.set(user);
    }
//保存用户信息 ：

//把当前登录用户的信息存到当前线程的 "储物柜" 中
//任何地方都可以通过 UserHolder.getUser() 获
    public static UserDTO getUser(){
        return tl.get();
    }
//获取用户信息
    public static void removeUser(){
        tl.remove();
    }
    //清理用户信息 
}

```

# BeanUtil方法

## Hutool 的 BeanUtil 常用方法

### 1. 对象复制相关

#### copyProperties(source, targetClass)

```
UserDTO dto = BeanUtil.
copyProperties(user, UserDTO.class);
```

- 复制源对象属性到目标类
- 自动创建目标类实例
- 忽略不存在的属性

#### copyProperties(source, target)

```
UserDTO dto = new UserDTO();
BeanUtil.copyProperties(user, dto);
```

- 复制到已有的目标对象
- 更灵活，可以复用对象

#### copyToList(sourceList, targetClass)

```

List<UserDTO> dtoList = BeanUtil.
copyToList(userList, UserDTO.class);
```

- 批量复制列表
- 常用于分页查询结果转换

### 2. Map 与 Bean 互转

#### beanToMap(object)

```

Map<String, Object> map = BeanUtil.
beanToMap(user);
```

- 将对象转换为 Map
- 常用于动态构建参数

#### fillBeanWithMap(map, bean, isIgnoreError)

```

UserDTO dto = BeanUtil.
fillBeanWithMap(map, new UserDTO(), 
false);
```

- 用 Map 填充 Bean
- isIgnoreError：是否忽略错误
- 常用于从 Redis 等存储中恢复对象

### 3. 属性操作

#### getProperty(bean, propertyName)

```

String name = BeanUtil.getProperty
(user, "name");
```

- 获取对象属性值
- 支持嵌套属性："address.city"

#### setProperty(bean, propertyName, value)

```

BeanUtil.setProperty(user, "name", "
张三");
```

- 设置对象属性值
- 自动类型转换

### 4. 其他实用方法

#### getBeanDesc(Class)

```

BeanDesc desc = BeanUtil.getBeanDesc
(User.class);
```

- 获取类的属性描述
- 可以遍历所有属性

#### hasProperty(object, propertyName)

```

boolean hasName = BeanUtil.
hasProperty(user, "name");
```

- 检查对象是否有某个属性

#### isEmpty(object)

```

boolean isEmpty = BeanUtil.isEmpty
(user);
```

- 检查对象是否为空（所有属性都为 null）

## 在项目中的实际应用

### 1. 登录信息转换--隐藏用户敏感信息

```

// UserController 中的用法
UserDTO userDTO = BeanUtil.
copyProperties(user, UserDTO.class);
```

**作用：** 去除敏感信息，只返回安全字段

### 2. Redis 数据恢复

```

// RefreshTokenInterceptor 中的用法
UserDTO userDTO = BeanUtil.
fillBeanWithMap(userMap, new UserDTO
(), false);
```

**作用：** 从 Redis 中取出的 Map 数据转换为对象

# Session共享问题

- 每个tomcat中都有一份属于自己的session,假设用户第一次访问第一台tomcat，并且把自己的信息存放到第一台服务器的session中，但是第二次这个用户访问到了第二台tomcat，那么在第二台服务器上，肯定没有第一台服务器存放的session，所以此时 整个登录拦截功能就会出现问题，我们能如何解决这个问题呢？早期的方案是session拷贝，就是说虽然每个tomcat上都有不同的session，但是每当任意一台服务器的session修改时，都会同步给其他的Tomcat服务器的session，这样的话，就可以实现session的共享了
- 但是这种方案具有两个大问题
  1. 每台服务器中都有完整的一份session数据，服务器压力过大。
  2. session拷贝数据时，可能会出现延迟
- 所以我们后面都是基于Redis来完成，我们把session换成Redis，Redis数据本身就是共享的，就可以避免session共享的问题了

### Redis替代session的业务流程

#### 设计key结构

- 首先我们来思考一下该用什么数据结构来存储数据
- 由于存入的数据比较简单，我们可以使用String或者Hash
  - 如果使用String，以JSON字符串来保存数据，会额外占用部分空间
  - 如果使用Hash，则它的value中只会存储数据本身
- 如果不是特别在意内存，直接使用String就好了

#### 设计key的具体细节

- 我们这里就采用的是简单的K-V键值对方式
- 但是对于key的处理，不能像session一样用phone或code来当做key
- 因为Redis的key是共享的，code可能会重复，phone这种敏感字段也不适合存储到Redis中
- 在设计key的时候，我们需要满足两点
  1. key要有唯一性
  2. key要方便携带
- 所以我们在后台随机生成一个token，然后让前端带着这个token就能完成我们的业务逻辑了

#### 整体访问流程

- 当注册完成后，用户去登录，然后校验用户提交的手机号/邮箱和验证码是否一致
  - 如果一致，则根据手机号查询用户信息，不存在则新建，最后将用户数据保存到Redis，并生成一个token作为Redis的key
- 当我们校验用户是否登录时，回去携带着token进行访问，从Redis中获取token对应的value，判断是否存在这个数据
  - 如果不存在，则拦截
  - 如果存在，则将其用户信息(userDto)保存到threadLocal中，并放行

### 基于Redis实现短信登录

- 由于前面已经分析过业务逻辑了，所以这里我们直接开始写代码，在此之前我们要在UserController中注入`StringRedisTemplate`

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;
```

修改sendCode方法

这里的key使用`login:code:email`的形式，并设置有效期2分钟，我们也可以定义一个常量类来替换这里的`login:code:`和`2`，让代码显得更专业一点

```java
@PostMapping("/code")
public Result sendCode(@RequestParam("phone") String phone, HttpSession session) throws MessagingException {
    // TODO 发送短信验证码并保存验证码
    if (RegexUtils.isEmailInvalid(phone)) {
        return Result.fail("邮箱格式不正确");
    }
    String code = MailUtils.achieveCode();
-   session.setAttribute(phone, code);
- stringRedisTemplate.opsForValue().set("login:code:"  phone, code, 2, TimeUnit.MINUTES);
+stringRedisTemplate.opsForValue().set(LOGIN_CODE_KEY phone, code, LOGIN_CODE_TTL, TimeUnit.MINUTES);
    log.info("发送登录验证码：{}", code);
//        MailUtils.sendTestMail(phone, code);
    return Result.ok();
}
```

#### stringRedisTemplate

- Redis 操作模板 ：Spring 提供的 Redis 操作工具
- 专门用于操作 字符串类型 的数据
- 自动处理序列化、连接管理等底层细节

opsForValue()

- 获取 Value 操作对象 ：用于操作字符串类型的数据
- 相当于 Redis 的 SET 、 GET 等命令
- 返回 ValueOperations 对象，提供各种操作方法

set(key, value, timeout, timeUnit)

- 设置键值对 ，并指定过期时间
- 四个参数详解：

- 四个参数详解： 参数1： LOGIN_CODE_KEY + phone

```
// 假设：
LOGIN_CODE_KEY = "login:code:"
phone = "13812345678"
// 最终 key = 
"login:code:13812345678"
```

- Redis 的 key ：唯一标识这个验证码
- 用手机号作为后缀，确保每个手机号的验证码独立存储 参数2： code

```
// 假设：
code = "123456"
```

- 要存储的值 ：就是生成的验证码
- 会被序列化成字符串存储到 Redis 参数3： LOGIN_CODE_TTL

```
// 假设：
LOGIN_CODE_TTL = 2L  // 2分钟
```

- 过期时间数值 ：多长时间后自动删除 参数4： TimeUnit.MINUTES
- 时间单位 ：分钟、秒、小时等
- 这里是 MINUTES ，表示前面的是 分钟



这行代码执行后：

```
Redis 中存储：
key: "login:code:13812345678"
value: "123456"
过期时间: 2分钟后自动删除
```

生活类比

就像你去超市存包：

1. 扫码获取储物柜 （生成 key）
2. 把包放进去 （存储验证码）
3. 设置定时器 （2小时后自动打开）
4. 超时自动清理 （Redis 自动删除）

```java
package com.hmdp.controller;


import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.extra.mail.MailUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.hmdp.dto.LoginFormDTO;
import com.hmdp.dto.Result;
import com.hmdp.dto.UserDTO;
import com.hmdp.entity.User;
import com.hmdp.entity.UserInfo;
import com.hmdp.service.IUserInfoService;
import com.hmdp.service.IUserService;
import com.hmdp.utils.MailUtils;
import com.hmdp.utils.RegexUtils;
import com.hmdp.utils.UserHolder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static com.hmdp.utils.RedisConstants.LOGIN_CODE_KEY;
import static com.hmdp.utils.RedisConstants.LOGIN_CODE_TTL;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private IUserService userService;

    @Resource
    private IUserInfoService userInfoService;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 发送手机验证码
     */
    @PostMapping("code")
    public Result sendCode(@RequestParam("phone") String phone, HttpSession session) throws MessagingException {

        //TODO 实现发送短信验证码功能
        if (RegexUtils.isEmailInvalid(phone)) {
            return Result.fail("邮箱格式不正确");
        }
        String code = MailUtils.achieveCode();
        //"把验证码存到 Redis 里，并设置过期时间"
        stringRedisTemplate.opsForValue().set(LOGIN_CODE_KEY + phone, code, LOGIN_CODE_TTL, TimeUnit.MINUTES);
        log.info("发送登录验证码：{}", code);
        //MailUtils.sentTestMail(phone, code);
        return Result.ok();
    }
    /**
     * 登录功能
     * @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
     */
    @PostMapping("/login")
    public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){
        //获取登录账号
        String phone = loginForm.getPhone();
        //获取登录验证码
        String code = loginForm.getCode();
        //获取session中的验证码
        Object cacheCode = session.getAttribute(phone);
        //校验邮箱
        if(RegexUtils.isEmailInvalid(phone)){
            return Result.fail("邮箱格式不正确");
        }
        //校验验证码
        //因为通常 cacheCode 是从session获取的，需要 toString() 转换
        log.info("code:{},cache{}",code,cacheCode);
        if(code ==null ||!code.equals(cacheCode.toString())){
            return Result.fail("验证码错误");
        }
        //根据账号查询用户是否存在
        LambdaQueryWrapper <User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getPhone,phone);
        User user = userService.getOne(queryWrapper);
        //判断用户是否存在
        if(user == null){ //如果用户不存在，则新建用户并保存
            user = createUserWithPhone(phone);
        }
        //登录成功，将用户信息保存在session中
        //保存用户的信息在Redis
        //随机生成token，作为登录令牌
        String token = UUID.randomUUID().toString();
        //将UserDto对象转化为HashMap存储
        UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
        HashMap<String,String> userMap = new HashMap<>();
        userMap.put("icon",userDTO.getIcon());
        userMap.put("id",userDTO.getId().toString());
        userMap.put("nickName",userDTO.getNickName());
        //高端写法，现在我还学不来，工具类还不太了解，只能自己手动转换类型然后put了
//        Map<String, Object> userMap = BeanUtil.beanToMap(userDTO, new HashMap<>(),
//                CopyOptions.create()
//                        .setIgnoreNullValue(true)
//                        .setFieldValueEditor((fieldName, fieldValue) -> fieldValue.toString()));
        //将用户信息存入Redis
        String tokenKey = "LOGIN_USER_KEY" + token;
        session.setAttribute("user",userDTO);
        return Result.ok();
    }

    private User createUserWithPhone(String phone) {
        //创建用户
        User user = new User();
        user.setPhone(phone);
        //设置昵称(默认名)，一个固定前缀+随机字符串
        user.setNickName("user_"+ RandomUtil.randomString(8));
        //保存在数据库中
        userService.save(user);
        return user;
    }
    /**
     * 登出功能
     * @return 无
     */
    @PostMapping("/logout")
    public Result logout(){
        // TODO 实现登出功能
        return Result.fail("功能未完成");
    }

    //查看我的个人信息
    @GetMapping("/me")
    public Result me(){
        // 获取当前登录的用户并返回
        UserDTO user = UserHolder.getUser();
        return Result.ok(user);
    }

    @GetMapping("/info/{id}")
    public Result info(@PathVariable("id") Long userId){
        // 查询详情
        UserInfo info = userInfoService.getById(userId);
        if (info == null) {
            // 没有详情，应该是第一次查看详情
            return Result.ok();
        }
        info.setCreateTime(null);
        info.setUpdateTime(null);
        // 返回
        return Result.ok(info);
    }
}

```

### 解决状态登录刷新问题

#### 初始方案

- 我们可以通过拦截器拦截到的请求，来证明用户是否在操作，如果用户没有任何操作30分钟，则token会消失，用户需要重新登录

- 通过查看请求，我们发现我们存的token在请求头里，那么我们就在拦截器里来刷新token的存活时间

  > authorization: 6867061d-a8d0-4e60-b92f-97f7d698a1ca

- 修改我们的登陆拦截器`LoginInterceptor`类

  ```
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      //1. 获取请求头中的token
      String token = request.getHeader("authorization");
      //2. 如果token是空，则未登录，拦截
      if (StrUtil.isBlank(token)) {
          response.setStatus(401);
          return false;
      }
      String key = RedisConstants.LOGIN_USER_KEY + token;
      //3. 基于token获取Redis中的用户数据
      Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
      //4. 判断用户是否存在，不存在，则拦截
      if (userMap.isEmpty()) {
          response.setStatus(401);
          return false;
      }
      //5. 将查询到的Hash数据转化为UserDto对象
      UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);
      //6. 将用户信息保存到ThreadLocal
      UserHolder.saveUser(userDTO);
      //7. 刷新tokenTTL，这里的存活时间根据需要自己设置，这里的常量值我改为了30分钟
      stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);
      return true;
  }
  ```

- 在这个方案中，他确实可以使用对应路径的拦截，同时刷新登录token令牌的存活时间，但是现在这个拦截器他只是拦截需要被拦截的路径，假设当前用户访问了一些不需要拦截的路径，那么这个拦截器就不会生效，所以此时令牌刷新的动作实际上就不会执行，所以这个方案他是存在问题的

#### 优化方案

- 既然之前的拦截器无法对不需要拦截的路径生效，那么我们可以添加一个拦截器，在第一个拦截器中拦截所有的路径，把第二个拦截器做的事情放入到第一个拦截器中，同时刷新令牌，因为第一个拦截器有了threadLocal的数据，所以此时第二个拦截器只需要判断拦截器中的user对象是否存在即可，完成整体刷新功能。

- 新建一个

  ```
  RefreshTokenInterceptor
  ```

  类，其业务逻辑与之前的

  ```
  LoginInterceptor
  ```

  类似，就算遇到用户未登录，也继续放行，交给

  ```
  LoginInterceptor
  ```

  处理

  由于这个对象是我们手动在WebConfig里创建的，所以这里不能用@AutoWired自动装配，只能声明一个私有的，到了WebConfig里再自动装配

  ```
  public class RefreshTokenInterceptor implements HandlerInterceptor {
      //这里并不是自动装配，因为RefreshTokenInterceptor是我们手动在WebConfig里new出来的
      private StringRedisTemplate stringRedisTemplate;
  
     public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
          this.stringRedisTemplate = stringRedisTemplate;
      }
  
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          //1. 获取请求头中的token
          String token = request.getHeader("authorization");
          //2. 如果token是空，直接放行，交给LoginInterceptor处理
          if (StrUtil.isBlank(token)) {
              return true;
          }
          String key = RedisConstants.LOGIN_USER_KEY + token;
          //3. 基于token获取Redis中的用户数据
          Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
          //4. 判断用户是否存在，不存在，也放行，交给LoginInterceptor
          if (userMap.isEmpty()) {
              return true;
          }
          //5. 将查询到的Hash数据转化为UserDto对象
          UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);
          //6. 将用户信息保存到ThreadLocal
          UserHolder.saveUser(userDTO);
          //7. 刷新tokenTTL，这里的存活时间根据需要自己设置，这里的常量值我改为了30分钟
          stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);
          return true;
      }
  
      @Override
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          UserHolder.removeUser();
      }
  }
  ```

- 修改我们之前的

  ```
  LoginInterceptor
  ```

  类，只需要判断用户是否存在，不存在，则拦截，存在则放行

  ```
  public class LoginInterceptor implements HandlerInterceptor {
  
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          //判断用户是否存在
          if (UserHolder.getUser()==null){
              //不存在则拦截
              response.setStatus(401);
              return false;
          }
          //存在则放行
          return true;
      }
  
      @Override
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          UserHolder.removeUser();
      }
  }
  ```

- 修改

  ```
  WebConfig
  ```

  配置类，拦截器的执行顺序可以由order来指定，如果未设置拦截路径，则默认是拦截所有路径

  ```
  @Configuration
  public class MvcConfig implements WebMvcConfigurer {
      //到了这里才能自动装配
      @Autowired
      private StringRedisTemplate stringRedisTemplate;
  
      @Override
      public void addInterceptors(InterceptorRegistry registry) {
          registry.addInterceptor(new LoginInterceptor())
                  .excludePathPatterns(
                          "/user/code",
                          "/user/login",
                          "/blog/hot",
                          "/shop/**",
                          "/shop-type/**",
                          "/upload/**",
                          "/voucher/**"
                  ).order(1);
          //RefreshTokenInterceptor是我们手动new出来的
          registry.addInterceptor(new RefreshTokenInterceptor(stringRedisTemplate)).order(0);
      }
  }
  ```

- 那么至此，大功告成，我们重启服务器，登录，然后去Redis的图形化界面查看token的ttl，如果每次切换界面之后，ttl都会重置，那么说明我们的代码没有问题

##### 进行手动装配StringRedisTemplate的原因

**源代码**

```java
    //这里并不是自动装配，因为RefreshTokenInterceptor是我们手动在WebConfig里new出来的
    private StringRedisTemplate stringRedisTemplate;

    public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

```

## 为什么要手动注入 StringRedisTemplate？

### 根本原因：拦截器不是 Spring 管理的 Bean

```
public RefreshTokenInterceptor
(StringRedisTemplate 
stringRedisTemplate) {
    this.stringRedisTemplate = 
    stringRedisTemplate;
}
```

##### 详细解释

###### 1. 拦截器的创建方式不同

**普通 Spring Bean（如 Controller、Service）：**

```
@RestController
public class UserController {
    @Autowired  // Spring 自动注入
    private StringRedisTemplate 
    stringRedisTemplate;
}
```

- Spring **自动创建**对象
- Spring **自动注入**依赖
- 生命周期由 Spring 管理

**拦截器的创建方式：**

```
@Configuration
public class WebConfig implements 
WebMvcConfigurer {
    @Override
    public void addInterceptors
    (InterceptorRegistry registry) {
        // 手动 new 出来的，不是 
        Spring 创建的
        registry.addInterceptor(new 
        RefreshTokenInterceptor
        (null));
    }
}
```

###### 2. 手动 new 的问题

```
// 错误方式：直接 new
registry.addInterceptor(new 
RefreshTokenInterceptor());
```

- **new 出来的对象** Spring 感知不到
- **无法使用 @Autowired** 进行自动注入
- **依赖为 null**，会报空指针异常

###### 3. 正确的解决方式

**步骤 1：在配置类中先注入 StringRedisTemplate**

```
@Configuration
public class WebConfig implements 
WebMvcConfigurer {
    
    @Autowired  // Spring 注入
    private StringRedisTemplate 
    stringRedisTemplate;
    
    @Override
    public void addInterceptors
    (InterceptorRegistry registry) {
        // 手动注入到拦截器
        registry.addInterceptor(new 
        RefreshTokenInterceptor
        (stringRedisTemplate));
    }
}
```

# 商户查询缓存

## 什么是缓存

- 什么是缓存？

  - 缓存就像自行车、越野车的避震器

- 举个例子

  - 越野车、山地自行车都有`避震器`，防止车体加速之后因惯性，在`U`型地形上飞跃硬着陆导致`损坏`，像个弹簧意义

- 同样，在实际开发中，系统也需要`避震器`，防止过高的数据量猛冲系统，导致其操作线程无法及时处理信息而瘫痪

- 在实际开发中，对企业来讲，产品口碑、用户评价都是致命的，所以企业非常重视缓存技术

  缓存(Cache)就是数据交换的缓冲区，俗称的缓存就是缓冲区内的数据，一般从数据库中获取，存储于本地，例如

  - 本地用高并发

  - ```
    Static final ConcurrentHashMap<K,V> map = new ConcurrentHashMap<>();
    ```

  - 用于Redis等缓存

  - ```
    static final Cache<K,V> USER_CACHE = CacheBuilder.newBuilder().build();
    ```

  - 本地缓存

  - ```
    Static final Map<K,V> map =  new HashMap();
    ```

- 由于其被`static`修饰，所以随着类的加载而加载到内存之中，作为本地缓存，由于其又被`final`修饰，所以其引用之间的关系是固定的，不能改变，因此不用担心复制导致缓存失败

#### 为什么要使用缓存

- 言简意赅：速度快，好用

- 缓存数据存储于代码中，而代码运行在内存中，内存的读写性能远高于磁盘，缓存可以大大降低用户访问并发量带来的服务器读写压力

- 实际开发中，企业的数据量，少则几十万，多则几千万，这么大的数据量，如果没有缓存来作为`避震器`系统是几乎撑不住的，所以企业会大量运用缓存技术

- 但是缓存也会增加代码复杂度和运营成本

- ```
  缓存的作用
  ```

  1. 降低后端负载
  2. 提高读写效率，降低响应时间

- ```
  缓存的成本
  ```

  1. 数据一致性成本
  2. 代码维护成本
  3. 运维成本（一般采用服务器集群，需要多加机器，机器就是钱）

#### 如何使用缓存

- 实际开发中，会构筑多级缓存来时系统运行速度进一步提升，例如：本地缓存与Redis中的缓存并发使用
- `浏览器缓存：`主要是存在于浏览器端的缓存
- `应用层缓存：`可以分为toncat本地缓存，例如之前提到的map或者是使用Redis作为缓存
- `数据库缓存：`在数据库中有一片空间是buffer pool，增改查数据都会先加载到mysql的缓存中
- `CPU缓存：`当代计算机最大的问题就是CPU性能提升了，但是内存读写速度没有跟上，所以为了适应当下的情况，增加了CPU的L1，L2，L3级的缓存

### 添加商户缓存

在我们查询商户信息时，我们是直接操作从数据库中去进行查询的，大致逻辑是这样，直接查询数据库肯定慢

```
/**
    * 根据id查询商铺信息
    * @param id 商铺id
    * @return 商铺详情数据
    */
@GetMapping("/{id}")
public Result queryShopById(@PathVariable("id") Long id) {
    return Result.ok(shopService.getById(id));
}
```

- 所以我们可以在客户端与数据库之间加上一个Redis缓存，先从Redis中查询，如果没有查到，再去MySQL中查询，同时查询完毕之后，将查询到的数据也存入Redis，这样当下一个用户来进行查询的时候，就可以直接从Redis中获取到数据

![](C:\Users\youzi\Desktop\vitepress\image、\6354a19216f2c2beb1b095dd.jpg)

#### 缓存模型和思路

- 标准的操作方式就是查询数据库之前先查询缓存，如果缓存数据存在，则直接从缓存中返回，如果缓存数据不存在，再查询数据库，然后将数据存入Redis。

![](C:\Users\youzi\Desktop\vitepress\image、\6354a1aa16f2c2beb1b0aa83.jpg)

#### 代码实现

- 代码思路：如果Redis缓存里有数据，那么直接返回，如果缓存中没有，则去查询数据库，然后存入Redis

Controller层

业务逻辑我们写到Service中，需要在Service层创建这个`queryById`方法，然后去ServiceImpl中实现

```
@GetMapping("/{id}")
public Result queryShopById(@PathVariable("id") Long id) {
    return shopService.queryById(id);
}
```

Service层

```
public interface IShopService extends IService<Shop> {
    Result queryById(Long id);
}
```

SerivceImpl层

```
@Override
public Result queryById(Long id) {
    //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
    String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    //如果不为空（查询到了），则转为Shop类型直接返回
    if (StrUtil.isNotBlank(shopJson)) {
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    //否则去数据库中查
    Shop shop = getById(id);
    //查不到返回一个错误信息或者返回空都可以，根据自己的需求来
    if (shop == null){
        return Result.fail("店铺不存在！！");
    }
    //查到了则转为json字符串
    String jsonStr = JSONUtil.toJsonStr(shop);
    //并存入redis
    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr);
    //最终把查询到的商户信息返回给前端
    return Result.ok(shop);
}
```

##### JSONUtil

JSONUtil.toBean() 是 Hutool 工具库 提供的 JSON 字符串转 Java 对象的方法，

```
Shop shop = JSONUtil.toBean(shopJson, Shop.class);
```

缓存数据转换（ShopServiceImpl）

```java
// 从 Redis 获取店铺信息的 JSON 字符串
String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);

// 将 JSON 字符串转换为 Shop 对象
if(StrUtil.isNotBlank(shopJson)){
    Shop shop = JSONUtil.toBean(shopJson, Shop.class);
    return Result.ok(shop);
}
```

完整流程：

```
Redis 中的 JSON 字符串 → JSONUtil.toBean() → Java Shop 对象
{"id":1,"name":"星巴克","area":"朝阳区"} → toBean() → Shop 实例
```

- 重启服务器，访问商户信息，观察控制台日志输出，后续刷新页面，不会出现SQL语句查询商户信息，去Redis图形化界面中查看，可以看到缓存的商户信息数据

#### 趁热打铁

- 完成了商户数据缓存之后，我们尝试做一下商户类型数据缓存

Controller层

业务逻辑依旧是写在Service中

```java
@GetMapping("list")
public Result queryTypeList() {
    return typeService.queryList();
}
```

ServiceImpl层

- 整体代码都是类似的，前面只需要将单个店铺信息从JSON和Bean之间相互转换
- 这里只不过是将查询到的多个店铺类型信息从JSON和Bean之间相互转换，只是多了一个foreach循环

```java
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    @Override
    public Result queryList() {
        //先从Redis中查，这里的常量值是固定前缀 + 店铺id
        List<String> shopTypes = stringRedisTemplate.opsForList().range(CACHE_SHOP_TYPE_KEY,0, -1);
        //如果不为空（查询到了），则转为ShopType类型直接返回
        if(!shopTypes.isEmpty()){
            List<ShopType> tmp = new ArrayList<>();
            for(String type : shopTypes){
                ShopType shopType = JSONUtil.toBean(type, ShopType.class);
                tmp.add(shopType);
            }
           return Result.ok(tmp);
        }
        //否则去数据库中查
        List<ShopType> tmp = query().orderByAsc("sort").list();
        if(tmp==null){
            //数据库中也没有，返回失败
            return Result.fail("店铺类型不存在");
        }
        //查到了转为json字符串，存入redis
        for(ShopType shopType : tmp){
            String jsonstr = JSONUtil.toJsonStr(shopType);
            shopTypes.add(jsonstr);
        }
        //.leftPushAll(key, values…) 是 Redis List 的批量左压入操作
        //左压入会把参数按给定顺序依次“往左”插入，最终列表顺序与传入顺序相反；如果要保持原有顺序追加到尾部，用 rightPushAll.
        stringRedisTemplate.opsForList().leftPushAll(CACHE_SHOP_TYPE_KEY,shopTypes);
        //最终把查询到的商户分类信息返回给前端
        return Result.ok(tmp);
    }
```

可以用stream流来简化代码

```java
@Override
public Result queryList() {
    // 先从Redis中查，这里的常量值是固定前缀 + 店铺id
    List<String> shopTypes =
            stringRedisTemplate.opsForList().range(CACHE_SHOP_TYPE_KEY, 0, -1);
    // 如果不为空（查询到了），则转为ShopType类型直接返回
    if (!shopTypes.isEmpty()) {
        List<ShopType> tmp = shopTypes.stream().map(type -> JSONUtil.toBean(type, ShopType.class))
                                          .collect(Collectors.toList());
        return Result.ok(tmp);
    }
    // 否则去数据库中查
    List<ShopType> tmp = query().orderByAsc("sort").list();
    if (tmp == null){
        return Result.fail("店铺类型不存在！！");
    }
    // 查到了转为json字符串，存入redis
    shopTypes = tmp.stream().map(type -> JSONUtil.toJsonStr(type))
                                    .collect(Collectors.toList());
    stringRedisTemplate.opsForList().leftPushAll(CACHE_SHOP_TYPE_KEY,shopTypes);
    // 最终把查询到的商户分类信息返回给前端
    return Result.ok(tmp);
}

```

### 缓存更新策略

- 缓存更新是Redis为了节约内存而设计出来的一个东西，主要是因为内存数据宝贵，当我们想Redis插入太多数据，此时就可能会导致缓存中数据过多，所以Redis会对部分数据进行更新，或者把它成为淘汰更合适
- `内存淘汰`：Redis自动进行，当Redis内存大道我们设定的`max-memery`时，会自动触发淘汰机制，淘汰掉一些不重要的数据（可以自己设置策略方式）
- `超时剔除`：当我们给Redis设置了过期时间TTL之后，Redis会将超时的数据进行删除，方便我们继续使用缓存
- `主动更新`：我们可以手动调用方法把缓存删除掉，通常用于解决缓存和数据库不一致问题

|          |                           内存淘汰                           |                           超时剔除                           | 主动更新                                       |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------- |
|   说明   | 不用自己维护， 利用Redis的内存淘汰机制， 当内存不足时自动淘汰部分数据。 下次查询时更新缓存。 | 给缓存数据添加TTL时间， 到期后自动删除缓存。 下次查询时更新缓存。 | 编写业务逻辑， 在修改数据库的同时， 更新缓存。 |
|  一致性  |                              差                              |                             一般                             | 好                                             |
| 维护成本 |                              无                              |                              低                              | 高                                             |

- 业务场景
  - 低一致性需求：使用内存淘汰机制，例如店铺类型的查询缓存（因为这个很长一段时间都不需要更新）
  - 高一致性需求：主动更新，并以超时剔除作为兜底方案，例如店铺详情查询的缓存

#### 数据库和缓存不一致解决方案

- 由于我们的缓存数据源来自数据库，而数据库的数据是会发生变化的，因此，如果当数据库中数据发生变化，而缓存却没有同步，此时就会有一致性问题存在，其后果是
  - 用户使用缓存中的过时数据，就会产生类似多线程数据安全问题，从而影响业务，产品口碑等
- 那么如何解决这个问题呢？有如下三种方式
  1. Cache Aside Pattern 人工编码方式：缓存调用者在更新完数据库之后再去更新缓存，也称之为双写方案
  2. Read/Write Through Pattern：缓存与数据库整合为一个服务，由服务来维护一致性。调用者调用该服务，无需关心缓存一致性问题。但是维护这样一个服务很复杂，市面上也不容易找到这样的一个现成的服务，开发成本高
  3. Write Behind Caching Pattern：调用者只操作缓存，其他线程去异步处理数据库，最终实现一致性。但是维护这样的一个异步的任务很复杂，需要实时监控缓存中的数据更新，其他线程去异步更新数据库也可能不太及时，而且缓存服务器如果宕机，那么缓存的数据也就丢失了

#### 数据库和缓存不一致采用什么方案

- 综上所述，在企业的实际应用中，还是方案一最可靠，但是方案一的调用者该如何处理呢？
- 如果采用方案一，假设我们每次操作完数据库之后，都去更新一下缓存，但是如果中间并没有人查询数据，那么这个更新动作只有最后一次是有效的，中间的更新动作意义不大，所以我们可以把缓存直接删除，等到有人再次查询时，再将缓存中的数据加载出来
- 对比删除缓存与更新缓存
  - `更新缓存`：每次更新数据库都需要更新缓存，无效写操作较多
  - `删除缓存`：更新数据库时让缓存失效，再次查询时更新缓存
- 如何保证缓存与数据库的操作同时成功/同时失败
  - `单体系统：`将缓存与数据库操作放在同一个事务
  - `分布式系统：`利用TCC等分布式事务方案
- 先操作缓存还是先操作数据库？我们来仔细分析一下这两种方式的线程安全问题
- **1。先删除缓存，再操作数据库**
  删除缓存的操作很快，但是更新数据库的操作相对较慢，如果此时有一个线程2刚好进来查询缓存，由于我们刚刚才删除缓存，所以线程2需要查询数据库，并写入缓存，但是我们更新数据库的操作还未完成，所以线程2查询到的数据是脏数据，出现线程安全问题

![](C:\Users\youzi\Desktop\vitepress\image、\6354be3e16f2c2beb1d11bd0.jpg)

**2.先操作数据库，再删除缓存**
线程1在查询缓存的时候，缓存TTL刚好失效，需要查询数据库并写入缓存，这个操作耗时相对较短（相比较于上图来说），但是就在这么短的时间内，线程2进来了，更新数据库，删除缓存，但是线程1虽然查询完了数据（更新前的旧数据），但是还没来得及写入缓存，所以线程2的更新数据库与删除缓存，并没有影响到线程1的查询旧数据，写入缓存，造成线程安全问题

![](C:\Users\youzi\Desktop\vitepress\image、\6354be5316f2c2beb1d130c0.jpg)

- 虽然这二者都存在线程安全问题，但是相对来说，后者出现线程安全问题的概率相对较低，所以我们最终采用后者`先操作数据库，再删除缓存`的方案

### 实现商铺缓存与数据库双写一致

- 核心思路如下

  - 修改ShopController中的业务逻辑，满足以下要求

  1. 根据id查询店铺时，如果缓存未命中，则查询数据库，并将数据库结果写入缓存，并设置TTL
  2. 根据id修改店铺时，先修改数据库，再删除缓存

- 修改ShopService的queryById方法，写入缓存时设置一下TTL

```java
@Override
public Result queryById(Long id) {
    //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
    String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    //如果不为空（查询到了），则转为Shop类型直接返回
    if (StrUtil.isNotBlank(shopJson)) {
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    //否则去数据库中查
    Shop shop = getById(id);
    //查不到返回一个错误信息或者返回空都可以，根据自己的需求来
    if (shop == null){
        return Result.fail("店铺不存在！！");
    }
    //查到了则转为json字符串
    String jsonStr = JSONUtil.toJsonStr(shop);
    //并存入redis，设置TTL
    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr,CACHE_SHOP_TTL, TimeUnit.MINUTES);
    //最终把查询到的商户信息返回给前端
    return Result.ok(shop);
}
```

之前的update方法

```java
/**
    * 更新商铺信息
    *
    * @param shop 商铺数据
    * @return 无
    */
@PutMapping
public Result updateShop(@RequestBody Shop shop) {
    // 写入数据库
    shopService.updateById(shop);
    return Result.ok();
}
```

修改后的updata方法

```java
/**
    * 更新商铺信息
    *
    * @param shop 商铺数据
    * @return 无
    */
@PutMapping
public Result updateShop(@RequestBody Shop shop) {
    return shopService.update(shop);
}
```

Service层

```java
Result update(Shop shop);
```

ServiceImpl层

```java
@Override
public Result update(Shop shop) {
    //首先先判一下空
    if (shop.getId() == null){
        return Result.fail("店铺id不能为空！！");
    }
    //先修改数据库
    updateById(shop);
    //再删除缓存
    stringRedisTemplate.delete(CACHE_SHOP_KEY + shop.getId());
    return Result.ok();
}
```

修改完毕之后我们重启服务器进行测试，首先随便挑一个顺眼的数据，我这里就是拿餐厅数据做测试，，我们先访问该餐厅，将该餐厅的数据缓存到Redis中，之后使用POSTMAN发送PUT请求，请求路径http://localhost:8080/api/shop/ ，携带JSON数据如下

```
{
  "area": "大关",
  "openHours": "10:00-22:00",
  "sold": 4215,
  "address": "金华路锦昌文华苑29号",
  "comments": 3035,
  "avgPrice": 80,
  "score": 37,
  "name": "476茶餐厅",
  "typeId": 1,
  "id": 1
}
```

- 之后再Redis图形化页面刷新数据，发现该餐厅的数据确实不在Redis中了，之后我们刷新网页，餐厅名会被改为`476茶餐厅`，然后我们再去Redis中刷新，发现新数据已经被缓存了
- 那么现在功能就实现完毕了，只有当我们刷新页面的时候，才会重新查询数据库，并将数据缓存到Redis，中途无论修改多少次，只要不刷新页面访问，Redis中都不会更新数据

### 缓存穿透问题的解决思路

- `缓存穿透`：缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远都不会生效（只有数据库查到了，才会让redis缓存，但现在的问题是查不到），会频繁的去访问数据库。
- 常见的结局方案有两种
  1. 缓存空对象
     - 优点：实现简单，维护方便
     - 缺点：额外的内存消耗，可能造成短期的不一致
  2. 布隆过滤
     - 优点：内存占用啥哦，没有多余的key
     - 缺点：实现复杂，可能存在误判
- `缓存空对象`思路分析：当我们客户端访问不存在的数据时，会先请求redis，但是此时redis中也没有数据，就会直接访问数据库，但是数据库里也没有数据，那么这个数据就穿透了缓存，直击数据库。但是数据库能承载的并发不如redis这么高，所以如果大量的请求同时都来访问这个不存在的数据，那么这些请求就会访问到数据库，简单的解决方案就是哪怕这个数据在数据库里不存在，我们也把这个这个数据存在redis中去（这就是为啥说会有`额外的内存消耗`），这样下次用户过来访问这个不存在的数据时，redis缓存中也能找到这个数据，不用去查数据库。可能造成的`短期不一致`是指在空对象的存活期间，我们更新了数据库，把这个空对象变成了正常的可以访问的数据，但由于空对象的TTL还没过，所以当用户来查询的时候，查询到的还是空对象，等TTL过了之后，才能访问到正确的数据，不过这种情况很少见罢了
- `布隆过滤`思路分析：布隆过滤器其实采用的是哈希思想来解决这个问题，通过一个庞大的二进制数组，根据哈希思想去判断当前这个要查询的数据是否存在，如果布隆过滤器判断存在，则放行，这个请求会去访问redis，哪怕此时redis中的数据过期了，但是数据库里一定会存在这个数据，从数据库中查询到数据之后，再将其放到redis中。如果布隆过滤器判断这个数据不存在，则直接返回。这种思想的优点在于节约内存空间，但存在误判，误判的原因在于：布隆过滤器使用的是哈希思想，只要是哈希思想，都可能存在哈希冲突

### 编码解决商品查询的缓存穿透问题

- 核心思路如下
- 在原来的逻辑中，我们如果发现这个数据在MySQL中不存在，就直接返回一个错误信息了，但是这样存在缓存穿透问题

```java
@Override
public Result queryById(Long id) {
    //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
    String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    //如果不为空（查询到了），则转为Shop类型直接返回
    if (StrUtil.isNotBlank(shopJson)) {
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    //否则去数据库中查
    Shop shop = getById(id);
    //查不到返回一个错误信息或者返回空都可以，根据自己的需求来
    if (shop == null){
        return Result.fail("店铺不存在！！");
    }
    //查到了则转为json字符串
    String jsonStr = JSONUtil.toJsonStr(shop);
    //并存入redis，设置TTL
    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr,CACHE_SHOP_TTL, TimeUnit.MINUTES);
    //最终把查询到的商户信息返回给前端
    return Result.ok(shop);
}
```

现在的逻辑是：如果这个数据不存在，将这个数据写入到Redis中，并且将value设置为空字符串，然后设置一个较短的TTL，返回错误信息。当再次发起查询时，先去Redis中判断value是否为空字符串，如果是空字符串，则说明是刚刚我们存的不存在的数据，直接返回错误信息

```java
@Override
public Result queryById(Long id) {
    //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
    String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    //如果不为空（查询到了），则转为Shop类型直接返回
    if (StrUtil.isNotBlank(shopJson)) {
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    //如果查询到的是空字符串，则说明是我们缓存的空数据
    if (shopjson != null) {
        return Result.fail("店铺不存在！！");
    }
    //否则去数据库中查
    Shop shop = getById(id);
    //查不到，则将空字符串写入Redis
    if (shop == null) {
        //这里的常量值是2分钟
        stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
        return Result.fail("店铺不存在！！");
    }
    //查到了则转为json字符串
    String jsonStr = JSONUtil.toJsonStr(shop);
    //并存入redis，设置TTL
    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr, CACHE_SHOP_TTL, TimeUnit.MINUTES);
    //最终把查询到的商户信息返回给前端
    return Result.ok(shop);
}
```

小结：

- 缓存穿透产生的原因是什么？
  - 用户请求的数据在缓存中和在数据库中都不存在，不断发起这样的请求，会给数据库带来巨大压力
- 缓存产投的解决方案有哪些？
  - 缓存null值
  - 布隆过滤
  - 增强id复杂度，避免被猜测id规律（可以采用雪花算法）
  - 做好数据的基础格式校验
  - 加强用户权限校验
  - 做好热点参数的限流

### 缓存雪崩问题及解决思路

- 缓存雪崩是指在同一时间段，大量缓存的key同时失效，或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力
- 解决方案
  - 给不同的Key的TTL添加随机值，让其在不同时间段分批失效
  - 利用Redis集群提高服务的可用性（使用一个或者多个哨兵(`Sentinel`)实例组成的系统，对redis节点进行监控，在主节点出现故障的情况下，能将从节点中的一个升级为主节点，进行故障转义，保证系统的可用性。 ）
  - 给缓存业务添加降级限流策略
  - 给业务添加多级缓存（浏览器访问静态资源时，优先读取浏览器本地缓存；访问非静态资源（ajax查询数据）时，访问服务端；请求到达Nginx后，优先读取Nginx本地缓存；如果Nginx本地缓存未命中，则去直接查询Redis（不经过Tomcat）；如果Redis查询未命中，则查询Tomcat；请求进入Tomcat后，优先查询JVM进程缓存；如果JVM进程缓存未命中，则查询数据库）

### 缓存击穿问题及解决思路

- 缓存击穿也叫热点Key问题，就是一个被`高并发访问`并且`缓存重建业务较复杂`的key突然失效了，那么无数请求访问就会在瞬间给数据库带来巨大的冲击
- 举个不太恰当的例子：一件秒杀中的商品的key突然失效了，大家都在疯狂抢购，那么这个瞬间就会有无数的请求访问去直接抵达数据库，从而造成缓存击穿
- 常见的解决方案有两种
  1. 互斥锁
  2. 逻辑过期
- `逻辑分析`：假设线程1在查询缓存之后未命中，本来应该去查询数据库，重建缓存数据，完成这些之后，其他线程也就能从缓存中加载这些数据了。但是在线程1还未执行完毕时，又进来了线程2、3、4同时来访问当前方法，那么这些线程都不能从缓存中查询到数据，那么他们就会在同一时刻访问数据库，执行SQL语句查询，对数据库访问压力过大