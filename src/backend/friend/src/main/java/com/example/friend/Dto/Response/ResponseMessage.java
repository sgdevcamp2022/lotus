package com.example.friend.Dto.Response;

public class ResponseMessage {
    //auth
    public static final String LOGIN_SUCCESS = "로그인 성공";
    public static final String LOGIN_FAIL = "로그인 실패";
    public static final String LOGOUT_SUCCESSS = "로그아웃 성공";
    public static final String SIGNUP_SUCCESSS = "회원가입 성공";
    public static final String SIGNUP_FAILURE = "중복된 사용자 존재";
    public static final String READ_USER_SUCCESS = "회원 정보 조회 성공";
    public static final String READ_USER_FAILURE = "회원 정보 조회 실패";
    public static final String TOKEN_INVALID = "토큰 무효함";
    public static final String TOKEN_REISSUE = "액세스토큰 정상 발급";
    public static final String LOGIN_AGAIN = "재로그인 요청";
    public static final String STOVE_URL_AGAIN = "스토브 URL 정확히 기입";
    public static final String STOVE_INTRODUCTION_SUCCESS = "스토브 자기소개글 조회 성공";
    public static final String STOVE_LOSTARK_SUCCESS = "스토브 계정으로부터 로스트아크 캐릭터 조회 성공";
    public static final String LOSTARK_MAINCHARACTER_SUCCESS = "대표캐릭터 설정 성공";
    public static final String BAD_REQUEST = "BAD REQUEST";
    public static final String RANDOMCODE_SUCCESS = "랜덤 코드 발급 성공";
    public static final String STOVE_NUMBER_FAILURE = "회원테이블 스토브 번호 업데이트 실패";
    public static final String STOVE_NUMBER_SUCCESS = "회원테이블 스토브 번호 업데이트 성공";
    public static final String WRONG_JWT = "잘못된 JWT 서명입니다";
    public static final String EXPIRED_JWT = "만료된 JWT 토큰입니다";
    public static final String UNSUPPORTED_JWT = "지원되지 않는 JWT 토큰입니다";
    public static final String Illegal_JWT = "잘못된 JWT 토큰입니다";
    public static final String NO_JWT = "JWT 토큰이 존재하지 않거나 계정정보가 틀렸습니다";
    public static final String LOGOUT_JWT = "로그아웃한 사용자 입니다.";

    //friend
    public static final String FRIENDLIST_CREATE_SUCCESS = "친구테이블 생성 성공";
    public static final String FRIEND_REQUEST_SUCCESS = "친구요청 성공";
    public static final String FRIEND_REFUSE_SUCCESS = "친구거절 성공";
    public static final String FRIEND_ACCEPT_SUCCESS = "친구수락 성공";
    public static final String FRIEND_DELETE_SUCCESS = "친구삭제 성공";
    public static final String FRIEND_LIST_SUCCESS = "친구조회 성공";
}
