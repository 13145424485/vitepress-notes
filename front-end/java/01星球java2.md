##  字符串

### String

String 被声明为 final，因此它不可被继承。也不能被更改

**所有涉及到可能修改字符串内容的操作都是创建一个新对象，改变的是新对象**![image-20240827162426057](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827162426057.png)

#### **构造方法**

![image-20240827171300995](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827171300995.png)

```java
package com.cyx;

public class demo4 {

    public static void main(String[] args) {
        String s = "超用心在线教育";
        System.out.println(s);
        //这里会创建两个对象，一个是字面量会在常量池中创建一个对象
        //另一个是 new String("")构造方法创建出来的对象
        //如果以前（上面）创建过，那么常量池中会存在"超用心在线教育"，那么只会创建一个对象
        String s1 = new String("超用心在线教育")
        
        char[] values = {'a','b','c','d'};
        String s2 = new String(values);

        String s3 = new String(values,1,2);//切片
    
        //字节可以存储整数，字符也可以使用整数表示
        byte[] bytes = {23,45,43,64,26,87};
        String s4 = new String(bytes);
        
        String s5 = new String(bytes ,2,3);
    //两种方法都需要考虑数组下标越界的问题。
    }
}

```

#### 常用方法

**获取长度**

```java
public int length();//获取字符串的长度
```

![image-20240827202434494](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827202434494.png)

**字符串比较**

```java
public boolean equals (Object anObject);//比较两个字符串是否相同
public boolean equalsIgnoreCase (String anotherString);//忽略大小比较两个字符串是否相同
```

![image-20240827203459449](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827203459449.png)

true

true

false

true

**字符串大小写转换**

```java
public String toLowerCase();//转换为小写
public String toUpperCase();//转换为大写
```

![image-20240827234657792](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827234657792.png)

获取字符在字符串中的下标

```java
public int indexOf(int ch);//获取指定字符在字符串中第一次出现的下标
public int lastIndexOf(int ch);//获取指定字符在字符串中最后一次出现的下标
```

![image-20240827235325067](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240827235325067.png)

获取字符串中指定下标的字符

```java
public char charAt(int index)
    
 System.out.println(s.charAt(0))
```

**字符串截取**

```java
public String substring(int beginIndex);//从指定开始位置截取字符串，直到字符串的末尾
public String substring(int beginIndex，int endIndex);//从指定开始位置截取字符串，直到指定位置结束
```

![image-20240828163717932](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828163717932.png)

运行结果： java 非常高深的语言

**字符串的替换**

```java
public String replace(char oldChar,char newChar);//使用新的字符替换字符串中旧的字符
public String replace(charSequence target,charSequence  replacement);//使用新的字符串替换旧的字符串
public String replaceAll(String regex,String replacement);//使用替换的字符串来替换字符串中满足正则表达式的字符串
```

![image-20240828165903886](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828165903886.png)

![image-20240828165933027](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828165933027.png)

运行结果：Hella Warld

​                   Hella Warld

​                   abcde

​                   12345

**获取字符数组**

```java
public char[] toCharArray();
```

**获取字节数组**

```java
pubic byte[] getBytes();//获取字节数组
pubic byte[] getBytes(charest cahrset);//获取指定编码下的字节数组
```

![image-20240828200545234](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828200545234.png)

**字符串拼接**

```java
public String concat(String str);//将字符串追加到末尾
```

![image-20240828201533770](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828201533770.png)

两个方法都一样产生了新的内存空间，如果数量多的话会显得效率低下

**字符串分割**

![image-20240828201819697](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828201819697.png)

按照0-9数字作为分割符来分

**字符串匹配正则表达式**

```java
public boolean matches(String regex);//检测字符串是否匹配给定的正则表达式
```

![image-20240828202650795](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828202650795.png)

**intern()方法**

```java
public native String intern();
```

本地方法实现的（c++）

![image-20240828204658870](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240828204658870.png)

false

true

s3必须经过intern放入才能与s5相等

### StringBulider和StringBuffer

#### 1.特性介绍

stringBui1der 类位于java.lang包中，无需引入，直接使用即可。
stringBui1der 类是由 final 修饰的，表示stringBui1der是一个最终类，不可能被继承
stringBui1der 类构建的对象，可以实现字符序列的追加，但不会产生新的对象，只是将这个字符序列保存在字符数组中。

#### 2.构造方法

```java
public stringBuilder();//构建一个stringBuilder对象，默认容量为16
public stringBuilder(int capacity);//构建一个stringBuilder对象并指定初始化容量
public stringBuilder(string str)://构建一个stringBui1der对象，并将指定的字符串存储在其中
```

```java
package com.cyx.bulider;

public class demo1 {

    public static void main(String[] args) {
        StringBuilder sb1 = new StringBuilder();//构建了一个初始化容量为16的字符串构建器
        StringBuilder sb2 = new StringBuilder(1024);//建了一个初始化容量为1024的字符串构建器
        StringBuilder sb3 = new StringBuilder("开心超人");
    }

}
```

#### 3.常用方法

**追加**

```java
public stringBuilder append(string str);//将一个字符串添加到stringBui1der存储区
public stringBuilder append(str
sb);//将stringBuffer存储的内容添加stringBui1der存储区

```

![image-20240829173305601](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240829173305601.png)

超用心在线教育11.0truea

超用心在线教育11.0truea

**删除指定区间存储的内容**

```java
public stringbuilder delete(int start，int end);//将stringBui1der存储区指定的开始位置到指定的结束位置之间的内容删除掉
```

![image-20240829174432081](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240829174432081.png)

运行结果：afg

​                    fg

**删除存储区指定下标位置存储的字符**

```java
public stringBuilder deletecharAt(int index);

```

**在StringBuilder存储区指定偏移位置处插入指定的字符串**

```java
public stringBuilder insert(int offset, string str);
```

```java
bulider,insert(2,",");//在偏移量后面位置插入一个字符串
```

nimda-->ni,mda

**将存储区的内容倒序**

```java
xxx.reverse();
```

**获取指定字符串在存储区中的位置**

```java
public int indexof(string str);//获取指定字符串在存储区中第一次出现的位置
public int lastIndexof(string str);//获取指定字符串在存储区中最后一次出现的位置

```



![image-20240829180511131](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240829180511131.png)

0

4

#### 4.练习

现有字符串ababababababababa，求其中的字符串aba出现的次数（使用String类完成）

```java
package com.cyx.bulider;

public class demo1 {

    public static void main(String[] args) {
        String s ="ababababababababa";
        String target = "aba";
        int length = s.length();//字符串长度
        int targetlength = target.length();//目标字符串长度
        int time = 0;
        int maxIndex = length - targetlength;//防止越界
        for (int i = 0; i <= maxIndex; i++) {
            String s1 = s.substring(i,i+targetlength);//截取字符串
            if (s1.equals(target)) {
                time++;
            }
        }

        System.out.println(time);
    }

}

```



将从控制台输入的数字转换财务数次（10，005.25）（使用StringBulider完成）

```java
import java.util.Scanner;

public class demo2 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个数字");
        double money = sc.nextDouble();
        StringBuilder builder = new StringBuilder();
        builder.append(money);
        //找到小数点的位置
        int index = builder.indexOf(".");
        //小数点前面的数字才需要处理
        if(index > 3){
                     //倒着查数组下标的位置才不会改变
            for (int i = index -3; i > 0 ;i-=3) {
                builder.insert(i, ",");
            }
        }
        System.out.println(builder.toString());
    }
}

```

#### 5.对比 string

string、stringBui1der和stringeuffer都是用来处理字符串的。在处理少量字符串的时候，它们之间的处理效率几乎没有任何区别。但在处理大量字符串的时候，由于string类的对象不可再更改，因此在处理字符串时会产生新的对象，对于内存的消耗来说较大,导致效率低下，而stringBui1der和stringBuffer使用的是对字符串的字符数组内容进行拷贝，不会产生新的对象，因此效率较高。而stringeuffer为了保证在多线程情况下字符数组中内容的正确使用，在每一个成员方法上面加了锁，有锁就会增加消耗，因此stringBuffer在处理效率上要略低于stringBui1der。

## 

## File类

#### File类的作用

java.io.File类是对存储在磁盘上的文件信息的一个抽象表示。主要用于文件的创建、查找和删除

#### File类的使用

##### 构造方法

```java
public File(string pathname);//通过将给定的字符串路径名转换为抽象路径名来创建Fi1e实例
public Fi1e(string parent，string child);//通过给定的字符父级串路径和字符串子级路径来创建Fi1e实例
public File(File parent，string child);//通过父级抽象路径名和字符串子路径创建Fi1e实例。
```

![image-20240830001929544](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240830001929544.png)

##### 常用方法

###### 获取文件信息

```java

public string getAbsolutePath();//获取文件的绝对路径
public string getName();//获取文件的名字
public string getpath();//获取文件的路径(绝对或者相对路径)
public File getparentFile();//获取文件的父文件
public string getparent();//获取文件的父文件路径
public long length();//获取文件的大小
public long 1astModified();//获取文件最后的修改时间
```

###### **文件的相关判断**

```java

public boolean canRead();//是否可读
boolean readable = file.canRead();//判断文件是否可读

public boolean canwrite();//是否可写
public boolean exists();//是否存在
public boolean isDirectory();//是否是目录
public boolean isFile();//是否是一个正常的文件
public boolean isHidden();//是否隐藏

public boolean canExecute();//是否可执行
//双击有反应的文件就是可执行文件

public boolean createNewFile()throws IoException;//创建新的文件

public boolean delete();//删除文件
//删除单个文件时可用，但删除文件夹时要保证现在的文件夹是空的才能用

public boolean mkdir();//创建目录，一级
public boolean mkdirs();//创建目录，多级
public boolean renameTo(File dest);//文件重命名
   boolean = 所在文件.renameTo(目标文件)
       //目标文件目录必须存在不然就会返回false
```

![image-20240831003638339](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240831003638339.png)

F:\\test\\stu\\new.txt   多级目录用mkdirs()

###### 文件列表方法

```java
public File[] listFiles();//列出文件夹下所有文件
public File[] listFiles(FileFilter filter);//列出文件夹下所有满足条件的文件
```

```java
package com.cyx.file;

import java.io.File;
import java.io.FileFilter;

public class demo1 {

    public static void main(String[] args) {
        File directory = new File("C://User//2237735");
        //列出文件夹所有的文件
        File[] files = directory.listFiles();
        //需要判断文件是否为空
        if (files != null) {
         //   for (int i = 0; i < files.length; i++) {
            //    File file = files[i];
          //  }
            for(File file: files){  //增强for循环
                //增强循环中，可以直接遍历数组或集合中的元素，
                //不需要手动控制循环变量的递增或递减，语法比较简洁
                System.out.println(file.getPath());//打印所有文件 
                
            }
        }

        File folder = new File("C://User//2237735");
        FileFilter filter = new FileFilter() { //匿名内部类  相当于将类的名字隐藏起来
          //表示接受的条件
            @Override
            //文件筛选器
            public boolean accept(File file) {
                String name = file.getName();//获取文件名，也包含后缀在内
                return name.endsWith(".exe");//startsWith()检测字符串是否以括号内的内容开始  endwith反之
            }
        };
        File[] ChildFiles = folder.listFiles(filter);
        if (ChildFiles != null) {
            for (File file : ChildFiles) {
                System.out.println(file.getPath());
            }
        }
    }

}

```



##### **递归**

在方法内部再调用自身就是递归。递归分为直接递归和间接递归。
直接递归就是方法自己调用自己。
间接递归就是多个方法之间相互调用，形成一个闭环，从而构成递归。
**使用递归时必须要有出口，也就是使递归停下来。否则，将导致内存溢出。**

前面是直接递归

![image-20240902000703675](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240902000703675.png)

###### **示例**

使用递归求1~100的累加和。

```java
package com.cyx;

import java.util.Scanner;

/**
 * 递归
 */
public class demo3 {

    public static void main(String[] args) {
        
    }
    public static int sum(int number){
        if(number == 1) return 1;
        return number + sum(number-1);
        //sum(5)  5+sum(4);
        //sum(4)  4+sum(3);
        //sum(3)  3+sum(2);
        //sum(2)  2+sum(1);
    }
}

```



使用递归打印文件夹下所有文件信息

```java
    public static int multiply(int number){
        if (number == 0||number ==1) return 1;
            return number * multiply(number-1);
        
    }
```

使用递归打印文件下所有的文件

![image-20240902001624970](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240902001624970.png)

如何删除一个文件夹

![image-20240902203144886](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240902203144886.png)

## I/O流

磁盘和内存是两个不同的设备，它们之间要实现数据的交互，就必须要建立一条通道，在java中实现建立这样的通道的是I/0流, Java 中的I/0 流是按照数据类型来划分的。分别是字节流(缓冲流、二进制数据流和对象流)、字符流

### 字节流

程序使用字节流8位字节的输入和输出。所有字节流类均来自InputStream和outputStream

#### outputStream常用方法

```java
public abstract void write(int b) throw IOException;//写一个字节

public void write(byte b[])throws IOException;//将给定的字节数组内容全部写入文件中

//将给定的字节数组中指定的偏移量和长度之间的内容写入文件中
public void write(byte b[], int off, int len)throws IoException;  
off 偏移量
                         
public void flush()throws IoException;//强制将通道中数据全部写出
public void close()throws IoException;//关闭通道
```

#### 文件输出流FileOutputstream构造方法

```java
public Fileoutputstream(string name)throws FileNotFoundException;//根据提供的文件路径构建一条文件输出通道
文件存在，但是是目录而不是文件，则会抛出FileNotFoundException异常

//根据提供的文件路径构建一条文件输出通道，并根据append的值决定是将内容追加到末尾还是直接覆盖
public Fileoutputstream(string name, boolean append) throws     FileNotFoundException;



public Fileoutputstream(File file)throws FileNotFoundException;//根据提供的文件信息构建一条文件输出通道

//根据提供的文件信息构建一条文件输出通道，并根据append的值决定是将内容追加到末尾还是直接覆盖

public Fileoutputstream(File file, boolean append) throws FileNotFoundException;
```

示例

将“超用心教育”写入磁盘文件中

第一种创建

![image-20240903010442679](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240903010442679.png)

第二种

![image-20240903005751515](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240903005751515.png)

#### Inputstream 常用方法

```java
public abstract int read()throws IoException; //读取一个字节
public int read(byte b[])throws IoException;//读取多个字节存储至给定的字节数组中
//读取多个字节按照给定的偏移量及长度存储在给定的字节数组中
public int read(byte b[l, int off, int len)throws oException;
public void close()throws IOException;//关闭流，也就是关闭磁盘和内存之间的通道
public int available() throws IoException;//获取通道中数据的长度
```

#### 文件输入流 Filelnputstream 构造方法

```java
public FileInputstream(string name)throws FileNotFoundException;//根据提供的文件路径构建一条文件输入通道
public FileInputstream(File file)throws FileNotFoundException;//根据提供的文件信息构建一条文件输入通道
```

![image-20240903154246516](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240903154246516.png)

示例

使用文件输入流将文件信息从磁盘中读取到内存中来，并在控制台输出

```java
package com.cyx;

import java.io.*;

public class demo5 {

    public static void main(String[] args) {
        try {
            FileInputStream is = new FileInputStream("C:\\Users\\22373\\Desktop\\demo\\com\\io.txt");
            int length = is.available();//获取通道中的长度 
            //根据通道中数据的长度构建字节数组，但需要考虑到一点，如果通道中数据长度过长
            //那么字节数据构建太大，则可能导致内存不够，比如使用流读取一个大小为10g的文件
            byte[] buffer = new byte[length];
        //    int index = 0;  第一种方法
           // while (true) {
                //读取通道中的数据，一次读取一个字节，如果读取到末尾，则返回-1
             //   byte b = (byte)is.read();
             //   if (b == -1) break;
             //   buffer[index++] = b;
                //index++;
          //  }
          int readCount = is.read(buffer);   //相当于第一种，将通道中的数据全部读取到buffer数组中
          System.out.println("读取了"+readCount+"个字节");  
          System.out.println(new String(buffer));
            is.close();//关闭通道
            


        } catch (FileNotFoundException e) {
            
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

**如果通道中数据长度过长，那么根据通道中数据的长度构建字节数组，字节数据构建太大，则可能导致内存不够，比如使用流读取一个大小为10g的文件，改怎么解决。**

![image-20240903234757244](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240903234757244.png)

一次一次输出（一点一点的）

#### 综合练习

实现磁盘拷贝功能

```java
package com.cyx.io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


public class demo3 {

    public static void main(String[] args) {
        String sourceFile = "";
        String destFile = "";
        copyFile(sourceFile, destFile);
    }

    public static void copyFile(String sourceFile,String destFile){
        File file = new File(destFile);
        File parent = file.getPrantFile();
        
        if (!parent.exists()) parent.mkdirs();     
        try( FileInputStream is = new FileInputStream(sourceFile); 
        OutputStream os = new FileOutputStream(destFile);){
            //代码量明显比在finally中关闭资源中精简很多，我们将资源放在try后的小括号中声明，try在遇到异常或者执行完毕的时候会自动的关闭对资源的使用。
            byte[] buffer = new byte[4096];

            while (true) {
                int len = is.read(buffer);
                if (len == -1 ) {
                    break;
                }
                os.write(buffer, 0, len);//写多少个读多少个
            }
            os.flush();
            

        } catch (FileNotFoundException e) {
            
            e.printStackTrace();
        } catch (IOException e) {
               
                e.printStackTrace();
        }
        
    }
}


```

**代码量明显比在finally中关闭资源中精简很多，我们将资源放在try后的小括号中声明，try在遇到异常或者执行完毕的时候会自动的关闭对资源的使用。**

```java
字节流仅仅适用于读取原始数据（基本数据类型）
```



### 字符流

所有的字符流类均来自Reader和Writer，与字节流一样，也有专门于文件I/O的字符流类，FileReader和FileWriter

#### Writer常用方法(字符输出流)

```java
public void write(int c)throws IoException; //写一个字符
public void write(char cbuf[])throws IoException;//将给定的字符数组内容写入到文件中
//将给定的字符数组中给定偏移量和长度的内容写入到文件中
abstract public void write(char cbuf[], int off, int len)throws IoException;
public void write(string str)throws IoException;//将字符串写入到文件中
abstract public void flush()throws IoException;/制将通道中的数据全部写出
abstract public void close()throws IoException;//关闭通道
```

#### FileWriter构造方法

```java
public Filewriter(string fileName)throws IOException;//根据提供的文件路径构建一条文件输出通道
//根据提供的文件路径构建一条文件输出通道，并根据append的值决定是将内容追加到末尾还是直接覆盖
public Filewriter(string fileName, boolean append)throws IoException;

public Filewriter(File file)throws IoException;//根据提供的文件信息构建一条文件输出通道

//根据提供的文件信息构建一条文件输出通道，并根据append的值决定是将内容追加到末尾还是直接覆盖
public Filewriter(File file, boolean append) throws IoException;
```

示例：

使用字符流将“超用心在线教育”写入磁盘文件中

```java
package com.cyx.io_char;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import com.cyx.io.File;

public class demo {

    public static void main(String[] args) {
        //Writer类实现了AutoCloseable接口，因此可以将Writer类对象的构建方法try后面的（）中
        File file  = new File("C:\\\\Users\\\\22373\\\\Desktop\\\\demo\\\\com\\\\io.txt") ;
        File parent = file.getPrantFile();
        if(!parent.exists()) parent.mkdirs();
        try (Writer writer = new FileWriter(file,true);) {
            String text = "超用心在线教育";
            char[] values = text.toCharArray();//toCharArray将字符串中的字符转换为字符数组
            //第一//for (char i: values) {
              //  writer.write(i);
         //   }
         //writer.write(values);  第二

         writer.write(values, 1,values.length-1);//注意越界
            writer.flush();
        } catch (IOException e) {
           
            e.printStackTrace();
        }
    }
}

```

#### Reader(字符输入流)

```java
public int read()throws IoException; //读取一个字符
public int read(char cbuf[])throws IoException;//读取字符到给定的字符数组中
//将读取的字符按照给定的偏移量和长度存储在字符数组中
abstract public int read(char cbuf[], int off, int len)throws IoException;

abstract public void close()throws IoException;//关闭通道
```

FileReader构造方法

```java
public FileReader(string fileName)throws FileNotFoundException;//根据提供的文件路径构建一条文件输入通道
public FieReader(File file)throws FileNotFoundException;//根据提供的文件信息构建一条文件输入通道

```

示例
使用字符流将文件信息从磁盘中读取到内存中来，并在控制台输出。

```java
package com.cyx.io_char;

import java.io.FileReader;
import java.io.IOException;

import com.cyx.bulider;

public class demo2 {

    public static void main(String[] args) {
        try (FileReader reader = new FileReader("C:\\Users\\22373\\Desktop\\demo\\com\\io.txt")) {
           StringBuilder bulider = new StringBuilder();
            // while (true) {
            //     int c =reader.read();
            //     if (c == -1) {
            //         break;
            //     }
            //     bulider.append((char)c);//不进行强转，只会输出数字
            // }
            // System.out.println(bulider);
//第二种
            char[] buffer = new char[4096];
            int offset =0;
            while (true) {
                int len = reader.read(buffer);
                if (len == -1) {
                    break;
                }
                offset+=len;
            }
            System.out.println(new String(buffer, 0 ,offset));
        } catch (IOException e) {
           
            e.printStackTrace();
        }
    }
}

```

#### 综合练习

使用字符流实现磁盘文件拷贝功能

```java
package com.cyx.io_char;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class demo5 {

    public static void main(String[] args) throws IOException {
        String sourceFile = "";
        String destFile = "";
        copyFile(sourceFile,destFile);
    }
    public static void copyFile() throws IOException{
        File file = new File(destFile);
        File parent = file.getParentFile();
        if (!parent.exists()) {
            parent.mkdirs();
        } 
        try( FileReader reader = new FileReader("sourceFile");
             FileWriter writer =new FileWriter("destFile");) {
                char[] buffer = new char[4096];
                while (true) {
                    int len;
                    len = reader.read(buffer);
                    if (len == -1) {
                        break;
                    }

                }
           
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
                        
            e.printStackTrace();
        }
    }
}

```

### 缓冲流

```java
  到目前为止，我们看到的大多数示例都使用无缓冲的I/0。这意味着每个读取或写入请求均由基础操作系统直接处理。 由于每个这样的请求通常会触发磁盘访问，网络活动或某些其他相对昂贵的操作，因此这可能会使程序的效率大大降低。
    为了减少这种开销，Java平台实现了缓冲的I/ 0流。 缓冲的输入流从称为缓冲区的存储区中读取数据: 仅当缓冲区为空时才调用本机输API。 同样，缓冲的输出流将数据写入缓冲区，并且仅在缓冲区已满时才调用本机输出API。
        
       //不需要读一次交互一次，加入缓冲流后可能读一会儿缓冲一下再交互。
        
        有四种用于包装非缓冲流的缓冲流类:BufferedInputstream,Bufferedoutputstream创建缓冲的字节流，而BufferedReader和Bufferedwriter创建缓冲的字符流。
```

#### 缓冲字节流

BufferedOutputstream 构造方法

```java
public Bufferedoutputstream(outputstream out);//根据给定的字节输出流创建一个缓冲输出流，缓冲区大小使用默认大小
public Bufferedoutputstream(outputstream out,int size);//根据给定的字节输出流创建一个缓冲输出流，并指定缓冲区大小
```

##### BufferedinputStream 构造方法

```java
public BufferedInputstream(Inputstream in); //根据给定的字节输入流创建一个缓冲输入流，缓冲区大小使用默认大小
public BufferedInputstream(Inputstream in,int size);//根据给定的字节输入流创建一个缓冲输入流，并指定缓冲区大小
```

示例
使用缓冲字节流实现磁盘文件拷贝功能

```java
package com.cyx.buffer;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


public class demo {

    public static void main(String[] args) {
     String sourceFile = "";
     String destFfile = "";
     copyFile(sourceFile,destFfile);
    }
    public static void copyFile(){
        File file = new File(destFile);
        File parentFile =file.getParentFile();
        if (!parentFile.exists()) {
            parentFile.mkdirs();
        }
        try (InputStream is = new FileInputStream(sourceFile);
        BufferedInputStream bis = new BufferedInputStream(is);
        OutputStream os =new FileOutputStream(destFfile);
        BufferedOutputStream bos = new BufferedOutputStream(os);) {
           byte[] buffer = new byte[4096];
           while (true) {
            int len = bis.read(buffer);
            if (len == -1 ) break;
            bos.write(buffer, 0, len);
           }
        } catch (IOException e) {
            
            e.printStackTrace();
        }
    }
}

```

#### 缓冲字符流

##### BufferedWriter 构造方法

```java
public Bufferedwriter(writer out);//根据给定的字符输出流创建一个缓冲字符输出流，缓冲区大小使用默认大小
public Bufferedwriter(writer out ,int sz);//根据给定的字符输出流创建一个缓冲字符输出流，并指定缓冲区大小
```

BufferedReader 构造方法

```java
public BufferedReader(Reader in): //根据给定的字符输入流创建一个缓冲字符输入流，缓冲区大小使用默认大小
public BufferedReader(Reader in，int sz);//根据给定的字符输入流创建一个缓冲字符输入流，并指定缓冲区大小
```

示例
使用缓冲字符流实现磁盘文件拷贝功能

```java
Reader reader = new FileReader("");
BufferedReader br = new BufferedReader(reader);
Writer writer = new FileWriter(null);
BufferedWriter wr = new BufferedWriter(writer);  //基本框架与前面示例相似
```

### 数据流

```java
数据流支持原始数据类型值（布尔值，char，字节，short，int，long，float和double）以及String值的二进制I/O。所有数据流都实现DataInput接口和DataOutput接口。
```

**DataOutput接口常用方法**

```java
void writeBoolean(boolean v)throws IoException;//将布尔值作为1个字节写入底层输出通道
void writeByte(int v)throws IoException;//将字节写入底层输出通道
void writeshort(int v)throws IoException;//将短整数作为2个字节(高位在前)写入底层输出通道
void writechar(int v)throws IoException;//将字符作为2个字节写(高位在前)入底层输出通道
void writeInt(int v)throws IOException;//将整数作为4个字节写(高位在前)入底层输出通道
void writeLong(long v)throws IOException;//将长整数作为8个字节写(高位在前)入底层输出通道
void writeF1oat(float v)throws IoException;//将单精度浮点数作为4个字节写(高位在前)入底层输出通道
void writepouble(double v)throws IoException;//将双精度浮点数作为8个字节写(高位在前)入底层输出通道
void writeUTF(string s)throws IOException;//将UTF-8编码格式的字符串以与机器无关的方式写入底层输出通道.
```

#### DataOutputStream构造方法

```java
public Dataoutputstream(outputstream out);//根据给定的字节输出流创建一个二进制输出流.
```

**示例**

```java
package com.cyx.data;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class demo {

    public static void main(String[] args) {
        writeDate();
        ReadDate();

    }
    public static void ReadDate(){
        String path = "";
        try ( InputStream is =new FileInputStream(path);
        DataInputStream dis = new DataInputStream(is);) {
                 
        int  str  =  dis.readInt();
        System.out.println("整数"+str);
            
        } catch (FileNotFoundException e) {
            // TODO: handle exception
            e.printStackTrace();
        }catch(EOFException e ){//集成于IOExceotion ,所以在前
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
    public static void writeDate(){

        String path = "";
        File file = new File(path);
        File parent = file.getParentFile();
        if (!parent.exists()) {
            parent.mkdirs();
        }
        try (OutputStream os = new FileOutputStream(file);
             DataOutputStream dos = new DataOutputStream(os);) {
        
                dos.writeByte(-1);
                dos.writeShort(-2);
                dos.writeInt(1);
                dos.writeLong(100);
                dos.writeFloat(1.0f);
                dos.writeDouble(100.0);
                dos.writeBoolean(false);
                dos.writeChars("起飞");
                dos.flush();

            } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

```

### 对象流

```java
正如二进制数据流支持原始数据类型的I/0一样，对象流也支持对象的I/0。大多数(但不是全部)标准类支持其对象的序列化。那些类实现了
序列化标记接口serializab1e才能够序列化。
```

Objectoutput 接口常用方法

```java
public void writeobject(object obj)throws IoException;//将对象写入底层输出通道
```

#### ObjectOutputsteam 构造方法

```java
public objectoutputstream(outputstream out)throws IoException;//根据给定的字节输出流创建一个对象输出流
```

示例

<font color ="red">**将一个对象从内存中写入磁盘文件中的过程中称之为序列化。序列化必须要求该对象所有类型实现序列化的接口 Serializable**</font>

```java
package com.cyx.io.object;

import java.io.Serializable;

public class student implements Serializable {//序列化接口

    private String name;

    private int age;
    public student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return super.toString();
    }
}


package com.cyx.io.object;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

public class demo1 {

    public static void main(String[] args) {
        String path = "C:\\Users\\2373\\Desktop\\demo\\com\\io.txt";
        File file = new File(path);
        File parent = file.getParentFile();
        if (!parent.exists()) {
            parent.mkdirs();
        }
        try (OutputStream os = new FileOutputStream(path);
        ObjectOutputStream oos = new ObjectOutputStream(os);) {
          
            oos.writeObject(new student("张三", 25));
            oos.flush();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

```

Objectinput 接口常用方法

```java
public object readobject()throws classNotFoundException, IoException;//读取一个对象
```

Objectinputsteam 构造方法

```java
public objectInputstream(Inputstream in)throws IoException;//根据给定的字节输入流创建一个对象输入流
```

示例

<font color ="red">将磁盘中存储的对象信息读入内存中的过程称之为反序列化，需要注意的是，反序列化必须保证与序列化使用的Jdk版本一致（本电脑没问题）（但不同电脑 你写我读 就会出现问题）</font>

```java
package com.cyx.io.object;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

public class demo2 {

    public static void main(String[] args) {
        writeObject();;
        readObject();;
    }
    public static void readObject(){
        String path ="F:\\obj\\stu.obj";
        try (InputStream is = new FileInputStream(path);
             ObjectInputStream ois = new ObjectInputStream(is)) {
            student s = (student)ois.readObject();
            System.out.println(s);       
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }
    public static void writeObject(){
        String path = "F:\\obj\\stu.obj";
        File file = new File(path);
        File parent = file.getParentFile();
        if (!parent.exists()) {
            parent.mkdirs();
        }
        try (OutputStream os = new FileOutputStream(path);
        ObjectOutputStream oos = new ObjectOutputStream(os);) {
          
            oos.writeObject(new student("张三", 25));
            oos.flush();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

```

### 静态内部类和内部类

```java
calss OUterClass{
    static calss StaticNestedClass{
        
    } // 静态内部类
    
    class InnerClass{
        
    }// 内部类
}
```

```java
//Java编程语言允许你在一个类中定义一个类。这样的类称为嵌套类


嵌套类分为两类:静态和非静态。 声明为静态的嵌套类称为静态嵌套类。 非静态嵌套类称为内部类。
    
 嵌套类是其外部类的成员。 非静态嵌套类(内部类)可以访问外部类的其他成员，即使它们被声明为私有的也可以访问。 静态嵌套类无权访问外部类的其他成员。 作为outerclass的成员，可以将嵌套类声明为私有，公共，受保护或包私有。 (回想一下，外部类只能声明为公共或包私有。)
```





#### 为什么要使用内部类

当一个事务内部还有其他事物时，使用内部类来描述就显得更加合理。比如计算机包含显卡，主板。CPU，此时就可以使用内部类来描述计算机。

```java
public class Computer{//计算机
    class Mainboard{
        //主板
    }
    class GPU{
        //显卡
    }
    class cpu{
        
    }
}
```

#### 静态嵌套类

```java
  与类方法和变量一样，静态嵌套类与其外部类相关联。 与静态类方法一样，静态嵌套类不能直接引用其外部类中定义的实例变量或方法:
它只能通过对象引用来使用它们。
  
    静态嵌套类与它的外部类(和其他类)的实例成员进行交互，就像其他任何顶级类一样。实际上，静态嵌套类在行为上是顶级类，为了包装方便,该顶级类已嵌套在另一个顶级类中。
```

示例

使用静态内部类实现学生管理员对学生按年龄进行排序展示的功能。

```java
package com.cyx.inner.clazz;

public class Student {

    private int age;

    private String  name;
    
    public Student(int age, String name) {
        this.age = age;
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return super.toString();
    }
    
}


package com.cyx.inner.clazz;

import java.util.Arrays;

import com.cyx.io.object.student;

public class StudentManager {

    private Student[] stus = {};

//     public static void show(){//静态方法，又称之为类方法 类名.方法名（）
// //静态方法中不能使用非静态的成员变量
//     }

    public void addStudent(Student stu){

        stus = Arrays.copyOf(stus, stus.length+1, null);//扩容
        stus[stus.length - 1] = stu;

    }
    public void showStudent(StudentSorter sorter){

        sorter.sort(stus);
        for (Student stu: stus) {
            System.out.println(stu);
        }

    }

    static class StudentSorter{
        private int order;//排序标志 0 降序排列 1 升序排列

        public StudentSorter(){
            this(0); // 无参构造表示降序排列
        }

        public StudentSorter(int order) {
            this.order = order;
        }

        public void sort(Student[] stus){//静态方法中不能使用非静态的成员变量
            for (int i = 0; i < stus.length; i++) {//不能直接访问，就创建对象去访问
                for (int j = 0; j < stus.length-i-1; j++) {
                        int age1= stus[j].getAge();
                        int age2 = stus[j+1].getAge();
                        if ((order == 0 && age1 < age2 ) || (order == 1 && age1 > age2)) {
                            Student temp = stus[j];
                            stus[j] = stus[j+1];
                            stus[j+1] = temp;
                        }
                    }
                }
            }
    }
    
}

```

![image-20240913144214849](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240913144214849.png)

#### 内部类

```java
与实例方法和变量一样，内部类与其所在类的实例相关联，并且可以直接访问该对象的方法和字段。另外，由于内部类与实例相关联，因此他本身不能定义任何静态成员。
```

<font color = "red">内部类属于外部类的成员                          在成员位置定义的类,与方法平行</font>

**内部对象创建语法**

```java
外部类类名.内部类类名 对象名 = new 外部类类名().new 内部类类名();

```

```java
package com.cyx.inner;

public class Car {

    /**
     * InnerCar
     */
    private double price;
    
    private String brand;

    private Engine engine; //汽车拥有的发动机
    public Car(double price, String brand) {
        this.price = price;
        this.brand = brand;
        this.engine  = new Engine("国产",20000);
        this.price = price + engine.price;
    }

    public Car(Engine engine, String brand,double price){
        this.brand = brand;
        this.engine = engine;
        this.price = price +engine.price;
    }

    public void show(){
        this.engine.show();
    }
    class Engine {//发动机
    
        private String type;//发动机类型

        private double price;//价格

        public Engine(String type, double price) {
            this.type = type;
            this.price = price;
        }
        //内部类与其所在类的实例相关联，并且可以直接访问该对象的方法和字段
    
        public void show(){
            System.out.println(brand + "汽车使用的是" + type +"发动机,价格是" + price);
            //如果内部类中存在与外部类同名的成员变量时，想要使用外部类的同名成员变量，需要加上： 外部类类名.this.变量名
            System.out.println("汽车总价:" + Car.this.price);
        }
    }
}



package com.cyx.inner;

public class Cartest {

    public static void main(String[] args) {
        Car c = new Car(10000, "大本");

        Car.Engine engine = new Car(10000, "大本").new Engine("进口", 50000);
        Car c1 = new Car(engine, "奔驰", 1500000);//仅仅用来举例，正确性还有待审视
        //内部类是外部类的成员。这个成员如果要造一个对象，那么前面要new 一个外部类，表示这个成员是这个类的
    
        Car.Engine engine1 = c.new Engine(null, 0);
        Car c2 = new Car(engine1, null, 0);
        c2.show();

    }
}

```

![image-20240915120940362](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240915120940362.png)

#### 局部内部类

```java
局部类是在一个块中定义的类，该块是一组在平衡括号之间的零个或者多个语句。通常，你会在方法的主体中找到定义的局部类。
```

<font color = "red">在局部位置定义的类,在方法内</font>

示例

使用局部内部类描述使用计算机计算两个数的和。

```java
package com.cyx.inner.clazz.local;

public class Localclass {

    public static void main(String[] args) {
        int result = calculate(1, 3);
        System.out.println(result);
    }
    public static int calculate(int a,int b){
        class  Calculator{
         private int num1,num2;

        public Calculator(int num1, int num2) {
            this.num1 = num1;
            this.num2 = num2;
        }
        public int calculate(){
            return num1+num2;
        }
    }

        Calculator c =new Calculator(a, b);
        return c.calculate();
    }
}

```

#### 匿名内部类

```java
  匿名类可以使你的代码更加简洁。他们使你在声明一个类的同时实例化它。除了没有名称外，他类似于局部类。如果只需要使用一次局部类，则使用他们。
    匿名类表达式的语法，类似于构造方法的调用，不同之处在于代码中包含类定义。
```

示例

```java
package com.cyx.inner.clazz.anonymous;

public interface Calculate {

    int calculate(int a, int b);
}


package com.cyx.inner.clazz.anonymous;


public class AnonymousClass {

    public static void main(String[] args) {
        
    }
    public static int calculate(int a,int b){
        //匿名内部类跟构造方法的调用很相似，不同的地方在于： 匿名内部类里面还有类的主体
        // class Calculator implements Calculate{

        //     @Override
        //     public int calculate(int a, int b) {
        //         return a+b;
        //     }
        // }
        // Calculate calculate = new Calculator();    //第一周复杂的方法
       
       
        // Calculate calculate = new Calculate(){
        //   //第二种方法，匿名内部类将前面的接一部分到new的后面，名字被隐藏，因此叫做匿名内部类
        //     @Override
        //     public int calculate(int a, int b) {
        //         return a+b;
        //     }
        // };
        Calculate c = new Calculate() {
            @Override
            public int calculate(int a,int b){
                return a+b;
            }
    };
    return c.calculate(a, b)
}
}

```

#### Lambda表达式

```JAVA
  匿名类的一个问题是，如果匿名类的实现非常简单，比如仅包含一个方法的接口，则匿名类的语法肯定看起来笨拙并且不清楚。在这些情况下，你通常试图将功能作为参数传递给另一种方法。列如，当某人单击按钮时应该采取什么措施。Lambda表达式使你能够执行此操作，将功能视为方法参数，或将代码视为数据。
```

示例

![image-20240917152617177](C:\Users\22373\AppData\Roaming\Typora\typora-user-images\image-20240917152617177.png)

从上面代码看出：匿名内部类只是对Actor接口的实现，重点是强调其有表演节目的行为。如果能够直接将表演节目的行为赋值给actor对象的引用，使得actor对象的引用在调用接口方法时直接执行该行为，那么将大大节省代码的编写量。而Lambda表达式就能实现这样的功能

**Lambda表达式语法**

```java
(参数类型1 变量名1, 参数类型2 变量名2....)->{
    //代码块
    [return 返回值;]
};
```

```java
package com.cyx.inner.clazz.lambda;

public class Test {

    public static void main(String[] args) {
        // Actor actor = new Actor() {
        //     @Override
        //     public void performance() {
        //         System.out.println("演员表演节目");
        //     }
        // };
        //Lambda表达式
        Actor actor = () ->{
            System.out.println("演员表演节目");};
        actor.performance();
    }
}
```

<font color = "red">Lambda表达式只能使用再只有一个接口方法的接口上，只有一个接口方法的接口称之为函数式接口</font>

**练习**

定义一个接口将任意对象以字符串的形式展现出来，并再测试类中使用Lambda表达式完成测试。

定义一个接口计算两个数的和，并再测试类中使用Lam完成测试

```java
package com.cyx.inner.clazz.lambda;

public interface Calculate {
    int sum(int a,int b);
}

package com.cyx.inner.clazz.lambda;

public class CalculateTest {

    public static void main(String[] args) {
        // Calculate c = new Calculate() {
        //     @Override
        //     public int sum(int a, int b) {
        //         return a+b;
        //     }
        // };
        Calculate c =(int a, int b)-> {
            return a+b;
        };
        int result = c.sum(1, 5);
        System.out.println(result);
    }
}

```

**Lambda表达式省略规则**

()中的所有参数类型可以省略
如果()中有且仅有一个参数，那么()可以省略
如果(}中有且仅有一条语句，那么{}可以省略，这条语句后的分号也可以省略,有且仅有一条return语句，return关键字也可以省略

```java
 Calculate c =( a, b)-> a+b;
```



**示例**
编写一个接口，打印系统当前时间。并在测试类中使用Lambda表达式完成测试

```java
package com.cyx.inner.clazz.lambda;

public class PrintTest {

    public static void main(String[] args) {
        PrintTime p = () -> System.out.println(System.currentTimeMillis());
        p.printTime();
    }
}S
```



编写一个接口，获取一个指定范围内的随机数。并在测试类中使用Lambda表达式完成测试