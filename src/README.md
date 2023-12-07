# Lotus 프로젝트 총괄 자료집
## 목차
1. 프로젝트 기획서
2. 업무분석 보고서
3. 사이트 기능 구조
4. 디렉토리 구조도
5. 데이터베이스 테이블 설명

## 1. 프로젝트 기획서
### 팀 구성 및 담당업무
- 양현성: 아이템 레벨 기반 매칭 시스템 설계 및 구현 / 게시글 이벤트 구현 / K8s를 이용한 시스템 인프라 설계 및 구축 / AWS 클라우드 네이티브 환경으로 Migration
- 임상우: 인증, SNS 시스템 구현 및 Dockerize
- 박정현: 채팅 시스템 구현 및 Frontend
- 한서영: ios 화면 구성 및 Frontend

### 프로젝트 개요
- ### Loatus 프로젝트
    - 관련 분야: 커뮤니티 서비스
    - 개발 기간: 2023. 01. 25 ~ 2023. 02. 23
    - 운영 체제: Linux
    - DB: MySQL, Redis
    - 사용 언어: Python, Java, JavaScript, HTML, CSS, TypeScript
    - 그 외 SW: Docker, Kubernetes, AWS Cloud(EKS(Kubernetes), RDS(MySQL), ElasticCache(Redis), EFS(NFS), VPC, EC2, Cloud9), Django,
- ### 개요
    - ### 로스트아크 게임 계정 연동을 통한 유저들의 레이드 매칭 및 친목 도모를 위한 커뮤니티 사이트

## 2. 업무분석 보고서
- 개발 팀 이름: Lotus
- 개발 분야: 클라우드 환경에서 Kubernetes를 이용한 Django, Spring, NestJS 웹 애플리케이션 배포
- 팀 구성
    - 팀장: 양현성(BE, SE)
    - 팀원: 임상우(BE), 박정현(BE, FE), 한서영(ios)
- 목적
    - 스토브 플랫폼 연동을 통한 로스트아크 인게임 계정 정보가 연동된 커뮤니티 사이트를 만든다.
    - 레이드 파티를 찾고자 하는 유저들을 위해 기본적인 커뮤니티 기능을 제공한다.
    - 로스트아크 오픈API를 기반으로 비슷한 스펙의 유저들끼리의 자동매칭 기능을 지원한다.
- 프로젝트 개발 일정
![img](./images/0227-1.png)

## 3. 사이트 기능 구조
- 게시글
    - 게시글 관련
        - 게시글 등록 및 수정
            - 게시글 등록 및 작성했던 내용을 가져와 수정할 수 있음
        - 게시글 삭제
            - 게시글 삭제하면 게시글에 있던 댓글 등 모든 게시글 관련 내용을 DB에서 삭제
        - 게시글 좋아요
            - 원하는 게시글에 좋아요를 표시할 수 있음(한 번 더 누른다면 취소할 수 있음)
    - 댓글 관련
        - 댓글 등록 및 조회: 댓글을 등록하고 게시글의 모든 댓글들을 조회할 수 있음
- 매칭
    - 매칭 관련
        - 매칭 등록
            - 다양한 레이드 매칭들 중 원하는 레이드 매칭에 등록할 수 있음. 연동된 캐릭터 정보를 바탕으로 로스트아크 오픈 API를 호출하여 입장 스펙을 만족하는지를 확인함.
            - 매칭을 등록한 유저 순으로 매칭을 잡아줌.
        - 매칭 조회
            - 원하는 레이드의 인원들이 모두 매칭 되었는지를 확인함.

## 4. 디렉토리 구조도
- ### Depth1: src/backend
    - ### Depth2: loatus_board
        - ### Depth3: post
            - models.py: 게시글 객체, 댓글 객체에 대한 데이터베이스 구조 설계
            - urls.py: 게시글 API에 대한 URL
            - views.py: 게시글 API에 대한 함수 정의
        - ### Depth3: matching
            - models.py: 레이드 객체, 파티 객체, 매칭 객체에 대한 데이터베이스 구조 설계
            - urls.py: 매칭 API에 대한 URL
            - views.py: 매칭 등록 API에 대한 함수 정의
    - ### Depth2: party_matching
        - ### Depth3: obj_create 
            - views.py: 매칭을 등록한 유저들을 레이드 id별로 대기열 큐에 넣는 기능 및 대기열 큐가 특정 크기를 넘어가면 파티 객체와 매칭 객체를 생성하는 함수 정의
    - ### Depth2: matching_save
        - ### Depth3: matching_result
            - views.py: 매칭 조건이 완료된 파티 객체에 대해 파티 id값을 바탕으로 매칭 객체에서 해당 파티 id값을 가지는 user_id값들을 조회하고, user_id값을 가지는 캐릭터를 json파일로 공유 스토리지에 저장하는 함수 정의

## 5. 데이터베이스 테이블 설명            
- ### 매칭 시스템
    ![img](./images/0227-2.png)
    ![img](./images/0227-3.png)
    ![img](./images/0227-4.png)
    ![img](./images/0227-5.png)
    ![img](./images/0227-6.png)
