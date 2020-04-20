# 기본 개념과 동작 원리 이해의 중요성



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



### 용어 정리

- **Web Site** vs **Web Application**

  웹사이트는 정적인(static) 정보를 제공하고 웹애플리케이션은 유저와 상호작용(interaction)을 위해 사용

- **API**(Application Programming interface)

  응용 프로그램 개발자들이 애플리케이션을 만들 때 운영체제에서 동작하는 프로그램을 쉽게 만들 수 있도록 화면 구성이나 프로그램 동작에 필요한 각종 함수를 모아놓은 것

- **DOM**(Document Object Model)

  프로그램이나 스크립트가 웹 페이지 내의 구성 요소들에 접근하여 내용이나 스타일 등을 변경할 수 있게 해주는 인터페이스. 브라우저에서 HTML, XML 등의 웹 페이지가 로딩되면 문서 객체 모델 (DOM)은 브라우저 내 트리 형태로 문서 내 요소 (node)들을 구성한다. 이후 자바스크립트, 파이썬 등 언어로 해당 트리 구조 내의 노드에 접근하여 노드의 속성 값을 변경하거나 추가, 삭제 등을 실행할 수 있다

- **SPA**(Single Page Application)

  단일 페이지 애플리케이션는 모던 웹의 패러다임이다. SPA는 기본적으로 단일 페이지로 구성되며 기존의 서버 사이드 렌더링과 비교할 때, 배포가 간단하며 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다는 장점이 있다.

- **CBD**(Component Based Development)

  CBD는 공통적인 인터페이스를 가지고 있어서 여러 시스템에서 사용이 가능하도록 프로그램 코드의 구성요소를 만들고, 조립 및 재 사용하는 개발 방식이다. 이는 소프트웨어를 통째로 개발하던 기존의 방식과 달리, 부품 역할을 하는 소프트웨어 컴포넌트를 각 기능별로 개발하고, 각자에게 필요한 것을 선택하여 조립함으로써, 소프트웨어 개발에 드는 노력과 시간을 절약할 수 있다.

- **JQuery**

  위의 SPA, CBD와 DOM Selecting 방식이 다름

- **XMLHttpRequest**

  객체는 서버와 상호 작용을 하기 위해서 사용한다. 전체 페이지의 새로고침 없이도 URL로부터 데이터를 받아올 수 있다. 모든 종류의 데이터를 받아오는데 사용할 수 있다. HTTP 이외의 프로토콜도 지원한다.

- **Ajax**(**A**synchronous **J**avascript **A**nd **X**ml)

  비동기 자바스크립트와 XML을 말하는 것이다. 서버와 통신하기 위해 XMLHttpRequest 객체를 사용하는 것이다(객체의 기능을 담고 있음). JSON, XML, HTML, Text 형식 등 다양한 포맷을 주고 받을수 있다. 페이지 전체를 리프레시하지 않고서도 수행되는 **비동기성**



## 자바스크립트의 특징

**자바스크립트의 태생적 특징**

- 자바스크립트의 탄생 목적 웹 페이지를 단순히 보조하기 위한 제한적인 용도를 목적으로 만들어짐

  ```javascript
  var x;
  x; // 과거의 Javascript에서는 이렇게 사용해도 오류가 없었음
  ```

- 자바스크립트는 과도하게 친절한 프로그래밍언어

  왠만해서 에러없이 실행되어 작은 실수는 알아서 대응

  자바스크립트 내부동작에 암묵적으로 언어가 처리하는 기능도 많음(magic)

- 변수타입 선언 방식이 자유롭다

  ```javascript
  var a = 1; // c 언어의 경우 int a = 1;
  ```

- 타언어와 비교시 코드 독해가 어렵다

  

### ECMA script와 Node.js

- **ECMA script(core)** = **Javascript ∩ Node.js**

  - 언어라고 부를 수 있는 기능이 모두 들어있음
  - 순수 ECMA script라면 Javascript와 Node.js에서 모두 사용 가능

- **ECMA script** 여집합

  - DOM(CSS 파싱 결과) API는 브라우저에서만 작동(Node.js 사용 X, ECMA 등재 X => Client Javascript)

    ex) alert() 함수는 브라우저에서만 가능한 함수

  - 비동기방식 일때 (Brower ∩ Node.js) 구분을 잘 해야함



### Compile vs Interpreter

---

#### Javascript

멀티패러다임 언어 명령형, 함수형, 프로토 타입 기반 객체지향 프로그래밍

- **Interpreter**

  - 프로그래밍 언어의 소스 코드를 바로 실행하는 환경

  - 컴파일러가 없고 컴파일 단계를 거칠 필요가 없고 원시코드 명령어들을 한번에 한 줄씩 읽어 실행

    ※ 원시 프로그램의 크기가 크다면 상당한 시간이 걸릴수 있음

  - 실행파일이 생기지 않음

  - 에러가 났을 시 디버깅하기 비교적 수월

  - 사실 V8 자바스크립트 엔진이 컴파일 기능을 일부 쓰긴 함



#### C, Jave, ...

C : 절차형 언어, 명령형 언어, Java : 클래스기반 객체지향형 언어

- **Compiler**
  - 0, 1만 아는 컴퓨터에게 사람이 작성한 코드를 컴퓨터가 이해할 수 있게 번역(어셈블리어, 기계어)
  - Compile 有, 원시코드(원래의 문서)에서 목적코드(하드웨어가 처리하는 형태)로 옮기는 과정
  - 실행파일이 생김
  - 소스 코드 전체 번역 후에 에러 메세지를 생성하기 때문에 디버깅하기가 비교적 까다로움



```javascript
10 + 20 // 30
// 0, 1만 아는 컴퓨터에게 알려주기 위해선
// 컴퓨터가 알게 번역해주는 것(기계어)이 컴파일러

```

#### 



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

#### 

#### ETC

HTML 선언형 언어

HTML 어트리뷰트와 CSS 프로퍼티

자바스크립트의 관점에선 HTML에서도 프로퍼티가 보임

유지보수가 편한 방법



**Tool**

code runner node.js 환경에서만 사용한 가능한

package.json 오픈소스에 이력을 남겨주는 소스

Webpack

ESLint

