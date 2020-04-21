## SQL 문의 종류

- **DML**(Data Manipulation Language)

  데이터 조작어

  데이터 검색, 삽입, 수정, 삭제 등에 사용

  transaction이 발생하는 SQL문

  ex) SELECT, INSERT, UPDATE, DELETE

  

- **DDL**(Data Definition Language)

  데이터 정의어

  데이터 베이스, 테이블, 뷰, 인덱스 등의 데이터 베이스 개체를 생성, 삭제, 변경에 사용

  실행 즉시 DB에 적용

  ex) CREATE, DROP, ALTER, TRUNCATE

  

- **DCL**(Data Control Language)

  데이터 제어어

  사용자의 권한을 부여하거나 빼앗을때 사용

  ex) GRUNT, REVORKE, DENY



## DML 명령어



### 조건문(WHERE)

---

#### 비교연산

```mysql
SELECT name, countryCode, population
FROM city
WHERE population >= 10000000;
```



#### AND

```mysql
SELECT name, countryCode, population
FROM city
WHERE population >= 8000000 AND population <= 9000000;
```



#### BETWEEN

```mysql
SELECT name, countryCode, population
FROM city
WHERE population BETWEEN 8000000 AND 9000000;
```



#### OR

```mysql
SELECT *
FROM country
WHERE continent = "Asia" OR continent = "Africa";
```



#### IN, NOT IN

특정 조건을 포함하는 경우 사용

```mysql
SELECT *
FROM country
WHERE continent IN = "Asia", "Africa";
# 아시아 또는 아프리카가 포함된 데이터를 출력
```



#### LIKE

특정 문자열이 포함되는 데이터를 출력

```mysql
SELECT *
FROM country
WHERE GovernmentForm LIKE "%Republic%";
# 정부의 형태가 Republic이 포함된 국가 데이터를 출력
# "A%" A로 시작하는 데이터를 출력 ex) Asia, Assasion, Atom
# "%E" E로 끝나는 데이터를 출력 ex) Apple, Fake, Grave
```



### ORDER BY

---

오름차순 정렬

```mysql
SELECT *
FROM country
ORDER BY population ASC;
# 인구를 오름차순으로 정렬하여 국가 데이터를 출력
```



내림차순 정렬

```mysql
SELECT *
FROM country
WHERE population >= 10000000
ORDER BY population DESC;
# 특정조건을 만족하는 인구를 내림차순으로 정렬하여 국가 데이터를 출력
```



### LIMIT

---

데이터 수를 제한해서 출력

```mysql
SELECT *
FROM country
ORDER BY population DESC
LIMIT 5;
# 인구수가 많은 상위 5개 국가 데이터를 출력
```



```mysql
SELECT *
FROM country
ORDER BY population DESC
LIMIT 5, 3;
# 인구수가 많은 6 ~ 8위 3개 국가 데이터를 출력
```



### GROUP BY

---

**GROUP BY**는 여러개의 동일한 데이터를 가지는 특정 컬럼을 합쳐주는 역할을 하는 명령

​	※ GROUP BY 사용시 SELECT 설정을 잘해야 한다

- **SQL 그룹함수**
  - COUNT
  - MAX(합쳐지는값 중 최대값)
  - MIN(합쳐지는값 중 최소값)
  - VAR_SAMP(분산 얼마나 데이터들이 넓게 분포 되어있는가)
  - STDDEV(표준편차)



#### COUNT

```mysql
SELECT countryCode, COUNT(countryCode) AS city_count # AS 출력되는 컬럼의 이름을 변경
FROM city
GROUP BY countryCode;
# 중복되는 countryCode를 묶고 각 데이터 수를 COUNT
```



#### DISTINCT

```mysql
SELECT DISTINCT(countryCode)
FROM city
GROUP BY countryCode;
# 중복되는 countryCode를 묶고 출력
```



#### MAX / MIN

```mysql
SELECT continent, MAX(population), MAX(GNP)
FROM country
GROUP BY continent;
# 대륙별로 묶고 그중 가장 인구수와 GNP가 가장 높은 데이터를 출력하여 각각 Column 생성
```



#### SUM

```mysql
SELECT continent, SUM(population), SUM(GNP), SUM(GNP) / SUM(population)
# SELECT에서도 연산이 가능하다
FROM country
GROUP BY continent;
# 대륙별로 묶고 묶인 데이터를 합쳐 출력
```



### 조건문

---

#### IF

```mysql
SELECT name, population, IF(population > 1000000 "big_city", "small_city") as scale
FROM city;
# 도시의 인구가 100만이 넘으면 "big_city" 아니면 "small_city"
```



#### IFNULL, NULL

```mysql
SELECT indepYear IFNULL(indepYear, 0) as indepYear
FROM country
# 독립연도가 없는 데이터는 0으로 출력
```



#### CASE

```mysql
SELECT Name, Population,
	CASE
		WHEN Population >= 1000000000 THEN "upper 1 billion"
		WHEN Population >= 100000000 THEN "upper 100 million"
		ELSE "below 100 milion"
	END as result
from country;
# 나라별로 인구가 10억 이상, 1억 이상, 1억 미만을 출력하는 컬럼을 추가
# 여러가지 조건을 적용해서 데이터들을 넣을수 있다
```



### JOIN

---

**JOIN의 원리 **

| column n | column a |
| :------: | :------: |
|    1     |    a     |
|    2     |    b     |
|    3     |          |

위의 테이블을 JOIN하면 1차적으로 6개의 테이블을 만든 후 JOIN

(쿼리에 순서에 따라 left right가 달라짐)

| column n | column a |
| :------: | :------: |
|    1     |    a     |
|    1     |    b     |
|    2     |    a     |
|    2     |    b     |
|    3     |    a     |
|    3     |    b     |



```mysql
# JOIN을 연습하기 위한 CREATE table & data
CREATE DATEBASE test;
USE test;

CREATE TABLE user (
user_id int(11) unsigned NOT NULL AUTO_INCREMENT,
name varchar(30) DEFAULT NULL,
PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE addr (
id int(11) unsigned NOT NULL AUTO_INCREMENT,
addr varchar(30) DEFAULT NULL,
user_id int(11) DEFAULT NULL,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO user(name)
VALUES ("jin"),
("po"),
("alice"),
("petter");

INSERT INTO addr(addr, user_id)
VALUES ("seoul", 1),
("pusan", 2),
("deajeon", 3),
("deagu", 5),
("seoul", 6);
```

```mysql
SELECT *
FROM user
JOIN addr;
# 총 4 x 5 = 20개
```

생성된 테이블

| user_id | name   | addr    |
| ------- | ------ | ------- |
| 1       | jin    | seoul   |
| 2       | po     | pusan   |
| 3       | alice  | daejeon |
| 4       | petter |         |
| 5       |        | deagu   |
| 6       |        | seoul   |



#### Inner JOIN

```mysql
SELECT user.user_id, user.name, addr.addr
FROM user
JOIN addr
ON user.user_id = addr.user_id;

SELECT user.user_id, user.name, addr.addr
FROM user, addr # ,를 쓰는 장점 여러개의 테이블 JOIN 가능
ON user.user_id = addr.user_id;
# 생략 가능
```

```mysql
# world 데이터 베이스에서 도시이름과 국가 이름을 출력
# 국가 코드, 국가 이름, 도시 이름 출력
USE world;
SELECT city.countryCode, country.name as country_name, city.name as city_name
FROM city
JOIN country
ON city.countryCode = country.Code;
```

| user_id | name  | addr    |
| ------- | ----- | ------- |
| 1       | jin   | seoul   |
| 2       | po    | pusan   |
| 3       | alice | daejeon |

#### LEFT JOIN

```mysql
SELECT user.user_id, user.name, addr.addr
FROM user
LEFT JOIN addr
ON user.user_id = addr.user_id;

use test;
SELECT user.user_id, user.name, addr.addr
FROM addr
LEFT JOIN user
ON user.user_id = addr.user_id;
```

| user_id | name   | addr     |
| ------- | ------ | -------- |
| 1       | jin    | seoul    |
| 2       | po     | pusan    |
| 3       | alice  | daejeon  |
| 4       | petter | **null** |

#### RIGHT JOIN

```mysql
SELECT user.user_id, user.name, addr.addr
FROM user
RIGHT JOIN addr
ON user.user_id = addr.user_id;

USE test;
SELECT user.user_id, user.name, addr.addr
FROM addr
RIGHT JOIN user
ON user.user_id = addr.user_id;
```

| user_id | name     | addr    |
| ------- | -------- | ------- |
| 1       | jin      | seoul   |
| 2       | po       | pusan   |
| 3       | alice    | daejeon |
| 5       | **null** | deagu   |
| 6       | **null** | seoul   |

```mysql
USE world;

# 지역과 대륙별 사용하는 언어 출력
SELECT country.Region, country.continent, countrylanguage.Language
FROM country
JOIN countrylanguage
ON countrylanguage.countryCode = country.Code;

# 국가별 도시별 언어 사용률
SELECT country.name as country_name, city.name as city_name, countrylanguage.language, countrylanguage.percentage, ROUND(country.population * countrylanguage.percentage / 100)
FROM country
JOIN city
ON country.Code = city.countryCode
JOIN countrylanguage
ON country.Code = countrylanguage.countryCode

SELECT country.name as country_name, city.name as city_name, countrylanguage.language, countrylanguage.percentage, ROUND(country.population * countrylanguage.percentage / 100)
FROM country, city, countrylanguage
WHERE country.Code = city.countryCode AND country.Code = countrylanguage.countryCode;
```



### UNION

---

결과 데이터를 합쳐서 출력

```mysql
USE test;
SELECT name
from user
UNION # ALL
select addr
from addr;

# select에 나온것을 하나로 합쳐줌
# 중복되는 데이터를 지움
# 중복을 지우기 싫으면 UNION ALL
```



#### Full Outer JOIN

```mysql
SELECT user.user_id, user.name, addr.addr
FROM user
LEFT JOIN addr
ON user.user_id = addr.user_id
UNION # 중복을 지움
SELECT addr.user_id, user.name, addr.addr
FROM user
RIGHT JOIN addr
ON user.user_id = addr.user_id

# UNION이 user, addr의 교집합(중복)지우고 
# LEFT RIGHT JOIN 했으므로 user, addr의 여집합까지 나온다
```



| user_id | name     | addr     |
| ------- | -------- | -------- |
| 1       | jin      | seoul    |
| 2       | po       | pusan    |
| 3       | alice    | daejeon  |
| 4       | petter   | **null** |
| 5       | **null** | deagu    |
| 6       | **null** | seoul    |



### SUB QUERY

---

Query문 안에 Query문이 있는 것

SELECT, FROM, WHERE 안에서 모두 사용 가능

note) Query 안에 Query 안에 Query 안에 Query도 가능하다



#### SELECT

```mysql
# SUB QUERY : SELECT
# 전체 나라수, 전체 도시수, 전체 언어수를 출력
SELECT
	(SELECT COUNT(name) FROM country AS country_count),
	(SELECT COUNT(name) FROM city AS city_count),
	(SELECT COUNT(DISTINCT(language)) FROM countrylanguage as language_count)
FROM dual;
```



#### FROM

```mysql
# SUB QUERY : FROM
# 800만 이상이 되는 도시의 국가코드, 국가이름, 도시이름, 도시인구수 출력
SELECT city.countryCode, city.name, city.population
FROM (
	SELECT countryCode, name, population
	FROM city
	WHERE population > 8000000
) AS city
JOIN (
	SELECT code, name
	FROM country
) AS country
ON city.countryCode = country.code;
# JOIN을 먼저하면 수많은 row들이 JOIN 된 후 FROM을 하기 때문에 좋지 않다
# 먼저 FROM으로 뽑아내고 JOIN 하는게 빠르다
```



#### WHERE

```mysql
# SUB QUERY : WHERE
# 800만 이상 도시의 국가코드, 국가이름, 대통령 이름
SELECT code, name, headofState
FROM country
WHERE code IN(
	SELECT DISTINCT(countryCode)
	FROM city
	WHERE population > 8000000
);
```







### VIEW

---

- 가상테이블 생성
- 실제 데이터를 저장 X
- 사용목적 : 복잡한 query를 단순하게 만들어 주는 기능
- 수정 및 인덱스 설정 X

```mysql
CREATE VIEW big_city AS
SELECT DISTINCT(countryCode)
FROM city
WHERE population > 8000000;

SELECT *
FROM big_city;
# Query가 줄어들었다
# View는 다른 테이블에서 Query형태로 가져와 묶어 놓은 것
```



### INDEX

---

테이블에서 데이터를 검색할 때 빠르게 찾을수 있게 해주는 기능

- 장점 
  - 검색 속도가 빨라짐

- 단점 
  - 테이블의 저장공간의 약 10% 정도를 더 사용 
  - INSERT, UPDATE, DELET 할 때 쿼리속도가 느려짐
- 사용법 : SELECT 쿼리 실행시 WHERE에 들어가는 column을 INDEX로 설정하면 좋다



```mysql
USE employees;

SELECT *
FROM salaries
WHERE to_date < "1986-01-01"; # 0.733 sec

SHOW INDEX FROM salaries; # 인덱스 보기

CREATE INDEX tdate # 인덱스
ON salaries (to_date); # 컬럼 여러개 생성 가능

SELECT *
FROM salaries
WHERE to_date < "1986-01-01"; # 0.016 sec

DROP INDEX tdate
ON salaries;
```





## DDL 명령어



### 데이터베이스 생성

```mysql
CREATE DATABASE test;
USE test;
SELECT DATABASE();
```



### 테이블 생성

```mysql
# 제약 조건이 없는 테이블
CREATE TABLE user1(
	user_id INT,
	name Varchar(20),
	email Varchar(30),
	age INT(3),
	rdate DATE
);

# 제약 조건이 있는 테이블
CREATE TABLE user2(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	name Varchar(20) NOT NULL, # NOT NULL 반드시 넣어야 하는 것(ex: 가입 ID처럼)
	email Varchar(30) NOT NULL UNIQUE, # UNIQUE 같은 값을 저장할 수 없음
	age INT(3) DEFAULT 30, # DEFAULT 별도의 저장값이 없으면 DEFAULT로 설정한 값 저장
	rdate TIMESTAMP
)
```



#### Varchar



### 데이터 수정(ALTER)

```mysql
# 사용중인 데이터의 인코딩 방식 확인
SHOW VARIABLES LIKE "character_set_database"

# test 데이터베이스의 문자열 인코딩을 utf8으로 변경
ALTER DATABASE test CHARACTER SET = utf8;

# user2 테이블에 TEXT 데이터 타입을 갖는 article 컬럼 추가
ALTER TABLE user2 ADD article TEXT;

# user2 테이블에 article 컬럼을 INT로 변경
ALTER TABLE user2 MODIFY COLUMN article INT;

# user2 테이블에 article 컬럼 삭제
ALTER TABLE user DROP article
```



### INSERT

```mysql
# 테이블 이름 뒤에 오는 컬럼 이름은 생략이 가능하며
# 대신에 VALUE 뒤에 value 값이 순서대로 와야함
INSERT INTO <table_name>(column_name_1, column_name_2, ...)
VALUES(value_1, value_2, ...)
```



```mysql
# test 데이터 선택
USE test;

# user1 테이블에 user_id, name, email, age, rdate 입력
INSERT INTO user1(user_id, name, email, age, rdate) # column 명명
VALUES(1, "gv", "gv@gmail.com", 31, "2019-06-06"),
(2, "leesin", "leesin@gmail.com", 21, "2018-08-08"),
(3, "singed", "singed@gmail.com", 27, "2017-10-10"),
(4, "fizz", "fizz@gmail.com", 18, "now()");
(5, "atrox", "atrox@gmail.com", 24, "2020-02-02");
```



```mysql
# city_2 테이블 생성
CREATE TABLE city_2(
    Name VARCHAR(50),
	CountryCode CHAR(3),
	District VARCHAR(50),
	Population INT
)

# SELECT 절에 나온 결과데이터를 INSERT
INSERT INTO city_2
SELECT name, countryCode, district, population
FROM city
WHERE population > 8000000;
```



### UPDATE SET

```mysql
# 업데이트시에는 항상 SELECT-WHERE로 변경할 데이터를 확인하고
# UPDATE 해줘야 실수를 줄일수 있다
# LIMIT도 함께 사용하면 좋다
UPDATE <tabel_name>
SET <column_name_1> = <value_1>, <column_name_2> = <value_2>, ...
WHERE <condition>
```



```mysql
USE test;
SELECT *
FROM user1;
UPDATE user1
SET age =2 0, email="mysql@gmail.com", name="macbook" # WHERE 설정을 안했을시 모든 데이터가 바뀌므로 주의
WHERE age = 18 # age가 18인 데이터를 찾아서 SET 조건으로 바꿔줌
LIMIT 10;
```



### DELETE, DROP, TRUNCATE

```mysql
# DELETE -> DML
# age가 25이하인 데이터를 삭제
DELETE user1
WHERE age < 25;
```



```mysql
# TRUNCATE -> DDL
# 스키마(테이블 구조)만 남기고 모든 데이터 삭제
TRUNCATE FROM user1;
```



```mysql
# DROP -> DDL
# 테이블 전체를 모두 삭제
DROP TABLE user1;

# 데이터베이스 삭제
DROP DATABASE test;
```















---

---

---



**웹개발**

---

PL

---

기획

디자인

퍼블리셔

프론트엔드

백엔드

DB

SYSTEM