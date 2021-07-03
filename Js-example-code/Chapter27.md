# 27장 배열

## 27.1 배열이란?

- 배열은 여러개의 값을 순차적으로 나열한 자료구조다.
- 배열이 가지고 있는 값을 요소라고 부른다.
- 원시값은 물론 객채, 함수, 배열등 자바스크립트에서 값으로 인정하는 모든 것은 배열의 요소가 될 수 있다.
- 배열의 요소는 배열에서 자신의 위치를 나타내는 0이상의 정수인 인덱스를 갖는다.
- 배열은 요소의 개수, 즉 배열의 길이를 나타내는 length프로퍼티를 갖는다.
- 자바스크립트에 배열은 객체 타입이다.

> 배열 객체와 일반 객체와는 구별되는 특징

<!-- Table -->

|      구분       |       객체       |     배열      |
| :-------------: | :--------------: | :-----------: |
|      구조       | 프로퍼티 키와 값 | 인덱스와 요소 |
|    값의 참조    |   프로퍼티 키    |    인덱스     |
|    값의 순서    |        ❌        |      ⭕       |
| length 프로퍼티 |        ❌        |      ⭕       |

<!-- Line -->

---

## 27.2 자바스크립트 배열은 배열이 아니다.

- 자료구조에서 말하는 배열은 연속적으로 인접해 있다. 이러한 배열을 밀집 배열이라 한다.
- 하지만 자바스크립트의 배열은 일반적인 의미의 배열과 다르다.
- 즉 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다.
- 배열의 요소가 연속적으로 이어져 있지 않는 배열을 희소 배열이라 한다.
- 자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다.
- 자바스크립트 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며, length 프로퍼티를 갖는 특수한 객체다.
- 자바스크립트 배열의 요소는 사실 프로퍼티 값이다.

> 일반적인 배열과 자바스크립트 배열의 장단점

- 일반적인 배열은 인덱스로 요소에 빠르게 접근할 수 있다. 하지만 특정 요소를 검색하거나 요소를 삽입, 삭제하는 경우에는 효율적이지 않다.
- 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 일반적인 배열보다 성능적인 명에서 느릴수밖에 없는 구조적인 단점이 있다. 하지만 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.
<!-- Line -->

---

## 27.3 length 프로퍼티와 희소 배열

- length 프로퍼티는 요소의 개수, 즉 배열의 길이를 나타내는 0이상의 정수를 값으로 갖는다.
- 즉 배열은 요소를 최대 2^32- 1(4,294,967,295)개 가질 수 있다.
- length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.
- length 프로퍼티 값은 임의의 숫자 값을 명시적으로 할당할 수도 있다.
- length 프로퍼티 값보다 작은 값을 할당하면 배열의 길이가 줄어든다. 하지만 큰 값을 할당하는 경우 length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
- 값 없이 비어있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않는다.
- 이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열을 희소 배열이라한다.
- 일반적인 배열은 배열의 길이와 언제나 일치한다. 하지만 희소 배열은 length와 배열요소의 개수가 일치하지 않는다.
- 희소배열의 length는 희소 배열의 실제 요소 개수 보다 언제나 크다.
- 자바스크립트는 희소 배열은 사용하지 않는 것이 좋다.
- 모던 자바스크립트 엔진은 요소의 타입이 일치하는 배열을 생성할 때 일반적인 의미의 배열처럼 연속된 메모리 공간을 확보하는 것으로 알려져있다.
- 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.
<!-- Line -->

---

## 27.4 배열 생성

### 27.4.1 배열 리터럴

- 객체와 마찬가로 배열도 다양한 생성방식이 있다.
- 보편적이고 간편한 배열 생성방식은 배열 리터럴을 사용하는 것이다.
- 배열 리터럴은 0개 이상의 요소를 쉼표로 구분하여 대괄호 [ ] 로 묶는다.
- 배열 리터럴은 객체 리터럴과 달리 프로퍼티 키가 없고 값만 존재한다.
- 배열 리터럴에 요소를 생략하면 희소 배열이 생성된다.

### 예제27-18

```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

### 예제27-19

```javascript
const arr = [];
console.log(arr.length); // 0
```

### 예제27-20

```javascript
const arr = [1, , 3]; // 희소 배열

// 희소 배열의 length는 배열의 실제 요소 개수보다 언제나 크다.
console.log(arr.length); // 3
console.log(arr); // [1, empty, 3]
console.log(arr[1]); // undefined
```

### 27.4.2 Array 생성자 함수

- Array 생성자 함수를 통해 배열을 생성할 수도 있다.
- 전달된 인수가 1개이고 숫자인 경우 length 프로퍼티 값이 인수인 배열을 생성한다.
- 이때 생성된 배열은 희소 배열이다. length 값은 0이 아니지만 실제로 배열의 요소는 존재하지 않는다.
- 전달된 인수가 없는 경우 빈 배열을 생성한다. 즉 배열 리터럴 []과 같다.
- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.
- Array 생성자 함수는 new연산자와 함께 호출하지 않더라도, 즉 일반 함수로서 호출해도 배열을 생성하는 생성자 함수로 동작한다.

### 예제27-21

```javascript
const arr = new Array(10);

console.log(arr); // [empty × 10]
console.log(arr.length); // 10
```

### 예제27-22

```javascript
console.log(Object.getOwnPropertyDescriptors(arr));
/_
{
length: {value: 10, writable: true, enumerable: false, configurable: false}
}
_/
```

### 예제27-23

```javascript
// 배열은 요소를 최대 4,294,967,295개 가질 수 있다.
new Array(4294967295);

// 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError가 발생한다.
new Array(4294967296); // RangeError: Invalid array length

// 전달된 인수가 음수이면 에러가 발생한다.
new Array(-1); // RangeError: Invalid array length
```

### 예제27-24

```javascript
new Array(); // -> []
```

### 예제27-25

```javascript
// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
new Array(1, 2, 3); // -> [1, 2, 3]

// 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
new Array({}); // -> [{}]
```

### 예제27-26

```javascript
Array(1, 2, 3); // -> [1, 2, 3]
```

### 27.4.3 Array.of

- ES6에서 도입된 Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다.
- 전달된 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열을 생성한다.

### 예제27-27

```javascript
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]

Array.of(1, 2, 3); // -> [1, 2, 3]

Array.of("string"); // -> ['string']
```

### 27.4.4 Array.from

- ES6에서 도입된 Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.
- Array.from을 사용하면 두번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.

- 유사 배열 객체 : 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다.
- 이터러블 객체 : 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체를 말한다. Array, String, Map, Set, DOM 컬렉션, arguments 등이 있다.

### 예제27-28

```javascript
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: "a", 1: "b" }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from("Hello"); // -> ['H', 'e', 'l', 'l', 'o']
```

### 예제27-29

```javascript
// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (\_, i) => i); // -> [0, 1, 2]
```

<!-- Line -->

---

## 27.5 배열 요소의 참조

- 배열의 요소를 참조할 때에는 대괄호 [ ] 표기법을 사용한다. 대괄호 안에는 인덱스가 와야한다.
- 존재하지 않는 요소에 접근하면 undefined가 반환된다.
- 배열은 사실 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체다.
- 희소 배열도 존재하지 않는 요소 참조하면 undefined가 반환된다.
<!-- Line -->

---

## 27.6 배열 요소의 추가와 갱신

- 배열에도 요소를 동적으로 추가할 수 있다. 요소가 추가되면 이때 length 프로퍼티 값은 자동 갱신된다.
- 만약 현재 배열의 length프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
- 이때 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
- 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.
- 인덱스는 요소의 위치를 나타내므로 0이상의 정수를 사용해야한다.
- 만약 정수 이외의 값을 인덱스처럼 사용하면 요소가 아니라 프로퍼티가 생성된다. 이때 추가된 프로퍼티는 length프로퍼티 값에 영향을 주지 않는다.

### 예제27-38

```javascript
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr["1"] = 2;

// 프로퍼티 추가
arr["foo"] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```

<!-- Line -->

---

## 27.7 배열 요소의 삭제

- 배열은 사실 객체이기 때문에 delete 연산자를 사용할 수 있다.
- delete 연산자는 객체의 프로퍼티를 삭제한다. 삭제 후 배열은 희소 배열이 되며 length 프로퍼티 값은 변하지 않는다.
- 따라서 delete 연산자를 사용하지 않는 것이 좋다.
- 희소배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 Array.prototype,splice 메서드를 사용한다.
<!-- Line -->

---

## 27.8 배열 메서드

- Array생성자 함수는 정적 메서드를 제공하며, 배열 객체의 프로토타입인 Array.prototype은 프로토타입 메서드를 제공한다.
- 배열에는 원본 배열을 직접 변경하는 메서드와 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.
- 부수효과를 줄이기 위해 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋다,

### 예제27-41

```javascript
const arr = [1];

// push 메서드는 원본 배열(arr)을 직접 변경한다.
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
const result = arr.concat(3);
console.log(arr); // [1, 2]
console.log(result); // [1, 2, 3]
```

### 27.8.1 Array.isArray

- Array 생성자 함수의 정적 메서드다.
- Array.isArray 메서드는 전달된 인수가 배열이면 true, 아니면 false를 반환한다.

### 예제27-42

```javascript
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 });
```

### 27.8.2 Array.prototype.indexOf

- 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.
- 중복되는 요소가 있는 경우, 첫번째 인덱스를 반환한다.
- 해당하는 요소가 없는 경우, -1을 반환한다.
- indexOf 메소드는 배열에 요소가 존재하는지 여부를 확인할 때 유용하다.
- ES7에서 새롭게 도입된 Array.prototype.includes 메소드를 사용하면 보다 가독성이 좋다.

### 예제27-43

```javascript
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
arr.indexOf(2); // -> 1
// 배열 arr에 요소 4가 없으므로 -1을 반환한다.
arr.indexOf(4); // -> -1
// 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // -> 2
```

### 예제27-44

```javascript
const foods = ["apple", "banana", "orange"];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (foods.indexOf("orange") === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push("orange");
}

console.log(foods); // ["apple", "banana", "orange"]
```

### 예제27-45

```javascript
const foods = ["apple", "banana"];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods.includes("orange")) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push("orange");
}

console.log(foods); // ["apple", "banana", "orange"]
```

### 27.8.3 Array.prototype.push

- 인수로 전달받은 모든 값을 원본 배열의 마지막에 요소로 추가하고 변경된 length 값을 반환한다.
- push 메소드는 원본 배열을 직접 변경한다.
- push 메서드는 원본 배열을 직접 변경하는 부수 효과가 있다.
- 따라서 push 메소드보다는 ES6의 spread 문법을 사용하는 편이 좋다.

### 예제27-46

```javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열 arr의 마지막 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.push(3, 4);
console.log(result); // 4

// push 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 2, 3, 4]
```

### 27.8.4 Array.prototype.pop

- 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 undefined를 반환한다.
- pop 메소드는 원본 배열을 직접 변경한다.
- pop 메소드와 push 메소드를 사용하면 스택을 쉽게 구현할 수 있다.
- 스택(stack)은 데이터를 마지막에 밀어 넣고, 마지막에 밀어 넣은 데이터를 먼저 꺼내는 후입 선출(LIFO - Last In First Out) 방식의 자료 구조이다.

### 예제27-49

```javascript
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]
```

### 예제27-50

```javascript
const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) {
      // "47. 에러 처리" 참고
      throw new TypeError(`${array} is not an array.`);
    }
    this.array = array;
  }

  Stack.prototype = {
    // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
    constructor: Stack,
    // 스택의 가장 마지막에 데이터를 밀어 넣는다.
    push(value) {
      return this.array.push(value);
    },
    // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
    pop() {
      return this.array.pop();
    },
    // 스택의 복사본 배열을 반환한다.
    entries() {
      return [...this.array];
    },
  };

  return Stack;
})();

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1, 2]

stack.push(3);
console.log(stack.entries()); // [1, 2, 3]

stack.pop();
console.log(stack.entries()); // [1, 2]
```

### 27.8.5 Array.prototype.unshift

- unshift 메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
- 원본 배열을 직접 변경한다.
- 따라서 unshift 메소드보다는 ES6의 spread 문법을 사용하는 편이 좋다.

### 예제27-52

```javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3, 4);
console.log(result); // 4

// unshift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 4, 1, 2]
```

### 27.8.6 Array.prototype.shift

- 배열에서 첫요소를 제거하고 제거한 요소를 반환한다. 만약 빈 배열일 경우 undefined를 반환한다.
- shift 메소드는 대상 배열 자체를 변경한다.
- shift는 push와 함께 배열을 큐(FIFO: First In First Out)처럼 동작하게 한다.

### 예제27-54

```javascript
const arr = [1, 2];

// 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.shift();
console.log(result); // 1

// shift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [2]
```

### 예제27-55

```javascript
const Queue = (function () {
  function Queue(array = []) {
    if (!Array.isArray(array)) {
      // "47. 에러 처리" 참고
      throw new TypeError(`${array} is not an array.`);
    }
    this.array = array;
  }

  Queue.prototype = {
    // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
    constructor: Queue,
    // 큐의 가장 마지막에 데이터를 밀어 넣는다.
    enqueue(value) {
      return this.array.push(value);
    },
    // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
    dequeue() {
      return this.array.shift();
    },
    // 큐의 복사본 배열을 반환한다.
    entries() {
      return [...this.array];
    },
  };

  return Queue;
})();

const queue = new Queue([1, 2]);
console.log(queue.entries()); // [1, 2]

queue.enqueue(3);
console.log(queue.entries()); // [1, 2, 3]

queue.dequeue();
console.log(queue.entries()); // [2, 3]
```

### 27.8.7 Array.prototype.concat

- 인수로 전달된 값들(배열 또는 값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.
- 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다. 원본 배열은 변경되지 않는다.
- push와 unshift 메서드는 concat메서드로 대체 할 수 있다.
- push와 unshift 메서드는 원본 배열을 직접 변경하지만 concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다. 따라서 push와 unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 하며 concat메서드를 사용할 경우 반환값을 반드시 변수에 할당받아야 한다.
- 인수로 전달받은 값이 배열인 경우 push와 unshift 메서드는 배열을 그대로 원본 배열의 마지막/첫 번째 요소로 추가하지만 concat메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가한다.
- concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
- 결론적으로 ES6의 스프레드 문법을 일관성 있게 사용하는 것을 권장한다.

### 예제27-57

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않는다.
console.log(arr1); // [1, 2]
```

### 27.8.8 Array.prototype.splice

- 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메서드를 사용한다.
- 원본 배열을 직접 변경한다. 제거된 요소가 반환된다. 매개변수는 3개가 있다.

> 매개변수

        start
        - 배열에서의 시작 위치이다. start 만을 지정하면 배열의 start부터 모든 요소를 제거한다.
        deleteCount
        - 시작 위치(start)부터 제거할 요소의 수이다. deleteCount가 0인 경우, 아무런 요소도 제거되지 않는다. (옵션)
        items
        - 삭제한 위치에 추가될 요소들이다. 만약 아무런 요소도 지정하지 않을 경우, 삭제만 한다. (옵션)

- splice 메서드의 두 번째 인수, 즉 제거할 요소의 개수를 0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입한다.
- 두 번째 인수를 전달하지 않으면 첫 번째 인수를 전달된 시작 인덱스부터 모든 요소를 제거한다.
- 세번째 인수를 전달하지 않으면 원본 배열에서 지정된 요소를 제거하기만 한다.
- filter 메서드를 사용하여 특정 요소를 제거할 수도 있다. 하지만 특정 요소가 중복된 경우 모두 제거된다.

### 예제27-61

```javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
// splice 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 20, 30, 4]
```

### 예제27-66

```javascript
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 모든 item 요소를 제거한다.
function removeAll(array, item) {
  return array.filter((v) => v !== item);
}

console.log(removeAll(arr, 2)); // [1, 3, 1]
```

### 27.8.9 Array.prototype.slice

- 인자로 지정된 배열의 부분을 복사하여 반환한다. 원본 배열은 변경되지 않는다.
- 첫번째 매개변수 start에 해당하는 인덱스를 갖는 요소부터 매개변수 end에 해당하는 인덱스를 가진 요소 전까지 복사된다.

> 매개변수

        start
        - 복사를 시작할 인텍스. 음수인 경우 배열의 끝에서의 인덱스를 나타낸다. 예를 들어 slice(-2)는 배열의 마지막 2개의 요소를 반환한다.
        end
        - 복사를 종료할 인덱스다. 옵션이며 기본값은 length 값이다.

- slice메서드의 두번째 인수를 생략하면 첫 번째 인수로 전달받은 인덱스 부터 모든 요소를 복사하여 배열로 반환한다.
- slice 메서드의 첫 번째 인수가 음수인 경우 배열의 끝에서부터 요소를 복사하여 배열로 반환한다.
- slice메서드의 인수로 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다. 이때 생성된 복사본은 얕은 복사를 통해 생성된다.
- slice메서드로 유사 배열 객체를 배열로 변환할 수 있다.

### 예제27-67

```javascript
const arr = [1, 2, 3];

// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
arr.slice(0, 1); // -> [1]

// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
arr.slice(1, 2); // -> [2]

// 원본은 변경되지 않는다.
console.log(arr); // [1, 2, 3]
```

### 예제27-68

```javascript
const arr = [1, 2, 3];

// arr[1]부터 이후의 모든 요소를 복사하여 반환한다.
arr.slice(1); // -> [2, 3]
```

### 예제27-69

```javascript
const arr = [1, 2, 3];

// 배열의 끝에서부터 요소를 한 개 복사하여 반환한다.
arr.slice(-1); // -> [3]

// 배열의 끝에서부터 요소를 두 개 복사하여 반환한다.
arr.slice(-2); // -> [2, 3]
```

### 예제27-70

```javascript
const arr = [1, 2, 3];

// 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.
const copy = arr.slice();
console.log(copy); // [1, 2, 3]
console.log(copy === arr); // false
```

### 예제27-71

```javascript
const todos = [
{ id: 1, content: 'HTML', completed: false },
{ id: 2, content: 'CSS', completed: true },
{ id: 3, content: 'Javascript', completed: false }
];

// 얕은 복사(shallow copy)
const \_todos = todos.slice();
// const \_todos = [...todos];

// \_todos와 todos는 참조값이 다른 별개의 객체다.
console.log(\_todos === todos); // false

// 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다.
console.log(\_todos[0] === todos[0]); // true
```

### 27.8.10 Array.prototype.join

- 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 값, 즉 구분자(separator)로 연결한 문자열을 반환한다.
- 구분자(separator)는 생략 가능하며 기본 구분자는 " , "이다.

### 예제27-75

```javascript
const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환한다.
arr.join(); // -> '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환한다.
arr.join(""); // -> '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환한다.ㄴ
arr.join(":"); // -> '1:2:3:4'
```

### 27.8.11 Array.prototype.reverse

- 배열 요소의 순서를 반대로 변경한다. 이때 원본 배열이 변경된다. 반환값은 변경된 배열이다.

### 예제27-76

```javascript
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열이다.
console.log(result); // [3, 2, 1]
```

### 27.8.12 Array.prototype.fill

- ES6에서 도입된 fill 메서드는 인수로 전달받은 값을 배여르이 처음부터 끝까지 요소로 채운다. 이때 원본 배열이 변경된다.
- 두 번째 인수는 요소 채우기를 시작할 인덱스를 전달한다.
- 세 번째 인수는 요소 채우기를 멈출 인덱스를 전달할 수 있다.
- fill메서드를 사용하면 배열을 생성하면서 특정 값으로 요소를 채울 수 있다.

### 예제27-77

```javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0을 배열의 처음부터 끝까지 요소로 채운다.
arr.fill(0);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]
```

### 예제27-78

```javascript
const arr = [1, 2, 3];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 끝까지 요소로 채운다.
arr.fill(0, 1);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0]
```

### 예제27-79

```javascript
const arr = [1, 2, 3, 4, 5];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채운다.
arr.fill(0, 1, 3);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0, 4, 5]
```

### 예제27-80

```javascript
const arr = new Array(3);
console.log(arr); // [empty × 3]

// 인수로 전달받은 값 1을 배열의 처음부터 끝까지 요소로 채운다.
const result = arr.fill(1);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 1, 1]

// fill 메서드는 변경된 원본 배열을 반환한다.
console.log(result); // [1, 1, 1]
```

### 27.8.13 Array.prototype.includes

- ES7에서 도입된 includes 메서드는 배열 내에 특정 요소가 포함되어 있는지 확인하여 true또는 false를 반환한다.
- 첫 번째 인수로 검색할 대상을 지정한다.
- 두 번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. 두 번째 인수를 생략할 경우 기본값 0이 설정된다.
- 만약 두 번째 인수로 음수를 전달하면 length 값과 음수 인덱스를 합산하여 검색을 시작한다.
- indexOf메서드를 사용하면 반환값이 -1 인지 확인해 보아야 하고 배열에 NaN이 포함되어 있는지 확인할 수 없다는 문제가 있다.

### 예제27-82

```javascript
const arr = [1, 2, 3];

// 배열에 요소 2가 포함되어 있는지 확인한다.
arr.includes(2); // -> true

// 배열에 요소 100이 포함되어 있는지 확인한다.
arr.includes(100); // -> false
```

### 예제27-83

```javascript
const arr = [1, 2, 3];

// 배열에 요소 1이 포함되어 있는지 인덱스 1부터 확인한다.
arr.includes(1, 1); // -> false

// 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인한다.
arr.includes(3, -1); // -> true
```

### 예제27-84

```javascript
[NaN].indexOf(NaN) !== -1; // -> false
[NaN].includes(NaN); // -> true
```

### 27.8.14 Array.prototype.flat

- ES10에서 도입된 flat메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다.
- 중첩 배열을 평탄화할 깊이를 인수로 전달할 수 있다. 인수를 생략할 경우 기본값은 1이다.
- 인수로 Infinity를 전달하면 중첩 배열 모두를 평탄화한다.

### 예제27-85

```javascript
[1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]
```

### 예제27-86

```javascript
// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
[1, [2, [3, [4]]]].flat(); // -> [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(1); // -> [1, 2, [3, [4]]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화한다.
[1, [2, [3, [4]]]].flat(2); // -> [1, 2, 3, [4]]
// 2번 평탄화한 것과 동일하다.
[1, [2, [3, [4]]]].flat().flat(); // -> [1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화한다.
[1, [2, [3, [4]]]].flat(Infinity); // -> [1, 2, 3, 4]
```

<!-- Line -->

---

## 27.9 배열 고차 함수

- 고차 함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다.
- 고차 함수는 인자로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성하여 반환한다.
- 자바스크립트의 함수는 일급 객체이므로 값처럼 인자로 전달할 수 있으며 반환할 수도 있다.
- 고차 함수는 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.

### 27.9.1 Array.prototype.sort

- 배열의 요소를 적절하게 정렬한다. 원본 배열을 직접 변경하며 정렬된 배열을 반환한다.
- 문자열 요소로 이루어진 배열의 정렬은 아무런 문제가 없다. 하지만 주의할 것은 숫자를 정렬할 때이다.
- sort 메서드의 기본 정렬 순서는 문자열 Unicode 코드 포인트 순서에 따른다. 배열의 요소가 숫자 타입이라 할지라도 배열의 요소를 일시적으로 문자열로 변환한 후, 정렬한다.
- 따라서 숫자 요소를 정렬할 때는 sort메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.
- 비교 함수는 양수나 음수 또는 0을 반해야 한다.
- 비교 함수의 반환값이 0보다 작으면 비교 함수의 첫 번째 인수를 우선하여 정렬하고 0이면 정렬하지 않으며 0보다 크면 두번 째 인수를 우선하여 정렬 한다.

### 27.9.2 Array.prototype.forEach

- forEach 메서드는 for문을 대체할 수 있는 고차 함수다.
- forEach 메서드는 콜백 함수를 호출할 때 3개의 인수, 즉 forEach메서드를 호출한 배열의 요소값과 인덱스, forEach메서드를 호출한 배열(this)를 순차적으로 전달한다.
- forEach메서드는 원본 배열을 변경하지 않는다. 하지만 콜백 함수는 원본 배열(this)을 변경할 수는 있다.
- 배열을 순회하며 배열의 각 요소에 대하여 인자로 주어진 콜백함수를 실행한다. 반환값은 undefined이다.
- forEach 메서드의 콜백 함수는 일반 함수로 호출되므로 콜백함수 내부의 this는 undefined를 가리킨다. 그렇기때문에 forEach메서드의 두 번째 인수로 forEach메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach 메서드는 for 문과는 달리 break 문을 사용할 수 없다. 다시 말해, 배열의 모든 요소를 순회하며 중간에 순회를 중단할 수 없다.
- 희소 배열의 경우 존재하지 않는 요소는 순회 대상에서 제외된다.
- forEach 메서드는 for 문에 비해 성능이 좋지는 않다. 하지만 for 문보다 가독성이 좋으므로 적극 사용을 권장한다.

### 27.9.3 Array.prototype.map

- 배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백 함수의 반환값(결과값)으로 새로운 배열을 생성하여 반환한다. 이때 원본 배열은 변경되지 않는다.
- map 메서드는 배열을 순회하며 요소 값을 다른 값으로 맵핑하기 위한 함수이다.
- forEach메서드는 언제나 undefined를 반환하고, map메서드는 콜백 함수의 반환값들로 구성된 새로운 배열을 반환하는 차이가 있다.
- forEach메서드는 단순히 반복문을 대체하기 위한 고차 함수이고, map메서드는 요소 값을 다른 값으로 매핑한 새로운 배열을 생성하기 위한 고차 함수이다.
- map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은 map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치한다.
- 즉 map메서드를 호출한 배열과 map메서드가 생성하여 반환한 배열은 1:1매핑한다.
- map메서드는 콜백 함수를 호출할 때 3개의 인수, 즉 map메서드를 호출한 배열의 요소값과 인덱스 그리고 map메서드를 호출한 배열(this)을 순차적으로 전달한다.
- map 메소드에 두번째 인자로 this를 전달할 수 있다.
- 콜백함수를 ES6의 Arrow function를 사용하면 this를 생략하여도 동일한 동작을 한다.

### 27.9.4 Array.prototype.filter

- filter메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다.
- 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 이때 원본 배열은 변경되지 않는다.
- filter메서드는 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소만 추출하여 새로운 배열을 만들고 싶을 때 사용한다.
- 따라서 filter메서드가 생성하여 반환한 새로운 배열의 length 프로퍼티 값은 filter 메서드를 호출한 배열의 length 프로퍼티 값과 같거나 작다.
- 콜백 함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, filter 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
- filter도 map, forEach와 같이 두번째 인자로 this를 전달할 수 있다.
- filter메서드를 사용해 특정 요소를 제거할 경우 특정 요소가 중복되어 있다면 중복된 요소가 모두 제거된다.
- 특정요소 하나만 제거하려면 indexOf 를 통해 splice 메서드를 사용한다.

### 27.9.5 Array.prototype.reduce

- 배열을 순회하며 각 요소에 대하여 이전의 콜백함수 실행 반환값을 전달하여 콜백함수를 실행하고 그 결과를 반환한다.
- 이때 원본 배열은 변경되지 않는다.
- reduce메서드의 콜백 함수에는 4개의 인수, 초기값또는 콜백 함수의 이전 반환값, reduce메서드를 호출한 배열의 요소값과 인덱스, reduce메서드를 호출한 배열 자제, 즉 this가 전달된다.
- reduce메서드는 map, filter, som, every, find 같은 모든 배열의 고차함수를 구현할 수 있다.
- reduce메서드의 두 번째 인수로 전달하는 초기값은 첫 번째 순회에 콜백 함수의 첫 번째인수로 전달된다.
- reduce메서드의 두번째 인수는 생략할 수 있다. 하지만 reduce메서드를 호출할 때는 언제나 초기값을 전달하는 것이 안전하다.

### 27.9.6 Array.prototype.some

- 배열 내 일부 요소가 콜백 함수의 테스트를 통과하는지 확인하여 그 결과를 boolean으로 반환한다. IE 9 이상에서 정상 동작한다.
- 콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
- 콜백 함수의 반환값이 단 한 번이라도 참이면 true, 모두 거짓이면 false를 반환한다.
- 즉 배열의 요소 중에 콜백 함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여 그결과를 불리언 타입으로 반환한다.
- 단 some 메서드를 호출한 배열이 빈 배열인 경우 false를 반환한다.

### 27.9.7 Array.prototype.every

- 배열 내 모든 요소가 콜백함수의 테스트를 통과하는지 확인하여 그 결과를 boolean으로 반환한다. IE 9 이상에서 정상 동작한다.
- 콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
- every메서드는 콜백 함수의 반환값이 모두 참이면 true, 단 한 번이라도 거짓이면 false를 반환한다.
- 배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인하여 그 결과를 불리언 타입으로 반환한다.
- 단 every메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.

### 27.9.8 Array.prototype.find

- ES6에서 새롭게 도입된 메소드로 Internet Explorer에서는 지원하지 않는다.
- 배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수를 실행하여 그 결과가 참인 첫번째 요소를 반환한다.
- 콜백함수의 실행 결과가 참인 요소가 존재하지 않는다면 undefined를 반환한다.
- 콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
- 참고로 filter는 콜백함수의 실행 결과가 true인 배열 요소의 값만을 추출한 새로운 배열을 반환한다. 따라서 filter의 반환값은 언제나 배열이다.
- 하지만 find는 콜백함수를 실행하여 그 결과가 참인 첫번째 요소를 반환하므로 find의 결과값은 해당 요소값이다.

### 27.9.9 Array.prototype.findIndex

- ES6에서 새롭게 도입된 메소드로 Internet Explorer에서는 지원하지 않는다.
- 배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수를 실행하여 그 결과가 참인 첫번째 요소의 인덱스를 반환한다.
- 콜백함수의 실행 결과가 참인 요소가 존재하지 않는다면 -1을 반환한다.
- 콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
  27.9.10 Array.prototype.flatMap
- flatMap메서드는 map메서드를 통해 생성된 새로운 배열을 평탄화한다. 즉, map메서드와 flat메서드를 순차적으로 실행하는 효과가 있다.
- 단. flatMap메서드는 flat메서드처럼 인수를 전달하여 평탄화 깉이를 지정할 수 없고, 1단계만 평탄화한다.
