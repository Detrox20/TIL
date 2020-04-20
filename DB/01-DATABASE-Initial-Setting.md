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