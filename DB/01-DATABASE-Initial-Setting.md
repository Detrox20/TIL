# DATABASE

**DB: Database**

데이터를 통합하여 관리하는 데이터의 집합



**DBMS : Database Management System**

데이터 베이스를 관리하는 미들웨어 시스템, 데이터 베이스 관리 시스템



**RDBMS : Relational Database Management System**

데이터의 테이블 사이에 키값으로 관계를 가지고 있는 데이터 베이스

- Oracle, Mysql, Postgresql, Sqlite



**NoSQL**

데이터 테이블 사이의 관계가 없어 데이터를 저장하는 데이터 베이스

데이터 사이의 관계가 없으므로 복잡성이 작고 많은 데이터의 저장이 가능

- MongoDB, Hbase, Cassandra





## 강의에 필요한 환경설정

- Amazon AWS
- Ubuntu
- Mysql
- Workbench



### Amazon AWS

---

아마존 웹 서비스



### Ubuntu

---

Linux Debian 계열로 Desktop용 Linux 배포판 가운데 현재 사용률이 가장 높다



### MySQL

---

데이터를 저장 및 관리할 수 있는 기능들을 제공하는 DBMS 중 하나



### Workbench

---

Mysql Management Tool



### 환경설정

---

- **구성목표**
  - AWS EC2 인스턴스에 Ubuntu OS에 MySQL 5.7.x 버전 설치



1. AWS EC2 인스턴스에 Ubuntu Server 18.04 LTS (HVM), SSD Volume Type

2. 유형 : t2.micro(프리 티어 사용 가능)

3. 보안그룹에서 3306(MySQL), 27017(MongoDB), 80(기본) port 추가

4. ES2 인스턴스 접속 pem 파일 생성 / 이동, password 설정 및 read-only(400) 권한 변경

5. .ssh 숨김파일 설정

6. ubuntu 설정

   ```mysql
   $ ssh -i /c/.ssh/fds.pem ubuntu@IPv4퍼블릭IP 
   ```

7. apt-get 업데이트

   ```my
   $ sudo apt-get update -y
   $ sudo apt-get upgrade -y
   ```

8. MySQL Server 설치

   ```mysql
   $ sudo apt-get install -y mysql-server mysql-client
   ```

9. MySQL Secure 설정

   ```mysql
   $ sudo mysql_secure_installation
   Would you like to setup VALIDATE PASSWORD plugin? N
   New password: rada
   Re-enter new password: rada
   Remove anonymous users? Y
   Disallow root login remotely? N
   Remove test database and access to it? Y
   Reload privilege tables now? Y
   ```

10. MySQL Password 설정

    ```mysql
    $ sudo mysql
    mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
    BY 'fds';
    mysql> FLUSH PRIVILEGES;
    mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
    mysql> exit
    ```

11. 설정한 password를 입력하여 접속

    ```mysql
    $ mysql -u root -p
    Enter password : *****
    ```

12. 외부 접속 설정

    ```mysql
    $ sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
    ```

13. bind-address 변경 (127.0.0.1 => 0.0.0.0)

14. 외부접속 패스워드 설정

    ```mysql
    mysql> grant all privileges on *.* to root@'%' identified by '*****';
    ```

15. 서버 시작 종료 상태확인

    ```mysql
    $ sudo systemctl start mysql.service
    $ sudo systemctl stop mysql.service
    $ sudo systemctl restart mysql.service
    $ sudo systemctl status mysql.service
    ```

16. 설정 후 서버 재시작으로 설정 내용 적용

    ```mysql
    $ sudo systemctl restart mysql.service
    ```

17. password 변경 : rada로 패스워드 변경하는 경우

    ```mysql
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'rada';
    ```

18. Workbench 다운로드



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

GROUP BY는 여러개의 동일한 데이터를 가지는 특정 컬럼을 합쳐주는 역할을 하는 명령

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



## 조건문



### IF

```mysql
SELECT name, population, IF(population > 1000000 "big_city", "small_city") as scale
FROM city;
# 도시의 인구가 100만이 넘으면 "big_city" 아니면 "small_city"
```



### IFNULL, NULL

```mysql
SELECT indepYear IFNULL(indepYear, 0) as indepYear
FROM country
# 독립연도가 없는 데이터는 0으로 출력
```



### CASE

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





---

---

---



select from 



where 데이터 가져오는 방법



group by 뭉쳐서 가져옴

data type, constraint

insert, update, delete

functions crud?



join union 두개의 데이터를 합쳐서

sub-query 쿼리안에 쿼리

view, index 간판사용법 빠르게 가져오는 문법

crontab 주기적으로 백업하는법

backup 

replication 동기화 서버의 부하를 분산할 수 있다

s1

s2 s3 s4 서버 부하 분산

d1(master) insert

d2 d3 d4 셀렉은 위로



rdbms 

데이터 저장이 느림 insert 느리고 selector가 빠름

noSQL

반대

데이터 가져오는게 빠르고



client(browser)

브라우저를 통해 서버에 데이터를 요청 URL 요청

server(web app-> DB)

client가 데이터를 요청하면 요청에 따라 데이터를 전송 HTML CSS JS IMG



### URL 구조

https:// protocol

news - sub domain

naver.com domain

80 port

/main/ path 디렉토리

read.nhn page

?mode 쿼리() 서버에 정보를 보낼때

#da_727145 프레임워드



### 전송 방식

GET

URL에 데이터가 포함 -> 데이터가 노출

길이 제한이 있음



POST

BODY에 데이터가 포함 -> 데이터가 노출 X



### 인터넷

TCP/IP라는 통신 프로토콜을 이용해 정보를 주고 받는 컴퓨터 네트워크

우리는 인터넷을 오또케?

해저케이블을 이용하여 전세계 서버에 접속하여 인터넷을 사용

무선인터넷

선이 아니라 주파수를 매체로 사용함 간섭이 심함

기지국부턴 유선

우리가 사용하는 단말기만 무선



Cookie



client에 저장하는 문자열 데이토로 도메인 별로 따로 저장

로그인 정보 내가 봤던 상품 정보, 팝업 다시보지 않음

하나으ㅢ 클라이언트에 300개, 도메인당 20개, 쿠키 하나당 4Kbyte



Session

Server에 저장하는 객체 데이터, 브라우저와 연결시 Session ID 생성

Session ID를 Cookie에 저장함으로 로그인 연결 유지

같은 브라우저로 같은 서버에 접속하면 Session ID가 같음

로그인 연결정보 원하는 객체 데이터



Cache

껏다키면 없어지는 메모리



Error message

2xx success

3xx redirection(browser cache

4xx request error

5xx server error



ip internet protocol

ip rfc



3306

27017

80



0.0.0.0/0 모든 소스 접속 가능

회사아이피.32/0 면 회사에만 접속 가능

8 16 24 32



키페어(password)

cyberduck filezilla



history

!Number

history | ssh





"%Republic%"



### 강사님 이력

---

시지온

JLK-Inpection

N3N

Veranos