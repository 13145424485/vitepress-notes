**MyBatis-Plus提供了强大的\**条件构造器\**。通过条件构造器可以写一些\**复杂的SQL语句\**，从而提高我们的开发效率**



# 构造器

## eq

等于 =
eq(R column, Object val)

参数说明：

colum:数据库的字段属性

val:属性值

需求：查询姓名为“一心同学”的用户。

```java
@Test
void testWrapper2() {
 
    QueryWrapper<Person> wrapper=new QueryWrapper<>();
    
     wrapper.eq("name","一心同学");
 
    List<Person> personList = personMapper.selectList(wrapper);
 
    personList.forEach(System.out::println);
}
```
## ne

不等于 <>
ne(R column, Object val)

参数说明：

colum:数据库的字段属性

val:属性值

使用

需求：查询年龄不等于18的用户信息。

```java
@Test
void testWrapper3() {
 
    QueryWrapper<Person> wrapper=new QueryWrapper<>();
 
    wrapper.ne("age",18);
 
    List<Person> personList = personMapper.selectList(wrapper);
 
    personList.forEach(System.out::println);
}
```


## gt



大于等于 >=
ge(R column, Object val)


参数说明：

colum:数据库的字段属性

val:属性值

使用

需求：查询年龄大于等于18的用户。

```java
@Test
void testWrapper4() {
 
    QueryWrapper<Person> wrapper=new QueryWrapper<>();
 
    wrapper.gt("age",18);
 
    List<Person> personList = personMapper.selectList(wrapper);
 
    personList.forEach(System.out::println);
```

