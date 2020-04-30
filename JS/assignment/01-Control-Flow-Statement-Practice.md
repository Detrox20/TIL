# 제어문 연습 문제

1. **변수가 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식**

```javascript
var x = 15;
if(10 < x < 20) {
    console.log(x);
}
// 15
```

&nbsp;

2. **for 문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력**

```javascript
for (var i = 0; i < 10; i += 2) {
    console.log(i);
}
// 0 2 4 6 8
```

&nbsp;

3. **for 문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력**

```javascript
var str = '';
for (var i = 0; i < 10; i += 2) {
    str += i;
}
console.log(str); // "02468"
```

&nbsp;

4. **for 문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰 수부터 출력**

```javascript
for (var i = 9; i > 0; i -= 2) {
    console.log(i);
}
// 9 7 5 3 1
```

&nbsp;

5. **while 문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력**

```javascript
var x = 0;
while(x < 10) {
    console.log(x);
    x += 2;
}
// 0 2 4 6 8
```

&nbsp;

6. **while 문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰 수부터 출력**

```javascript
var x = 9;
while(x > 0) {
    console.log(x);
    x -= 2;
}
// 9 7 5 3 1
```

&nbsp;

7. **for 문을 사용하여 0부터 10미만의 정수의 합을 출력**

```javascript
var sum = 0;
for (var i = 0; i < 10; i++) {
    sum += i;
}
console.log(result); // 45
```

&nbsp;

8. **1부터 20미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합**

```javascript
var result = 0;
for (var i = 1; i < 20; i++) {
    if(i % 2 && i % 3) {
        result += i;
        console.log(result);
    }
}
console.log(result); // 73
```

&nbsp;

9. **1부터 20미만의 정수 중에서 2 또는 3의 배수인 수의 총합**

```javascript
var result = 0;
for (var i = 1; i < 20; i++) {
    if(i % 2 === 0 || i % 3 === 0) {
        result += i;
    }
}
console.log(result); // 117
```

&nbsp;

10. **두 개 주사위를 던졌을 때, 눈의 합이 6이 되는 경우의 수**

```javascript
for (var i = 1; i <= 6; i++) {
    for(var j = 1; j <= 6; j++) {
        if(i + j === 6) {
            console.log(`[${i}, ${j}]`);
        }
    }
}
// [1, 5]
// [2, 4]
// [3, 3]
// [4, 2]
// [5, 1]
```

&nbsp;

11. **삼각형 패턴 - 1**

```javascript
*
**
***
****
*****
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = 1; j <= 5; j++) {
    if (i >= j) {
      x += '*';
    }
    if (j === 5) {
      x += '\n';
    }
  }
}
console.log(x);
```

&nbsp;

12. **삼각형 패턴 - 2**

```javascript
*****
 ****
  ***
   **
    *
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = 1; j <= 5; j++) {
    if (i <= j) {
      x += '*';
    } else if (i > j) {
      x += ' ';
    }
    if (j === 5) {
      x += '\n';
    } 
  }
}

console.log(x);
```

&nbsp;

13. **삼각형 패턴 - 3**

```javascript
*****
****
***
**
*
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = 1; j <= 5; j++) {
    if (i <= j) {
      x += '*';
    }
    if (j === 5) {
      x += '\n';
    }
  }
}

console.log(x);
```

&nbsp;

14. **삼각형 패턴 - 4**

```javascript
    *
   **
  ***
 ****
*****
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = 5; j >= 1; j--) {
    if (i >= j) {
      x += '*';
    } else if (i < j) {
      x += ' ';
    }
    if (j === 1) {
      x += '\n';
    } 
  }
}

console.log(x);
```

&nbsp;

15. **정삼각형 출력하기**

```javascript
// 끝까지 ' '가 없는 경우
    *
   ***
  *****
 *******
*********
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = -4; j <= 4; j++) {
    if (i - Math.abs(j) >= 1) {
      x += '*';
    } else if (i - Math.abs(j) < 1) {
      x += ' ';
    }
    if (i - j === 0) {
      x += '\n';
      break;
    } 
  }
}

console.log(x);
```

```javascript
var stars = function () {
  var x = '';
  var rows = 5;
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j < 10; j++) {
      if (j >= rows && j <= 10 - rows) {
        x += '*';
        if (j === 10 - rows) {
          x += '\n';
          break;
        }
      } else if (j < rows) {
        x += ' ';
      }
    }
    rows--;
  }
  return x;
}

console.log(stars());
```

&nbsp;

```javascript
// 끝까지 ' '가 있는 경우
    *    
   ***   
  *****  
 ******* 
*********
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = -4; j <= 4; j++) {
    if (i - Math.abs(j) >= 1) {
      x += '*';
    } else if (i - Math.abs(j) < 1) {
      x += ' ';
    }
    if (j === 4) {
      x += '\n';
    } 
  }
}

console.log(x);
```

&nbsp;

16. **역정삼각형 출력하기**

```javascript
// 끝까지 ' '가 없는경우
*********
 ******* 
  *****  
   ***   
    *    
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = -4; j <= 4; j++) {
    if (i + Math.abs(j) <= 5) {
      x += '*';
    } else if (i + Math.abs(j) > 5) {
      x += ' ';
    }
    if (i + j === 5) {
      x += '\n';
      break;
    } 
  }
}

console.log(x);
```

```javascript
var stars = function () {
  var x = '';
  var rows = 1;
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j < 10; j++) {
      if (j >= rows && j <= 10 - rows) {
        x += '*';
        if (j === 10 - rows) {
          x += '\n';
          break;
        }
      } else if (j < rows) {
        x += ' ';
      }
    }
    rows++;
  }
  return x;
}

console.log(stars());
```

&nbsp;

```javascript
// 끝까지 ' '가 있는 경우
*********
 ******* 
  *****  
   ***   
    *    
```

```javascript
var x = '';
for (var i = 1; i <= 5; i++) {
  for (var j = -4; j <= 4; j++) {
    if (i + Math.abs(j) <= 5) {
      x += '*';
    } else if (i + Math.abs(j) > 5) {
      x += ' ';
    }
    if (j === 4) {
      x += '\n';
    } 
  }
}

console.log(x);
```

