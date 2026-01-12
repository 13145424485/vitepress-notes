## 算法：反转链表

```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```



## JIT 是什么，作用？

JIT（Just In Time Compiler）是 JVM 在运行时把热点字节码编译为机器码的机制，用来提升性能。

## 操作系统进程的调度过程

1. 进程进入就绪队列
2. 调度器根据调度算法选中进程
3. 发生 **上下文切换**
4. 进程进入运行态
5. 时间片耗尽或阻塞 → 切换

**常见调度算法：**

- 时间片轮转
- 优先级调度
- 多级反馈队列（Linux 常用）

## 什么是内核态？什么是用户态？内核态和用户态的进程？

**用户态**：普通程序运行，权限受限

**内核态**：操作系统核心，能操作硬件

## 进程和线程的状态，切换的时机

进程状态

- 新建 → 就绪 → 运行 → 阻塞 → 终止

Java 线程状态

- NEW
- RUNNABLE
- BLOCKED
- WAITING
- TIMED_WAITING
- TERMINATED

**切换时机：**

- 时间片耗尽
- IO 阻塞
- 锁竞争
- sleep / wait

## 线程的 waiting 状态和 timed_waiting 的区别

**WAITING**：无限期等待

- `Object.wait()`
- `LockSupport.park()`

**TIMED_WAITING**：有超时时间

- `Thread.sleep()`
- `wait(timeout)`

## redis的数据结构有哪些

**对外数据类型：**

- String
- List
- Set
- ZSet
- Hash
- Stream

## redis的线程模型介绍

- **命令处理单线程**
- **IO 多线程（Redis 6.0+）**

优势：

- 无锁
- 无线程切换
- 高吞吐

## 说一下BIO、NIO、AIO

**BIO**：阻塞 IO，一连接一线程

**NIO**：非阻塞 IO，多路复用

**AIO**：异步 IO，回调通知

## 知道的 IO 模型，介绍下

阻塞 IO

非阻塞 IO

IO 多路复用（select / poll / epoll）

信号驱动 IO

异步 IO

## JVM内存区域的划分，每一部分的作用

## 垃圾回收算法以及垃圾回收器

## 详细比较 CMS 和 G1 的区别？优缺点以及使用场景

## MySQL 中的内存碎片说一下