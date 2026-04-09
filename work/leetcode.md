# LeetCode 热题 HOT 100

# 哈希

## 哈希的常用方法

public V put(K key, V Value)：添加元素

 public int size()：获取集合的大小

public boolean isEmpty()：判断集合是否为空，为空返回true，反之返回false

public V get(Object key)：根据键获取对应的值

getOrDefault(key, defaultValue)	Map 的方法：获取 key 对应的 value，如果不存在则返回默认值

public boolean containsValue(Object value)：判断是否包含某个值，包含返回true，反之返回false



| 特性         | **HashSet**                       | **HashMap**                       |
| ------------ | --------------------------------- | --------------------------------- |
| **存储内容** | 只存 **Key**（值）                | 存 **Key-Value 对**（键值对）     |
| **重复性**   | 值不可重复                        | Key 不可重复，Value 可重复        |
| **底层实现** | 基于 HashMap 实现                 | 基于哈希表 + 链表/红黑树          |
| **用途**     | 去重、快速判断"是否存在"          | 存储映射关系、快速查找对应值      |
| **方法**     | `add()`, `contains()`, `remove()` | `put()`, `get()`, `containsKey()` |

## 1.两数之和





https://leetcode.cn/problems/two-sum/submissions/697954496/

### 暴力枚举

- 思路：两层循环，找出相加之和为target的两个下标

- 复杂度分析：时间复杂度O(n^2)，空间复杂度O(1)

  ```java
  class Solution {
      public int[] twoSum(int[] nums, int target) {
          int n = nums.length;
          for (int i = 0; i < n; i++) {
              for (int j = 0; j < n; j++) {
                  if (i != j) {
                      int x = nums[i];
                      int y = nums[j];
                      if (x + y == target) {
                          return new int[]{i, j};
                      }
                  }
              }
          }
          return new int[]{};
      }
  }
  ```

### 哈希表

- 分析一下这个问题，目的是找出 `x + y = target`，那么 `x = target - y`，那么问题就转化为在数组中找出 `target - y`，如果存在，则返回，否则返回空数组。

- 那么我们可以先对数字建一个哈希表，随后对于每一个数字x，我们在哈希表中寻找 `target - x`，如果存在，则返回，否则返回空数组。

- 需要注意的一点是，两个数字的下标不能一样。

  ```java
  class Solution {
      public int[] twoSum(int[] nums, int target) {
          HashMap<Integer, Integer> map = new HashMap<>();
          // 建立哈希表
          for (int i = 0; i < nums.length; i++) {
              map.put(nums[i], i);
          }
          // 遍历nums，寻找target - nums[i]
          for (int i = 0; i < nums.length; i++) {
              int y = target - nums[i];
              // 须确保存在，且不是自身
              if (map.get(y) != null && i != map.get(y)) {
                  return new int[]{i, map.get(y)};
              }
          }
          return new int[]{};
      }
  }
  ```

## 2.字母异位词分组

https://leetcode.cn/problems/group-anagrams/description/



```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        return new ArrayList<>(Arrays.stream(strs)
        .collect(Collectors.groupingBy(str ->{
            char[] array = str.toCharArray();
            Arrays.sort(array);
            return new String(array);
        })).values());
    }
}
```

利用的是 groupingBy 按“键”分组并默认把同键元素收集成 List 的特性：先把每个字符串排序后作为分组键，键相同的（异位词）自动被聚到同一个列表里，最后取各组的 values() 作为结果。

### 排序

- 对于每一个str，我们对其排序，如果是异位词，那么排序后的结果理应也是一样的。

  ```java
  class Solution {
      public List<List<String>> groupAnagrams(String[] strs) {
          // key是对应的字符串，value是对应的下标索引
          HashMap<String, List<Integer>> map = new HashMap<>();
          for (int i = 0; i < strs.length; i++) {
              String str = strs[i];
              char[] chars = str.toCharArray();
              // 对字符串排序
              Arrays.sort(chars);
              String sortedStr = Arrays.toString(chars);
              // 查询哈希表中是否已经存在
              if (map.get(sortedStr) != null) {
                  // 存在则将下标添加到list中
                  List<Integer> indexList = map.get(sortedStr);
                  indexList.add(i);
              } else {
                  // 不存在则创建一个list，并将下标添加进去
                  ArrayList<Integer> list = new ArrayList<>();
                  list.add(i);
                  map.put(sortedStr, list);
              }
          }
  
          // 最终遍历每一个key，取出下标值，封装返回结果
          ArrayList<List<String>> res = new ArrayList<>();
          for (Map.Entry<String, List<Integer>> entry : map.entrySet()) {
              ArrayList<String> list = new ArrayList<>();
              entry.getValue().forEach(idx -> list.add(strs[idx]));
              res.add(list);
          }
  
          return res;
      }
  }
  ```

```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
       ↓
分组逻辑构建 Map（按排序后字符分组）:
{
    "aet" → [0, 1, 3],   // "eat", "tea", "ate"
    "ant" → [2, 4],      // "tan", "nat"
    "abt" → [5]          // "bat"
}
       ↓
本代码执行转换:
       ↓
输出: res = [
    ["eat", "tea", "ate"],
    ["tan", "nat"],
    ["bat"]
]
```

```java
 Map.Entry<Object, Object>
Map.Entry<Object, Object>是Map的内部类，它的对象用来表示一个Key-Vaule对，因此，List容器中应该存放的是Map.Entry<Object, Object>的对象。
```

```java
Map<Integer, Double> map = new HashMap<Integer, Double>();
(1) 将Map里面的Key-Vaule整对存放在List容器中
List<Map.Entry<Integer, Double>> list = new ArrayList<Map.Entry<Integer, Double>>(map.entrySet());
map.entrySet()获取Map.Entry<Integer, Double>的集合(Set)
```

上述代码仍存在优化空间，map的value其实可以直接存储字符串，不必存索引，再取出来。

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
char[] charArray = str.toCharArray();   // "eat" → ['e','a','t']
Arrays.sort(charArray);                  // ['e','a','t'] → ['a','e','t']
String key = new String(charArray);      // ['a','e','t'] → "aet"
            List<String> list = map.getOrDefault(key, new ArrayList<>());
            //getOrDefault = "有就拿，没有就造"
           // key 存在 → 拿现成的（继续往里面加）
           // key 不存在 → 造个新的（从这个开始加）
            list.add(str);
            map.put(key, list);
        }
        return new ArrayList<>(map.values());
    }
}
```

完整流程动画

```
处理 "eat":
    key = "aet"
    map 现状: {}
    getOrDefault("aet", 新列表) → 返回 新列表 []
    list.add("eat") → ["eat"]
    map.put("aet", ["eat"])
    map 现状: {"aet": ["eat"]}

处理 "tea":
    key = "aet"  
    map 现状: {"aet": ["eat"]}
    getOrDefault("aet", 新列表) → 返回 已存在的 ["eat"] ✨
    list.add("tea") → ["eat", "tea"]
    map.put("aet", ["eat", "tea"])
    map 现状: {"aet": ["eat", "tea"]}

处理 "tan":
    key = "ant"
    map 现状: {"aet": ["eat", "tea"]}
    getOrDefault("ant", 新列表) → 返回 新列表 []（因为 key 不存在）
    list.add("tan") → ["tan"]
    map.put("ant", ["tan"])
    map 现状: {"aet": ["eat", "tea"], "ant": ["tan"]}
```

## 3.最长连续序列

- 我寻思这题双指针做，不是超级简单吗？为什么会出现在哈希里呢？只可惜排序是时间复杂度O(nlogn)的。

### 双指针

```java
class Solution {
    public int longestConsecutive(int[] nums) {

         if (nums == null || nums.length == 0) return 0;
         Arrays.sort(nums);

        int left = 0;
        int maxlen = 1;
        for(int right = 1 ;right <  nums.length ;right ++){
            if (nums[right] == nums[right - 1]) {
                // 重复元素：窗口左边界右移，避免重复计数
                left++;
                continue;
            }
            if(nums[right] == nums[right-1]+1){
                maxlen = Math.max(maxlen,right-left+1);
            }else{
             left = right;   
            }
        }
        return maxlen;
    }

}
```





### 哈希表

```java
class Solution {
    public int longestConsecutive(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }
        int maxLen = 0;
        for (Integer num : set) {
            if (!set.contains(num - 1)) {
                int curLen = 1;
                while (set.contains(++num)) {
                    curLen++;
                }
                maxLen = Math.max(maxLen, curLen);
            }
        }
        return maxLen;
    }
}
```



# 双指针

## 4.移动零

https://leetcode.cn/problems/move-zeroes/description/

### 双指针

- 一开始没注意到要保持非零元素的相对顺序，这个代码双指针是一前一后，向中心靠拢，但是这样的话，非零元素的相对顺序会变。

  ```java
  class Solution {
      public void moveZeroes(int[] nums) {
          int left = 0;
          int right = nums.length - 1;
          while (left < right) {
              if (nums[right] == 0) {
                  right--;
              }
              int num = nums[left];
              if (num == 0) {
                  swap(left, right, nums);
              }
              left++;
          }
      }
  
      public void swap(int left, int right, int[] nums) {
          int temp = nums[left];
          nums[left] = nums[right];
          nums[right] = temp;
      }
  }
  ```

- 那我们让两个指针都从最左边开始走就好了，但是这个代码也有一个问题，遇到两个连续的0，二者交换没有意义，同时left还在自增，所以会有问题

  ```java
  class Solution {
      public void moveZeroes(int[] nums) {
          int left = 0;
          int right = 0;
          while (++right < nums.length) {
              if (nums[left] != 0) {
                  left++;
              }
              if (nums[left] == 0) {
                  swap(left++, right, nums);
              }
          }
      }
  
      public void swap(int left, int right, int[] nums) {
          int temp = nums[left];
          nums[left] = nums[right];
          nums[right] = temp;
      }
  }
  ```

- 在过滤一下刚刚的情况，就是最终的代码啦

  ```java
  class Solution {
      public void moveZeroes(int[] nums) {
          int left = 0;
          int right = 0;
          while (++right < nums.length) {
              if (nums[left] != 0) {
                  left++;
              }
              if (nums[left] == 0 && nums[right] != 0) {
                  swap(left++, right, nums);
              }
          }
      }
  
      public void swap(int left, int right, int[] nums) {
          int temp = nums[left];
          nums[left] = nums[right];
          nums[right] = temp;
      }
  }
  ```



## 5.盛最多水的容器

[盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

```java
class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.length - 1;

        while(left < right){
            int h = Math.min(height[left],height[right]);
            maxArea = Math.max(h * (right - left), maxArea);

        if(height[left] < height[right]){
            left++;
        }else{
            right--;
        }
     }

        return maxArea;
    }
}
```

- 现在分析一下这个问题，如何才能让装的水最多呢？那当然是两边足够高，并且离得远，那么`height x width`的面积就是最大的。
- 那我们用双指针，一个从左边开始遍历，一个从右边开始遍历，遍历的时候需要单调递增，即高变长了，但是宽变窄了，那么最终的面积可能才会变大。
- 单调递增意味着，我们需要每次移动短的那条边，才可能找到一条更长的边。



## 6.三数之和*

[15. 三数之和](https://leetcode.cn/problems/3sum/)

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {

        List<List<Integer>> ans = new ArrayList();

        int len = nums.length;

        if(nums == null || len < 3)return ans;

        Arrays.sort(nums);

        for(int i = 0;i < len ;i++){
            if(nums[i] > 0)break;
            if(i > 0 && nums[i] == nums[i-1])continue;
            int L = i+1;
            int R = len - 1;
            while(L < R){
                int sum = nums[i] + nums[L] + nums[R];
                if(sum == 0){
                    ans.add(Arrays.asList(nums[i],nums[L],nums[R]));
                    while(L<R &&nums[L] == nums[L+1]) L++;
                    while(L<R &&nums[R] == nums[R-1]) R--;
                    L++;
                    R--;
                }
                else if(sum<0)L++;
                else if(sum>0)R--;
            }
        }
        return ans;

    }
}
```



## 7.接雨水

[ 接雨水](https://leetcode.cn/problems/trapping-rain-water/)



黑色的看成墙，蓝色的看成水，宽度一样，给定一个数组，每个数代表从左到右墙的高度，求出能装多少单位的水。也就是图中蓝色正方形的个数。

### 解法一：按行求 （超时）

先求高度为 1 的水，再求高度为 2 的水，再求高度为 3 的水。

整个思路就是，求第 i 层的水，遍历每个位置，如果当前的高度小于 i，并且两边有高度大于等于 i 的，说明这个地方一定有水，水就可以加 1。

如果求高度为 i 的水，首先用一个变量 temp 保存当前累积的水，初始化为 0。从左到右遍历墙的高度，遇到高度大于等于 i 的时候，开始更新 temp。更新原则是遇到高度小于 i 的就把 temp 加 1，遇到高度大于等于 i 的，就把 temp 加到最终的答案 ans 里，并且 temp 置零，然后继续循环。

作者：windliang
链接：https://leetcode.cn/problems/trapping-rain-water/

```java
public int trap(int[] height) {
    int sum = 0;
    int max = getMax(height);//找到最大的高度，以便遍历。
    for (int i = 1; i <= max; i++) {
        boolean isStart = false; //标记是否开始更新 temp
        int temp_sum = 0;
        for (int j = 0; j < height.length; j++) {
            if (isStart && height[j] < i) {
                temp_sum++;
            }
            if (height[j] >= i) {
                sum = sum + temp_sum;
                temp_sum = 0;
                isStart = true;
            }
        }
    }
    return sum;
}
private int getMax(int[] height) {
		int max = 0;
		for (int i = 0; i < height.length; i++) {
			if (height[i] > max) {
				max = height[i];
			}
		}
		return max;
}

```

### 解法二：按列求

求每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。

装水的多少，当然根据木桶效应，我们只需要看左边最高的墙和右边最高的墙中较矮的一个就够了。

### 解法三：动态规划

我们注意到，解法二中。对于每一列，我们求它左边最高的墙和右边最高的墙，都是重新遍历一遍所有高度，这里我们可以优化一下。

首先用两个数组，max_left [i] 代表第 i 列左边最高的墙的高度，max_right[i] 代表第 i 列右边最高的墙的高度。（一定要注意下，第 i 列左（右）边最高的墙，是不包括自身的，和 leetcode 上边的讲的有些不同）

对于 max_left我们其实可以这样求。

max_left [i] = Max(max_left [i-1],height[i-1])。它前边的墙的左边的最高高度和它前边的墙的高度选一个较大的，就是当前列左边最高的墙了。

对于 max_right我们可以这样求。

max_right[i] = Max(max_right[i+1],height[i+1]) 。它后边的墙的右边的最高高度和它后边的墙的高度选一个较大的，就是当前列右边最高的墙了。

这样，我们再利用解法二的算法，就不用在 for 循环里每次重新遍历一次求 max_left 和 max_right 了。

```java
class Solution {
    public int trap(int[] height) {
        int sum = 0;
        int[] max_right = new int[height.length];
        int[] max_left = new int[height.length];

        for(int i = 1 ; i< height.length-1 ; i++){
            max_left[i] = Math.max(max_left[i-1],height[i-1]);
        }

        for(int i = height.length-2; i >= 0 ;i--){
            max_right[i] = Math.max(max_right[i+1],height[i+1]);
        }

        for(int i =1;i < height.length -1;i++){
            int min = Math.min(max_left[i],max_right[i]);
            if(min>height[i]){
                sum = sum + (min - height[i]);
            }
        } 
            return sum;
    }
}
```



### 解法四：双指针

动态规划中，我们常常可以对空间复杂度进行进一步的优化。

例如这道题中，可以看到，max_left [ i ] 和 max_right [ i ] 数组中的元素我们其实只用一次，然后就再也不会用到了。所以我们可以不用数组，只用一个元素就行了。

```java
public int trap(int[] height) {
    int sum = 0;
    int max_left = 0;
    int max_right = 0;
    int left = 1;
    int right = height.length - 2; // 加右指针进去
    for (int i = 1; i < height.length - 1; i++) {
        //从左到右更
        //本轮先算哪一侧：如果左边界更低，就先处理 left 这一侧；否则处理 right 这一侧
        if (height[left - 1] < height[right + 1]) {
            max_left = Math.max(max_left, height[left - 1]);
            int min = max_left;
            if (min > height[left]) {
                sum = sum + (min - height[left]);
            }
            left++;
        //从右到左更
        } else {
            max_right = Math.max(max_right, height[right + 1]);
            int min = max_right;
            if (min > height[right]) {
                sum = sum + (min - height[right]);
            }
            right--;
        }
    }
    return sum;
}

```

# 滑动窗口

## 1.无重复字符的最长子串

[无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

#### 滑动窗口

- 首先，为了简化后续处理，我们可以排除字符串长度小于等于1的特殊情况。此时，无重复字符的子串长度等于字符串本身的长度。

- 然后，定义一个Set用于存储当前无重复字符的窗口。在扩展右边界时，首先检查右边界字符是否已经存在于Set中。如果已存在，说明出现了重复字符，我们需要逐步移除左边界的字符，直到不再有重复。每次将新的右边界字符加入Set后，我们更新最大子串长度。

- 这个算法的核心就在于，每次移动右边界时，确保以当前右边界字符结尾的子串都是无重复的最大长度子串

  ```java
  class Solution {
      public int lengthOfLongestSubstring(String s) {
          char[] charArray = s.toCharArray();
          if(charArray.length <= 1)return charArray.length;
  
          int left = 0;int right = 0;
          int maxLen = 0;
          Set<Character> set = new HashSet<>();
          while(right < charArray.length){
              while(set.contains(charArray[right])){
                  set.remove(charArray[left]);
                  left++;
              }
  
              set.add(charArray[right]);
              right ++;
  
              maxLen = Math.max(maxLen, right - left);
  
          }
          return maxLen;
  
      }
  }
  ```

  

  

  ## 2.最小覆盖字串

  https://leetcode.cn/problems/minimum-window-substring/description/
  
  ### 滑动数组
  
  优化前：
  
  ```java
  class Solution {
      public String minWindow(String S, String t) {
          int[] cntS = new int[128]; // s 子串字母的出现次数
          int[] cntT = new int[128]; // t 中字母的出现次数
          for (char c : t.toCharArray()) {
              cntT[c]++;
          }
  
          char[] s = S.toCharArray();
          int m = s.length;
          int ansLeft = -1;
          int ansRight = m;
          int left = 0;
  
          for (int right = 0; right < m; right++) { // 移动子串右端点
              cntS[s[right]]++; // 右端点字母移入子串
              while (isCovered(cntS, cntT)) { // 涵盖
                  if (right - left < ansRight - ansLeft) { // 找到更短的子串
                      ansLeft = left; // 记录此时的左右端点
                      ansRight = right;
                  }
                  cntS[s[left]]--; // 左端点字母移出子串
                  left++;
              }
          }
  
          return ansLeft < 0 ? "" : S.substring(ansLeft, ansRight + 1);
      }
  
      private boolean isCovered(int[] cntS, int[] cntT) {
          for (int i = 'A'; i <= 'Z'; i++) {
              if (cntS[i] < cntT[i]) {
                  return false;
              }
          }
          for (int i = 'a'; i <= 'z'; i++) {
              if (cntS[i] < cntT[i]) {
                  return false;
              }
          }
          return true;
      }
  }
  
  作者：灵茶山艾府
  ```
  
  
  
  
  
  ## 找到字符串中所有字母异位词
  
  [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)



```java
import java.util.HashMap;
import java.util.Map;

public class SlidingWindowTemplate {

    /* 滑动窗口算法框架 */
    public static void slidingWindow(String s, String t) {
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();

        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }

        int left = 0, right = 0;
        int valid = 0;

        while (right < s.length()) {
            // c 是将移入窗口的字符
            char c = s.charAt(right);
            // 右移窗口
            right++;
            // 进行窗口内数据的一系列更新
            // ...

            /*** debug 输出的位置 ***/
            System.out.printf("window: [%d, %d)%n", left, right);
            /********************/

            // 判断左侧窗口是否要收缩
            while (windowNeedsShrink()) {
                // d 是将移出窗口的字符
                char d = s.charAt(left);
                // 左移窗口
                left++;
                // 进行窗口内数据的一系列更新
                // ...
            }
        }
    }

    // 占位方法：按具体题目实现收缩条件
    private static boolean windowNeedsShrink() {
        return false;
    }
}

```





```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();

        for (char c : p.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }

        int left = 0, right = 0;
        int valid = 0;
        List<Integer> res = new ArrayList<>();

        while (right < s.length()) {
            char c = s.charAt(right);
            right++;

            if (need.containsKey(c)) {
                window.put(c, window.getOrDefault(c, 0) + 1);
                if (window.get(c).intValue() == need.get(c).intValue()) {
                    valid++;
                }
            }

            // 固定窗口长度为 p.length()
            while (right - left >= p.length()) {
                if (valid == need.size()) {
                    res.add(left);
                }

                char d = s.charAt(left);
                left++;// 左边要出去的字符
                if (need.containsKey(d)) {// 这个字符是我关心的吗？
                    if (window.get(d).intValue() == need.get(d).intValue()) {
                        valid--;//出去前刚好达标，出去后就不达标了
                    }
                    window.put(d, window.get(d) - 1);
                }
            }
        }

        return res;
    }
}
```

# 子串

## 9.和为 K 的子数组

[和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

### 前缀和 + 哈希

- 首先我们来了解一下前缀和的概念：
  - 对于数组中的任意位置`i`，前缀和`pre[i]`表示数组中的第`1`个元素到第`i`个元素的总和。
  - 前缀和`pre[j]`表示数组中的第`1`个元素到第`j`个元素的总和。
  - 假定`j > i`，那么`pre[j] - pre[i]`就是第`i+1`个元素到第`j`个元素的总和。
- 那么对于这个问题，我们可以转化为：求解两个前缀和之差等于k的情况。
- 通过遍历数组，计算每个位置的前缀和，同时使用一个哈希表来存储每个前缀和出现的次数，同时在遍历数组的过程中，我们判断哈希表中是否存在`prefix[j] - k`的前缀和，并累加其出现次数，即为结果。

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        int res = 0;
        int prefixSum = 0;

        // key表示前缀和为x，value表示有y个组合
        HashMap<Integer, Integer> map = new HashMap<>();
        // 默认前缀和为0的时候，有1个组合
        map.put(0, 1);

        for (int num : nums) {
            prefixSum = prefixSum + num;
            if (map.containsKey(prefixSum - k)) {
                res += map.get(prefixSum - k);
            }
            map.put(prefixSum, map.getOrDefault(prefixSum, 0) + 1);
        }
        return res;
    }
}
```

## 10.滑动窗口最大值

### 双端队列

- 我们可以使用双端队列（Deque）来解决这个问题。
  1. 维护双端队列：
     - 用Deque存放元素的索引。在任何时刻，Deque的头部总是滑动窗口中的最大值的索引。那么当窗口滑动时，我们只取Deque的头部即可获取最大值。
  2. 滑动窗口滑动：
     - `移除窗口最左侧的元素：`如果Deque头部元素的索引已经超出当前窗口的范围（即j - k + 1之前的元素），那么从头部移除该元素。
     - `维护单调递减性：`将当前元素和Deque尾部元素比较，如果当前元素比尾部元素大，那么尾部元素不可能是当前滑动窗口的最大值，那我们移除尾部元素。重复此操作，直至Deque中的所有元素都大于当前元素，即可保持单调递减。
     - `添加当前元素：`将当前元素的索引加入Deque。

```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if(nums.length == 0 || k == 0) return new int[0];
        Deque<Integer> deque = new LinkedList<>();
        int[] res = new int[nums.length - k + 1];
        for(int j = 0, i = 1 - k; j < nums.length; i++, j++) {
            // 删除 deque 中对应的 nums[i-1]
            if(i > 0 && deque.peekFirst() == nums[i - 1])
                deque.removeFirst();
            // 保持 deque 递减
            while(!deque.isEmpty() && deque.peekLast() < nums[j])
                deque.removeLast();
            deque.addLast(nums[j]);
            // 记录窗口最大值
            if(i >= 0)
                res[i] = deque.peekFirst();
        }
        return res;
    }
}
```

# 普通数组

## 11.最大子数组和

[最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

### 动态规划

- 经典的动态规划问题，状态转移方程：`dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])`

```java
class Solution {
	public int maxSubArray(int[] nums) {
		int[] dp = new int[nums.length];
		dp[0] = nums[0];
		for (int i = 1; i < nums.length; i++) {
			dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
		}
        // dp[i]表示以i结尾的最大子数组和，排序后取第一个，即为结果
        int res = dp[0];
        for (int i = 1; i < nums.length; i++) {
            res = Math.max(res, dp[i]);
        }
        return res;

	}
}
```



## 12.合并区间

[56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

### 排序+遍历合并

1. 排序：首先将区间按照起始位置`start`升序排序。这样可以保证当遍历到某个区间时，之前区间的起始位置都小于等于当前区间的起始位置。
2. 遍历合并：
   - 用一个`merged`列表来保存合并后的区间。
   - 对于当前区间`intervals[i]`
     - 如果`merged`为空，或者当前区间起始位置大于`megerd`中的最后一个区间的结束位置，说明它们之间没有重叠，可以直接将当前区间添加到`merged`中。
     - 否则，他们重叠，我们将`merged`中的最后一个区间的结束为止更新为当前区间的结束位置。
3. 返回结果：merged列表中即为合并后的区间。

```java
class Solution {
    public int[][] merge(int[][] intervals) {

        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        LinkedList<int []> merged = new LinkedList<>();

        for(int[] interval : intervals){
            if(merged.isEmpty() || merged.getLast()[1] < interval[0]){
                merged.add(interval);
            }else{
                merged.getLast()[1] = Math.max(merged.getLast()[1],interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

## 13.合并区间

[56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

### 轮转数组

让我们把眼光从单个的数字（索引）上移开，把数组看成由**两块大的积木**组成的。

1. 建立模型：两块积木

假设数组是 `[1, 2, 3, 4, 5, 6, 7]`，`k = 3`。
我们要把后面 3 个数移到前面去。

我们可以把数组切分成两部分（两块积木）：

- **积木 A**（前面不动的）：`[1, 2, 3, 4]`
- **积木 B**（后面要移走的）：`[5, 6, 7]`

**现在的状态**： `A` + `B`
**我们的目标**： `B` + `A` （即 `[5, 6, 7, 1, 2, 3, 4]`）

------

2. 核心矛盾

我们想把 `A` 和 `B` 的位置互换。
如果我们有无限的空间，我们直接把 B 拿出来放前面就行了。
但在 *O*(1) 空间限制下，我们只能在原地折腾。

3. 魔法的解密：负负得正

让我们看看**“全部翻转”**到底做了什么物理操作。

**操作一：翻转整体 (Reverse Whole)**
原始：`[ 1, 2, 3, 4 | 5, 6, 7 ]` (也就是 `A` | `B`)
翻转后：`[ 7, 6, 5 | 4, 3, 2, 1 ]`

请注意观察！虽然里面的数字顺序乱了，但是**积木的位置**发生了什么变化？

- 原本在右边的 `5, 6, 7`（积木 B），现在跑到了**左边**。
- 原本在左边的 `1, 2, 3, 4`（积木 A），现在跑到了**右边**。

这时候的状态其实是：**`B逆` + `A逆`**
（`B逆` 代表倒序的 B，`A逆` 代表倒序的 A）。

**关键点来了：**
这时候，**大块积木的位置已经对了！**（B 在前，A 在后）。
唯一的缺点是：每块积木内部是反的。

**操作二 & 三：局部修复 (Reverse Parts)**
既然位置对了，只剩下内部顺序是反的，那我们怎么做？
很简单，**负负得正**。

- 把左边这块（`B逆`）再翻转一次 → 变回 `B`。
- 把右边这块（`A逆`）再翻转一次 → 变回 `A`。

------

总结图解

1. **初始**： `A` `B`
2. **全翻**： `B'` `A'` (位置换了，内容反了)
3. **翻左**： `B` `A'` (B 好了)
4. **翻右**： `B` `A` (A 也好了，大功告成！)

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int len = nums.length;
        k %= len;
        reverse(nums,0,len-1);
        reverse(nums,0,k-1);
        reverse(nums,k,len-1);
    }

    public void reverse(int[] nums,int i ,int j){
        while(i < j){
            int temp = nums[i];
            nums[i++] = nums[j];
            nums[j--] =  temp;
        }
    }
}
```

## 14.缺失的第一个正数

[41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)

# 二叉树

## 二叉树的中序遍历

[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

- 前序遍历：打印 - 左 - 右
- 中序遍历：左 - 打印 - 右
- 后序遍历：左 - 右 - 打



### 递归

```java
class Solution {
	public List<Integer> inorderTraversal(TreeNode root) {
		List<Integer> res = new ArrayList<Integer>();
		dfs(res,root);
		return res;
	}
	
	void dfs(List<Integer> res, TreeNode root) {
		if(root==null) {
			return;
		}
		//按照 左-打印-右的方式遍历
		dfs(res,root.left);
		res.add(root.val);
		dfs(res,root.right);
	}
}

```

### 迭代

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        Stack<TreeNode> stack = new Stack<TreeNode>();
        while(stack.size() > 0 || root != null){
            if(root!=null){
                stack.add(root);
                root = root.left;
            }else{
                TreeNode temp = stack.pop();
                res.add(temp.val);
                root = temp.right;
            }
        }
        return res;
    }
}
```

## 二叉树的最大深度

[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

### 自底向上

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null){
            return 0;
        }
        else{
            int left = maxDepth(root.left);
            int right = maxDepth(root.right);
            return Math.max(left,right)+1;
        }
    }
}
```

### 自顶向下







```java
class Solution {
    private int ans;

    public int maxDepth(TreeNode root) {
        dfs(root, 0);
        return ans;
    }

    private void dfs(TreeNode node, int depth) {
        if (node == null) {
            return;
        }
        depth++;
        ans = Math.max(ans, depth);
        dfs(node.left, depth);
        dfs(node.right, depth);
    }
}

```



| 特性     | 原写法（返回值递归） | 本次写法（DFS + 全局变量） |
| -------- | -------------------- | -------------------------- |
| 核心思路 | 后序遍历，自底向上   | 前序遍历，自顶向下         |
| 存储方式 | 栈帧存储局部变量     | 类成员变量存储最大值       |
| 终止逻辑 | 空节点返回 0         | 空节点直接返回             |
| 深度计算 | 子树深度 + 1         | 遍历路径时逐层 + 1         |







## 翻转二叉树

[LCR 144. 翻转二叉树](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/)

### 递归

```java
class Solution {
    public TreeNode flipTree(TreeNode root) {
        if(root == null){return null;}
        TreeNode tmp = root.left;
        root.left = flipTree(root.right);
        root.right = flipTree(tmp);
        return root;
    }
}
```

## 对称二叉树

### 递归

```java
class Solution {

  public boolean isSymmetric(TreeNode root) {

​    return isSameTree(root.left,root.right);

  }

  private boolean isSameTree(TreeNode p,TreeNode q){

​    if(p ==null || q == null){

​      return p == q;

​    }

​    return p.val == q.val && isSameTree(p.left,q.right) && isSameTree(p.right,q.left);

  }

}
```

## 二叉树的层序遍历

[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

### 两个数组

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        if(root == null){
            return List.of();
        }

        List<List<Integer>> ans = new ArrayList<>();
        List<TreeNode> cur = List.of(root);
        while(!cur.isEmpty()){
            //存储下一个节点
            List<TreeNode> nxt = new ArrayList<>();
             // 存当前层所有节点的值，提前指定大小，效率更高
            List<Integer> vals = new ArrayList<>(cur.size());
            for(TreeNode node : cur){
                vals.add(node.val);
                if(node.left != null) nxt.add(node.left);
                if(node.right != null) nxt.add(node.right);
            }
            //将下一个节点设为当前层
            cur = nxt;
            ans.add(vals);
        }
        return ans;
    }
}
```



## 二叉树的最近公共祖先--非100

[LCR 194. 二叉树的最近公共祖先](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        //分别去左右子树
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;
        }
        return left != null ? left : right;
    }
}

```





```
        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4
```



# 链表

## 旋转链表

[旋转链表](https://leetcode.cn/problems/rotate-list/)

```java
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if(head == null|| k == 0)  return head;
        int n = 0;			   //链表的长度
        ListNode tail = null;  //尾节点
        for(ListNode p = head; p != null ; p = p.next){
            tail = p;
            n++;
        }
        k %= n;
        ListNode p = head;
        for(int i = 0; i < n - k - 1; i++)  p = p.next;   //找到链表的第n-k个节点
        tail.next = head;
        head = p.next;
        p.next = null;
        return head;  //返回新的头节点
    }
}

```

## 重排链表

https://leetcode.cn/problems/reorder-list/

### 解法一 存储

链表的缺点就是不能随机存储，当我们想取末尾元素的时候，只能从头遍历一遍，很耗费时间。第二次取末尾元素的时候，又得遍历一遍。

所以先来个简单粗暴的想法，把链表存储到线性表中，然后用双指针依次从头尾取元素即可

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public void reorderList(ListNode head) {
    if (head == null) {
        return;
    }
    //存到 list 中去
    List<ListNode> list = new ArrayList<>();
    while (head != null) {
        list.add(head);
        head = head.next;
    }
    //头尾指针依次取元素
    int i = 0, j = list.size() - 1;
    while (i < j) {
        list.get(i).next = list.get(j);
        i++;
        //偶数个节点的情况，会提前相遇
        if (i == j) {
            break;
        }
        list.get(j).next = list.get(i);
        j--;
    }
    list.get(i).next = null;
    }
}
```





### 递归

```java
class Solution {
    public void reorderList(ListNode head) {
        if(head == null || head.next == null || head.next.next == null){
            return;
        }
        int len = 0;
        ListNode h = head;

        while(h != null){
           len++;
           h = h.next;
        }
        reorderListHelper(head, len);
    }

    private ListNode reorderListHelper(ListNode head ,int len){
        if(len == 1){
            ListNode outTail = head.next;
            head.next = null;
            return outTail;
        }
        if(len == 2){
             ListNode outTail = head.next.next;
             head.next.next = null;
             return outTail;
        }
        ListNode tail = reorderListHelper(head.next,len -2);
        ListNode subHead = head.next;
        head.next = tail;
        ListNode outTail = tail.next;
        tail.next = subHead;
        return outTail;
    }
}
```

你现在要处理一段链表：

**头节点 🟢 -----> 中间一大块链表 🌱 -----> 尾节点 🔴**

我们要做的就一件事：

**头 接 尾，尾 再接 中间**

变成：

**🟢 -----> 🔴 -----> 🌱**

# 动态规划

## 最小路径和

[LCR 099. 最小路径和](https://leetcode.cn/problems/0i0mDW/)

### 二维DP

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int [m][n];
        dp[0][0] = grid[0][0];
        for(int j = 1;j < n; j++){ dp[0][j] = dp[0][j-1] + grid[0][j];}
        for(int i = 1; i < m ;i++){
            dp[i][0] = dp[i-1][0] + grid[i][0];
            for(int j = 1; j < n ; j++ ){
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

### 一维原地滚动dp

```
// 一维原地滚动dp
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0];
        for(int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for(int i = 1; i < m; i++){
            dp[0] += grid[i][0];
            for(int j = 1; j < n; j++){
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
            }
        }
        return dp[n - 1];
    }
}
```













# 其他

## 用栈实现队列

[232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

```java
class MyQueue {

    Deque<Integer> inStack;
    Deque<Integer> outStack;
    public MyQueue() {
        inStack = new LinkedList<Integer>();
        outStack = new LinkedList<Integer>();
    }
    
    public void push(int x) {
        inStack.push(x);
    }
    
    public int pop() {
        if(outStack.isEmpty()){
            in2out();
        }
        return outStack.pop();
    }
    
    public int peek() {
        if(outStack.isEmpty()){
            in2out();
        }
        return outStack.peek();
    }
    
    public boolean empty() {
         return inStack.isEmpty() && outStack.isEmpty();
    }

    private void in2out(){
        while(!inStack.isEmpty()){
            outStack.push(inStack.pop());
        }  
    }
}

```

