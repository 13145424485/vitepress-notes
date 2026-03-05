# OSS对象存储

以zhiguang项目为例

```java
        <!-- 阿里云 OSS SDK：对象存储直传/签名/上传下载 -->
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
            <version>3.17.3</version>
        </dependency>
```

```xml
oss:
  endpoint: oss-cn-beijing.aliyuncs.com
  access-key-id: 写你自己的
  access-key-secret: 写你自己的
  bucket: zhiguangapp
  public-domain: ${OSS_PUBLIC_DOMAIN:}
  folder: avatars
```

