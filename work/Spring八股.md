# Spring

## **1. 现在要自己定义一个 AOP 来实现接口限流，怎么做**

AOP 只是切入点，真正的限流核心一般放在 Redis + Lua，不会只靠本地内存。
**先定义一个限流注解**，打在需要限流的接口上，比如设置每秒最多多少次请求。然后**再写一个切面**，在请求进来时先拦截这个接口，拿到用户 ID、IP 或接口路径，拼成一个限流 key。接着去 Redis 里做计数和过期时间控制，如果超过阈值就直接拦住，返回“请求过于频繁”。
AOP 负责拦截，Redis 负责计数，真正上线一般不会只用本地内存，因为服务一旦是集群部署，本地限流就不准了。



扩展：

AOP：是面向切面编程，能够将那些与业务无关，却为业务模块**所共同调用**的逻辑**封装**起来，以减少系统的重复代码，降低模块间的耦合度。

Spring AOP 就是基于动态代理的，如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 JDK Proxy，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 Cglib 生成一个被代理对象的子类来作为代理。

你可以把AOP理解成：我不想在每个业务方法里都手动写一遍“日志、权限校验、事务、限流、异常处理”这些通用代码，所以我把这些公共逻辑单独拎出来，在方法执行前后“顺手插进去”。
比如下单、支付、查询订单，本来都是不同业务，但它们可能都要打日志、做权限判断，这些就属于“横切逻辑”。AOP 就是专门处理这种东西的。

**Spring AOP 是怎么“偷偷加”的。**
它不是直接改你原来的对象，而是给你套一个“代理对象”。

你调用的看起来是原来的方法，实际上先走代理：

1. 先执行公共逻辑
2. 再调用真实业务方法
3. 最后再执行收尾逻辑

就像你去办事，不是直接见领导，而是先到秘书那里：

- 秘书先帮你登记
- 再带你去找领导
- 办完再帮你做记录

### SpringAOP 怎么实现的



Spring AOP 是靠**动态代理**实现的，核心是在**运行时生成代理对象**，不用改源码就能给方法加功能。它有两种代理方式：如果被代理的类实现了接口，就用 JDK 自带的动态代理；如果没实现接口，就用第三方库，通过生成子类的方式做代理，两种方式配合，就能给任意类做切面增强

------

Spring AOP 的实现依赖于动态代理技术。动态代理是在运行时动态生成代理对象，而不是在编译时。它允许开发者在运行时指定要代理的接口和行为，从而实现在不修改源码的情况下增强方法的功能。

Spring AOP 支持两种动态代理：

- **基于 JDK 的动态代理**：使用`java.lang.reflect.Proxy`类和`java.lang.reflect.InvocationHandler`接口实现。这种方式需要代理的类实现一个或多个接口。
- **基于 CGLIB 的动态代理**：当被代理的类没有实现接口时，Spring 会使用 CGLIB 库生成一个被代理类的子类作为代理。CGLIB（Code Generation Library）是一个第三方代码生成库，通过继承方式实现代理。

### JDK 动态代理和 cglib 有啥区别

JDK 动态代理和 CGLIB 的核心区别主要在三点：

第一，JDK **只能代理实现了接口的类**，**靠委托机制实现**；CGLIB 是给类生成子类，靠继承实现，能代理没接口的类，但不能代理 final 类。

第二，JDK 用**反射调用**，**创建代理快但执行慢**；CGLIB 改字节码生成子类，创建慢但执行快。

第三，JDK 是**代理类和目标类实现同一接口**，CGLIB 是**代理类继承目标类**，代理类可以直接赋值给目标类。

### \#Spring的事务，使用this调用是否生效? 

不能生效。 因为Spring事务是通过代理对象来控制的，只有通过代理对象的方法调用才会应用事务管理的相关规则。 当使用 this 直接调用时，是绕过了Spring的代理机制，因此不会应用事务设置。

```java
@Service
public class UserService {

    // 事务方法
    @Transactional
    public void addUser() {
        // 插入数据库
    }

    // 外部调用这个方法
    public void doSomething() {
        // ❌ 这里用 this 调用，事务不生效！
        this.addUser(); 
    }
}
```



### Spring的AOP介绍一下

Spring AOP 是基于**动态代理**实现的**面向切面编程模块**，核心是将日志、事务这类通用横切逻辑与业务代码解耦，通过定义切面、切入点和通知，在不修改业务代码的前提下，将通用逻辑织入目标方法执行流程，从而减少重复代码、提升系统可维护性。

------

Spring AOP是Spring框架中的一个重要模块，用于实现**面向切面编程。**

我们知道，Java就是一门面向对象编程的语言，在OOP中最小的单元就是Class对象，但是在AOP中，最小的单元是“切面”。一个“切面”可以包含很多种类型和对象，对它们进行模块化管理，例如事务管理。

在面向切面编程的思想里面，把功能分为两种
- 核心业务：登陆、注册、增、删、改、查、都叫核心业务
- 周边功能：日志、事务管理这些次要的为周边业务

**在面向切面编程中，核心业务功能和周边功能是分别独立进行开发，两者不是耦合的，然后把切面功能和核心业务功能“编织”在一起，这就叫AOP。**

AOP能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

在AOP中有以下几个概念：
- AspectJ：切面，只是一个概念，没有具体的接口或类与之对应，是Join point，Advice和Pointcut的一个统称。
- Join point：连接点，指程序执行过程中的一个点，例如方法调用、异常处理等。在Spring AOP中，仅支持方法级别的连接点。
- Advice：通知，即我们定义的一个切面中的横切逻辑，有“around”，“before”和“after”三种类型。在很多的AOP实现框架中，Advice通常作为一个拦截器，也可以包含许多个拦截器作为一条链路围绕着Join point进行处理。
- Pointcut：切入点，用于匹配连接点，一个AspectJ中包含哪些Join point需要由Pointcut进行筛选。
- Introduction：引介，让一个切面可以声明被通知的对象实现任何他们没有真正实现的额外的接口。例如可以让一个代理对象两个目标类。
- Weaving：织入，在有了连接点、切点、通知以及切面，如何将它们应用到程序中呢？没错，就是织入，在切点的引导下，将通知逻辑插入到目标方法上，使得我们的通知逻辑在方法调用时得以执行。
- AOP proxy：AOP代理，指在AOP实现框架中实现切面协议的对象。在Spring AOP中有两种代理，分别是JDK动态代理和CGLIB动态代理。
- Target object：目标对象，就是被代理的对象。

Spring AOP是基于JDK动态代理和Cglib提升实现的，两种代理方式都属于运行时的一个方式，所以它没有编译时的一个处理，那么因此Spring是通过Java代码实现的。

## **2. 怎么实现全局异常处理**

用统一异常处理去做。
思路上分三层：第一层是业务异常，比如库存不足、余额不足，这种直接返回明确提示；第二层是参数异常，比如前端传参不合法；第三层是系统异常，统一兜底，避免把报错堆栈直接返回给前端。
另外返回结果要统一，比如状态码、提示信息、数据体这些字段保持一致。日志里再把请求参数、接口路径、异常信息记录下来，方便排查。

## **3. Java 哪些注解可以实现依赖注入**

常见的三个：@Autowired、@Resource、@Inject。
另外像 @Value 也经常提到，但它更偏向注入配置值，不完全等同于注入一个 Bean。还有 @Service、@Component 这些是把类交给 Spring 管理，不是直接做注入，但它们也是整套依赖注入机制里的一部分。

### 为什么依赖注入不适合使用字段注入？

 **字段注入可能引起的三个问题：**

对象的外部可见性

可能导致循环依赖 

无法设置注入的对象为final，也无法注入静态变量 

------

首先来看字段注入

```java
 @RestController 

public class TestHandleController {  

  @Autowired    
    TestHandleService testHandleService;     
    public void helloTestService(){        
        testHandleService.hello();    
    } 
}
```

 字段注入的非常的简便，通过以上代码我们就可以轻松的使用TestHandleService类，但是如果变成下面这样呢：

```java
TestHandleController testHandle = new TestHandleController(); testHandle.helloTestService(); 
```

这样执行结果为空指针异常，这就是字段注入的第一个问题：对象的外部可见性，无法在容器外部实例化TestHandleService（例如在测试类中无法注入该组件），类和容器的耦合度过高，无法脱离容器访问目标对象。 [但如果**你想在 Spring 容器外面直接用这个类**，比如单元测试里手动创建对象]

接下来看第二段代码：

```java
public class TestA(){
    @Autowired
    private TestB testB;
}

public class TestB(){
    @Autowired
    private TestA testA;
}
```

这段代码在idea中不会报任何错误，但是当你启动项目时会发现报错，大致意思是：创建Bean失败，原因是当前Bean已经作为循环引用的一部分注入到了其他Bean中。 这就是字段注入的第二个问题**：可能导致循环依赖**    (A 要 B，B 要 A → 互相死锁 → 循环依赖)

 字段注入还有第三个问题：无法设置注入的对象为final，也无法注入静态变量，原因是变量必须在类实例化进行初始化。

## 4.spring三级缓存怎么解决循环依赖问题？

Spring 解决单例循环依赖，是靠**三级缓存**来提前暴露未完成初始化的 Bean 早期引用。

Bean 实例化后先把工厂放入三级缓存，需要时从三级缓存拿到早期引用（原始或代理），放入二级缓存避免重复生成，再反向注入完成互相依赖。最后两个 Bean 都能初始化完成，存入一级缓存。

但这只能解决单例 + Setter / 字段注入的循环依赖，**构造注入和原型模式无法解决**。



## spring里@Autowired 和 @Resource 注解有什么区别?

在Spring框架中，@Autowired 和 @Resource 都是用来实现依赖注入的注解，区别如下：

- 来源不同: @Autowired 是**Spring框架提供的注解**。@Resource 是**Java EE**的JSR-250规范的一部分，由Java本身提供。
- **注入方式:** @Autowired 默认是通过类型（byType）进行注入。如果容器中存在多个相同类型的实例，它还可以与 @Qualifier 注解一起使用，通过指定bean的id来注入特定的实例。@Resource 默认是通过名称（byName）进行注入。如果未指定名称，则会尝试通过类型进行匹配。
- 属性: @Autowired 可以**不指定任何属性**，仅通过类型**自动装配**。@Resource 可以指定一个名为 **name 的属性，该属性表示要注入的bean的名称**。
- 依赖性: 使用 @Autowired 时，**通常需要依赖Spring的框架**。使用 @Resource 时，即使不在Spring框架下，也可以在任何符合Java EE规范的环境中工作。
- 使用场景: 当你需要更细粒度的控制注入过程，或者你需要支持Spring框架之外的Java EE环境时，@Resource 注解可能是一个更好的选择；如果你完全在Spring的环境下工作，并且希望通过类型自动装配，@Autowired 是更常见的选择。

### 注入方式

- **@Autowired：我只看类型，不看名字 → 类型重复就报错**
- **@Resource：我先看名字，名字找不到再看类型 

------

二、@Autowired 举例（按类型，多了就报错）

假设你有两个相同类型的 Bean：

```java
@Component
public class Cat implements Animal {}

@Component
public class Dog implements Animal {}
```

现在你用 **@Autowired** 注入：

```java
@Autowired
private Animal animal;
```

会发生什么？

> 你要 Animal 类型，我这里有 Cat、Dog 两个，**我不知道你要哪一个**

**结果：直接报错！**

解决办法：必须加 @Qualifier 指定名字

```java
@Autowired
@Qualifier("cat")  // 告诉Spring：我要名字叫 cat 的那个
private Animal animal;
```

------

三、@Resource 举例（先按名字，找不到再按类型）

同样两个 Bean：`cat`、`dog`

```
@Resource
private Animal cat;  // 注意：变量名是 cat
```

### @Resource 的执行逻辑：

1. **先看名字**：你变量名叫 `cat` → 我去找名字叫 cat 的 Bean
2. **找到了！** → 直接注入，完美！

```java
@Resource
private Animal myPet;
```

@Resource 会这样做：

1. 先找名字叫 `myPet` 的 Bean → **找不到**

2. 自动降级：按类型找

   发现有两个 Animal → 又懵了 → 报错

# bean和容器化

## IOC 容器初始化流程

Spring IOC 初始化，核心就是**加载配置 → 扫描 Bean → 创建 Bean → 初始化 Bean → 放入容器**

## Bean 的生命周期

Bean 的生命周期，就是从 **Spring 启动开始，经过实例化、属性注入、Aware 接口回调、前后置处理器处理、初始化方法调用，到销毁方法执行**的完整过程。



1. **实例化阶段**：Spring 启动后，先把 BeanDefinition 合并，加载类、推断构造方法，创建 Bean 实例，这是对象刚被创建出来的阶段。
2. **属性注入阶段**：给实例化后的 Bean 注入依赖和配置值，完成属性填充。
3. **Aware 接口回调**：按顺序执行`BeanNameAware`、`BeanFactoryAware`、`ApplicationContextAware`，让 Bean 拿到容器相关的信息。
4. **BeanPostProcessor 前置处理**：执行`postProcessBeforeInitialization`，可以在初始化前对 Bean 做修改。
5. **初始化阶段**：先执行`InitializingBean.afterPropertiesSet()`，再执行`init-method`配置的自定义初始化方法。
6. **BeanPostProcessor 后置处理**：执行`postProcessAfterInitialization`，可以对初始化后的 Bean 做增强（比如 AOP 代理就是在这里生成的）。
7. **使用阶段**：Bean 已完全就绪，可被业务代码调用，长期驻留容器中。
8. **销毁阶段**：容器关闭时，执行`DisposableBean.destroy()`，再执行`destroy-method`配置的自定义销毁方法，完成资源释放。



IOC 容器初始化的核心工作，就是批量驱动所有 Bean 走完各自的生命周期；而每个 Bean 的生命周期，都必须在容器初始化的调度下才能完整执行，两者是整体与部分、调度与执行的关系。



#### Bean 是否单例？

Spring Bean 默认是单例的，通过`scope`属性可以设置为多例（prototype），单例 Bean 要注意线程安全问题，多例 Bean 每次请求都会创建新实例。



Spring 中的 Bean **默认都是单例**的。

就是说，每个 Bean 的实例只会被创建一次，并且会被存储在 Spring 容器的缓存中，以便在后续的请求中重复使用。这种单例模式可以提高应用程序的性能和内存效率。

但是，Spring 也支持将 Bean 设置为多例模式，即每次请求都会创建一个新的 Bean 实例。要将 Bean 设置为多例模式，可以在 Bean 定义中通过设置 scope 属性为`"prototype"`来实现。

需要注意的是，虽然 Spring 的默认行为是将 Bean 设置为单例模式，但在一些情况下，使用多例模式是更为合适的，例如在创建状态不可变的 Bean 或有状态 Bean 时。此外，需要注意的是，**如果 Bean 单例是有状态的，那么在使用时需要考虑线程安全性问题。**

#### 什么是单例的有状态的无状态

**有状态场景**：就是对象里**保存了会变化的数据**，这些数据会被多个请求 / 线程共享和修改。

反过来，**无状态场景**：对象里没有可变数据，所有请求用的都是同一份固定逻辑，互不影响。

**1. 无状态场景（单例 Bean 安全）**

比如一个 Service 里的工具类方法：

```java
@Service
public class UserService {
    public String formatUserName(String name) {
        return "用户：" + name.trim();
    }
}
```

- 这里没有成员变量，每次调用方法都是传入参数、计算、返回结果
- 多个线程同时调用，互不影响，**完全线程安全**，单例用着没问题

**2. 有状态场景（单例 Bean 不安全）**

比如 Service 里有一个成员变量，用来存当前用户信息：

```java
@Service
public class UserService {
    private String currentUserName; // 成员变量，会被修改

    public void setCurrentUser(String name) {
        this.currentUserName = name;
    }

    public String getCurrentUser() {
        return this.currentUserName;
    }
}
```

- 线程 A 调用`setCurrentUser("张三")`，线程 B 同时调用`setCurrentUser("李四")`
- 两个线程都在修改同一个`currentUserName`变量，会出现数据覆盖、混乱的问题
- 这就是典型的**有状态场景**，单例 Bean 会出现线程安全问题



## Spring的IOC介绍一下

IOC：Inversion Of Control，即**控制反转**，是一种**设计思想**。在**传统**的Java SE程序设计中，我们直接在**对象内部通过new的方式来创建对象，是程序主动创建依赖对象**；

【传统应用程序】
Student依赖Score，代码中主动创建：
Student student=new Student();
Score score=new Score();
student.setScore(score);

而在Spring程序设计中，**IOC是有专门的容器去控制对象。**



【IOC控制反转】
**根据配置加载并实例化相关Bean，保存到IOC容器，再从容器中获取Bean：**
ApplicationContext.getBean(Student.class);



所谓控制就是对象的创建、初始化、销毁。
- 创建对象：原来是new一个，现在是由S**pring容器创建**。
- 初始化对象：原来是对象自己通过构造器或者setter方法给依赖的对象赋值，现在是由Spring容器自动注入。
- 销毁对象：原来是直接给对象赋值null或做一些销毁操作，现在是Spring容器管理生命周期负责销毁对象。

总结：IOC解决了繁琐的对象生命周期的操作，解耦了我们的代码。

所谓反转：其实是反转的控制权，前面提到是**由Spring来控制对象的生命周期，那么对象的控制就完全脱离了我们的控制，控制权交给了Spring**。这个反转是指：我们**由对象的控制者变成了IOC的被动控制者。**

## 事务

### 如何使用spring实现事务？



Spring 实现事务主要有两种方式：

1. **声明式事务**：用 `@Transactional` 注解，放在方法或类上，Spring 会自动帮我们开启、提交或回滚事务，使用简单，但要注意事务失效的场景，比如方法不是 `public`、内部调用、异常类型不匹配等问题。
2. **编程式事务**：用 `TransactionTemplate` 手动控制事务，灵活性更高，可以精细控制事务的开启、提交时机，适合事务操作少、需要定制化逻辑的场景，但代码侵入性更强。

实际开发中，大部分场景用声明式事务就够了；如果遇到递归、外部调用这种容易产生长事务的场景，我会把非事务逻辑提前执行，只在数据写入环节开启事务，避免事务过长影响性能。



#### 1. 声明式事务管理（@Transactional）

通过 `@Transactional` 注解实现事务控制，使用简单，无需手动编写事务代码：

- 方法级别：在方法上添加注解，方法执行前开启事务，执行后提交事务；

  ```java
  @Service
  public class TransactionDemo {
      @Transactional
      public void declarativeUpdate() {
          updateOperation1();
          updateOperation2();
      }
  }
  ```

- 类级别：在类上添加注解，类中所有 public方法都将开启事务；

  ```java
  @Service
  @Transactional
  public class TransactionDemo {
      public void declarativeUpdate() {
          updateOperation1();
          updateOperation2();
      }
      // 其他public方法...
  }
  ```

#### 2. 编程式事务管理（TransactionTemplate）

通过代码手动控制事务的开启、提交、回滚，灵活性更高：

- Spring 提供 TransactionTemplate简化编程式事务实现；

  ```
  @Service
  public class UserService {
      @Autowired
      private UserDao userDao;
      @Autowired
      private TransactionTemplate transactionTemplate;
  
      public void addUser(User user) {
          transactionTemplate.execute(new TransactionCallbackWithoutResult() {
              @Override
              protected void doInTransactionWithoutResult(TransactionStatus status) {
                  userDao.insert(user);
                  // 其他数据库操作
              }
          });
      }
  }
  ```

#### 3. 两种方式对比

| 对比维度 | 声明式事务                                 | 编程式事务                         |
| -------- | ------------------------------------------ | ---------------------------------- |
| 使用方式 | `@Transactional` 注解                      | `TransactionTemplate` 编码         |
| 优点     | 使用简单，无侵入                           | 控制粒度更细，可灵活控制事务边界   |
| 缺点     | 使用不当易失效；事务性操作过多易导致长事务 | 代码侵入性强，需要硬编码控制       |
| 适用场景 | 同一方法中事务操作较多                     | 事务操作数量少、需要精细控制的场景 |

#### 4. 长事务优化建议

对于递归、外部通讯等耗时场景，应避免事务包裹整个流程：将非事务操作前置执行，仅在写入数据的关键环节开启事务，减少长事务带来的锁竞争和性能问题。



# Springboot

## **1. Spring Boot 自动装配**



自动装配的意思就是，Spring Boot 会根据你引入的依赖、配置文件和当前环境，自动帮你把很多 Bean 配好，不用你一个个手动写配置。
比如你引入了数据库相关依赖，它就会尝试帮你把数据源、事务这些常用组件配起来。

底层大致可以理解成三步：

- 启动时加载自动配置类
- 判断当前条件是不是满足，比如类在不在、配置有没有写
- 满足条件就创建对应的 Bean

核心就是：
**约定大于配置，省掉大量样板配置。**











其他

## 保持接口幂等的方法：

保证接口幂等，就是防止重复请求导致脏数据，常用方案有：**前端防重、唯一索引、分布式锁、Token 令牌、状态机控制**，根据业务场景组合使用即可。

### RESTful 方法幂等总结

- **GET**：幂等
- **PUT**：幂等
- **DELETE**：幂等
- **POST**：**不幂等**