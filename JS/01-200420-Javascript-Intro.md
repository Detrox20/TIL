# 자바스크립트 Intro

## 프론트엔드 개발에 필요한 기술

* HTML : tags, attributes, Semantic web
* CSS : Layout(float, flex, grid), transition, animation, 반응형 웹, Preprocessor(SASS, Post CSS), CSS 방법론, CSS 프레임워크
* 크로스 브라우징
* Javascript : ES5, ES6, ES Next, DOM/Event, Ajax, 동작원리(브라우저, 자바스크립트 엔진)node.js
* HTTP
* Tools : git, webpack, babel, ESLint, npm...
* Library / Framework : SPA (Angular, React, Vue.js), TypeScript, jQuery, Lodash, Axios...
* TDD (test driven development) : karma / jasmine, mocha, chai
* 알고리즘 / 자료구조



## 프로그래밍이란?

프로그래밍이란 컴퓨터에게 실행을 요구하는 일종의 커뮤니케이션 0과 1밖에 알지 못하는 기계가 실행할 수 있는 정도로 정확하고 상세하게 요구사항을 설명하는 작업이며 그 결과물이 바로 코드

- 무엇을 실행하기 원하는지에 대한 정의가 필요 

  => 요구되는 것이 문제해결 능력 

  => 컴퓨터의 관점으로 사고(Computational thinking)



### 프로그래밍 언어

컴퓨터가 이해할 수 있는 언어는 **기계어(Machine code)**로 명렁을 전달해야한다. 인간이 이해할 수 있는 약속된 **구문(Syntax, 문법)**으로 구성된 프로그래밍 언어(Programming Language)를 사용하여 그것을 컴퓨터가 이해할 수 있는 기계어로 변환하여 주는 일종의 번역기를 이용하는 것이다. 이 일종의 번역기를 **컴파일러(Complier)** 혹은 **인터프리터(interpreter)**라고 한다. 프로그래밍 언어는 **Syntax(구문)**와 **Semantics(의미)**의 조합으로 표현된다.



#### Syntax & Semantics

대부분의 프로그래밍 언어는 “변수와 값”, “키워드”, “연산자”, “표현식과 문”, “조건문”과 “반복문”에 의한 “흐름제어(Control flow)”, “함수” 그리고 “객체”, “배열” 등의 “자료구조”와 같은 문법을 제공한다.

프로그래밍 언어가 제공하는 문법을 적절히 사용하여 변수를 통해 값을 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 흐름제어로 코드의 실행 순서를 제어하고 함수로 재사용이 가능한 문의 집합을 만들며 객체, 배열 등으로 자료를 구조화한다.

**결국 프로그래밍은 요구사항의 집합을 분석하여 적절한 자료구조와 함수의 집합으로 변환한 후, 그 흐름을 제어하는 것이다.**



## 자바스크립트 학습방법

자바스크립트는 과거의 제한적인 용도의 웹사이트를 만드는 프로그래밍 언어가 아님

현재 웹애플리케이션을 만드는 주력언어

- 내부동작 이해가 중요하다(모르면 그냥 외워야한다)
- 내부동작을 이해해야 목적대로 코드를 쓸 수 있는 능력이 생긴다

```javascript
x // 여기서는 x의 값이 지정되지 않았는데도 Javascript에서는 1로 나온다 => 호이스팅
// 다른언어는 이런 방식의 참조가 불가하다
var x = 1;
```
