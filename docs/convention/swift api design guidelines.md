> 참고 문서 : [API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/)

# Conventions
## General Conventions
- 복잡도가 O(1)이 아닌 연산 프로퍼티는 복잡도를 기록함
- 자유 함수보다 프로퍼티를 선호. 자유 함수를 특수한 경우에만 사용됨
1. 명확한 self가 없을 때
` min(x, y, z) `
2. 제약 없는 제네릭 함수일 때
`print(x)`
3. 함수 구문이 특정한 도메인 표기법의 일부일 때
`sin(x)`
- 대소문자 표기법을 따름. 타입과 프로토콜의 이름: UpperCamelCase, 그 외에는 lowerCamelCase

## Parameters
`func move(from start: Point, to end: Point)`
- 문서를 제공할 매개변수 이름을 선택함. 문서를 쉽게 읽을 수 있도록 매개변수 이름 선택
- 매개변수는 최대한 간단하고, 정보를 숨겨서 가독성을 향상시키는 방향으로 선택함
` ❌
let order = lastName.compare(
royalFamilyName, options: [], range: nil, locale: nil) `
`✅
let order = lastName.compare(royalFamilyName) `
- 디폴트 파라미터는 파라미터 리스트에 뒤쪽으로 놓는걸 선호

## Argument Labels
`func move(from start: Point, to end: Point)
x.move(from: x, to: y) `
- 전달인자 레이블이 전달인자들을 유용하게 구분하지 못하는 경우 모든 전달인자 레이블을 무시함
` min(number1, number2) `
`zip(sequence1, sequence2)`
- 값 보존 유형 변환을 수행하는 이니셜라이저의 경우 첫 번째 전달인자 레이블 생략함, 타입변환의 대상은 반드시 첫 번째 전달인자
- 첫 번째 전달인자가 전치사구의 일부라면, 전달인자 레이블을 줌
`x.removeBoxes(havingLength: 12)`
- 첫 번째 전달인자가 문법구문의 일부라면 전달인자 레이블을 무시하고 기본이름에 선행단어 추가
`x.addSubview(y)`

# Naming
## Promote Clear
- 이름이 사용된 코드를 읽을 사람들을 위해 모호하지 않도록 필요한 모든 단어를 포함
- 불필요한 단어는 생략
` ❌
public mutating func removeElement(_ member: Element) -> Element?
allViews.removeElement(cancelButton) `
` ✅
public mutating func remove(_ member: Element) -> Element?
allViews.remove(cancelButton) // clearer `
- 타입이 아닌 해당 역할에 따라 변수, 매개변수, 연관 타입등을 명명함
- 매개변수의 역할을 명확하게 하기 위해 약한 타입 정보를 보완해야 함 -> 명확하게 하려면, 각 약한 타입의 매개변수 앞에 그 역할을 설명하는 명사를 위치시킴
` ❌
func add(_ observer: NSObject, for keyPath: String)
grid.add(self, for: graphics) // vague `
` ✅
func addObserver(_ observer: NSObject, forKeyPath path: String)
grid.addObserver(self, forKeyPath: graphics) // clear `

# Strive for Fluent Usage
- 사용되는 곳의 메서드와 함수의 이름은 영어 문법에 맞도록 작성
- 예를 들어 x.makeIterator()와 같이, 팩토리 매서드의 이름은 "make"로 시작함
- 함수와 메서드의 이름은 그 부수 효과에 따라 명명함
  - 예를 들어 x.distance(to: y), i.successor()는, 부수 효과가 없는 함수 및 메서드는 명사 구로 읽어야 함
  - print(x), x.sort(), x.append(y) 예시와 같이, 부수 효과가 있는 함수 및 메서드는 명령형인 동사구로 읽어야 함
  - 변환 / 비변환 메서드 쌍은 일관되도록 명명함 변환 메서드는 종종 비슷한 의미를 가진 비변환 함수를 갖지만, 해당 메서드는 인스턴스를 자체를 업데이트하기 보다는 새로운 값을 반환함
      - 기능이 동사로 자연스럽게 설명되는 경우, 변환 메서드는 동사의 명령형을 사용하고, “ed” 또는 “ing” 접미사를 붙여 그에 대응하는 비변환 메서드 이름에 적용함    
![image](https://user-images.githubusercontent.com/63441374/214498773-ef05e102-ce11-4ff0-b5e0-15af684bdda4.png)
      - 비변환 메서드는 과거분사형(보통 “ed”를 추가)을 사용해 명명하는 것이 좋음
      - 동사가 직접 목적어를 갖고 있어서 “ed”를 추가하는 것이 문법적이지 않는 경우, 비변환 형태는 “ing”를 붙여 동사의 현재 분사형으로 명명함
      - 기능이 명사로 자연스럽게 설명되는 경우에 비변환 메서드에 명사를 사용하고, “form” 접두사를 붙여 그에 대응하는 변환 메서드 이름에 적용
함     
![image](https://user-images.githubusercontent.com/63441374/214499011-4c4471ef-b6f2-4295-9b3c-0a170505e408.png)
- x.isEmpty, line1.intersects(line2) 예시처럼, 부울 메서드 및 프로퍼티의 사용은 비변환 메서드일 때, 수신자에 대한 주장처럼 읽어야 함
- 무언가를 설명하는 프로토콜은 명사로 읽어야 합니다. `Collection`
- 능력을 설명하는 프로토콜은 able, ible 또는 ing 접미사를 사용해서 명명해야 함 `Equatable, ProgressReporting`
- 다른 타입, 프로퍼티, 변수 그리고 상수의 이름은 명사로 읽어야 합니다.

## Use Terminology Well
- 기술 용어 : 명사 - 특정 분야나 직군 내에서 명확하고 전문적인 의미를 가진 하나의 단어 혹은 문구
- 일반적으로 사용되는 단어로도 충분히 의미가 전달된다면 이해하기 힘든 용어는 사용하지 않아도 됨
- 기술 용어를 사용한다면 용어가 가지고 있는 의미에 충실하도록 사용해야 함
   - 용어에 익숙한 사람도 이해하고, 초심자 입장에서도 이해할 수 있도록 작성해야 함
- 축약어를 피하도록 함
- 선례를 따르도록 함
