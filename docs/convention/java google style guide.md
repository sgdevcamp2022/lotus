## 참고 링크
[Google Java Style Guide](https://google.github.io/styleguide/javaguide.html/) 
+[번역 블로그](https://newwisdom.tistory.com/96?category=956550)


## 인텔리제이 적용 방법(윈도우): 
[Google java Style Xml](https://github.com/google/styleguide/blob/gh-pages/intellij-java-google-style.xml)

1. 위의 파일 다운로드 
2. File -> Setting -> Editor -> Code Style 클릭
3. 톱니바퀴의 IntelliJ IDEA code style XML 메뉴를 선택해 다운받은 파일 Import
4. Ctrl+Alt+L(윈도우)누르면 적용됨


`구글 컨벤션은 들여쓰기가 2로 되어있는데, 대부분 4로 쓰기때문에 4로 변경`


대부분의 내용은 적용한대로 지켜지기 때문에
내가 코드를 작성하면서 참고할 부분을 위주로 정리했다
생각나지 않는 부분이 있으면 참고 링크를 볼 예정이다

### 3 소스 파일 구조
---
- 라이센스 또는 저작권 정보(있는 경우)
- Package 구문
- Import 구문
- 정확히 하나의 최상위 Class



####  3.3.1 와일드 카드 가져오기는 없다  
❌ import lombok.*; 
✅  import lombok.Getter;


#### 3.4.2 클래스 내용의 순서
새로운 메서드는 논리적 순서가 아닌 추가된 날짜별 순서이다.

---

### 4 포맷
---

#### 4.1.1 선택 사항인 경우에서도 중괄호가 사용된다.
```
if(true){
    System.out.println("True");
}
else{
    System.out.println("False");
}
```

#### 4.1.3 
빈 블록은 간결할 수 있으나 if/else, try/catch/finally는 간결한 빈 블록 사용 불가능하다.

#### 4.2 블록 들여 쓰기: +2 공백
`허나 나는 4칸 들여쓰기를 사용한다`

#### 4.4 열 제한: 100  

#### 4.5 줄 바꿈
열 제한을 초과하지 않도록 작성자의 재량에 맞게 사용한다.

#### 4.6.1 세로 공백
연속적인 멤버 또는 클래스의 초기화: 필드, 생성자, 메서드, 중첩 클래스, 정적 초기화 그리고 인스턴스 초기화
코드를 논리적 하위 섹션으로 구성하는 명령문 사이와 같이
가독성을 향상시키는 모든 곳에 빈 줄 하나가 나타날 수 있다.

#### 4.8.1 Enum 클래스
enum 상수 뒤에 오는 각 쉼표 뒤에 줄 바꿈은 선택사항이다.

#### 4.8.2 변수 선언
4.8.2.1 선언 당 하나의 변수
모든 변수 선언(필드 또는 로컬)은 하나의 변수만 선언한다.
❌  int a,b;
✅   int a;  int b;

#### 4.8.5 Annotations
클래스, 메서드 또는 생성자에 적용되는 Annotations는 한 줄에 하나의 어노테이션이 적용된다

---

### 5 Naming
---

#### 5.2.2 클래스 이름
UpperCamelCase로 작성된다
```
예시: Character 또는 ImmutableList
```
#### 5.2.3 메서드 이름
lowerCamelCase로 사용된다
```
예시: sendMessage 또는 stop
```


#### 5.2.4 Constatnt 이름
모두 대문자로 _로 각 단어를 구분한다
```
예시: static final int NUMBER=5;
enum SomeEnum {ENUM_CONSTANT}
```
#### 5.2.5 상수가 아닌 필드이름
lowerCamelCase

#### 5.2.6 파라미터 이름
lowerCamelCase

#### 5.2.7 지역 변수 이름
lowercamelCase

--- 