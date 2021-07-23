# 31장 RegExp

## 31.1 정규 표현식이란?

- 정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다.
- 정규 표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다.
- 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

#### 예제 31-01

```js
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = "010-1234-567팔";

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // -> false
```

<!-- Line -->

---

## 31.2 정규 표현식의 생성

- 정규 표현식 객체를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다.
- 정규 표현식 리터럴은 패턴과 플래그로 구성된다.

#### 예제 31 - 02

```js
const target = "Is this all there is?";

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true
```

<!-- Line -->

---

## 31.3 RegExp 메서드

- 정규표현식을 사용하는 자바스크립트 메소드는 RegExp.prototype.exec, RegExp.prototype.test, String.prototype.match, String.prototype.replace, String.prototype.search, String.prototype.split 등이 있다.

### 31.3.1 RegExp.prototype.exec

- exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
- 매칭 결과가 없는 경우 null을 반환한다.
- exec 메서드는 모든 패턴을 검색하는 g플래그를 지정해도 첫 번째 매칭 결과만 반환한다.

#### 예제 31-04

```js
const target = "Is this all there is?";
const regExp = /is/;

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

### 31.3.2 RegExp.prototype.test

- test메서드는 인수로 전달받은 문자열에 대한 저규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

#### 예제 31-05

```js
const target = "Is this all there is?";
const regExp = /is/;

regExp.test(target); // -> true
```

### 31.3.3 String.prototype.match

- match메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.
- g플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

#### 예제 31-06

```js
const target = "Is this all there is?";
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

#### 예제 31-07

```js
const target = "Is this all there is?";
const regExp = /is/g;

target.match(regExp); // -> ["is", "is"]
```

<!-- Line -->

---

## 31.4 플래그

플래그는 아래와 같은 종류가 있다.

<!-- Table -->

| Flag | Meaning     | Description                               |
| :--- | :---------- | :---------------------------------------- |
| i    | Ignore Case | 대소문자를 구별하지 않고 검색한다         |
| g    | Global      | 문자열 내의 모든 패턴을 검색한다.         |
| m    | Multi Line  | 문자열의 행이 바뀌더라도 검색을 계속한다. |

- 플래그는 옵션이므로 선택적으로 사용한다.
- 플래그를 사용하지 않은 경우 대소문자를 구별하고, 문자열 내 검색 매칭 대상이 1개 이상이더라도 첫번째 매칭한 대상만을 검색하고 종료한다.

#### 예제 31-08

```js
const target = "Is this all there is?";

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/gi);
// -> ["Is", "is", "is"]
```

<!-- Line -->

---

## 31.5 패턴

- 패턴에는 검색하고 싶은 문자열을 지정한다.
- 패턴은 /로 열고 닫으며 문자열의 따옴표는 생략한다. 따옴표를 포함하면 따옴표까지도 검색한다.
- 또한 패턴은 특별한 의미를 가지는 메타문자(Metacharacter) 또는 기호로 표현할 수 있다.

### 31.5.1 문자열 검색

- 정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
- 대소문자를 구별하지 않고 검색하려면 플래그 i를 사용한다.
- 검색 대상 문자열 내에서 패턴과 매치하는 모든 문자열을 전역 검색하려면 플래그 g를 사용한다.

#### 예제 31-09

```js
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

#### 예제 31-10

```js
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp = /is/i;

target.match(regExp);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]
```

#### 예제 31-11

```js
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴.
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/gi;

target.match(regExp); // -> ["Is", "is", "is"]
```

### 31.5.2 임의의 문자열 검색

- .은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든지 상관없다. 위 예제의 경우 .를 3개 연속하여 패턴을 생성하였으므로 3자리 문자를 추출한다.

#### 예제 31-12

```js
const target = "Is this all there is?";

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 31.5.3 반복 검색

- {m,n} 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.
- 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의한다.
- {n}은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 즉, {n}은 {n,n}이다.
- {n,}은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.
- +는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. 즉, +는 {1,}과 같다.
- ?는 앞선 패턴이 최대 한번(0번 포함) 반복되는 문자열을 의미한다. 즉 ?는 {0,1}과 같다.

#### 예제 31-13

```js
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]
```

#### 예제 31-14

```js
const target = "A AA B BB Aa Bb AAA";

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]
```

#### 예제 31-15

```js
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;

target.match(regExp); // -> ["AA", "AAA"]
```

#### 예제 31-16

```js
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp = /A+/g;

target.match(regExp); // -> ["A", "AA", "A", "AAA"]
```

#### 예제 31-17

```js
const target = "color colour";

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
const regExp = /colou?r/g;

target.match(regExp); // -> ["color", "colour"]
```

### 31.5.4 OR 검색

- |은 or의 의미를 갖는다. 분해되지 않는 단어 레벨로 검색하기 위해서는 +를 함께 사용한다.
- [ ]내의 문자는 or로 동작한다. A|B는 [AB]로 나타낼 수 있다.
- [ ]내에 -를 사용하면 범위를 지정할 수 있다.
- \d는 숫자를 의미한다. 즉 \d는 [0-9]와 같다.
- \D는 \d와 반대로 숫자가 아닌 문자를 의미한다.
- \w는 알파벳, 숫자, 언더스코어를 의미한다. 즉, \w는 [A-Za-z0-9]와 같다.
- \W는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

#### 예제 31-18

```js
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;

target.match(regExp); // -> ["A", "A", "A", "B", "B", "B", "A", "B"]
```

#### 예제 31-20

```js
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /[AB]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

#### 예제 31-25

```js
const target = "AA BB 12,345";

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\d,]+/g;

target.match(regExp); // -> ["12,345"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

target.match(regExp); // -> ["AA BB ", ","]
```

#### 예제 31-26

```js
const target = "Aa Bb 12,345 _$%&";

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

target.match(regExp); // -> ["Aa", "Bb", "12,345", "_"]

// 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\W,]+/g;

target.match(regExp); // -> [" ", " ", ",", " $%&"]
```

### 31.5.5 NOT 검색

- [...]내의 ^은 not의 의미를 갖는다.

#### 예제 31-27

```js
const target = "AA BB Aa Bb 12";

// 숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^0-9]+/g;

target.match(regExp); // -> ["AA BB Aa Bb"]
```

### 31.5.6 시작 위치로 검색

- [...] 밖의 ^은 문자열의 시작을 의미한다.

#### 예제 31-28

```js
const target = "https://poiemaweb.com";

// 'https'로 시작하는지 검사한다.
const regExp = /^https/;

regExp.test(target); // -> true
```

### 31.5.7 마지막 위치로 검색

- $는 문자열의 마지막을 의미한다.

#### 예제 31-29

```js
const target = "https://poiemaweb.com";

// 'com'으로 끝나는지 검사한다.
const regExp = /com$/;

regExp.test(target); // -> true
```

<!-- Line -->

---

## 31.6 자주 사용하는 정규표현식

### 31.6.1 특정 단어로 시작하는 검사

- [...] 바깥의 ^은 문자열의 시작을 의미하고, ?은 앞선 패턴이 최대 한 번이상 반복되는지를 의미한다.

#### 예제 31-30

```js
const url = "https://example.com";

// 'http://' 또는 'https://'로 시작하는지 검사한다.
/^https?:\/\//.test(url); // -> true
```

#### 예제 31-31

```js
/^(http|https):\/\//.test(url); // -> true
```

### 31.6.2 특정단어로 끝나는지 검사

- '$는 문자열의 마지막을 의미한다.

#### 예제 31-32

```js
const fileName = "index.html";

// 'html'로 끝나는지 검사한다.
/html$/.test(fileName); // -> true
```

### 31.6.3 숫자로만 이루어진 문자열인지 검사

- [...] 바깥의 ^은 문자열의 시작을, $는 문자열의 마지막을 의미한다. \d는 숫자를 의미하고 +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미한다.
- 즉, 처음과 끝이 숫자이고 최소 한 번 이상 반복되는 문자열과 매치한다.

#### 예제 31-33

```js
const target = "12345";

// 숫자로만 이루어진 문자열인지 검사한다.
/^\d+$/.test(target); // -> true
```

### 31.6.4 하나 이상의 공백으로 시작하는지 검사

- \s는 여러가지 공백 문자9스페이스, 탭 등)를 의미한다.

#### 예제 31-34

```js
const target = " Hi!";

// 하나 이상의 공백으로 시작하는지 검사한다.
/^[\s]+/.test(target); // -> true
```

### 31.6.5 아이디로 사용 가능한지 검사

- 다음 예제는 검색 대상 문자열이 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.

#### 예제 31-35

```js
const id = "abc123";

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/.test(id); // -> true
```

### 31.6.6 메일 주소 형식에 맞는지 검사
- 검색 대상 문자열이 메일 주소 형식에 맞는지 검사하는 예제
- 인터넷 메시지 형식 규약인 RFC 5322에 맞는 정교한 패턴 매칭이 필요하다면 복잡한 패턴을 사용할 필요가 있다.

#### 예제 31-36

```js
const email = "ungmo2@gmail.com";

/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])_@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])\_\.[a-zA-Z]{2,3}$/.test(
  email
); // -> true
```

### 31.6.7 핸드폰 번호 형식에 맞는지 검사

- 다음 예제는 검색 대상 문자열이 핸드폰 번호 형식에 맞는지 검사한다.

#### 예제 31-38

```js
const cellphone = "010-1234-5678";

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // -> true
```

### 31.6.8 특수 문자 포함 여부 검사

- 검색 대상 문자열에 특수 문자가 포함되어 있는지 검사한다. 특수문자는 A-Za-z-0-9 이외의 문자다.
- 특수 문자를 제거할 때는 String.prototype.replace메서드를 사용한다.

#### 예제 31-39

```js
const target = "abc#123";

// A-Za-z0-9 이외의 문자가 있는지 검사한다.
/[^a-za-z0-9]/gi.test(target); // -> true
```

#### 예제 31-40

```js
/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(target); // -> true
```

#### 예제 31-41

```js
target.replace(/[^a-za-z0-9]/gi, ""); // -> abc123
```
