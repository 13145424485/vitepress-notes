



# 编写习惯以及Java新特性





# Optional  java8新特性   空值判断

Optional 类是 Java 8 才引入的，Optional 是个容器，它可以保存类型 T 的值，或者仅仅保存 null。Optional 提供了很多方法，这样我们就不用显式进行空值检测。Optional 类的引入很好的解决[空指针异常](https://so.csdn.net/so/search?q=空指针异常&spm=1001.2101.3001.7020)。





### 代码示例

```java
    /**
     * 根据手机号查询用户。
     *
     * @param phone 手机号。
     * @return 用户 Optional。
     */
    @Transactional(readOnly = true)
    public Optional<User> findByPhone(String phone) {
        return Optional.ofNullable(userMapper.findByPhone(phone));
    }

```

**传统写法的问题**：

```java
// 返回 User，可能为 null
public User findByPhone(String phone) {
    return userMapper.findByPhone(phone);  // 可能返回 null
}

// 调用方必须判空，否则 NPE
User user = service.findByPhone("13800138000");
System.out.println(user.getName());  // 💥 如果 user 为 null，直接崩溃！
```

**Optional 写法**：

```java
// 调用方必须处理"不存在"的情况
Optional<User> opt = service.findByPhone("13800138000");

// 方式1：安全取值（不存在时返回默认值）
User user = opt.orElse(new User("默认用户"));

// 方式2：安全执行操作（不存在时不执行）
opt.ifPresent(u -> System.out.println(u.getName()));

// 方式3：不存在时抛出自定义异常
User user = opt.orElseThrow(() -> new UserNotFoundException("用户不存在"));
```

#### Java8之前的空指针异常判断

Java 在使用对象过程中，访问任何方法或属性都可能导致 NullPointerException：

例如我们通过以下方法，获取存在 student 对象中的 Age 值。

        public String getIsocode (Student student){
            return student.getAge();
        }


在这样的示例中，如果我们想要避免由 student 或 student.age 为空而导致的空指针问题，我们就需要采用防御式检查减少 NullPointerException（在访问每一个值之前对其进行明确地检查）：

       public String getIsocode (Student student){
            if (null == student) {
                // doSomething
                return "Unknown";
            }
            if (null == student.getAge()) {
                // doSomething
                return "Unknown";
            }
            return student.getAge();
        }

#### Java8之后Optional的使用

当需要判断的量多时，此时的这些判断语句可能会导致代码臃肿冗余，为此 Java8 特意推出了 Optional 类来帮助我们去处理空指针异常。

#### Optional类常用方法总结

Optional对象创建

##### Optional.empty()方法

使用 Optional.empty() 方法声明一个空的 Optional：

```
// 通过静态工厂方法 Optional.empty()，创建一个空的 Optional 对象
Optional&lt;Student&gt; optStudent = Optional.empty();

```



#### Optional.of(T t)方法

使用 **Optional.of(T t)** 方法创建一个包含非空值的 Optional 对象 (不推荐)：

```
// 静态工厂方法 Optional.of(T t)，依据一个非空值创建一个 Optional 对象
Optional&lt;Student&gt; optStudent = Optional.of(student);
```

如果 student 为 null，这段代码会立即抛出一个 NullPointerException，而不是等到访问 student 的属性值时才返回一个错误。

#### Optional.ofNullable(T t)方法

使用 Optional.ofNullable(T t) 方法创建一个包含可能为空的值的 Optional 对象 (推荐)：

```
// 用静态工厂方法 Optional.ofNullable(T t)，你可以创建一个允许 null 值的 Optional 对象

Optional&lt;Student&gt; optStudent = Optional.ofNullable(student);
```

#### Optional对象获取

##### get()方法

get() 方法，如果变量存在，它直接返回封装的变量值，否则就抛出一个 NoSuchElementException 异常，不推荐使用：

```
optional.map(Student::getAge).get()
```



##### orElse(T other)方法

orElse(T other) 方法，它允许你在 Optional 对象不包含值时提供一个默认值：

```
optional.map(Student::getAge).orElse(20));
```



##### `orElseGet(Supplier<? extends T> other)` 方法

`orElseGet(Supplier<? extends T> other)` 方法是 `orElse` 方法的延迟调用版，`Supplier` 只有在 `Optional` 对象不含值时才执行调用（懒加载）：

```
optional.map(Student::getAge).orElseGet(() -> Integer.MAX_VALUE);
```



##### `orElseThrow(Supplier<? extends X> exceptionSupplier)` 方法

`orElseThrow(Supplier<? extends X> exceptionSupplier)` 方法和 `get` 方法非常类似，它们遭遇 `Optional` 对象为空时都会抛出异常，但是使用 `orElseThrow` 可以定制希望抛出的异常类型：

```
optional.orElseThrow(() -> new RuntimeException("student不存在!"));
```



##### `ifPresent(Consumer<? super T> consumer)` 方法



`ifPresent(Consumer<? super T> consumer)` 方法会在变量值存在时执行传入的方法，否则不进行任何操作：

```
optional.ifPresent(o -> o.setAge(18));
```

#### Optional对象中值的提取和转换

##### map()方法

map() 方法，如果值存在，就对该值执行提供的 mapping 函数调用，如果值不存在，则返回一个空的 Optional 对象。

引入 Optional 以前：

		String name = null;
	if(insurance != null){
	    name = insurance.getName();
	}


引入 Optional 以后：

		Optional&lt;String&gt; name = Optional.ofNullable(insurance).map(Insurance::getName);


Optional 的 map 方法和 Java 8 中 Stream 的 map 方法相差无几。

##### flatMap()方法

flatMap() 方法，对于嵌套式的 Optiona 结构，我们应该使用 flatMap 方法，将两层的 Optional 合并成一个。

我们试着重构以下代码：

  public String getCarInsuranceName(Person person) {
      return person.getCar().getInsurance().getName();
  }

由于我们刚刚学习了如何使用 map，我们的第一反应可能是我们可以利用 map 重写之前的代码：

```
  Optional&lt;Person&gt; optPerson = Optional.of(person);
      Optional&lt;String&gt; name =
          optPerson.map(Person::getCar)
                   .map(Car::getInsurance)
                   .map(Insurance::getName);
```

不幸的是，这段代码无法通过编译。为什么呢? optPerson 是 Optional&lt;Person&gt; 类型的 变量， 调用 map 方法应该没有问题。但 getCar 返回的是一个 Optional&lt;Car&gt; 类型的对象，这意味着 map 操作的结果是一个 Optional&lt;Optional&lt;Car&gt;&gt; 类型的对象。因此，它对 getInsurance 的调用是非法的。

下面应用 map 和 flatMap 对上述示例进行重写:

```
  public String getCarInsuranceName(Optional&lt;Person&gt; person) {
      return person.flatMap(Person::getCar)
                       .flatMap(Car::getInsurance)
                       .map(Insurance::getName)
                       .orElse("Unknown"); // 如果Optional的结果 值为空设置默认值
  }
```

#### Optional对象其他方法

##### isPresent()方法

可以使用 isPresent() 方法检查 Optional 对象是否包含非空值，例如：

```
Optional&lt;String&gt; optional = Optional.of("Hello World");
if (optional.isPresent()) { 
    System.out.println(optional.get()); 
}
```

##### filter()方法

filter() 方法接受一个谓词作为参数。如果 Optional 对象的值存在，并且它符合谓词的条件，filter 方法就返回其值，否则它就返回一个空的 Optional 对象。

比如，你可能需要检查保险公司的名称是否为 “Cambridge-Insurance”。

	Insurance insurance = ...;
	if(insurance != null && "CambridgeInsurance".equals(insurance.getName())){
			System.out.println("ok");

  }

使用 Optional 对象的 filter 方法，这段代码可以重构如下:

```
Optional&lt;Insurance&gt; optInsurance = ...;
optInsurance.filter(insurance -> "CambridgeInsurance".equals(insurance.getName()))
            .ifPresent(x -> System.out.println("ok"));
```







# Arrays

## Arrays.toString()方法

快速[输出数组](https://so.csdn.net/so/search?q=输出数组&spm=1001.2101.3001.7020)内容

```java
int[] a = {1,2,3,4,5};
System.out.println(Arrays.toString(a));
// 输出格式：[1,2,3,4,5]
```

## Arrays.sort()方法

给数组排序，默认升序

```java
int[] a = new int[5]{5，4，3，2，1};
Arrays.sort(a); // 1 2 3 4 5
System.out.println(Arrays.toString(a));
// [1,2,3,4,5]
```

**①.Arrays.sort(数组名)**

 **②.Arrays.sort(数组名，起始下标，排序个数)**

```java
Scanner s = Scanner(System.in);
int n = s.nextInt();
int[] a = new int[n]
for(int i = 0; i < n; i++)
   a[i] = s.nextInt();
Arrays.sort(a,0,n - 1);
```

## Arrays.equals()方法

比较两个数组内容是否相等

```
int[] a = {1,2,3};
int[] b = {1,2,3};
boolean isSame = Arrays.equals(a,b);
//true
```

## Arrays.binarySearch()

在数组中查找元素

再数组中查找指定值，若找到，则返回此值的下标，

若没找到，返回 -插入点-1；

```java
int Arrays.binarySearch( Datatype[], Datatype key)
```

## Arrays.copyOf()

拷贝数组

第一个参数是原数组，第二个参数是拷贝长度，返回值是将原数组拷贝一份返回

```
public static void main(String[] args) {
        int[] arr1 = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int[] arr2 = new int[5];
        arr2 = Arrays.copyOf(arr1, 10);
}
```



 Arrays.copyOf()的拷贝是从下标0开始的，如果你想从其他下表开始，可以使用Arrays.copyOfRange()方法



```java
// from 表示开始位置， to 表示结束位置  
// 复制下标为 ：[from, to)
Arrays.copyOfRange(int[] original, int from, int to)
```





## Arrays.sort()[降序排列]

## Arrays.asList()

源码

```
public static &lt;T&gt; List&lt;T&gt; asList(T... a) {
    return new ArrayList&lt;T&gt;(a);
} 

```

使用该方法 可以将一个变长参数或者数组转换成List



需要注意以下问题

```
public class ArraysAsListTest {
	
	public static void main(String[] args) {
		
		int[] a = {1,2,3};
		Integer[] b = {1,2,3};
		
		List listA = Arrays.asList(a);
		List listA1 = Arrays.asList(1,2,3);
		List listB = Arrays.asList(b);
		
		System.out.println(listA.size());//out:1
		System.out.println(listA1.size());//out:3
		System.out.println(listB.size());//out:3
	}
}

```

用int类型的数组作为参数为什么输出size是1，使用Integer类型size就是3了呢。

再看源码，**asList接收的是一个泛型变长参数，而我们知道基本类型是不能泛型化的，就是说8种基本类型不能作为泛型参数，要想作为泛型参数就要使用其所对应的包装类。**

但是listA的Size为什么是1呢，**这是因为listA传递的是一个int类型的数组，数组是一个对象，它是可以泛型化的，也就是说例子中是把一个int类型的数组作为了T的类型，所以转换后在List中就只有一个类型为int数组的元素。** 后边ListA1与ListB也就可以理解了，一个是进行了自动打包，一个是本来就是包装类型

# Util工具类的使用

BooleanUtil: 处理布尔值的判定和转换，常用 isTrue/isFalse 做 null 安全判断，toBoolean(Object) 把字符串/数字等转成 boolean。

StrUtil: 处理字符串的判空、截取、替换、格式化等，常用 isBlank/isEmpty/hasBlank 校验字符串，format 拼接、sub/replace 操作文本。

JSONUtil: 处理 JSON 的序列化/反序列化，常用 toJsonStr 把对象转 JSON 字符串，toBean/toList 把 JSON 转成 Java 对象或集合，以及 parseObj 获取 JSONObject 方便访问字段。

# Java 记录类（Record）语法糖

在传统 Java 开发中，创建一个纯粹用于封装数据的类（如 DTO 或值对象）往往需要编写大量样板代码，包括构造器、getter、equals、hashCode 和 toString 方法。这些代码虽然重复，却难以避免，不仅影响开发效率，也降低了代码可读性。

为了解决这一问题，Java 在 JEP 359 中提出了“记录类”这一语言特性，并于 Java 14 首次以预览形式引入，在 Java 16 中正式发布。记录类的核心设计目标是为数据携带类提供一种简洁、可读性强且类型安全的声明方式。

```
public record VerificationCheckResult(
        VerificationCodeStatus status,  // 校验状态（枚举）
        int attempts,                    // 已尝试次数
        int maxAttempts                  // 最大允许次数
) {
    // 自定义方法：判断是否成功
    public boolean isSuccess() {
        return status == VerificationCodeStatus.SUCCESS;
    }
}
```

## 等价于传统 POJO

```java
public final class VerificationCheckResult {
    private final VerificationCodeStatus status;
    private final int attempts;
    private final int maxAttempts;

    // 全参构造器
    public VerificationCheckResult(VerificationCodeStatus status, int attempts, int maxAttempts) {
        this.status = status;
        this.attempts = attempts;
        this.maxAttempts = maxAttempts;
    }

    // getter（注意：record 用 status() 而非 getStatus()）
    public VerificationCodeStatus status() { return status; }
    public int attempts() { return attempts; }
    public int maxAttempts() { return maxAttempts; }

    // 自动生成 equals / hashCode / toString
    // ...
}
```

## 使用示例

```java
// 创建实例（编译器生成构造器）
var result = new VerificationCheckResult(
    VerificationCodeStatus.SUCCESS, 
    1, 
    5
);

// 访问字段（注意方法名！）
result.status();      // → SUCCESS
result.attempts();    // → 1
result.isSuccess();   // → true（自定义方法）

// 自动生成的 toString
System.out.println(result);
// VerificationCheckResult[status=SUCCESS, attempts=1, maxAttempts=5]
```

**典型使用场景**：

```java
VerificationCheckResult result = verificationService.checkCode(phone, inputCode);

if (result.isSuccess()) {
    // 放行登录
} else if (result.attempts() >= result.maxAttempts()) {
    // 锁定账户或要求等待
} else {
    // 提示错误，显示剩余次数
    throw new CodeErrorException("验证码错误，还剩 " + 
        (result.maxAttempts() - result.attempts()) + " 次机会");
}
```

`record` 是 Java 的**数据专用语法糖**，用一行代码替代数十行 POJO 样板，专为**不可变数据传输对象（DTO）**设计。



# 模式匹配 instanceof

Java 14+ 引入的 **模式匹配 instanceof（Pattern Matching for instanceof）**，实现了**类型检查与变量提取的一体化**

```java
    public long extractUserId(Jwt jwt) {
        Object claim = jwt.getClaims().get(CLAIM_USER_ID);
        if (claim instanceof Number number) {
            return number.longValue();
        }
        if (claim instanceof String text) {
            return Long.parseLong(text);
        }
        throw new IllegalArgumentException("Invalid user id in token");
    }
```

claim instanceof Number number 可以把它理解成一句话：

“如果 claim 是 Number 类型，就把它当成 Number，并起名叫 number。”

它是 Java 的 instanceof 模式匹配语法，做了三件事合并：

1. 类型判断
2. 强制转换
3. 新变量声明

传统写法是两步：

```java
if (claim instanceof Number) {   
    Number number = (Number) claim;
    return number.longValue(); 
} 
```

模式匹配写法是一句：

```java
if (claim instanceof Number number) {
    return number.longValue(); 
}
```

- claim：要检查的对象（通常是 Object）。
- instanceof Number：判断它是不是 Number 或其子类（Integer、Long、Double 等）。
- number：如果判断为真，自动绑定出来的变量名，类型就是 Number。







# 02 Lambda表达式

## 1.Lambda 表达式概述：

是 JDK 8 的语法糖，可简化某些匿名内部类写法，体现函数式编程思想，核心原则是可推导可省略，基本格式为 

(参数列表) -> {代码}。

## 2.使用案例一：

创建线程并启动时时，可以使用传统匿名内部类写法：

```java
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("传统方式创建线程");
    }
}).start();
```

因为使用到了匿名内部类 Runnable 接口，并且该接口中只有 run() 一个抽象方法，所以可以使用Lambda的格式对其进行修改，如下所示：

```java
// () -> {...} 中 () 相当于 run() 方法的参数列表, {...} 相当于 run() 方法的函数体
new Thread(() -> {
    System.out.println("Lambda方式创建线程");
}).start();
```

3.使用案例二：

例如，有如下一个方法：

```java
public static int calculateNum(IntBinaryOperator op) {
    int a = 10;
    int b = 20;
    return op.applyAsInt(a, b);
}
```

该方法接收一个 `IntBinaryOperator` 类型的参数，并调用该参数中的 `applyAsInt()` 方法。`IntBinaryOperator` 是 JDK 内置的一个接口，接口源码如下：

```Java
@FunctionalInterface
public interface IntBinaryOperator {
    int applyAsInt(int left, int right);
}
```

可以看到该接口只有一个抽象方法，因此在调用 calculateNum() 方法时，传入自定义的 IntBinaryOperator 实现时，就可以使用 lambda 表达式来实现。

```Java
calculateNum((a, b) -> {
    return a + b;
});
```

甚至可以进一步简化：

```Java
calculateNum((a, b) -> a + b);
```



# 03stream流

Java8的 Stream 使用的是函数式编程模式，它可以被用来对集合或数组进行链状流式的操作，可以更方便地让我们对集合或数组操作。

官方文档如下：

https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html

# 案例

## 1. 数据准备

```Java
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Author {
    private Long id;
    private String name;
    private Integer age;
    private String intro;
    private List<Book> books;
}
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Book {
    private Long id;
    private String name;
    private String category;
    private Integer score;
    private String intro;
}
private static List<Author> getAuthors() {
    Author author1 = new Author(1L, "雷蒙多", 33, "简介1", null);
    Author author2 = new Author(2L, "亚拉索", 15, "简介2", null);
    Author author3 = new Author(3L, "易", 14, "简介3", null);
    Author author4 = new Author(3L, "易", 14, "简介3", null);

    List<Book> books1 = new ArrayList<>();
    List<Book> books2 = new ArrayList<>();
    List<Book> books3 = new ArrayList<>();

    books1.add(new Book(1L, "刀的两侧是光明与黑暗", "哲学,爱情", 88, "用一把刀划分了爱恨"));
    books1.add(new Book(2L, "一个人不能死在同一把刀下", "个人成长,爱情", 99, "讲述如何从失败中明悟真理"));

    books2.add(new Book(3L, "那风吹不到的地方", "哲学", 85, "带你用思维去领略世界的尽头"));
    books2.add(new Book(3L, "那风吹不到的地方", "哲学", 85, "带你用思维去领略世界的尽头"));
    books2.add(new Book(4L, "吹或不吹", "爱情,个人传记", 56, "一个哲学家的恋爱观注定很难把他所在的时代理解"));

    books3.add(new Book(5L, "你的剑就是我的剑", "爱情", 56, "无法想象一个武者能对他的伴侣这么的宽容"));
    books3.add(new Book(6L, "风与剑", "个人传记", 100, "两个哲学家灵魂和肉体的碰撞会激起怎么样的火花呢?"));
    books3.add(new Book(6L, "风与剑", "个人传记", 100, "两个哲学家灵魂和肉体的碰撞会激起怎么样的火花呢?"));
    author1.setBooks(books1);
    author2.setBooks(books2);
    author3.setBooks(books3);
    author4.setBooks(books3);
    
    return new ArrayList<>(Arrays.asList(author1, author2, author3, author4));
}
```

## 2. 快速入门

### 需求

用 getAuthors() 方法获取到作家的集合，打印出所有年龄小于18的作家的名字，并且要注意去重。

### 实现

因为List并不是stream对象，为此使用集合对象时需要先将其转换为stream对象，拿到stream流，然后才可以调用stream对象的方法进行过滤处理。这里先使用匿名内部类的方式实现。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();
    authors.stream()    // 将List转为Stream流对象
            .distinct()    // 去重，靠的是Author类中的@EqualsAndHashCode注解，如果没有这个注解就需要自己编写这两个方法
            .filter(new Predicate<Author>() {   // 调用filter对年龄进行过滤，首先使用匿名内部类的方式实现
                @Override
                public boolean test(Author author) {
                    return author.getAge() < 18;
                }
            })
            .forEach(new Consumer<Author>() {   // forEach方法用来遍历剩余的每个元素进行消费，也使用匿名内部类的方式实现
                @Override
                public void accept(Author author) {
                    System.out.println(author.getName());
                }
            });
}
```

随后改为Lambda表达式实现

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();
    
    authors.stream()    // 将List转为Stream流对象
            .distinct()    // 去重，靠的是Author类中的@EqualsAndHashCode注解，如果没有这个注解就需要自己编写这两个方法
            .filter(author -> author.getAge() < 18)   // 调用filter对年龄进行过滤
            .forEach(author -> System.out.println(author.getName()));  // forEach方法用来遍历剩余的每个元素进行消费
}
```

## 3. IDEA 快速查看 Stream 流程

首先将断点打在使用流的地方：

![img](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjM4Nzc1OTc5MzI2NjRmMzMzMDY1ZGFkNTFiNTQwYzFfNENwa0dsc1YyZkhDMjBKNE1UT3VQZXZ4UGd1TU1nWXhfVG9rZW46RVNYd2JTeTNab0VlYzJ4MmNMbGNINGZ2bldiXzE3NzI3ODE3MzU6MTc3Mjc4NTMzNV9WNA)

然后使用DEBUG运行程序，在DEBUG窗口查看【Current Stream Chain】

![img](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NDNiYTY4MjllNjMzYjNkMjVhOWRjMGU0ZDdmMTYyOGZfQnV0NmV4bThpelUxSUM3eldTNlV1bkJlcTlPaVNSWldfVG9rZW46S0taMGJaOFV2bzNYVml4ZnVOd2NRZ3l0bm1oXzE3NzI3ODE3MzU6MTc3Mjc4NTMzNV9WNA)

逐个方法对应的Tab就可以查看流的处理流程：

![img](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=OWYyMjVkNTg0Yzg1YWI5NzlkYmYxMmM5MTYxY2RmYjhfeHV4YWREVWNrdkdjNmNpenlnZk0zbTVybUdBS2dPTXpfVG9rZW46SEVJc2JpOUg5b0x2UHp4OFZ6d2NIZjBSbkRmXzE3NzI3ODE3MzU6MTc3Mjc4NTMzNV9WNA)

# 常用操作

## 1. 创建流

Java 中有两类集合，一类是单列集合，父接口为Collection，一类是双列集合，父接口为Map。根据集合对象的不同，有如下几种创建流的方式：

1. 单列集合（List、Set）：`集合对象.stream()`
   1. ```Java
      List<Author> authors = getAuthors();
      Stream<Author> stream = authors.stream();
      ```
2. 数组（`[]`）：`Arrays.stream(数组)` 或者 `Stream.of(数组)`
   1. ```Java
      Integer[] arr = {1, 2, 3, 4, 5};
      Stream<Integer> stream1 = Arrays.stream(arr);
      Stream<Integer> stream2 = Stream.of(arr);
      ```
3. 双列集合：转换为单列集合后再创建
   1. ```Java
      Map<String, Integer> map = new HashMap<>();
      map.put("xiaoxin", 19);
      map.put("ameng", 17);
      map.put("wukong", 16);
      
      Stream<Map.Entry<String, Integer>> stream = map.entrySet().stream();
      ```

## 2. 中间操作

### filter

**[filter](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#filter-java.util.function.Predicate-)**，签名可理解为 `Predicate<? super T> predicate`：对流中的元素进行条件过滤，符合过滤条件的才能继续留在流中。

例如：打印所有姓名长度大于1的作家的姓名。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .filter(author -> author.getName().length() > 1)
            .forEach(author -> System.out.println(author.getName()));
}
```

### map

**[map](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#map-java.util.function.Function-)**，签名可理解为 `Function<? super T, ? extends R> mapper`：对流中的元素进行计算或类型转换。

例如：打印所有作家的姓名。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .map(author -> author.getName())
            .forEach(name -> System.out.println(name));
}
```

当然，其实这个需求单独用forEach也可以实现。但是经过map操作之后，流中的数据类型会改变，一定程度上减轻了数据量级。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .forEach(author -> System.out.println(author.getName()));
}
```

### distinct

**[distinct](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#distinct--)**()：可以去除流中的重复元素。

注意：distinct方法是依赖类中的equals方法来判断是否是相同对象的，所以如果要对某个类型的对象进行去重，这个类中必须重写equals() 和 hashCode() 方法。

例如：打印所有作家的姓名，并且要求其中不能有重复元素。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .distinct()
            .forEach(author -> System.out.println(author.getName()));
}
```

### sorted

- **[sorted](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#sorted--)**()：对数据流中的元素按自然顺序排序。
- **[sorted](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#sorted-java.util.Comparator-)**，签名可理解为 `Comparator<? super T> comparator`：根据提供的 Comparator 对流中的元素排序。

例如：对流中的元素按照年龄进行降序排序，并且要求不能有重复的元素。

在这个案例中，如果要使用第一种方法，就必须让 Author 继承 Comparable 接口，并实现 compareTo() 方法定义排序规则。

```Java
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Author implements Comparable<Author> {
    private Long id;
    private String name;
    private Integer age;
    private String intro;
    private List<Book> books;

    @Override
    public int compareTo(Author o) {
        // 升序排序
        // return this.getAge() - o.getAge();
        // 降序排序
        return o.getAge() - this.getAge();
    }
}
```

然后在main函数中调用：

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .distinct()
            .sorted()
            .forEach(author -> System.out.println(author.getAge()));
}
```

第二种方式就是保持Author不动，不让 Author 实现 Comparable 接口，而是在 `sorted()` 中定义排序规则。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .distinct()
            .sorted((o1, o2) -> o2.getAge() - o1.getAge()) // 降序排列
            .forEach(author -> System.out.println(author.getAge()));
}
```

### limit

**[limit](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#limit-long-)**(long maxSize)：设置流的最大长度（元素数量），超出的部分将被舍弃。

例如，对流中的元素按照年龄进行降序排序，并且要求不能有重复的元素，然后打印其中年龄最大的两个作家的姓名。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .distinct()
            .sorted((o1, o2) -> o2.getAge() - o1.getAge()) // 降序排列
            .limit(2)
            .forEach(author -> System.out.println(author.getAge()));
}
```

### skip

**[skip](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#skip-long-)**(long n)：跳过流中的前 n 个元素，返回剩下的元素。

例如，打印除了年龄最大的作家外的其他作家，要求不能有重复元素，并且按照年龄降序排序。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .distinct()
            .sorted((o1, o2) -> o2.getAge() - o1.getAge()) // 降序排列
            .skip(1)
            .forEach(author -> System.out.println(author.getAge()));
}
```

### flatMap

**[flatMap](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#flatMap-java.util.function.Function-)**，签名可理解为 `Function<? super T, ? extends Stream<? extends R>> mapper`：`map` 只能把一个对象转换成另一个对象来作为流中的元素，而 `flatMap` 可以把一个对象转换成多个对象作为流中的元素。

例如，打印所有书籍的名字，并对重复的元素进行去重。

刚开始可能会想到使用map()方法，取出author中的books列表，然后进行去重：

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .map(author -> author.getBooks())
            .distinct()
            .forEach(System.out::println);
}
```

但是，`map()` 返回的是 author 中的 `List<Book>` 对象，使用 `distinct` 进行去重时，流中的元素为 `List<Book>`，而不是 `Book`，因此去重的结果并不是我们预期的。

这时，就可以使用flatMap()，将流中列表类型的元素转换为新的流，新流中包含的就是列表中的元素，再使用distinct去重时，去重的对象就是Book对象了。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    // 匿名内部类形式
    authors.stream()
            .flatMap(new Function<Author, Stream<?>>() {
                @Override
                public Stream<?> apply(Author author) {
                    return author.getBooks().stream();
                }
            })
            .distinct()
            .forEach(System.out::println);

    // Lambda
    authors.stream()
            .flatMap(author -> author.getBooks().stream())
            .distinct()
            .forEach(System.out::println);
}
```

例二：打印现有书籍的所有分类，要求对分类进行去重，且不能出现多个分类（爱情,文艺）的格式

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    authors.stream()
            .flatMap(author -> author.getBooks().stream())
            .distinct()
            .flatMap(book -> Arrays.stream(book.getCategory().split(",")))
            .distinct()
            .forEach(System.out::println);
}
```

## 3. 结尾操作

**必须要有结尾操作，中间操作才会被调用到，进而生效，否则中间操作不会被执行**。

### forEach

**[forEach](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#forEach-java.util.function.Consumer-)**，签名可理解为 `Consumer<? super T> action`：对流中的元素进行遍历操作，可以通过传入的参数指定对遍历到的元素进行什么具体操作。

### count

**[count](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#count--)**()：获取当前流中元素的个数。

### max&min

- **[max](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#max-java.util.Comparator-)**，签名可理解为 `Comparator<? super T> comparator`：通过传入的 Comparator 对元素进行比较，得到最大值；
- **[min](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#min-java.util.Comparator-)**，签名可理解为 `Comparator<? super T> comparator`：通过传入的 Comparator 对元素进行比较，得到最小值。

Comparator的实现方法和 sorted() 中一致。

例如，获取这些作家的所出书籍的最高分并打印（最低分同理，改为min即可）。

此外，max和min返回的是一个Optional对象，需要通过 `get()` 获取到原始对象才可以使用。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Optional<Book> max = authors.stream()
            .flatMap(author -> author.getBooks().stream())
            .distinct()
            .max((o1, o2) -> o1.getScore() - o2.getScore());
    if (max.isPresent()) {
        Book book = max.get();
        System.out.println(book.getScore());
    }
    // 上面对max进行判断与输出的代码，也可以简化为Lambda表达式如下
    max.ifPresent(book -> System.out.println(book.getScore()));

    // 因为这里最后只需要输出分数，因此当我们取到 Stream<Book> 流对象后
    // 可以将流转换为 Stream<Integer> 流，只包含分数就可以，降低数据量级
    Optional<Integer> maxed = authors.stream()
            .flatMap(author -> author.getBooks().stream())
            .distinct()
            .map(book -> book.getScore())
            .max((o1, o2) -> o1 - o2);
    maxed.ifPresent(score -> System.out.println(score));
}
```

### collect

**[collect](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#collect-java.util.stream.Collector-)**，签名可理解为 `Collector<? super T, A, R> collector`：将当前流转换为一个集合。

在某些场景下，集合通过流处理之后，需要导出为一个新的集合进行使用，这时候就需要使用 `collect()` 方法。

例子：

获取一个存放所有作者名字的List集合。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    List<String> nameList = authors.stream()
            .map(author -> author.getName())
            .collect(Collectors.toList());

    System.out.println(nameList);
}
```

获取一个所有书名的Set集合。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Set<String> bookSet = authors.stream()
            .flatMap(author -> author.getBooks().stream())
            .map(book -> book.getName())
            .collect(Collectors.toSet());
    System.out.println(bookSet);
}
```

获取一个Map集合，map的key为作者名，value为`List`。

由于 `toMap()` 的匿名内部类比较复杂，先给出匿名内部类的方式，便于理解原理。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Map<String, List<Book>> books = authors.stream()
            .collect(Collectors.toMap(new Function<Author, String>() {
                @Override
                public String apply(Author author) {
                    return author.getName();
                }
            }, new Function<Author, List<Book>>() {
                @Override
                public List<Book> apply(Author author) {
                    return author.getBooks();
                }
            }, new BinaryOperator<List<Book>>() {
                @Override
                public List<Book> apply(List<Book> books1, List<Book> books2) {
                    return books2;
                }
            }));
    System.out.println(books);
}
```

使用toMap()方法有一个注意事项，toMap()共有三种实现：

- **[toMap](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html#toMap-java.util.function.Function-java.util.function.Function-)**：`Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper`
- **[toMap](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html#toMap-java.util.function.Function-java.util.function.Function-java.util.function.BinaryOperator-)**：`Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction`
- **[toMap](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html#toMap-java.util.function.Function-java.util.function.Function-java.util.function.BinaryOperator-java.util.function.Supplier-)**：`Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction, Supplier<M> mapSupplier`

主要是前三个参数：

- `Function<? super T, ? extends K> keyMapper`：key 的映射函数，将 T 类型映射为 K 类型
- `Function<? super T, ? extends U> valueMapper`：value 的映射函数，将 T 类型映射为 U 类型
- `BinaryOperator<U> mergeFunction`：聚合函数，用于指定 key 重复时的操作

因为将流中元素的某个字段转化为key后是可能存在重复的，并且无法通过distinct()去重，distinct()只会去掉重复的对象，而不能仅对流中元素的某个字段去重。

`BinaryOperator<U>` 用来指导 key 重复时的聚合规则。实现 `BinaryOperator<U>` 接口需要重写 `apply(o1, o2)` 方法，接收两个参数；如果 `return o1` 则表示保留先出现的 key 对应的 value，`return o2` 则表示用后面出现的 key 对应的 value 覆盖前面的。

随后，用Lambda表达式简化：

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Map<String, List<Book>> books = authors.stream()
            .collect(Collectors.toMap(author -> author.getName(), author -> author.getBooks(), (books1, books2) -> books2));
    System.out.println(books);
}
```

### 查找与匹配

#### anyMatch

**[anyMatch](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#anyMatch-java.util.function.Predicate-)**，签名可理解为 `Predicate<? super T> predicate`：判断流内是否有任意符合匹配条件的元素，结果为 boolean 类型。只要有一个元素满足条件就返回 true。

例如，判断是否有年龄在29岁以上的作家。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    boolean b = authors.stream()
            .anyMatch(author -> author.getAge() > 29);
    System.out.println(b);  // true
}
```

#### allMatch

**[allMatch](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#allMatch-java.util.function.Predicate-)**，签名可理解为 `Predicate<? super T> predicate`：与 `anyMatch()` 类似，判断流内是否所有元素都满足匹配条件，结果为 boolean 类型。当所有元素都满足条件时才返回 true。

#### noneMatch

**[noneMatch](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#noneMatch-java.util.function.Predicate-)**，签名可理解为 `Predicate<? super T> predicate`：与上面两个类似，判断流内是否所有元素都不满足匹配条件，结果为 boolean 类型。当所有元素都不满足条件时才返回 true。

#### findAny

**[findAny](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#findAny--)**()：获取流中的任意一个元素，返回的是一个 **`Optional`** 对象。该方法没有办法保证获取的一定是流中的第一个元素，因此用的更多的是下面的 findFirst() 方法。

例子：获取任意一个年龄大于18的作家，如果存在就输出他的名字。

findAny() 并不像他的字面意思一样，可以查找一个满足条件的元素，他只是在最后处理完的流中随机获取一个元素并返回。因此，如果要做筛选的话，还是要依赖 filter() 方法。

**那么 findAny() 和 findFirst() 存在的意义是什么呢？**

因为流处理结束后，最终的流是可能为空的，比如说下面的代码中，如果作家年龄都小于18，那么最后的流将会是空的，如果直接使用很可能会报空指针异常。因此，findAny() 和 findFirst() 方法主要是用来避免空指针异常的。

当调用 findAny() 和 findFirst() 方法时，返回的是一个 Optional 对象，Optional 对象的 ifPresent() 方法便可以对流元素对象进行判空，不为空才执行相应逻辑。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    // 查找年龄大于18的作家
    Optional<Author> optionalAuthor = authors.stream()
            .filter(author -> author.getAge() > 18)
            .findAny();
    
    // 如果存在就输出他的名字
    optionalAuthor.ifPresent(author -> System.out.println(author));
}
```

#### findFirst

**[findFirst](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#findFirst--)**()：获取流中的第一个元素，返回的是一个 **`Optional`** 对象。与findAny()的用法一样。

### reduce

对流中的数据按照指定的计算方式计算出 **一个结果**。有三种实现：

- **[reduce](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-java.util.function.BinaryOperator-)**：`BinaryOperator<T> accumulator`，返回的是 `Optional<T>` 对象
- **[reduce](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-T-java.util.function.BinaryOperator-)**：`T identity, BinaryOperator<T> accumulator`，返回的是 `T` 类型的对象
- **[reduce](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-U-java.util.function.BiFunction-java.util.function.BinaryOperator-)**：`U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner`，返回的是 `U` 类型的对象。

#### 两个参数

**[reduce](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-T-java.util.function.BinaryOperator-)** 的常见签名是 `T identity, BinaryOperator<T> accumulator`。它的作用是把 `stream` 中的元素给组合起来，我们可以传入一个初始值，它会按照传入的计算方式依次取出流中的元素和初始化值一起进行计算，计算结果后再和后面的元素计算。

他内部的计算方式如下：

```Java
// 定义初始值
T result = identity;
for (T element : this.stream)
    // 逐个取出流中的元素，按照apply中定义的逻辑与初始值进行计算
    result = accumulator.apply(result, element)
return result;
```

其中identity就是我们通过方法参数传入的初始值，accumulator的apply具体进行什么计算也是我们通过方法参数来确定的。

例子：

1. 使用reduce求所有作者年龄的和。

先用匿名内部类的方式实现，第二个参数定义了一个 BinaryOperator() 并实现了 apply() 方法，定义聚合操作为 加法，注意传入的参数，第一个表示result，第二个表示流遍历到的元素。 

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Integer ageSum = authors.stream()
            .distinct()
            .map(Author::getAge)
            .reduce(0, new BinaryOperator<Integer>() {
                @Override
                public Integer apply(Integer result, Integer element) {
                    return result + element;
                }
            });
}
```

再用Lambda表达式简化：

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Integer ageSum = authors.stream()
            .distinct()
            .map(Author::getAge)
            .reduce(0, (result, element) -> result + element);
}
```

1. 使用reduce求所有作者中年龄的最大值。

实际上使用 max() 也可以实现这个操作，但是 max() 在底层其实也是调用的 reduce() 方法，并且在开发中有时候需要求一些其它类型的统计值，因此，还是看看如何使用 reduce() 来实现 max() 的功能。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Integer maxAge = authors.stream()
            .map(Author::getAge)
            .reduce(Integer.MIN_VALUE, (result, element) -> result < element ? element : result);
}
```

#### 单个参数

**[reduce](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-java.util.function.BinaryOperator-)** 的常见签名是 `BinaryOperator<T> accumulator`。它的作用和两参的 `reduce()` 一样，只是将流中的第一个元素作为初始值，而不是传入自定义的初始值，然后依然是按照 `accumulator` 中定义的操作进行计算。

其内部的调用原理如下所示：

```Java
boolean foundAny = false;
T result = null;  // 上面是将传入的identity作为result初始值
for (T element : this stream) {
    if (!foundAny) {  // 找出第一个元素，用来初始化result
        foundAny = true;
        result = element;
    } else {
        result = accumulator. apply(result, element);
    }
}
return foundAny ? Optional. of(result) : Optional. empty();
```

如果用单参数的 reduce() 实现求年龄最大值，代码如下：

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Optional<Integer> reduce = authors.stream()
            .map(Author::getAge)
            .reduce((result, element) -> result > element ? result : element);
}
```

accumulator 的参数中同样是，第一个表示result，第二个表示遍历到的流中的元素。

# 注意事项

1. 惰性求值：
   1. 在对流进行操作时，操作不会立即执行，而是等到需要结果时才进行计算，即没有结尾操作，中间操作是不会执行的。
   2. 这种延迟计算的特性可以提高性能，因为它只计算流中实际需要的元素，而不是对整个流进行操作。
2. 流是一次性的（One-Time Use）：
   1. Stream 流是一次性的，一旦对流进行了结尾操作（如收集结果、循环遍历等），流就会被消耗掉，无法再次使用。
   2. 如果需要对同一组数据进行多个操作，可以创建一个新的流来进行操作。

```Java
public static void main(String[] args) {
    List<Author> authors = getAuthors();

    Stream<Author> stream = authors.stream();
    // 第一次对流进行处理，并执行了结尾操作
    stream.forEach(System.out::println);
    // 流终结后再次使用流，报错！！！
    stream.forEach(System.out::println);
}
```

1. 不会影响原数据：
   1. Stream 流的操作不会直接修改原始数据源中的元素，也不会影响原始数据源的结构。
   2. 所有的流操作都是基于数据源的副本或视图进行的，保持了原始数据的不变性。
   3. 除非在流中调用了流中元素对象的setter类似的方法，例如：
      - ```Java
        public static void main(String[] args) {
            List<Author> authors = getAuthors();
        
            authors.stream()
                    .map(new Function<Author, Object>() {
                        @Override
                        public Object apply(Author author) {
                            author.setAge(author.getAge() + 10);
                            return author;
                        }
                    }).forEach(System.out::println);
        }
        ```
