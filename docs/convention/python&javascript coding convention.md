### Python[PEP-8]
#### Indentation
레벨에 따라 4개의 공백을 사용한다. 단, 괄호 안의 요소들의 줄 바꿈이 일어날  경우 요소들의 경우는 여는 괄호에 오도록 공백을 넣거나 추가로 공백을 넣어서 구분할 수 있도록 만든다.
```Python
# Aligned with opening delimiter.
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# Add 4 spaces (an extra level of indentation) to distinguish arguments from the rest.
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)

# Hanging indents should add a level.
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)
```
#### Maximum Line Length
한 문장의 길이는 79자로 제한한다. 또한 뒤따라오는 docstring이나 주석의 경우는 72자로 제한한다.

#### 연산자의 위치
연산자는 피연산자 앞에 위치하도록 작성한다.
```Python
# Correct:
# easy to match operators with operands
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)
```

#### Blank Lines
최상위 레벨의 함수나 클래스 정의시에는 두 개의 빈줄로 위아래를 감싼다. 클래스 안의 메소드는 하나의 빈칸으로 구분한다. 

#### import
한 줄에 하나만 import 한다. 

#### String Quotes
따옴표나 쌍따옴표로 둘러싼 문자열은 동등하다. 그래서 하나를 특정히 추천하지 않는다. 

#### Whitespace in Expressions and Statements
(), {}, [] 안에 한칸씩 공백을 넣지 않는다. 
쉼표(,), 세미콜론(;) 콜론(:) 앞에 공백을 넣지 않는다.
하지만 슬라이스의 경우에는 요소 사이에 같은 길이의 공백을 적용한다.

 #### Comment
인라인 코멘트는 적어도 2개의 공백으로 명령구문과 분리되어야 하고 #과 단일 공백으로 시작해야 한다.

#### Documentation Strings
모든 공개 모듈, 함수, 클래스, 메서드에 대해서 docstring을 써라. 이 코멘트는 def 줄 다음에 있어야 한다. 

#### Naming Conventions
소문자 엘(l), 대문자 오(O), 대문자 아이(I)는 단일 문자 변수로 사용해선 안 된다. 이것들을 구분할 수 없는 글꼴이 있기 때문이다.

#### 패키지와 모듈 이름
모듈은 짧은 소문자로만 구성된 이름을 가져야 한다.

#### 클래스 이름
클래스 이름은 일반적으로 CapWord 관례를 따른다. 
`class ExampleClassName():`

#### 자료형 변수 이름
자료형 변수의 이름은 보통 CapWord를  사용한다.

#### 예외 이름
예외는 클래스 이름처럼 사용하지만 예외 이름에 `Error` 접미사를 붙인다.
`FireWallError`

#### 전역변수이름
함수들에 적용되는 것과 동일한 협약을 따른다.

#### 함수이름
함수명은 소문자이어야 하고 단어들을 밑줄로 분리하여야 한다.
`get_name`

#### 함수와 메서드 인자
인스턴스 메서드의 첫 번째 인자는 항상 `self`를 사용하고, 클래스 메서드의 첫 번째 인자는 항상 `cls`를 사용한다. 만약 함수의 인자명이 예약어와 충돌한다면, 단일 후행 밑줄을 덧붙이는 것이 일반적으로 더 낫다.
```
class ExampleClass():

    def _print_(self, option):
        ...

```

#### 메서드 이름과 인스턴스 변수
함수 이름 규칙을 따르되, 비공개 메서드와 인스턴스 변수에만 하나의 선행 밑줄을 사용한다.

#### 상수
보통 모듈 수준에서 정의되고, 밑줄로 분리된 대문자 단어로 쓰여진다.

### JavaScript

#### 세미콜론
문장의 끝에 세미콜론으로 구분해 주는 것이 필요하다.

#### 변수명
lowerCamelCase를 사용한다.

#### 전역변수
UPPERCASE를 사용한다.

#### 상수
UPPERCASE를 사용한다.

#### 공백과 들여쓰기
연산자 (=, *, -, +, /) 사이와 쉼표 뒤에는 공백을 둔다.
코드 블럭에서의 들여쓰기는 공백 두 칸으로 한다.

#### 괄호
여는 괄호는 시작 줄의 가장 마지막에 사용하고, 앞에 공백 하나를 둔다.
닫는 괄호는 마지막 코드의 다음 줄의 가장 처음에 사용하고 앞에 공백을 두지 않는다.

#### 오브젝트 정의
각 property와 value 사이에는 콜론으로 구분한다.
string에 대해서는 쌍따옴표를 사용한다.
마지막 property-value에 대해서는 쉼표를 사용하지 않는다.
정의 후에는 세미콜론을 붙인다.

#### 글자수
한 줄에 80글자를 넘지 않도록 한다.