# 표현식(Expression)과 문(Statement)

## 값

**값(value)**은 **식(표현식, expression)**이 **평가(evaluate)**되어 **생성된 결과**를 말한다.

모든 값은 데이터 타입을 갖으며 메모리에 2진수, 즉 비트(bit)의 나열로 저장된다. 메모리에 저장된 값은 데이터 타입에 따라 다르게 해석될 수 있다. ex) 메모리에 저장된 값 2진수 0100 0001 => 10진수 65, 문자 'A'

변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름 => 변수에 할당되는 것 **값**(값은 표현식의 결과물)

```javascript
// 변수에는 10 + 20이 평가되어 생성된 숫자값 30이 할당
var sum = 10 + 20;
```

변수 이름 sum이 기억하는 메모리 공간에 저장되는 것은 10 + 20이 아니라 값 30이다.



## 리터럴

**리터럴(literal)**은 **사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기 방식(notaion)**을 말한다. 즉, 리터럴은 값을 생성하기 위해 미리 약속한 표기법(notation)이라고 할 수 있다.

```javascript
// 리터럴을 사용한 다양한 종류(data type)의 값을 생성

100// 정수 리터럴
10.5// 부동 소숫점 리터럴
0b01000001// 2진수 리터럴(0b로 시작)
0o101// 8진수 리터럴(ES6에서 도입. 0o로 시작)
0x41// 16진수 리터럴(ES6에서 도입. 0x로 시작)

// 문자열 리터럴
'Hello'
"World"

// 불리언 리터럴
true
false

// null 리터럴
null

// undefined 리터럴
undefined

// 객체 리터럴
{ name: 'Graves', address: 'Gorge' }

// 배열 리터럴
[ 1, 2, 3 ]

// 함수 리터럴
function() {}

// 정규표현식 리터럴
/[A-Z]+/g
```

- 자바스크립트는 모든 숫자를 64bit 부동소수점으로 처리

- 자바스크립트의 문자는 원시값으로 처리(편리한 기능)

  C언어는 문자를 배열, Java는 문자를 객체(만드는 방법이 다양)로 제공

## 표현식

**표현식(expression)은 값으로 평가될 수 있는 문(statement)이다. 즉, 표현식이 평가되면 값을 생성하거나 값을 참조한다**

```javascript
// 100 리터럴 표현식
var score = 100;

// score는 다른 값과 평가되어 표현식이 되거나 값을 참조할 수 있다
// 변수 식별자(score)를 참조하면 변수 값으로 평가
// 식별자 참조는 값을 생성하지는 않지만 값으로 평가되므로 표현식
score + 100; // 200
```

**값으로 평가되는 문은 모두 표현식**

```javascript
// 표현식은 리터럴, 식별자(변수, 함수 등의 이름), 연산자, 함수 호출 등의 조합으로 이루어질 수 있다

// 리터럴 표현식
10
'Hello'

// 식별자 표현식 (선언이 이미 존재한다고 가정)
sum
person.name
arr[1]

// 연산자 표현식
10 + 20
sum = 10
sum !== 10

// 함수/메소드 호출 표현식 (선언이 이미 존재한다고 가정)
square()
person.getName()
```

표현식은 값으로 평가 => 표현식은 값처럼 사용

=> 문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있다는 것을 의미



## 문

**문(statement)은 프로그램을 구성하는 기본 단위이자 최소 실행 단위**

문의 집합으로 이루어진 것이 프로그램이며 문을 작성하고 순서에 맞게 나열한 것이 프로그래밍

문은 여러 토근들로 구성되어있다. **토큰(token)이란 문법적인 의미를 가지며, 문법적으로 더이상 나눌 수 없는 코드의 기본 요소를 의미한다.** 

```javascript
var sum = 1 + 2;

// var, sum, =, 1, +, 2, ; => token
// 키워드, 식별자, 연산자, 리터럴, 세미콜론(;)이나 마침표(.) 등의 특수 기호는 문법적인 의미를 가지며
// 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소이므로 모두 토큰
```

문은 명령문이라고도 부른다. 즉, 문은 컴퓨터에게 내리는 명령이고 문이 실행되면 명령이 실행되고 무언가가 일어난다.

```javascript
// 변수 선언문
var x;

// 표현식 문(할당문)
x = 5;

// 함수 선언문
function foo () {}

// 조건문
if (x > 1) { console.log(x); }

// 반복문
for (var i = 0; i < 2; i++) { console.log(i); }
```



## 세미콜론과 세미콜론 자동 삽입 기능

### 세미콜론(;)

- **문의 종료**를 나타냄

- 단, 0개 이상의 문을 중괄호로 묶은 코드 블록 { … } 뒤에는 세미콜론을 붙이지 않는다. ex) if문, for문
- 문의 끝에 붙이는 세미콜론은 옵션(생략 가능)

### 세미콜론 자동 삽입 기능

- 자바스크립트 엔진이 소스 코드를 해석할 때 문의 끝이라고 예측되는 지점에 세미콜론을 자동적으로 붙여줌

- 세미콜론 자동 삽입 기능 동작과 개발자의 예측이 일치하지 않는 경우가 있다

  ```javascript
  var bar = function () {}
  (function() {})();
  // ASI의 동작 결과 => var bar = function () {}(function() {})();
  // 개발자의 예측 => var bar = function () {}; (function() {})();
  // TypeError: (intermediate value)(...) is not a function
  ```



## 표현식인 문과 표현식이 아닌 문

```javascript
// 변수 선언문은 값으로 평가될 수 없으므로 표현식이 아니다
var x;
// 1, 2, 1 + 2, x = 1 + 2는 표현식
// x = 1 + 2은 표현식이면서 완전한 문
x = 1 + 2;

// 표현식이 아닌 문은 값처럼 사용할 수 없다
var boom = var x; // SyntaxError: Unexpected token var

// 표현식인 문은 값처럼 사용할 수 있다
var foo = x = 100;
console.log(foo); // 100

// 표현식이 아닌 문은 완료값 undefined를 반환 한다
// 변수 선언문
var ten = 10;  // undefined

// 표현식 문
// 표현식은 평가된 값을 반환
ten + 10 // 20
```

> **완료값(Completion value)**
>
> 크롬 개발자 도구에서 표현식이 아닌 문은 언제나 undefined를 출력한다. 이를 완료 값(Completion value)이라 한다. 완료 값은 다른 값과 같이 변수에 할당할 수 없다.



## Lecture

10 변수에 저장할 수 있으면 값

10 + 20 자바스크립트 엔진이 평가해서 값으로 저장

10 + 20 값으로 평가 된다 => 이런것을 표현식

var x = 10; 10=> 값이면서 표현식

var y = x x가 평가된 변수

값은 표현식의 결과물

메모리에 들어가는 것이 값

컴퓨터는 2진수 작동인데 값은 왜 10진수 가져왓나

```javascript
var a = 42; // 아스키코드 42라고 가정
var b = 42;
```

숫자는 2진수를 10진수로 해석 기본으로다가

리터럴 = 기호

true 자바스크립트가 참인지 거짓이니

'a' 유니코드를 만들어냄 그 유니코드를 2진수로 저장

[] 기호

{} 객체 리터럴

function () {} 

/a/ 



3 이것이 자체값이 아니고 자바스크립트님 3을 만들어주세요 이게 리터럴 결국 기호

리터럴은 표현식이다

파싱(해석)

x가 선언되있어서 참조가 가능하면 표현식



undefined, null, boolean 등 몇바이트인지 몰라 ecma스크립트에 없어서 표준이 없다



자바스크립트는 모든 숫자를 8byte 부동소수점으로 처리

c언어 문자를 배열

java는 문자를 객체로 제공

자바스크립트는 원시값처리라 편한 기능임

객체를 만드는 방법이 다양 고생할꺼다

정규표현식도 객체?? 못들음

물고 물리는 표현식과 문 ㅈ

```javascript
var x = 1; // undefined 표현식이 아닌문은 에크마스크립트 콘솔에 undefined 출력되게 되어있음
x;
x === 1 // 
var x = var y; // 
var x = if(true) {}; //
```

표현식 문 특징 변수에 할당할수 있다

값이 표현할수 있는 곳에 표현식인 문은 올수 있다

```javascript


// if(값){}; 값 => 트루나 펄스로 평가될수 있는 값이 온다 => 표현식인 문만 올수 있는 자리다
var x = 1;

if(x = 2) {

​	console.log('Hi');

}
```

할당문은 할당된 값으로 평가

한줄한줄한줄이 문이다

문들을 순서에 맞게 나열하는 것

ㅇ.ㅅ ㅅ은 ㅇ객체의 프로퍼티

arr[1] 두번째 요소를 참조하겠다는 뜻

var x = sum = 10 ; 연쇄할당

이항연산자 피연산자가 두개 있어야한다

명령문(statement)

0.1 + 0.2 = 30000000000000004

개발자들이 실수할수 있다