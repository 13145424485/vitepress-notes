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

# MyBatis动态SQL

Mybatis 动态 sql 可以让我们在 Xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。

#### Mybatis 的 9 种 动 态 sql 标 签

| 元素                      | 作用                              | 备注                    |
| ------------------------- | --------------------------------- | ----------------------- |
| if                        | 判断语句                          | 单条件分支判断          |
| choose（when、otherwise） | 相当于 Java 中的 switch case 语句 | 多条件分支判断          |
| trim，where               | 辅助元素                          | 用于处理一些SQL拼装问题 |
| foreach                   | 循环语句                          | 在in语句等列举条件常用  |
| bind                      | 辅助元素                          | 拼接参数                |

二：MyBatis标签

##### 1.if标签：条件判断

MyBatis if 类似于 Java 中的 if 语句，是 MyBatis 中最常用的判断语句。使用 if 标签可以节省许多拼接 SQL 的工作，把精力集中在 XML 的维护上。

（1）不使用动态sql
<select id="selectUserByUsernameAndSex"
        resultType="user" parameterType="com.ys.po.User">
    <!-- 这里和普通的sql 查询语句差不多，对于只有一个参数，后面的 #{id}表示占位符，里面          不一定要写id,
         写啥都可以，但是不要空着，如果有多个参数则必须写pojo类里面的属性 -->
    select * from user where username=#{username} and sex=#{sex}
</select>

if 语句使用方法简单，常常与 test 属性联合使用。语法如下。

<if test="判断条件">    SQL语句</if>

（2）使用动态sql
上面的查询语句，我们可以发现，如果 #{username} 为空，那么查询结果也是空，如何解决这个问题呢？使用 if 来判断，可多个 if 语句同时使用。以下语句表示为可以按照网站名称（name）或者网址（url）进行模糊查询。如果您不输入名称或网址，则返回所有的网站记录。但是，如果你传递了任意一个参数，它就会返回与给定参数相匹配的记录。

<select id="selectAllWebsite" resultMap="myResult">  
    select id,name,url from website 
    where 1=1    
   <if test="name != null">        
       AND name like #{name}   
   </if>    
   <if test="url!= null">        
       AND url like #{url}    
   </if></select>
##### 2.where+if标签

where、if同时使用可以进行查询、模糊查询

注意，`<if>`失败后， `<where>` 关键字只会去掉库表字段赋值前面的and，不会去掉语句后面的and关键字，即注意，`<where>` 只会去掉`<if>` 语句中的最开始的and关键字。所以下面的形式是不可取的

 **根据传入的条件动态拼接 WHERE 子句，实现多条件组合查询（模糊查询 + 精确查询）**

<select id="findQuery" resultType="Student">
            <include refid="selectvp"/>
            <where>
                <if test="sacc != null">
                    sacc like concat('%' #{sacc} '%')
                </if>
                <if test="sname != null">
                    AND sname like concat('%' #{sname} '%')
                </if>
                <if test="sex != null">
                    AND sex=#{sex}
                </if>
                <if test="phone != null">
                    AND phone=#{phone}
                </if>
            </where>
        </select>


这个“where”标签会知道如果它包含的标签中有返回值的话，它就插入一个‘where’。此外，如果标签返回的内容是以AND 或OR 开头的，则它会剔除掉。



核心机制详解

```java
情况1：第一个条件成立
    <if>sacc...</if>  ✓ 为 true
    <if>sname...</if> ✗ 为 false
    
    自动处理：去掉开头的 AND
    结果：WHERE sacc like ...

情况2：所有条件都不成立
    所有 <if> 都是 false
    
    自动处理：整个 <where> 不生成
    结果：SELECT ... FROM student（查询全部）

情况3：多个条件成立
    第一个条件前不加 AND
    后续条件自动加 AND
    结果：WHERE sacc like ... AND sname like ... AND ...
```



#####  3.set标签

set可以用来修改

```xml
<update id="upd">
        update student
        <set>
            <if test="sname != null">sname=#{sname},</if>
            <if test="spwd != null">spwd=#{spwd},</if>
            <if test="sex != null">sex=#{sex},</if>
            <if test="phone != null">phone=#{phone}</if>
        sid=#{sid}
        </set>
        where sid=#{sid}
    </update>
```

#####  4.choose(when,otherwise) 语句

有时候，我们不想用到所有的查询条件，只想选择其中的一个，查询条件有一个满足即可，使用 choose 标签可以解决此类问题，类似于 Java 的 switch 语句

 

<select id="selectUserByChoose" resultType="com.ys.po.User" parameterType="com.ys.po.User">
      select * from user
      <where>
          <choose>
              <when test="id !='' and id != null">
                  id=#{id}
              </when>
              <when test="username !='' and username != null">
                  and username=#{username}
              </when>
              <otherwise>
                  and sex=#{sex}
              </otherwise>
          </choose>
      </where>
  </select>
　也就是说，这里我们有三个条件，id,username,sex，只能选择一个作为查询条件

　　　　如果 id 不为空，那么查询语句为：select * from user where  id=?

　　　　如果 id 为空，那么看username 是否为空，如果不为空，那么语句为 select * from user where username=?;

　　　　如果 username 为空，那么查询语句为 select * from user where sex=?

foreach是用来对集合的遍历，这个和Java中的功能很类似。通常处理SQL中的in语句。

foreach 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。这个元素也不会错误地添加多余的分隔符

你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 foreach。当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。

//批量查询
<select id="findAll" resultType="Student" parameterType="Integer">
    <include refid="selectvp"/> WHERE sid in
    <foreach item="ids" collection="array"  open="(" separator="," close=")">
        #{ids}
    </foreach>
</select>
| 属性                 | 作用             | 示例值                        |
| -------------------- | ---------------- | ----------------------------- |
| `collection="array"` | 遍历对象类型     | `array` = 数组，`list` = List |
| `item="ids"`         | 单个元素的别名   | 每次取出的值叫 `ids`          |
| `open="("`           | 循环开始前拼接   | 开头加 `(`                    |
| `separator=","`      | 元素之间的分隔符 | `,`                           |
| `close=")"`          | 循环结束后拼接   | 结尾加 `)`                    |

//批量删除

```
<delete id="del"  parameterType="Integer">
    delete  from  student  where  sid in
    <foreach item="ids" collection="array"  open="(" separator="," close=")">
        #{ids}
    </foreach>
</delete>
```



#### 7.sql

在实际开发中会遇到许多相同的SQL，比如根据某个条件筛选，这个筛选很多地方都能用到，我们可以将其抽取出来成为一个公用的部分，这样修改也方便，一旦出现了错误，只需要改这一处便能处处生效了，此时就用到了<sql>这个标签了。

当多种类型的查询语句的查询字段或者查询条件相同时，可以将其定义为常量，方便调用。为求 <select> 结构清晰也可将 sql 语句分解。

```xml
<sql id="selectvp">

    select  *  from  student
</sql>
```

作用：避免重复书写

不用的情况（重复代码）

```xml
<select id="findById" resultType="Student">
    select * from student where id = #{id}
</select>

<select id="findByName" resultType="Student">
    select * from student where name = #{name}
</select>

<select id="findQuery" resultType="Student">
    select * from student 
    <where>...</where>
</select>
<!-- 每个都要写 select * from student，重复！ -->
```

使用后 复用

```xml
<!-- 定义一次 -->
<sql id="selectvp">
    select * from student
</sql>

<!-- 多处引用 -->
<select id="findById" resultType="Student">
    <include refid="selectvp"/>
    where id = #{id}
</select>

<select id="findByName" resultType="Student">
    <include refid="selectvp"/>
    where name = #{name}
</select>

<select id="findQuery" resultType="Student">
    <include refid="selectvp"/>
    <where>...</where>
</select>
```

------

如何引用

```xml
<include refid="selectvp"/>
```

#### 8.include

这个标签和<sql>是天仙配，是共生的，include用于引用sql标签定义的常量。比如引用上面sql标签定义的常量

refid这个属性就是指定<sql>标签中的id值（唯一标识）

<select id="findbyid"  resultType="student">
    <include refid="selectvp"/>
    WHERE 1=1
    <if test="sid != null">
        AND sid like #{sid}
    </if>
</select>
