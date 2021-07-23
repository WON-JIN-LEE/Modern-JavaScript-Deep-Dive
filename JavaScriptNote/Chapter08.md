# Chapter 8

## 8.1 블록문

    - 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다.

## 8.4 break 문

    - Break문은 레이블문, 반복문, 또는 Switch문의 코드 블록을 탈출한다. 이외에 break문을 사용하면 SyntaxError(문법 에러)가 발생한다.
    - 레이블 문이란 식별자가 붙은 문을 말한다.
    - 중첩된 반복문에서 break문을 실행하면 내부 반복문을 탈출하여 외부 반복문으로 진입한다. 이때 내부가 아닌 외부 반복문을 탈출하려면 레이블문을 작성해야한다.
    -Break문은 박복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용하다.

### 예제 08-20

```javascript
// foo 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo;
  console.log(2);
}

console.log("Done!");
```

### 예제 08-21

```javascript
//outer라는 식별자가 붙은 레이블 for문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3 이면 outer라는 식별자가 붙은 레이블 for문을 탈출한다.
    if (i + j === 3) break outer;
    console.log(`inner [${i}, ${j}]`);
  }
}

console.log("Done!");
```

### 예제08 - 22

```javascript
var string = "Hello World";
var search = "l";
var index;

for (var i = 0; i < string.length; i++) {
  if (string[i] === search) {
    index = i;
    break;
  }
}

console.log(index);
```

## 8.5 continue 문

    -Continue문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.
