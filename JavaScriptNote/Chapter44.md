# 44장 REST API

- REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

## 44.1 REST API의 구성

- REST API는 자원, 행위, 표현의 3가지 요소로 구성된다.

| 구성 요소 | 내용                           | 표현 방법        |
| --------- | ------------------------------ | ---------------- |
| 자원      | 자원                           | URI              |
| 행위      | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현      | 자원에 대한 행위의 구체적 내용 | 페이로드         |

---

## 44.2 REST API 설계 원칙

- REST에서 가장 중요한 기본적인 원칙은 두가지다. URI는 리소스를 표현하는데 집중하고, 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.

  1.URI는 리소스를 표현해야 한다.

- URI는 리소스를 표현하는데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. 따라서 이름에 get 같은 행위에 대한 표현이 들어가서는 안된다.

  2.리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

- HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다
- 주로 5가지 요청 메서드를 사용하여 CRUD를 구현한다.
  | HTTP 요청 메서드 | 종류 | 목적 | 페이로드 |
  | :--------------- | :------------- | --------------------- | -------- |
  | GET | index/retrieve | 모든/특정 리소스 취득 | ❌ |
  | POST | create | 리소스 생성 | ⭕ |
  | PUT | replace | 리소스의 전체 교체 | ⭕ |
  | PATCH | modify | 리소스의 일부 수정 | ⭕ |
  | DELETE | delete | 모든/특정 리소스 삭제 | ❌ |

- 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다.

---

## 44.3 JSON Server를 이용한 REST API 실습

### 44.3.1 JSON Server 설치

- JSON Server는 json파일을 사용하여 가상 REST API 서버를 구축할 수 있는 툴이다. 먼저 npm을 사용하여 JSON Server를 설치하자

터미널에 다음과 같이 명령어를 입력하여 JSON Server를 설치한다.

```
$ mkdir json- server- exam && cd json- server- exam
$ npm init - y
$ npm install json- server
```

### 44.3.2 db.json 파일 생성

- 프로젝트 루트 폴더에 다음과 같이 db.json 파일을 생성한다. db.json파일은 리소스를 제공하는 데이터베이스 역할을 한다.

```json
{
  "todos": [
    { "id": 1, "content": "HTML", "completed": false },
    { "id": 2, "content": "CSS", "completed": true },
    { "id": 3, "content": "Javascript", "completed": false }
  ]
}
```

### 44.3.3 JSON Server 실행

- 터미널에서 다음과 같이 명령어를 입력하여 JSON Server를 실행한다. JSON Server가 데이터베이스 역할을 하는 db.josn파일의 변경을 가지하게 하려면 watch 옵션을 추가한다.

기본 포트(3000) 사용/ watch 옵션 적용

```
$ json- server - - watch db.json
```

- 기본 포트는 3000이다. 포트를 변경하려면 port 옵션을 추가한다.

포트 변경/ watch 옵션 적용

```
$ json- server - - watch db.json - - port 5000
```

위와같이 매번 명령어를 입력하는 것이 번거로우니 package.json파일의 scripts를 다음과 같이 수정하여 JSON Server를 실행하여 보자.

```json
{
  "name": "rest- api- exam",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "json- server - - watch db.json - - port 5000"
  },
  "dependencies": {
    "json- server": "^0.16.3"
  }
}
```

- 터미널에서 npm start 명령어를 입력하여 JSON Server를 실행한다.

### 44.3.4 GET 요청

- todos 리소르에서 모든 todo를 취득한다.
- JSON Server의 루트 폴터에 public 폴더를 생성하고 JSON Server를 중단한 후 재 실행한다. 그리고 public 폴더에 다음 get_index.html을 추가하고 브라우저에서 http://localhost:3000/get_index.html로 접속한다.

- todos 리소스에서 id를 사용하여 특정 todo를 취득한다. public폴더에 다음 get_retrieve.html을 추가하고 브라우저에서 http://localhost:3000/get_retrieve.html로 접속한다.

### 44.3.5 POST 요청

- todos 리소스에 새로운 todo를 생성한다. POST 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.
- public폴더에 다음 post.html을 추가하고 브라우저에서 http://localhost:3000/post.html로 접속한다.

### 44.3.6 PUT 요청

- PUT은 특정 리소스 전체를 교체할 때 사용한다. todos 리소스에서 id로 todo를 특정하여 id를 제외한 리소스 전체를 교체한다.
- PUT 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.
- public폴더에 다음 put.html을 추가하고 브라우저에서 http://localhost:3000/put.html로 접속한다.

### 44.3.7 PATCH 요청

- PATCH는 특정 리소스의 일부를 수정할 때 사용한다. 다음 예제에서는 todos 리소스의 id로 todo를 특정하여 completed만 수정한다.
- PATCH 요청 시에는 setRequestHeader 메서드를 사용하여 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.
- public폴더에 다음 patch.html을 추가하고 브라우저에서 http://localhost:3000/patch.html로 접속한다.

### 44.3.8 DELETE 요청

- todos 리소스에서 id를 사용하여 todo를 삭제한다.
- public폴더에 다음 delete.html을 추가하고 브라우저에서 http://localhost:3000/delete.html로 접속한다.
