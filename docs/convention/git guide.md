# Git Flow Convention


## Issues
구현할 기능에 대해 issue를 생성한다
issue단위는 너무 크지도 작지도 않게 지정한다

![issue](https://user-images.githubusercontent.com/46774346/214583623-bc933e3f-d56e-4a63-a3e0-4078d68fc901.png)
Issues탭에서 New Issue를 클릭한다 


![issue2](https://user-images.githubusercontent.com/46774346/214583645-7c9d346f-0b0f-4b5a-84de-3a4e8d8fe740.png)
- 구현할 기능에 대한 설명을 제목에 작성하고, 본문에는 구현할 세부기능을 작성한다
- 구현이 완료된 기능은 체크박스를 채운다
- 전부 구현이 완료됐으면 Close issue를 해준다
- 불필요한 issue를 남겨두어 복잡하지 않게 한다.
- Labels는 취향껏 추가한다




## Branch 
- main: 프로젝트가 최종적으로 배포되는 브랜치
- develop: 개발이 진행되는 브랜치  
  develop 브랜치가 배포할 수준의 기능을 갖추면 main 브랜치로 머지된다
- feature: 기능을 개발하는 브랜치 
develop 브랜치에서 파생되는 브랜치이며, develop 브랜치로 머지된다다
- hotfix: 출시 버전(main)에서 버그를 수정하는 브랜치 
main 브랜치에서 생성되며, 수정이 완료되면 develop, main 브랜치에 수정 사항을 반영한다


## Branch Naming
- master와 develop은 일반적으로 본래 이름 그대로 사용
- `feature`: `feature/{기능 요약}` 혹은 `feature/{issue-number}-{기능요약}`
- `hotfix`: `hotfix-{버전}`


## Branch Example
### 예시1
```
feature/authentication
feature/53-authentication
```  

### 예시2
```
hotfix-0.0.1
hotfix- 0.1.0
```


<br/>
<br>
  
    
      
  
        
# Commit Message  


## Structure
>제목(Type: Subject)
(한줄 띄어 분리)
본문 (Body)
(한줄 띄어 분리)
꼬리말 (Footer)

본문에 작성할 내용이 있으면
`git commit`명령어를 통해 vim 에디터로 커밋메시지를 작성한다  

본문에 작성할 내용이 없으면 
`git commit -m "feat: 채팅서버 이미지 전송 추가"` 제목만 작성해도 괜찮다


## Type
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor: 코드 리팩토링
- test: 테스트 코드, 리팩토링 테스트 코드 추가
- chore: 빌드 업무 수정, 패키지 매니저 수정

## Subject
- 제목은 50글자 이내로 작성한다
- 한글로 작성하고 단어로 끝난다(하다x)
ex) ✅  커뮤니티 댓글 작성  추가
❌  커뮤니티 댓글  작성 추가하다 
- 마침표 및 특수기호는 사용하지 않는다
- 과거시제는 사용하지 않는다
- 간결하고 요점적으로 작성한다


## Body
- 72자 이내로 작성한다
- 최대한 상세히 작성한다(코드 변경의 이유를 명확히 작성할수록 좋다)
- 어떻게 변경했는지보다 무엇을, 왜 변경했는지 작성한다


## Footer
- 선택사항
- issue tracker ID 명시하고 싶은 경우에 작성한다
- 유형: #이슈 번호 형식으로 작성한다
- 여러 개의 이슈번호는 쉼표(,)로 구분한다
- 이슈 트래커 유형은 다음 중 하나를 사용한다
fixes: 이슈 수정중 (아직 해결되지 않은 경우)
resolves: 이슈를 해결했을 때 사용
ref: 참고할 이슈가 있을 때 사용
related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)


## Commit Example
### 예시1
```
feat: 회원 가입 기능 구현

SMS, 이메일 중복확인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

### 예시2
```
docs: 회원 테이블 삽입 쿼리문 추가

테스트를 위해 필요한 더미 데이터를 추가했다
```

### 예시3
```
fix: 카카오 로그인 오류 해결 
```