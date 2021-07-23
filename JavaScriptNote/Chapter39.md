# 39장 DOM

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API. 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.

## 39.1 노드

### 39.1.1 HTML 요소와 노드 객체

- HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다.
- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다. 이때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.
- HTML 문서는 HTML요소들의 집합으로 이뤄지며, HTML요소는 중첩관계를 갖는다. 이때 HTML 요소간에는 중첩 관계에 의해 계층적인 부자관계가 형성된다.
- 이러한 HTML요소 간의 부자관계를 반영하여 HTML문서의 구성 요소인 HTML 요소를 객체화한 모든 객체들을 트리 자료구조로 구성한다.

트리 자료구조

- 트리 자료구조는 노드들의 계층 구조로 이뤄진다. 즉, 트리 자료구조는 부모 노드와 자식 노드로 구성되어 노드 간의 계층적 구조를 표현하는 비선형 자료구조를 말한다.
- 트리 자료구조는 하나의 최상위 노드에서 시작한다. 최상위 노드는 부모 노드가 없으면, 루트 노드라 한다.
- 루트 노드는 0개 이상의 자식 노드를 갖는다. 자식 노드가 없는 노드를 리프 노드라 한다.
- 노드 객체들로 구성된 트리 자료구조를 DOM이라한다. 노드 객체의 트리로 구조화되어 있기 때문에 DOM을 DOM 트리라고 부르기도 한다.

### 39.1.2 노드 객체의 타입

- DOM은 노드 객체의 계층적인 구조로 구성된다. 노드 객체는 종류가 있고 상속 구조를 갖는다. 노드 객체는 총 12개의 종류가 있다.
- 이 이중에서 중요한 노드 타입은 다음과 같이 4가지다.

  1.문서 노드(Document Node)

  - 문서노드는 DOM 트리의 최상위에 존재하는 루트 노드로서 document 객체를 가리킨다.
  - 트리의 최상위에 존재하며 각각 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다. 즉, DOM tree에 접근하기 위한 시작점(entry point)이다.
  - 즉, 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야한다.

    2.요소 노드(Element Node)

  - 요소 노드는 HTML 요소를 가리키는 객체다.
  - HTML 요소는 중첩에 의해 부자 관계를 가지며 이 부자 관계를 통해 정보를 구조화한다. 따라서 요소 노드는 문서의 구조를 서술한다고 말 할 수 있다.
  - 어트리뷰트, 텍스트 노드에 접근하려면 먼저 요소 노드를 찾아 접근해야 한다.

    3.어트리뷰트 노드(Attribute Node)

  - 어트리뷰트 노드는 HTML 요소의 어트리뷰트를 가리키는 객체다.
  - 어트리뷰트 노드는 해당 어트리뷰트가 지정된 HTML요소의 요소 노드와 연결되어 있다. 즉, 어트리뷰트 노드는 부모 노드가 없으므로 요소 노드의 형제노드는 아니다.
  - 따라서 해당 요소 노드를 찾아 접근하면 어트리뷰트를 참조, 수정할 수 있다.

    4.텍스트 노드(Text Node)

  - 텍스트 노드는 HTML 요소의 텍스트를 가리키는 객체다. 텍스트 노드는 문서의 정보를 표현한다고 할 수 있다.
  - 텍스트 노드는 요소 노드의 자식이며 자신의 자식 노드를 가질 수 없다. 즉, 텍스트 노드는 DOM tree의 최종단이다.
  - 따라서 텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 한다.

### 39.1.3 노드 객체의 상속 구조

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며, 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조라고 했다.
- 즉, DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다.
- 이를 통해 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있으며, 자신의 어트리뷰트와 텍스트를 조작할 수도 있다.
- DOM을 구성하는 노드 객체는 브라우저 환경에서 추가적으로 제공하는 호스트 객체다. 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
- 모든 객체는 Object, EventTarget, Node 인터페이스를 상속받는다.
- DOM 트리를 크롬 브라우저에서 확인하려면 개발자도구(Developer Tools)의 Elements 를 선택한 후 오른쪽의 properties을 선택한다.
- DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다.
- 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.

---

## 39.2 요소 노드 취득

- HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드를 취득해야 한다. 이처럼 요소 노드의 취득은 HTML 요소를 조작하는 시작점이다.

### 39.2.1 id를 이용한 요소 노드 취득

- Document.prototype.getElementById(id) 메서드는 인수로 전달한 id 어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 반환한다.
- getElementById 메서드는 Document.prototype의 프로퍼티다. 따라서 문서노드인 document를 통해 호출해야 한다.
- id값은 HTML문서 내에서 유일한 값이어야 하며, class어트리뷰트와 달리 공백 문자로 구분하여 여러개의 값을 가질 수 없다.
- 단 HTML 문서 내에 중복된 id값을 갖는 HTML 요소가 여러개 존재하더라도 어떠한 에러도 발생하지 않는다.
- 같은 id값을 가지는 여러 개의 요소가 있더라도 getElementById 메서드는 인수로 전달된 id값을 갖는 첫번째 요소노드만 반환한다.
- 만약 인수로 전달된 id값을 갖는 HTML 요소가 존재하지 않은 경우 null을 반환한다.
- HTML 요소에 id 어트리뷰트를 부여하면 id값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다. 단 동일한 이름의 젼역변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않는다.

### 39.2.2 태그 이름을 이용한 요소 노드 취득

- document.getElementsByTagName(tagName)메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환한다.
- getElementsByTagName(tagName) 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환하다.
- getElementsByTagName(tagName) 메서드가 반환하는 DOM 컬렉션 객체인 HTMLCollection 객체는 유사 배열 객체 이면서 이터러블이다.
- HTML 문서의 모든 요소 노드를 취득하려면 getElementsByTagName 메서드의 인수로 '\*'를 전달한다.
- 인수로 전달된 태그 이름을 갖는 요소가 없으면 빈 HTMLCollection 객체를 반환한다.

### 39.2.3 class를 이요한 요소 노드 취득

- document.getElementsByClassName(class) 메서드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환한다.
- 인수로 전달할 class 값은 공백으로 구분하여 여러 개의 class를 지정할 수 있다.
- document.getElementsByClassName(class) 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환하다.
- 인수로 전달된 class 값을 갖는 요소가 없으면 빈 HTMLCollection 객체를 반환한다.

### 39.2.4 CSS 선택자를 이요한 요소 노드 취득

querySelector

- CSS 선택자는 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법이다.
- document.querySelector(selector)메서드는 인수로 전달한 CSS선택자를 만족시키는 하나의 요소노드를 탐색하여 반환한다.
- 인수로 전달한 CSS선택자를 만족시키는 요소노드가 여러 개인 경우 첫 번째 요소 노드만 반환한다.
- 인수로 전달한 CSS선택자를 만족시키는 요소노드가 존재하지 않는 경우 null반환한다.
- 인수로 전달한 CSS선택자가 문법에 맞지 않는 경우 DOMExcption 에러가 발생한다.

querySelectorAll

- document.querySelectorAll(selector) 메서드는 인수로 전달한 CSS선택자를 만족시키는 모든 요소노드를 탐색하여 반환한다.
- querySelectorAll(selector)메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 반환한다.
- NodeList 객체는 유사 배열 객체이면서 이터러블이다.
- 인수로 전달한 CSS선택자를 만족시키는 요소노드가 존재하지 않는 경우 빈 NodeList 객체를 반환한다.
- 인수로 전달한 CSS선택자가 문법에 맞지 않는 경우 DOMExcption 에러가 발생한다.
- HTML 문서의 모든 요소 노드를 취득하려면 querySelectorAll 메서드의 인수로 '\*'를 전달한다.
- id 어트리뷰트가 있는 요소 노드를 취득하는 경에는 getElementById 메서드를 사용하고 그 이외의 경우에는 querySelector, querySelectorAll메서드를 사용하는 것을 권장한다.

### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

- Element.prototype.matches 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인한다.
- Element.prototype.matches메서드는 이벤트 위임을 사용할 때 유용하다.

### 39.2.6 HTMLCollection과 NodeList

- DOM 컬렉션 객체인 HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다.
- HTMLCollection과 NodeList는 모두 유사 배열 객체이면서 이터러블이다.

HTMLCollection

- getElementsByTagName, getElementsByClassName 메서드가 반환하는 HTMLCollection 객체는 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는 DOM 컬렉션 객체다.
- HTMLCollection객체는 실시간으로 노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기 때문에 for문으로 순회하면서 노드 객체의 상태를 변경해야 할 때 주의해야 한다.

NodeList

- querySelectorAll 메서드는 DOM 컬렉션 객체인 NodeList 객체를 반환한다. 이때 NodeList객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체다.
- NodeList객체는 NodeList.prototype.forEach 메서드를 상속받아 사용할 수 있다.
- NodeList객체는 대부분의 경우 노드 객체의 상태 변경을 실시간으로 반영하지 않고 과거의 정적 상태를 유지하고 non-live 객체로 동작한다.
- 하지만 childNodes 프로퍼티가 반환하는 NodeList객체는 실시간으로 반영하는 live 객체로 동작하므로 주의가 필요하다.

- 따라서 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection과 NodeList 객체를 배열로 반환하여 사용하는 것을 권장한다.
- HTMLCollection과 NodeList 객체는 모두 이터러블이다. 따라서 스프레드 문법이나 Array.from 메서드를 사용하여 간단히 배열로 변환할 수 있다.

---

## 39.3 노드 탐색

- 노드 탐색 프로퍼티는 모두 접근자 프로퍼티다. 단. 노드 담색 프로퍼티는 setter없이 getter만 존재하여 참조만 가능한 읽기 전용 접근자 프로퍼티다.

### 39.3.1 공백 텍스트 노드

- HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백문자는 텍스트 노드를 생성한다. 이를 공백 텍스트 노드라 한다.
- 따라서 노드를 탐색할 때는 공백 문자가 생성한 공백 텍스트 노드에 주의해야 한다.

### 39.3.2 자식 노드 탐색

| 프로퍼티                            | 설명                                                                                                                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.prototype.childNodes           | 자식 노드를 모두 탐색하여 DOM 컬렉션 객체인 NodeList에 담아 반환한다. <br>childNodes 프로퍼티가 반환한 NodeList에는 요소 노드뿐만 아니라 텍스트 노드도 포함되어 있을 수 있다. |
| Element.prototype.children          | 자식 노드중에서 요소 노드만 모두 탐색하여 DOM 컬렉션 객체인 HTMLCollection에 담아 반환한다.<br> children 프로퍼티가 반환한 HTMLCollection에는 텍스트 노드가 포함되지 않는다.  |
| Node.prototype.firstChild           | 첫 번째 자식 노드를 반환한다. firstChild 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소노드다.                                                                               |
| Node.prototype.lastChild            | 마지막 자식 노드를 반환한다. lastChild 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소노드다.                                                                                 |
| Element.prototype.firstElementChild | 첫 번째 자식 요소 노드를 반환한다. firstElementChild 프로퍼티가 반환한 노드는 요소노드만 반환한다.                                                                            |
| Element.prototype.lastElementChild  | 마지막 자식 요소 노드를 반환한다. lastElementChild 프로퍼티가 반환한 노드는 요소노드만 반환한다.                                                                              |

### 39.3.3 자식 노드 존재 확인

- 자식 노드가 존재하는지 확인하려면 Node.prototype.hasChildNodes 메서드를 사용한다.
- hasChildNodes 메서드는 자식 노드가 존재하면 true, 없으면 false를 반환한다.
- 단 hasChildNodes 메서드는 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.
- 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인하려면 hasChildNodes 메서드 대신 children.lenght 또는 Element 인터페이스의 childElementCount 프로퍼티를 사용한다.

### 39.3.4 요소 노드의 텍스트 노드 탐색

- 요소 노드의 텍스트 노드는 요소 노드의 자식노드다. 따라서 요소 노드의 텍스트 노드는 firstChild 프로퍼티로 접근할 수 있다.
- firstChild프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드다.

### 39.3.5 부모 노드 탐색

- Node.prototype.parentNode 프로퍼티를 사용한다.
- 텍스트 노드는 DOM트리의 최종단인 리프 노드이므로 부모 노드가 텍스트 노드인 경우는 없다.

### 39.3.6 형제 노드 탐색

- 부모 노드가 같은 형제 노드를 탐색하려면 다음과 같은 노드 탐색 프로퍼티를 사용한다.
- 단 어트리뷰트 노드는 요소 노드와 연결되어 있지만 부모 노드가 같은 형제 노드가 아니기 때문에 반환되지 않는다.

| 프로퍼티                                 | 설명                                                                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Node.prototype.previousSibling           | 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다.<br> previousSibling프로퍼티가 반환하는 형제 노드는 요소 노드 뿐만 아니라 텍스트 노드일 수도 있다. |
| Element.prototype.nextSibling            | 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다. <br>nextSibling 프로퍼티가 반환하는 형제 노드는 요소 노드 뿐만 아니라 텍스트 노드일 수도 있다.    |
| Element.prototype.previousElementSibling | 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다.<br> previousElementSibling 프로퍼티는 요소 노드만 반환한다.                                       |
| Element.prototype.nextElementSibling     | 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다. <br>nextElementSibling 프로퍼티는 요소 노드만 반환한다.                                           |

---

# 39.4 노드 정보 취득

- 노드 객체에 대한 정보를 취득 하려면 다음과 같은 노드 정보 프로퍼티를 사용한다.

| 프로퍼티                | 설명                                                                                                                                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.prototype.nodeType | 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환한다. <br>- Node.ELEMENT_NODE : 뇨소 노드 타입을 나타내는 상수 1을 반환 <br>- Node.TEXT_NODE : 텍스트 노드 타입을 나타내는 상수 3을 반환 <br>- Node.DOCUMENT_NODE : 문서 노드 타입을 나타내는 상수9를 반환 |
| Node.prototype.nodeName | 노드의 이름을 문자열로 반환한다. <br>- 요소 노드 : 대문자 문자열로 태그 이름을 반환한다. <br>- 텍스트 노드 : 문자열 "text"를 반환한다.<br> - 문서 노드 : 문자열 "document"를 반환한다.                                                                          |

---

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

- 지금까지 살펴본 노드 탐색, 정보 프로퍼티는 모두 읽기 전용 접근자 프로퍼티다.
- 지금부터 살펴볼 Node.prototype.nodeValue 프로퍼티는 setter 와 getter 모두 존재하는 접근자 프로퍼티다. - 따라서 참조와 할당 모두 가능하다.
- 노드 개개체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값을 반환한다.
- 노드 객체의 값이란 텍스트 노드의 텍스트다. 따라서 텍스트 노드가 아닌 노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.

요소 노드의 텍스트를 변경하려면 다음과 같은 순서 처리가 필요하다.

1. 텍스트를 변경할 요소 노드를 취득한 다음, 취득한 요소 노드의 텍스트 노드를 탐색한다. 텍스트 노드는 요소 노드의 자식노드이므로 firstChild 프로퍼티를 사용하여 탐색한다. 2.탐색한 텍스트 노드의 nodeValue프로퍼티를 사용하여 텍스트 노드의 값을 반환한다.

### 39.5.2 textContent

- Node.prototype.textContent는 setter 와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.
- 요소노드의 textContent프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내의 텍스트를 모두 반환한다. 이때 HTML 마크업은 무시된다.
- 요소노드의 textContent프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당 문자열이 텍스트로 추가된다.
- 이때 할당한 문자열에 HTML 마크업이 포함되어 있더라도 문자열 그대로 인식되어 텍스트로 취급된다. 즉, HTML 마크업이 파싱되지 않는다.

참고로 textContent프로퍼티와 유사한 동작을 하는 innerText 프로퍼티가 있다. innerText프로퍼티는 다음과 같은 이유로 사용하지 않는 것이 좋다.

- innerText 프로퍼티는 CSS에 순종적이다. 예를 들어 innerText 프로퍼티는 CSS에의해 비표시로 지정된 요소노드의 텍스트를 반환하지 않는다.
- innerText 프로퍼티는 CSS를 고려해야 하므로 textContent프로퍼티보다 느리다.

---

## 39.6 DOM 조작

- DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체 하는 것을 말한다.
- DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생한다.

### 39.6.1 innerHTML

- Element.prototype.innerHTML 프로퍼티는 setter 와 getter 모두 존재하는 접근자 프로퍼티로서 요소노드의 HTML 마크업을 취득하거나 변경한다.
- 요소 노드의 innerHTML프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.
- 요소 노드의 innerHTML프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자여렝 포함되어 있는 HTML 마크업이 파싱되어 요소노드의 자식 노드로 DOM에 반영된다.
- 이처럼 innerHTML프로퍼티를 사용한 DOM 조작은 구현이 간단하고 직관적이라는 장점이 있지만 크로스 사이트 스크립팅 공격에 취약한 단점도 있다.
- 그리고 innerHTML프로퍼티는 기존의 자식 노드를 모두 제거하고 다시 처음부터 새롭게 자식 노드를 생성하여 DOM에 반영한다. 이는 효율적이지 않다.
- 또한 innerHTML프로퍼티는 새로운 요소를 삽입할 때 위치를 지정할 수 없다는 단점도 있다.

### 39.6.2 insertAdjacentHTML 메서드

- Element.prototype.insertAdjacentHTML(position, DOMString) 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- insertAdjacentHTML 메서드는 두번째 인수로 전달한 HTML마크업 문자열을 파싱하고 그 결과로 생성된 노드를 첫 번째 인수로 전달한 위치에 삽입하여 DOM에 반영한다.
- 첫 번째 인수로 전달할 수 있는 문자열은 'beforebegin', afterbegin', 'beforeend', 'afterend'의 4가지다.
- innerHTML 프로퍼티와 insertAdjacentHTML메서드는 HTML 마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약하다는 점은 동일하다.

### 39.6.3 노드 생성과 추가

- DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드도 제공한다.

  1.요소 노드 생성

- Document.prototype.createElement(tagName)메서드느 요소 노드를 생성하여 반환한다.
- createElement메서드의 매개변수 태그네임을 나타내는 문자열을 인수로 전달한다.
- createElement메서드는 요소 노드를 생성할 뿐 DOM에 추가하지 않는다. 따라서 이후에 생성된 요소 노드를 DOM에 추가하는 처리가 필요하다.

  2.텍스트 노드 생성

- Document.prototype.createTextNode(text) 메서드는 텍스트 노드를 생성하여 반환한다.
- 매개변수 text에는 텍스트 노드의 값으로 사용할 문자열을 인수로 전달한다.
- createTextNode 메서드는 요소 노드를 생성할 뿐 DOM에 추가하지 않는다. 따라서 이후에 생성된 요소 노드를 DOM에 추가하는 처리가 필요하다.

  3.텍스트 노드를 요소 노드의 자식 노드로 추가

- Node.prototype.appendChild(childNode) 메서드는 매개변수 childNode에게 인수로 전달한 노드를 appendChild메서드를 호출한 노드의 마지막 자식 노드로 추가한다.

  4.요소 노드를 DOM에 추가

- Node.prototype.appendChild(childNode) 메서드는 사용하여 텍스트 노드와 부사 관계로 연결한 요소 노드를 #fruits 요소노드의 마지막 자식 요소로 추가한다.
- 이과정에서 비로소 새롭게 생성한 요소 노드가 DOM에 추가된다. 이때 리플로우와 리페인트가 실행된다.

### 39.6.4 복수의 노드 생성과 추가

- DOM에 추가해야 할 3개의 요소 노드를 컨테이너 요소에 자식 노드로 추가하고, 컨테이너 요소를 요소 노드에 자식으로 추가한다면 DOM은 한번만 변경된다.
- DOM을 한 번만 변경하므오 성능에 유리하기는 하지만 다음과 같이 불필요한 컨테이너 요소(div)가 DOM에 추가되는 부작용이 있다. 이는 바람직하지 않다.
- 이러한 문제를 DocumentFragment 노드를 통해 해결할 수 있다. DocumentFragment 노드는 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종으로, 부모 노드가 없어서 기존 DOM과는 별도로 존재한다는 특징이 있다.
- DocumentFragment 노드는 기존 DOM과는 별도로 존재하는 DocumentFragment 노드에 자식 노드를 추가하여도 기존DOM에는 어떠한 변경도 발생하지 않는다.
- 또한 DocumentFragment 노드를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가되나.
- Document.prototype.DocumentFragment 메서드는 비어 있는 DocumentFragment 노드를 생성하여 반환한다.
- 따라서 여러 개의 요소 노드를 DOM에 추가하는 경우 DocumentFragment 노드를 사용하는 것이 효율적이다.

### 39.6.5 노드 삽입

마직막 노드로 추가

- Node.prototype.appendChild 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가한다.
- 위치 지정 할수 없다. 언제나 마지막에 위치한다.

지정한 위치에 노드 삽입

- Node.prototype.insertBefore(newNode, childNode) 메서드는 첫 번째 인수로 전달받은 노드를 두번째 인수로 전달받은 노드 앞에 삽입한다.
- 두 번째 인수로 전달받은 노드는 반드시 insertBefore메서드를 호출한 노드의 자식 노드이어햐 한다. 그렇지 않으면 DOMException에러가 발생한다.
- 두 번째 인수가 null이면 호출한 노드의 마지막 자식 노드로 추가한다. 즉 appendChild 메서드처럼 동작한다.

### 39.6.6 노드 이동

- DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다.
- 즉, 노드가 이동한다.

### 39.6.7 노드 복사

- Node.prototype.cloneNode([deep: true | false]) 메서드는 노드의 사본을 생성하여 반환한다.
- 매개변수 deep에 true를 인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성한다.
- false를 인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성한다.
- 얕은 복사로 생성된 요소 노드는 자손 노드를 복사하지 않으므로 텍스트 노드도 없다.

### 39.6.8 노드 교체

- Node.prototype.replaceChild(newChild, oldChild)메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.
- 즉 replaceChild메서드는 자신을 호출한 노드의 자식 노드인 oldChild 노드를 newChild 노드로 교체한다. 이때 oldChild 노드는 DOM에서 제거된다.

### 39.6.9 노드 삭제

- Node.prototype.removeChild(child) 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다.
- 인수로 전달한 노드는 removeChild메서드를 호출한 노드의 자식 노드이어야한다.

---

## 39.7 어트리뷰트

### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티

- HTML 문서의 구성 요소인 HTML 요소는 여러개의 어트리뷰트를 가질 수 있다.
- HTML 문서가 파싱될 때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결된다. 이때 HTML 어트리뷰트당 하나의 어트리뷰트 노드가 생성된다.
- 이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이사 이터러블인 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장된다.
- 요소노드의 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다.
- attributes 프로퍼티는 getter만 존재하는 일기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.

### 39.7.2 HTML 어트리뷰트 조작

- Element.prototype.getAttribute /setAttribute 메서드를 사용하면 attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있어 편리하다.
- HTML 어트리뷰트 값을 참조하려면 Element.prototype.getAttribute(attributeName) 메서드를 , 변경하려면 Element.prototype.setAttribute(attributeName, attributeValue)메서드를 사용한다.
- 특정 HTML 어트리뷰트가 존재하는지 확인하려면 Element.prototype.hasAttribute(attributeName) 메서드를 사용한다.
- 특정 HTML 어트리뷰트를 삭제하려면 Element.prototype.removeAttribute(attributeName)메서드를 사용한다.

        hasAttribute(attribute)
        - 지정한 어트리뷰트를 가지고 있는지 검사한다.
        - Return : Boolean
        - IE8 이상의 브라우저에서 동작한다.

        getAttribute(attribute)
        - 어트리뷰트의 값을 취득한다.
        - Return : 문자열
        - 모든 브라우저에서 동작한다.

        setAttribute(attribute, value)
        - 어트리뷰트와 어트리뷰트 값을 설정한다.
        - Return : undefined
        - 모든 브라우저에서 동작한다.

        removeAttribute(attribute)
        - 지정한 어트리뷰트를 제거한다.
        - Return : undefined
        - 모든 브라우저에서 동작한다.

### 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티

- 요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티가 존재한다. 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다.
- DOM 프로퍼티는 setter과 getter 모두 존재하는 접근자 프로퍼티다. 따라서 참조와 변경이 가능하다.
- HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것이다. 즉, HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않는다.
- 요소 노드는 2개 의 상태, 즉 초기 상태와 최신 상태를 관리해야 한다. 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소노드의 최신상태는 DOM프로퍼티가 관리한다.

> 어트리뷰트 노드

- HTML 어트리뷰트로 지정한 HTML 요소의 초기상 태는 어트리뷰트 노드에서 관리한다.
- getAttribute 메서드로 취득한 값은 초기 상태 값이다. HTML 요소에 지정한 어트리뷰트 값은 사용자의 입력에 의해 변하지 않으므로 결과는 언제나 동일하다.
- setAttribute메서드는 어트리뷰트 노드에서 관리하는 HTML 요소에 지정한 어트리뷰트 값, 즉 초기 상태 값을 변경한다.

> DOM 프로퍼티

- 사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리한다.
- DOM 프로퍼티는 사용자의 입력에 의한 생태 변화에 반응하여 언제나 최신 상태를 유지한다.
- DOM 프로퍼티로 취득한 값은 HTML 요소의 최신 상태 값을 의미한다.
- DOM 프로퍼티에 값을 할당하는 것은 HTML 요소의 최신 상태 값을 변경하는 것을 의미한다. 이때 HTML 요소에 지정한 어트리뷰트 값에는 어떠한 영향도 주지 않는다.

> HTML 어트리뷰트와 DOM 프로퍼티의 대응관계

- 대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티와 1:1로 대응한다.
- 단 언제나 1:1로 대응하는 것은 아니며, HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티 키가 반드시 일치하는 것도 아니다.

  - id어드리뷰트와 id프로퍼티는 1:1 대응하며, 동일한 값으로 연동한다.
  - input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응한다. 하지만 value 어트리뷰트는 초기상태를, value 프로퍼티는 최신 상태를 갖는다.
  - class 어트리뷰트는 className, classList 프로퍼티와 대응한다.
  - for어트리뷰트는 htmlFor 프로퍼티와 1:1데응한다.
  - td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 존재하지 않는다.
  - textContent 프로퍼티는 대응하는 어트리뷰트가 존재하지 않는다.
  - 어트리뷰트 이름은 대소문자를 구별하지 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따른다.

> DOM 프로퍼티 값의 타입

- getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열이다. 하지만 DOM 프로퍼티로 취득한 최신 상태 값은 문자열이 아닐 수도 있다.

### 39.7.4 data 어트리뷰트와 dataset 프로퍼티

- data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다.
- data 어트리뷰트는 data- user- id, data- role과 같이 data- 접두사 다음에 임의의 이름을 붙여 사용한다.
- data 어트리뷰트의 값은 HTMLElement.dataset 프로퍼티로 취득할 수 있다.
- dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는 DOMStringMap 객체를 반환한다.
- DOMStringMap 객체는 data어트리뷰트의 data- 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다. 이 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경할 수 있다.
- data어트리뷰트의 data- 접두사 다음에 존재하지 않는 이름을 키로 사용하여 dataset 프로퍼티에 값을 할당하면 HTML 요소에 data 어트리뷰트가 추가된다. 이때 이 프로퍼티 키는 data 어트리뷰트의 data- 접두사 다음에 케밥케이스로 자동 변경되어 추가된다.

---

## 39.8 스타일

### 39.8.1 인라인 스타일 조작

- HTMLElement.prototype.style 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경한다.
- style 프로퍼티를 참조하면 CSSStyleDeclaration 타입의 객체를 반환한다.
- CSSStyleDeclaration 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며, 이 프로퍼티에 값을 할당하면 해당 CSSS 프로퍼티가 인라인 스타일로 HTML 요소에 추가되거나 변경된다.
- CSS 프로퍼티는 케밥 케이스를 따른다. 이에 대응하는 CSSStyleDeclaration 객체의 프로퍼티는 카멜 케이스를 따른다.

### 39.8.2 클래스 조작

- .으로 시작하는 클래스 선택자를 사용하여 CSS class를 미리 정의한 다음, HTML 요소의 class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수도 있다.
- 단, class 어트리뷰트에 대응하는 DOM 프로퍼티는 class가 아니라 className, classList다. 자바스크립트에서 class는 예약어이기 때문이다.

> className

- HTMLElement.prototype.className 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경한다.
- 요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고, 요소 노드의 className프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경한다.
- className프로퍼티는 문자열을 반환하므로 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루기가 불편하다.

> classList

- HTMLElement.prototype.classList 프로퍼티는 class 어트리뷰트의 정보를 담는 DOMTokenList 객체를 반환한다.
- DOMTokenList 객체는 class어트리뷰트의 정보를 나타내는 컬렉션 객체로서 유사 배열 객체이면서 이터러블이다.

> DOMTokenList 객체는 다음과 같은 유용한 메서드들을 제공한다.

    add(...className)
    - add 메서드는 인수로 전달한 1개 이상의 문자열을 class 어트리뷰트 값으로 추가한다.

    remove(...className)
    - remove 메서드는 인수로 전달한 1개 이상의 문자열과 일치하는 클래스를 class어트리뷰트에서 삭제한다.
    - 인수로 전달된 문자열과 일치하는 클래스가 class 어트리뷰트에 없으면 에러 없이 무시된다.

    item(index)
    - item 메서드는 인수로 전달한 index에 해당하는 클래스를 class 어트리뷰트에서 반환한

    contains(...className)
    - contains 메서드는 인수로 전달한 문자열과 일치하는 클래스가 class 어트리뷰트에 포함되어 있는지 확인한다. 불리언값으로 반환한다.

    replace(oldClassName, newClassName)
    - replace 메서드는 class 어트리뷰트에서 첫 번째 인수로 전달한 문자열을 두번째 인수로 전달한 문자열로 변경한다.

    toggle(className[, force])
    - toggle 메서드는 class 어트리뷰트에 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고 존재하지 않으면 추가한다.
    - 두 번째 인수로 불리언 값으로 평가되는 조건식을 전달할 수 있다. 평가 결과가 true이면 class 어트리뷰트에 강제로 전달받은 첫번째 인수인 문자열을 추가하고, false이면 제거한다.

- 이밖에도 DOMTokenList 객체는 forEach, entries, keys, values, supports 메서드를 제공한다.

### 39.8.3 요소에 적용되어 있는 CSS 스타일 참조

- style 프로퍼티는 인라인 스타일만 반환한다. 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 style 프로퍼티로 참조할 수 없다.
- HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야 할 경우 getComputedStyle 메서드를 사용한다.
- window.getComputedStyle(element[, pseudo]) 메서드는 첫 번째 인수로 전달한 요소 노드에 적용되어 있는 평가된 스타일을 CSSStyleDeclaration 객체에 담아 반환한다.
- 평가된 스타일이란 링크 스타일, 임베딩 스타일, 인라인 스타일, JS에서 적용한 스타일, 상속된 스타일, 기본 스타일 등 모든 스타일이 조합되어 최종적으로 적용된 스타일을 말한다.
- getComputedStyle 메서드의 두 번째 인수로 :after , :before와 같은 의사 요소를 지정하는 문자열을 전달할 수 있다. 의사 요소가 아니면 생략된다.

---

### 39.9 DOM 표준

- HTML과 DOM 표준은 W3C과 WHATWG이라는 두 단체가 나름대로 협력하면서 공통된 표준을 만들어 왔다.
