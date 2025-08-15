01星球java

## 数据类型与变量

### 数据类型转换

![image-20240626164447222](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240626164447222.png)

### 选择结构

&&逻辑与

||逻辑或



跟输入的字符作比较

"Y".equals(win)

### 循环结构

![image-20240719003310987](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240719003310987.png)

print 表示在同一行中打印

println表示换行打印

### java中的标号

1.语法规则

标号名称：循环结构

2.作用

标号的作用就是给代码添加一个标记，方便后面使用。

`childMenu：while`

`{`

`}`

`break childMenu;`

## 数组

 `String name;*//存储一个名字*`

   `String [] names;*//存储很多名字*`

   `*//回顾变量的赋值 ： 变量名＝变量的值*`

   `*//数组的赋值 数组名 = new 数据类型[数组的长度]；*`

   `name = "刘德华";`

   `names =new String[10];`

   `*//回顾变量的定义：数据类型 变量名 = 变量的值*`

   `*//数组的定义； 数据类型[] 数组名 = new 数据类型【长度】*`

   `double score =90.5;`

   `double[] scores =new double[5];`

   `*//数组的定义 ； 数据类型[] 数组名 = {元素1，元素2，。。。};*`

   `int[] numbers = {1,2,3,4,5};`

``   

   `byte[] byte = new byte[]{1,2,3};`

上面的代码中有定义数组:double[] scores=new double[5];思考数组中存储的元素是什么?
<font color='red'>双精度浮点数数组中的默认值为0.0，单精度浮点数数组中的默认值为0.0f。boolean类型数组默认元素为false。char类型数组中的默认
元素为"\u0000'，整形数组默认元素为0</font>
思考 char[] sexArr = {'M', 'F', 'O’}; 和 char[] sexArr = new char[]{'M','F,'0”};有什么区别?
<font color='red'>第一种方式只能在定义数组同时赋值时使用，第二种方式可以在定义数组时直接使用，也可以先定义数组，然后再赋值时使用</font>

### 修改数组

`int [] scores ={12,2,34,22};`

`scores[1]=79;`

### 数组拷贝

`System.arrayCopy(原数组，拷贝的开始位置，目标数组，存放的开始位置，拷贝的元素个数)`

### 数组扩容

数组扩容：第一个参数表示要扩容的数组  第二个参数表示，扩容后的新的数组长度.

作用：新建一个数组，并将原数组的所有元素拷贝到新的数组中。

`String[]  newArr = Arrays.copy0f(personArr,3)`

## 二维数组

### 数组排序

```Arrays.sort(数组名)；//将数组中的元素进行升序排列```

```Arrays.toString(数组名)；//将数组中的元素组装为一个字符串```

### 二分查找

```java
    public static void main(String[] args) {
      int[] numbers = {95,93,87,86,79,62,60,53};
      int target = 60;//要查找的目标元素
      int start = 0;
      int end =numbers.length-1;
      while (start<end) {
        int middle = (start + end ) / 2;
        if (numbers[middle]>60) {//说明目标元素在后半区间
          start = middle + 1;
        }else if (numbers[middle]  <  60 ) {
          end = middle - 1;
        }else{
          System.out.println("目标元素"+target+"位置"+middle);
          break;
        }
      }
      }
    
```

### 二维数组

```java
      //定义一个二维数组
      String[][] personInfos = new String[10][3];
      String[][] personInfos = new String[3][];
```

![image-20240731222048241](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240731222048241.png)

musicInfos.length 二维数组的本质是一维数组，所以长度为

### 三维数组

```java
public class demo {
//某学校一年级有三个班，第一个班10个人 第二个班 8人 ，第三个班7人
//现在要求从控制台输入这三个班学生的成绩和年龄，并计算出每个班的平均成绩和平均年龄，
    public static void main(String[] args) {
      double[][][] stuInfos = new double[3][][];
      stuInfos[0] = new double[10][2];
      stuInfos[0] = new double[8][2];
      stuInfos[0] = new double[7][2];
      Scanner sc =new Scanner(System.in);
      for (int i = 0; i < stuInfos.length; i++) {
        double[][] infos =stuInfos[i];
        for (int j = 0; j < infos.length; j++) {
          System.out.println("请输入年龄");
          int age = sc.nextInt();
          System.out.println("请输入成绩");
          double score = sc.nextDouble();
          infos[j]= new double[]{age,score};
        }
      }
      for (int i = 0; i < stuInfos.length; i++) {
        //查看每个班级
        double totalAge= 0,totalScore = 0;
        double[][] Infos = stuInfos[i];
        for (int j = 0; j < Infos[j].length; j++) {
          totalAge +=Infos[j][0];
          totalScore +=Infos[j][1];
        }
        double avgAge = totalAge / Infos.length;
        double avgScore = totalScore / Infos.length;
        System.out.println("");
      }
      }
    
}
```

## 阶段项目   五子棋

1.静态变量

public static 数据类型 变量名 = 变量值；

静态变量只能定义在类中，不能定义在方法中，静态变量可以在static修饰的方法中使用，也可以在非静态的方法中使用，主要解决在静态方法中不能访问的非静态变量，

静态变量是指在程序运行期间保持不变、存储在静态存储区的变量。静态变量在整个程序的生命周期中都存在，不会因为函数的调用结束而销毁。静态变量通常用关键字static进行声明，在函数内部声明的静态变量只会被初始化一次，并且默认初始化为0。静态变量的作用范围只限于定义该变量的源文件内，不能被其他源文件访问

2.静态方法

public static  返回值类型 方法名{}

列如 ：public static void main (string[] args){}  main主方法静态方法静态方法就相当于一个箱子，这个箱子中放的是成品的代码，要用到代码时，可以随时调用方法（箱子）。

## 类和对象

public class 类名{}

<font color='red'>特征+行为；</font>

```java
/**
 * 定义一个计算器类，计算器能够对两个数字进行加减乘除
 * 分析：
 * 计算机能够接受两个数字和一个运算符
 * 计算器能够进行运算
 */
public class Caculator {
    //特征
  public double number1;

  public double number2;

  public String operator;
    //行为

  public void calculate(){
    switch (operator) {
      case "+":
        System.out.println(number1+number2);
        break;
      case "-":
        System.out.println(number1-number2);
        break;
      case "*":
        System.out.println(number1*number2);
        break;
      case "/":
        System.out.println(number1/number2);
        break;
      default:
        break;
    }
  }

}
```

### 类图

类图用于描述类的结构

pubilc 修饰的属性和方法前需要使用“+”，private修饰的属性和方法前需要使用“-”

![image-20240803233514259](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240803233514259.png)

### 类和对象的关系

类是描述多个事务的共有特征和行为的一个抽象体，而对象是以恶搞具体的事物，每个属性和行为都是具体的，类是对象的集合体。类是用来构建具体的对象的.

```java
类名 对象名 = new 类名();
对象名.属性名 = 属性值;

public class Persontest {
  //这里被称为对象名，跟数组名一样，本质都是变量。只是在面向对象中称之为对象名
  public static void main(String[] args) {
    Person p = new Person();//构建了一个具体的人
    p.name="xiao";
    p.sex = "男";
    p.age = "12";
  }
}

```

### 成员变量和成员方法

***成员变量***

在类中的定义的变量就是成员变量，成员变量顾名思义就是属于成员（具体对象，具体的实物）的，成员变量**有初始值。**

***访问成员变量***

对象名.属性名;

***访问成员方法***

对象名.成员方法（[参数列表]）;

***局部变量***

局部变量是在<font color='red'>方法内部</font>定义的变量，局部变量**没有初始值**，因此，局部变量在使用之前必须完成初始化操作。

**局部变量与成员变量命名相同时，局部变量的优先级更高。**

***this关键字***

同名时，又想使用成员变量，此时需要this关键字来解决，this关键字表示的是当前对象（使用new创建出来的对象）

### ***构造方法***

构造方法是一种特殊方法，主要用于创建对象以及完成对象的**属性初始化操作**，构造方法不能被对象调用。

`//[]中内容可有可无`

`访问修饰符  类名([参数列表]){`

`}`public car（）{}

## 方法带参

### ***构造方法带参***

```java
public class ComputerTest {

  public static void main(String[] args) {
    Computer p = new Computer();
    p.brand="联想";
    p.type = "T430";
    p.price = "3000";
    Computer p1 = new Computer();
    p1.brand="联想";
    p1.type = "w203";
    p1.price = "8000";
  }
}
```

每建立一个对象，都会出现重复为对象的属性赋值，这样造成大量的冗余代码，可以使用带参构造方法进行构造。

```
访问修饰符 类名(数据类型1 变量名1，数据雷星2 变量名2....)
```

<font color = "red">优化结果</font>

```java
public class Computer{
  public String brand;
  public String type;
  public double price;//成员变量
//如果一个类中没有定义任何构造方法，那么编译器会自动为这个类添加一个默认的无参构造方法
//如果一个类中定义了构造方法，那么编译器不会为这个类添加默认的无参构造方法

//如果在一个类之后已经定义了带参数的构造方法，此时还想使用无参构造方法，南无必须将无参构造方法也定义出来
public Computer(){}
//此时在类中已经定义了带参数的构造方法,那么编译器不会为这个类添加默认的无参构造方法。

//构造方法的()表示的是参数列表，这里的列表是形式参数

public Computer(String brand, String type,double price){
  this.brand=brand;
  this.type=type;
  this.price=price;
}
}

public class ComputerTest {
  //这里被称为对象名，跟数组名一样，本质都是变量。只是在面向对象中称之为对象名
  public static void main(String[] args) {
    Computer p = new Computer();//构建了一个具体的人
    p.brand="联想";
    p.type = "T430";
    p.price = 3000;
    //调用带参构造方法创建对象是，必须注意参数列表传递的值要与构造方法定义时的形式列表一一对应
    Computer p2 = new Computer(brand:"",type "";price);
    
    Computer p1 = new Computer();//构建了一个具体的人
    p1.brand="联想";
    p1.type = "w203";
    p1.price = 8000;
    
    
  }
}
```

### ***方法带参***

```java
访问修饰符 返回值类型 方法名(数据类型1 变量1，数据类型2 变量2){
   [renturn 返回值] //如果一个方法的返回值类型不为void，那么选择结构中应该为每一种类型都踢狗一个返回值
}
//带参方法调用
对象名.方法名(实参1，实参2)

public void calculate(int number1,int number2,String operator){
  switch (operator) {
    case "+":return number1+number2;
    case "-":return number1-number2;
    case "*":return number1*number2;
    case "/":return number1/number2;
    default: return 0;
  }
}
Calculate c  = new Calculate;
int total = c.calculate(number1:0,number2:2,operator:"*")
```

### ***对象数组***

```java
//使用对象数组存储学生选择的五门补修课（编号，名称，学分）
public class Course{
  public String number;
  public String name;
  public double score;
  public Course(String number,String name,double score){
    this.name=name;
    this.number=number;
    this.score=score;
  }

}
public class Coursetest {
  public static void main(String[] args) {
      Course[] courses = new Course[5];
      courses[0]  = new Course("c0001", "java", 5)
      courses[1]  = new Course("c0002", java, 5)
      courses[2]  = new Course("c0003", java, 5)
      courses[3]  = new Course("c0004", java, 5)
      courses[4]  = new Course("c0005", java, 5)
  }
}

```

### ***引用数据类型作为方法参数***

**案例场景**
某手机专卖店有100个手机展架，售货员现在依次向展架上摆放手机。请使用面向对象的设计思想描述这一过程。(手机有品牌，型号和价格)
**分析：**
a.这一过程设计到的对象有两个，一个是手机，一个是售货员。因此我们需要为这两个对象构建类

b.摆放手机是售货员的一个行为，因此需要使用方法来描述
c.100个手机展架放的都是手机，因此需要使用对象数组来存储

```java
public class Mobile {
    public String brand;
    public String type;
    public double price;

    public Mobile(String brand,String type,double price){
        this.type=type;
        this.brand=brand;
        this.price=price;
    }

}
public class Saler {
    public Mobile[] mobiles =new Mobile[100];
    public void playMobile(Mobile mobile){
        for (int i = 0; i < mobiles.length; i++) {
            if(mobiles[i] == null){
               mobiles[i] = mobile;
                break;
            }
        }
    }
}
public class Slaertest{
    public static void main(String[] args) {
        Saler saler = new Saler();
        //调用售货员放手机
        Saler.playMobile(new Mobile("xiaomi", "10", 3000));
    }//new Mobile("xiaomi", "10", 3000)构造一个新手机
}
```

### ***数组作为方法参数及参数传递规则***



甲: 80,72,85,67,50,76,95,49

乙:77,90,92,89,67,94

丙:99,87,95,93,88,78,85
现要求将每个班的成绩从高到低依次排列。

```java
public class ArrySort {
    public static void main(String[] args) {
        int[]arr1 = {80,72,85,67,50,76,95,49};
        int[]arr2 = {77,90,92,89,67,94};
        int[]arr3 = {99,87,95,93,88,78,85};
        sortDesc(arr1);
    }
}

public static void sortDesc(int[] arr){
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length-1; j++) {
             if (arr[j] < arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
             }
        }
    }
}
```

### 方法重载

在同一个类中，方法名相同，参数列表不同的多个方法构成的方法重载.如下

```java
public class  Calculator {
    public int sum(int a,int b){
        return a+b;
    }
    public int sum(int a, int b,int c){
        return 1;
    }
    
}
```

***误区***

```java
public class  Calculator {
    public void show(
       System.out.println("NIce")
    }
    public int show(){
        return 1;
    }
    
}
//不属于，因为方法名和参数列表都一样吗，在同一个类中，不可能出现这样的方法定义
        
        
public class  Calculator {
    public int sum(int a,int b){
        return a+b;
    }
    public int sum(int c, int d){
        return 1;
    }
    
}
    //参数名命名方式不同，但本质是一样的参数，也不属于方法重载

```

## 封装

封装是将类的部分属性和方法隐藏起来，不允许外部程序直接访问。只能通过该类提供的公开的方法来访问类中定义的属性和方法。

***如何使用封装***

<font color = "red">修改属性的可见性:将类中定义的所有属性全部修改为private修饰</font>

```java
public class Person {
    private String name;

    private  int age;

    private  String secret;

    public Person (String name,int age,String secret){
        this.age=age;
        this.name=name;
        this.secret=secret;
    }

}
```

<font color = "red">创建公开的getter/setter方法：用于读取/修改属性值</font>

```java
public class Person {
    private String name;

    private  int age;

    private  String secret;

    public Person (String name,int age,String secret){
        this.age=age;
        this.name=name;
        this.secret=secret;
    }

public String  getName(){
    return name;
}
public void setName(String name){
    this.name=name;
}
}
```

<font color = 'red'>在getter/和setter方法中加入控制语句：用与对属性值的合法校验</font>

```java
public void setAge(){
    if(age < 0){
        System.out.println("你输入的年龄不合法");
    }else{
        this.age = age;
    }
}
```

***为什么使用封装***

a.封装提高了代码的重用性。因为封装会提供对外访问的公开的方法，而方法可以重用，因此封装提高了代码的重用性。

b.封装提高了代码的可维护性。

比如:年龄在设计时只考虑到了负数的情况，没有考虑实际生活中的情况，人的年龄一般都不会超过200岁，因此还需要加上一层验证

### 包

***什么是包***

包是java中的一个专业词汇，包的本质是文件夹

***为什么要使用包***

因为包可以对我们编写出来的类进行分类，可以防止命名冲突

***如何创建***

```java
package 包名;
```

包名的命名规范:
包名一般都是由小写字母和数字组成，每个包之间使用∵'隔开，换言之，每出现一个'.'，就是一个包

包名一般都含有前缀。比如个人/组织通常都是org.姓名，公司通常都是com.公司名称简写或者cn.公司名称简写

<font color="red">如果一个类中有包的定义，那么这个类的第一行有效代码一定是包的定义</font>

***如何引入***

```java
import 包名.类名;
```

```java
//类的全限定名 ： 包名+“."+类名

```

![image-20240811142155159](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240811142155159.png)

### 访问修饰符

访问修饰符就是控制访问权限的修饰符号。

***类的访问修饰符***

类的访问修饰符只有两种：public修饰符和默认修饰符（不写修饰符就是默认）

<font color = 'red'>public修饰符修饰类表示类可以公开访问，默认修饰符修饰类表示该类只能在同一个包中可以进行访问</font>>

```java
package cn.lxy,chapter11
//使用默认修饰符修饰类是，该类只能在同一个包的其他类中使用
class Teacher{
    
}
```

***类成员访问修饰符***

![image-20240811144221518](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240811144221518.png)

protected：父类中protected修饰的成员可以被同一包中其他类访问，位于不同包中的子类也可以访问（其他包中的子类，且只能在此子类中访问(使用 this· 访问)，在其他类中创建此子类实例也访问不了）。

### static修饰符

***static修饰符应用的范围***

static修饰符只能用来修饰类中定义的成员变量、成员方法、代码以及内部类。

***static修饰成员变量***

static修饰的成员变量称之为类变量，属于该类所有成员共享

<font color = 'red'>如果类变量是公开的，那么可以使用类名.变量名直接访问该变量</font>

***static修饰代码块***

![image-20240811185152074](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240811185152074.png)

在Java中，静态[代码块](https://so.csdn.net/so/search?q=代码块&spm=1001.2101.3001.7020)（Static Block）是类加载时自动执行的代码块。它属于类，而不是类的任何实例。静态代码块在类被JVM加载到内存时执行，并且只执行一次。无论创建多少个类的实例，静态代码块只会被执行一次。

***static内存***

## 继承

继承是从已有的类中派生出新的类，新的类能吸收已有类的数据属性和行为，并能扩展新的能力。（避免创建重复类时产生重复的冗余代码）

```java
public class 子类名 extends 父类名{
    
}
```

***继承的属性和方法***

不论子类在什么包中，子类会继承父类中所有公开的和受保护的成员（包括字段和方法）。如果子类和父类在同一个包中，子类也会继承父类中受包保护的成员。

子类不会继承父类中定义的私有成员，尽管如此，父类提供的公开的或者受保护的访问字段，也可以在子类中使用。

<font color ='red'>如果一个对象赋值给其父类的引用，此时想要调用该对象的特有的方法，需要进行强制类型转换</font>

### 方法重写

如果我们**在子类中，创建了一个与父类中名称、返回值类型、参数列表都完全相同的方法，只是方法体的功能实现不同**，这种方式被称为**方法重写(override)**，或者叫**方法覆盖**。当父类中的方法无法满足子类的需求，或者子类需要有特殊功能时，就可以进行方法重写。

**基本要求**
我们在进行方法重写时，需要遵循以下几点要求：

● 父类的成员方法只能被它的子类重写，即不能继承一个方法，就不能重写这个方法；

● 被final修饰的方法不能被重写；

● 被static修饰的方法不能被重写，但可以再次声明；

● 构造方法不能被重写；

● 子类和父类在同一个包中时，子类可以重写父类中除了被private和final修饰的其他所有方法；

● 子类和父类不在同一个包中时，子类只能重写父类被public和protected修饰的非final方法；

● 重写的方法建议使用@Override注解来标识。（该注解告诉编译器，这是一个重写的方法，编译器回去检测父类中是否存在这样的方法，如果不存在，将生成一个错误）

●子类重写父类方法时，返回值类型可以是父类返回值类型的子类

***案例***

几何图形都有面积和周长，不同的几何图形，面积和周长的算法也不一样。矩形有长和宽，通过长和宽能够计算矩形的面积和周长;圆有半径，通过半径可以计算圆的面积和周长。请使用继承相关的知识完成程序设计。
分析
a.几何图形包含了矩形和圆。几何图形都有面积和周长，因此几何图形可以定义为一个类，里面包含了面积和周长的计算方法

b.矩形是一种几何图形。矩形有长和宽，可以根据长和宽来计算面积和周长
c.圆是一种几何图形。圆有半径，可以根据半径来计算面积和周长

```java
package com.cyx.inheritance;

public class Shape {
    /**
     * 计算周长
     * @return
     */
    public Number calculatePerimeter(){
        return 0;
    }
    /**
     * 计算面积
     */
    public Number calculateArea(){
    return 0;
}
}
package com.cyx.inheritance.shape;

/**
 * 矩形
 */
import com.cyx.inheritance.Shape;

public class Rectangle extends Shape{
    private int width;

    private int length;
    
    public Rectangle(int width,int length){
        this.length = length;
        this.width = width;
    }
    @Override
    public Integer calculatePerimeter(){
        return (width + length)*2;
    }

    @Override
    public Integer calculateArea(){
        return width*length;
    }

}

package com.cyx.inheritance.shape;

import com.cyx.inheritance.Shape;

public class Circle extends Shape {

    private int radius;

    public Circle(int radius) {
        this.radius = radius;
    }
    @Override
    public Double calculateArea() {
        
        return Math.PI * radius *radius;
    }
    @Override
    public Double calculatePerimeter() {
        
        reuturn 2*Math.PI*radius;
    }
}

```

<font color="red">重写方法的访问修饰符的级别不能降低比如原先是public 重写时不能是private</font>

### super关键字

如果子类的构造方法没有明确调用父类的构造方法，Java编译器会自动插入一个父类无参构造，你将得到一个编译时错误，Object类有个无参构造，因此，如果Object类是该类的唯一父类，这就没有问题。

示例一：子类和父类中都没有定义构造方法

```java
package com.cyx.inheritance;

public class Father {

    String name;

    public String sex;
    public Father(){
        super();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}


package com.cyx.inheritance;

public class Child extends Father{
//如果一个类中没有定义构造方法，那么编译器会给该类插入一个无参的构造方法
    public Child(){
        super();//如果子类没有显示的调用父类的构造方法，那么编译器会自动插入一个父类无参结构的调用
    }
    public void show(){
        //本类中未定义name变量，但是可以使用，说明name变量是从父类中继承的
        System.out.println(name);
        System.out.println(sex);
    }
}


```

示例二：子类中有定义构造方法，父类没有定义构造方法

```java
package com.cyx.inheritance;

public class Child extends Father{
//如果一个类中没有定义构造方法，那么编译器会给该类插入一个无参的构造方法
    public Child(){
        super();//如果子类没有显示的调用父类的构造方法，那么编译器会自动插入一个父类无参结构的调用
    }
    public Child(String name){
        super();
        this.name=name;//子类中定义一个带参的构造方法，在其中也没有调用父类方法，但系统还是会插入一个无参调用的方法
    }
    public void show(){
        //本类中未定义name变量，但是可以使用，说明name变量是从父类中继承的
        System.out.println(name);
        System.out.println(sex);
    }
}

```

示例三：子类和父类中都有定义构造方法

```java
package com.cyx.inheritance;

public class Father {

    String name;

    public String sex;
    public Father(String name,String sex){
        this.name=name;
        this.sex=sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}

package com.cyx.inheritance;

public class Child extends Father{
//如果一个类中没有定义构造方法，那么编译器会给该类插入一个无参的构造方法

    public Child(String name,String sex){
        super(name, sex);
        //如果父类中定义了带参构造，并且没有定义无参构造，那么必须徐在子类的构造方法中
        //显示的调用父类的带参构造
    }
    public void show(){
        //本类中未定义name变量，但是可以使用，说明name变量是从父类中继承的
        System.out.println(name);
        System.out.println(sex);
    }
}


```

<font color ="red">使用super调用父类的构造方法时，必须为这个构造方法中的第一语句，也就是说必须在第一行，不能在后面</font>

***如果你的方法重写了父类的方法之一，则可以通过使用关键字super来调用父类中被重写的方法。你也可以使用super来引用隐藏字段***

![image-20240815222549069](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240815222549069.png)

***如果子类中的静态方法与父类中的静态方法具有相同的签名，是否属于方法重写***？

不属于，因为静态方法属于类方法，跟对象无关，调用时只看对象的数据类型。StaticFather f = new StaticChild()；中的StaticFather数据类型

```java
package com.cyx.inheritance.p4;

public class StaticFather {

    public static void show(){
        System.out.println("这是父类的静态方法");
    }
}

package com.cyx.inheritance.p4;

public class StaticChild extends StaticFather {
    public static void show(){
        System.out.println("这是子类的静态方法");
    }
}
package com.cyx.inheritance.p4;

public class StaticTest {

    public static void main(String[] args) {
        StaticFather f = new StaticChild();
        f.show();
    }
}
//运行测试后显示的是父类

```

### 练习：用继承完成

动物都有名称，年龄，都需要吃东西、睡觉。狗是一种动物，也有名称和年龄，狗吃的是骨头，睡觉时是趴着睡。马也是一种动物，也有名称和年龄，马吃的是草，睡觉站着睡觉。

```java
package com.cyx.inheritance.animal;

public class Animal {

    protected String name;
    
    protected int age;

    public Animal(String name,int age){
        this.name = name;
        this.age = age;
    }
    protected void eat(){

        System.out.println("动物吃饭");
    }
    protected void sleep(){
        System.out.println("动物睡觉");
    }
}


package com.cyx.inheritance.animal;

public class DOg extends Animal {

    public DOg(String name, int age) { //子类的访问字符比父类高
        super(name, age);//调用父类的构造方法，不写的话调用的是无参构造
    }
    @Override
    public void eat(){
        System.out.println(age +"年的"+name+"在吃骨头");
    }
    @Override
    public void sleep() {
        System.out.println(age +"年的"+name+"在睡觉");
    }
}


package com.cyx.inheritance.animal;

public class Horse extends Animal{

    public Horse(String name, int age) {
        super(name, age);
        
    }

    @Override
    public void eat(){
        System.out.println(age +"年的"+name+"在吃草");
    }
    @Override
    public void sleep() {
        System.out.println(age +"年的"+name+"在站着睡觉");
    }
}

```

### final修饰符

应用范围：final修饰符应该使用在类、变量以及方法上

**final修饰类**

如果一个类被final修饰，表示这个类是最终的类，即该类不能被继承。

```java
pubilc final class FinlClass(){//表示不能被继承
    
}
```

**final修饰方法**

不能被子类重写

**final修饰变量**

final修饰变量的时候，变量必须在对象构建的时完成初始化赋值操作，不能被更改，final修饰的变量称为常量。

```java
package com;

public class FinalVariable {
//final修饰的变量一定要在对象创建时完成赋值操作，final修饰的变量称为常量
//不可被更改
    private final int number;
    //staic final修饰的变量就是静态常量
    public static final String COUNTRY = "中国"
    public FinalVariable(){
        this.number=10;
    }
}

```

## 抽象类和接口

### 回顾继承

**1.子类能够继承父类中的哪些成员**

  在任何情况下，子类可以继承父类中的公开的(public修饰)、受保护的成员。在同一个包中，子类还可以继承父类中使用默认修饰符修饰的成员。因为构造方法不是类的成员，因此不能够被继承。

**2.方法重写的规则**

  方法重写发生在具有继承关系的子类中，进行方法重写时，

子类中重写的方法必须与父类中定义的方法具有相同的方法名和参数列表

返回值类型可以与父类中被重写的方法的返回值类型一致，也可以是父类中被重写的方法的返回值类型的子类（协变返回类型)。

子类中重写方法的访问修饰符级别不能比父类中被重写的方法的访问修饰符级别低。

**3.super关键字的使用**

a. super用来调用父类中的成员:主要是为了区分子类与父类有相同的成员
b.super 用来调用父类的构造方法，必须是该构造方法的第一条语句

```java
public calss Father{
    protected String name;
    public void show(){
        System.out.println("")
    }
}
public class Child extends Father{
    private String name;
    @Override
    public void show(){
        System.out.println("Child")
    }
    public void test(){
        this.show();//调用子类的方法
        super.show();//调用父类的方法
        System.out.println(this.name)//打印子类中的name属性值
        System.out.println("super.name")
    }
}
```

### 抽象类

抽象类是被声明为抽象的类，他可能包含也可能不包含抽象方法。抽象类**不能被实例化**（Animal p1 =new Animal 错误），但是可以被子类化（也就是可以被继承）

**抽象类定义语法**

```java
public abstract class 类名{
    //定义一个抽象类
}
```

**抽象方法定义语法**

```java
访问修饰符 abstratct 返回值类型 方法名(参数列表)；//如果要做一件事情，但不知道具体怎么去做这件事情
```

**抽象类应用场景**

一般来说，描述抽象的实物就需要抽象类。比如说动物、设备、几何图形。

```java
public abstract classs Animal{
    public abstract void eat();//动物能吃东西，但不知道怎么吃
}


public class pandas extends Animal{
    @Override
    public void eat(){
        System.out.println()
    }
}
```

<font color= "red">如果一个类继承于一个抽象类，那么该类必须实现这个抽象类中的所有抽象方法。否则，该类必须定义为抽象类</font>

抽象类不一定有抽象方法，但是有抽象方法的一定是抽象类

```java
public abstract class Animal {
//内部空，可以没有抽象方法
}



public abstract class Animal {
    public abstract void eat();//有抽象方法的一定是抽象类
}

```

### 接口

在软件工程中，软件与软件的交互很重要，这就需要一个约定。每个程序员都应该能够编写实现这样的约定。接口就是对约定的描述。

在java中，接口是类似于类的引用类型，它只能包含常量、方法签名、默认方法、静态方法和嵌套类型。方法主体仅适用于默认方法和静态方法。接口无法实例化(new一个对象)，他们只能又类实现或者其他接口扩展。

```java
[public]interface 接口名{
    [public static final]数据类型 变量名 = 变量的值;//接口中定义变量，该变量是静态常量，在定义时必须赋值
    返回值类型 方法名([参数列表]);//定义接口方法
    default 返回值类型 方法名([参数列表]){//接口中定义的默认方法
        [return 返回值;]
    }
    static 返回值类型 方法名([参数列表]){//接口中定义的静态方法
        [return 返回值;]
    }
    private 返回值类型 方法名([参数列表]){//接口中定义的私有方法
        [return 返回值;]
    }
}
```

**接口继承**

```java
[public] interface 接口名 extends 接口1,接口2,接口n{
    
}
```

<font color= "red">注意：接口可以多继承，这是java中唯一可以使用多继承的地方。接口包含的变量都是静态常量，接口中包含的方法签名都是公开的抽象方法。接口编译完成后也会生成相应的class文件</font>

**接口实现**

实现接口语法

```java
访问修饰符 class 类名 implements 接口1,接口2...接口n{
    
}
```

实现接口的类必须实现接口中声明的所有方法

**接口应用场景**

一般来说，定义规则，定义约定时使用接口

```java
package com.cyx.inheritance.usb;

public interface USB {

    void service();//接口服务
}


package com.cyx.inheritance;

import com.cyx.inheritance.usb.USB;

public class UDisk implements USB{

    @Override
    public void service() {
        System.out.println("优盘已经介入");
    }

}


```

电脑拥有usb接口

```java
package com.cyx.inheritance.usb;

public class Computer {

    private USB[] usbArr= new USB[4];//一台电脑四个usb接口

    public void insertUsb(int index,USB usb){

        if (index < 0 || index >= usbArr.length) {//插入usb接口
            System.out.println("插入错误");
        }else{
            usbArr[index] = usb;
        }
    }
}

```

### **练习**

打印机对外暴露有墨盒(颜色)和纸张(大小)接口，墨盒生产商按照墨盒接口的约定生产黑白墨盒和彩色墨盒，纸张生产商按照纸张接口的约定生产 A2 纸和 A4纸张。

```java
package com.cyx.printer;
/**
 * 墨盒
 */
public interface InkBox {
    String getColor();//获取颜色
}


package com.cyx.printer;
public interface Paper {
    String getSize();
//获取纸张大小
}

package com.cyx.printer;

public class BlackInkbox  implements InkBox{

    @Override
    public String getColor() {
        return "黑白";
    }

}

package com.cyx.printer;

public class ColorInBox implements InkBox{

    @Override
    public String getColor() {
      return "彩色";
    }

}

package com.cyx.printer;

public class A4paper implements Paper{

    @Override
    public String getSize() {
        return "A4";
    }

}

package com.cyx.printer;

public class A4paper implements Paper{

    @Override
    public String getSize() {
        return "A4";
    }

}

package com.cyx.printer;
/**
 * 打印机
 */
public class Printer {

    private InkBox inkbox;

    private Paper paper;

    public Printer(){

    }//无参构造

    public Printer(InkBox inkbox,Paper paper){
        this.inkbox = inkbox;
        this.paper = paper;
    }
    public void print(){
        //print format 格式化打印不会换行
        System.out.printf("打印机使用%s墨盒在%s纸张上打印\n",InkBox.getColor(),Paper.getSize());
    }

    public InkBox getInkbox() {
        return inkbox;
    }

    public void setInkbox(InkBox inkbox) {
        this.inkbox = inkbox;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }
    
}

```

![image-20240822150032279](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240822150032279.png)

### 抽象类和接口的区别

1.抽象类拥有构造方法，而接口没有构造方法

2.抽象类可以定义成员变量、静态变量、静态常量，而接口中只能定义公开的静态常量

3.抽象类中的方法可以有受保护、默认的方法，而接口中的方法都是公开的(JDK9 中可以定义的私有方法除外)

4.抽象类主要应用在对于抽象事物的描述，而接口主要应用在对于约定、规则的描述

5.抽象类只能够被单继承，而接口可以多继承

## 多态

**  多态就是事物的多种形态，一个对象在不同条件下所表现的不同形式**

例如：打印机分为黑白打印机和彩色打印机，在黑白打印机情况下打出来为黑白，在彩色打印机情况下打印出来为彩色

### 多态

**编译时多态**

方法重载在编译时就已经确定如何调用，因此方法重载属于编译时多态

```java
package com.cyx.polymorphism;

public class Calculator {
    public double Calculator(double a,double b){
        return a+b;
    }
    public int Calculator(int a,int b){
        return a+b;
    }
}
//因为数据类型固定，输入不同的数据类型调用不同的方法。在编译时就已经确定如何调用，因此方法重载属于编译时多态
```

![image-20240823010621879](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823010621879.png)

**运行时多态**

方法重写属于运行时多态

```
public class Father {

	public void say() {
		System.out.println("我是爸爸");
	}

}
public class Sun extends Father{
    @override
	public void say() {
		System.out.println("我是儿子");
	}
	//变量f的类型是Father
	public static void main(String[] args) {
		Father f = new Sun();
	    f.say();
		//f调用show()时，不会调用Father定义的方法而是sun的方法
	}

}



我是儿子
```

案例

王者荣耀中英雄都有名字，都会攻击，物理英雄会物理攻击，法术英雄会法术攻击。

```java
package com.cyx.hero;
//一英雄会攻击但是不知道会怎么攻击，不是具体的英雄，没有进行分类
//所以是抽象
public abstract class  Hero {

    protected String name;

    public Hero(String name){
        this.name = name;
    }
    //抽象方法，也不知道如何攻击
    public abstract void attack();
}


package com.cyx.hero;
/**
 * 物理英雄
 */
public class PhysicalHero extends Hero{

    public PhysicalHero(String name) {
        super(name);
    }

    @Override
    public void attack() {
        System.out.println("物理攻击");
    }

}

package com.cyx.hero;

public class spellHero extends Hero{

    public spellHero(String name) {
        super(name);
        
    }

    @Override
    public void attack() {
        System.out.println("法术攻击");
    }

}

```

#### 案例

![image-20240823150200089](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823150200089.png)

![image-20240823145943237](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823145943237.png)

![image-20240823150712318](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823150712318.png)

思考以上代码中人类的设计出现了什么问题？

动物园中现在又要引用一种狮子,动物管理员又要多写一种方法。

如果动物园大量引入动物，那么这个动物园类就得添加多个相应的喂食方法。这很显然存在设计上的缺陷，可以使用多态来优化

![image-20240823151754188](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823151754188.png)

### ![image-20240823151821409](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823151821409.png)instanceof 运算符

instanceof本身意思表示的是检测某个对象是否是某个类型的一个实例。主要应用在类型的强制转换（向下转）上面。在使用强制类型转换时，如果使用不正确，在运行时会报错。而instanceof运算符对转换的目标类型进行检测，如果是，则进行强制转换。这样可以保证程序的正常运行。
语法

```java
对象名 instanceof 类名; //表示检测对象是否是指定类型的一个实例。返回值类型为boolean类型
```


示例

![image-20240823181807876](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823181807876.png)

![image-20240823181834589](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823181834589.png)

![image-20240823182032012](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823182032012.png)

### 练习

某商城有电视机、电风扇、空调等电器设备展示。现有质检人员对这些电器设备一一检测，如果是电视机，就播放视频来检测;如果是电风扇，就启动电风扇;如果空调，就进行制冷操作
分析:
设备:展示
电视机、电风扇、空调是电器设备:展示

```java
package com.cyx.device;
/**
 * 设备
 */
public  abstract class Device {
    public abstract void show();

}

package com.cyx.device;

public class ElectoronicFan extends Device{

    @Override
    public void show() {
       System.out.println("电风扇");
    }
    //特有的方法
    public void  start(){
        System.out.println("启动");
    }

}

package com.cyx.device;

public class TV extends Device{

    @Override
    public void show() {
        System.out.println("电视");
    }

    public void play(){
        System.out.println("播放");
    }

}

package com.cyx.device;

public class Airconditioning extends Device{

    @Override
    public void show() {
        System.out.println("空调");
    }
    
    public void Airplay(){
        System.out.println("制冷");
    }
}

package com.cyx.device;
/**
 * 质检
 */
public class Qualiterperson {
    public void test(Device device){
        device.show();
        if(device instanceof TV)
        ((TV) device).play();
        else if(device instanceof ElectoronicFan)
        ((ElectoronicFan) device).start();
        else if(device instanceof Airconditioning)
        ((Airconditioning) device).Airplay();;
        

    }

}


```

![image-20240823203918542](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823203918542.png)

![image-20240823204036386](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240823204036386.png)

### Object类常用方法

Object类中定义的方法大多数都是属于native方法，native表示的是本地方法，实现方式是在C++中。

#### **getclass(**)

```java
public final class getclass();
//getClass() 返回此 Object 的运行时类,
```

全限定名：包+类名；

![image-20240824172706968](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240824172706968.png)

#### hashCode()

```java
public int hashCode()
    
 //hashCode()返回值是对象的哈希码，即对象的内存地址
    
 //根据定义，如果两个对象相等，则他们的哈希码也必须相等。如果equal()方法，则会更改两个对象的相等方式，并且object的hashCode()实现不再有效。
    
    因此，如果重写equal()方法，则还必须重写hashCode()方法
```

**Object类中的hashcode()方法返回的就是对象的内存地址。一旦重写hashCode()方法，那么0biect类中的hashCode()方法就是失效，此时的hashcode方法返回的值不再是内存地址。根据定义，如果两个对象相等，则它们的哈希码也必须相等，反之则不然。**

![image-20240824201746419](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240824201746419.png)

<font color = "red"></font>

#### equals()

equals()方法比较两个对象是否相等，如果相等则返回true。 object类中提供的equals()方法使用身份运算符(==)来确定两个对象是否相等。 对于原始数据类型，这将给出正确的结果。 但是，对于对象，则不是。 object提供的equals()方法测试对象引用是否相等，即所比较的对象是否完全相同。

要测试两个对象在等效性上是否相等(包含相同的信息)，必须重写equals()方法。

```java
package com.cyx.polymorphism.hashcode;

public class student {

    private String name;

    private int age;

    public student(String name,int age){
        this.age = age;
        this.name = name;
    }
    //如果两个对象相等，那他们的哈希码就一定相等
    //如果重写了equals方法，那么一定要重写hashCode方法。因为不重写hashCode方法就会调用0bject类中的hashcode方法，得到的是内存地址。不同对象的内存地址是不一致的。但是equals方法重写后，比较的不是内存地址，而是对象的内部信息，这样就会造成多个不同的对象相等但却拥有不同的哈希码
    //1.比较内存地址
    //2.检测是否是同一类型
    //3.检测属性是否相同
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }//比较类的定义是否一一致
        if (this.getClass() != o.getClass()) {
            return false;
        }
        //类的定义一致，那么对象o就可以被强制转换为student
        student other = (student) o;
        return this.name.equals(other.name)&& this.age == other.age;
    }
    
    //hashcode重写后，返回的就不是内存地址
    @Override
    public int hashCode() {
        return name.hashCode()+age;
    }
}

package com.cyx.polymorphism.hashcode;

public class studentTest {

    public static void main(String[] args) {
        student s1 =new student("张三", 1);
        student s2 =new student("张三", 1);
        boolean result = s1.equals(s2);
        System.out.println(result);
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());
    }
}

 

运行结果:true
true
774890
774890
```

<font color = "red">根据定义，如果两个对象相等，则它们的哈希码也必须相等，反之则不然。</font>

<font color = "red">重写了equals方法，就需要重写hashCode方法，才能满足上面的结论</font>

<font color = "blue">面试题:请描述 == 和 equals 方法的区别</font>
基本数据类型使用 == 比较的就是两个数据的字面量是否相等。引用数据类型使用 == 比较的是内存地址。

equals方法来自0bject类，本身实现使用的就是 ==，此时它们之间没有区别。但是Object类中的equals方法可能被重写，此时比较就需要看重写逻辑来进行。

#### torString()

toString 方法是Java中的一个重要方法，用于返回对象的字符串表示形式。它的主要作用是将对象转换为可打印的字符串，以便于调试、日志记录和用户友好的输出。具体来说，toString 方法有以下作用：

**默认的toString方法：** 如果您的类没有显式覆盖（重写）toString 方法，它将继承自Object类中的默认实现。默认的toString 方法返回一个包含类名和哈希码的字符串，例如：“ClassName@hashCode”。这种默认行为对于调试和日志记录来说通常不是很有用，因为它没有提供对象的实际信息。

**自定义的toString方法：** 通过在您的类中重写toString 方法，您可以自定义对象的字符串表示形式。这使得您可以返回对象的实际属性值或其他相关信息，以便更容易地理解和调试代码。

```java
    @Override
    public String toString() {
        return name + "\t" + age;
    }
```

#### finalize()

```java
//object类提供了一个回调方法finalize()，当该对象变为垃圾时可以在该对象上调用该方法。 object类的finalize()实现不执行任何操作-你可以覆盖finalize()进行清理，例如释放资源。
```

![image-20240825232320683](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240825232320683.png)

![image-20240825233300928](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240825233300928.png)





## 异常

异常是在程序执行期间发生的事情，该事件中断了程序指令的正常流程

当方法内发生错误时，该方法将创建一个对象并将其交给运行时的系统，该对象称为异常对象，包含有关错误的信息，包含错误的类型和发生错误时程序的状态。创建异常对象并将其交给运行时系统称为抛出异常

<font color ="red">异常是由方法抛出</font>

```java

```

![image-20240826143712785](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240826143712785.png)

![image-20240826160942821](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240826160942821.png)

**Throwable**

是所有异常的父类

```java
public String getMessage();//获取异常发生的原因
public void printStackTrace();//打印异常在栈中的轨迹信息
```

**Error**

error是一种非常严重的错误，程序员不能通过编写解决

**Exception**

表示异常的意思，主要是程序员在编写代码时考虑不周导致的问题。分为运行时异常和检查时异常两大类。一旦程序出现这些异常，程序员应该出现这些异常，

**RuntimeException**

所有在运行时抛出的异常都属于

**检查异常**

编译器在编译时抛出的问题

### 异常处理

#### **throw抛出异常**

throw关键字只能在方法内部使用，throw关键字抛出异常表示自身并未对异常进行处理。

```java
throw 异常对象;//通常与if选择结构配合使用
```



![image-20240826171141327](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240826171141327.png)

![image-20240826171237983](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240826171237983.png)

#### throwvs 声明可能抛出的异常类型

throws关键字只能应用在**方法或者构造方法的定义**上对可能抛出的异常类型进行声明，自身不会对异常做出处理，由方法的调用者来处理。如果方法的调用者未处理，则异常将持续向上一级调用者抛出，直至main()方法为止，如果main()方法也未处理，那么程序可能因此终止

```java
访问修饰符 返回值类型 方法名(参数列表) throw 异常类型,异常类型2....异常类型n{
    
}




package com.cyx.exception;

import java.util.Scanner;

public class demo2 {

    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int number = getNumber();

        System.out.println(number);
    }
    /**
     * 
     * @return
     * @throws InputMismatchExceotion 执行该方法时可能会抛出InputMismatchExceotion
     */
    public static int getNumber() throws InputMismatchExceotion {
        System.out.println("请输入一个数字:");
        int number = sc.nextInt();
        return number;
    }
}

```

#### try-catch捕获异常

```java
try{
    //代码块
}catch(异常类型 异常对象名){
    
}
```

其中try表示尝试的意思，尝试执行try结构中的代码块，如果执行过程中抛出了异常，则交给catch语句块进行捕获操作。

```java
package com.cyx.exception;

import java.util.InputMismatchException;
import java.util.Scanner;

public class demo2 {

    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
     
        try {
            int number = getNumber();
            System.out.println(number);
            
        } catch (InputMismatchException e) {
            System.out.println(e.getClass().getName());
            e.printStackTrace();//打印异常轨迹
            System.out.println("出错");
        }
        System.out.println("发生错误时也能运行");
    }

    public static int getNumber() throws InputMismatchExceotion {
        System.out.println("请输入一个数字:");
        int number = sc.nextInt();
        return number;
    }
}

```

<font color = "red">如果一个问题可能抛出多个异常，该如何捕获？</font>

可以在try后面添加多个catch语句来分别对每一种异常进行处理

```java
package com.cyx.exception;

import java.util.InputMismatchException;
import java.util.Scanner;

public class demo2 {

    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
    } 
    public static int devided(){
        try {
            int number1 = getNumber();
            int number2 = getNumber();
            return number1 / number2;
        } catch (InputMismatchExceotion e) {
            System.out.println("只能输入数字");
        }catch(ArithmeticException e){

            System.out.println("除数不能为0");
        }
        return 0;
    }

    public static int getNumber() throws InputMismatchExceotion {
        System.out.println("请输入一个数字:");
        int number = sc.nextInt();
        return number;
    }
}

```

<font color = "red">当受用多个catch子句捕获异常时，如果捕获的多个异常对象的数据类型具有继承关系，那么父类异常不能放在前面</font>

因为如果放在前面会囊括了后面的类型，后面的语句就不会执行

#### fianlly语句

finally语句不能单独使用，必须与try语句或者 try-catch 结构配合使用，表示无论程序是否发生异常都会执行，主要用于释放资源。**但如果在try语句或者catch语句中存在系统退出的代码，则 finally 语句将得不到执行。**

```java
//系统退出的代码
System.exit(0);//系统正常退出 非0异常退出
System.exit(1);//系统异常退出
```



```java
try{
    
}finally{
    
}


//或者

try{
    
}catch(异常类型  异常对象名){
    
}finally{
    
}
```

```java
    public static void main(String[] args) {
        try {
            int number = getNumberFormArray(5);
            System.out.println(number);
        } finally{
            System.out.println("需要执行的代码");
        }
    }


    public static void main(String[] args) {
        try {
            int number = getNumberFormArray(5);
            System.out.println(number);
        } 
        catch(ArrayIndexOutOfBoundsException e){

            System.out.println("数组越界了");
        }
        finally{
            System.out.println("需要执行的代码");
        }
    }
```

#### 面试题：分析下列代码

![image-20240827142817119](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827142817119.png)

返回结果  10

finally执行的是number++，但是返回的却是临时存储的a值，没有变换仍然是10

### 自定义异常

**1.为什么要使用自定义异常**
在java中，异常的类型非常的多，要想使用这些异常，首先必须要熟悉它们。这无疑是一个巨大的工作量，很耗费时间。如果我们可以自定异常，则只需要熟悉RuntimeException、Exception和Throwable即可。这大大缩小了熟悉范围，自定义异常还可以帮助我们快速的定位问题。

自定义运行时异常的语法

```java
public class 类名 extends RuntimeException{}
```

自定义异常语法

```java
public class 类名 extends Exception{}
```

示例：在登陆时经常会看到提示：“用户不存在”或者"账号或密码错误"，请使用自定义异常来描述该场景

```java
package com.cyx.exception;
/**
 * 用户名不存在异常
 * 命名规范：场景描述+Exception
 */
public class UserNameNotFoundException extends Exception{

    public UserNameNotFoundException(){}
    public UserNameNotFoundException(String msg){
        super(msg);
    }
}
package com.cyx.exception;
/**
 * 账号或密码错误异常
 */
public class BadCredentialsException extends Exception{

    public BadCredentialsException(){}
    public BadCredentialsException(String msg){
        super(msg);
    }
}

package com.cyx.exception;

import java.util.Scanner;

public class Login {

    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("请输入账号");
        String username = sc.next();
        System.out.println("请输入密码");
        String password = sc.next();

        try {
            login(username, password);
        } catch (UserNameNotFoundException e) {
            
            e.printStackTrace();
        }
    }
    public static void login(String name,String password) throws UserNameNotFoundException{

        if ("admin".equals(username)) {
            if ("123456".equals(password)) {
                System.out.println("登陆成功");
            }else{
                throw new BadCredentialsException("账号或密码错误")
            }
        }else{
            throw new UserNameNotFoundException("账号不存在")
        }
    }
}

```



2.异常使用注意事项
a.运行时异常可以不处理。
b.如果父类抛出了多个异常,子类覆盖父类方法时,只能抛出相同的异常或者是该异常的子集。(与协变返回类型原理一致)
c.父类方法没有抛出异常，子类覆盖父类该方法时也不可抛出检查异常。此时子类产生该异常，只能捕获处理，不能声明抛出



![image-20240827152823998](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827152823998.png)