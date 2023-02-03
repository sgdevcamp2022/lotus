package com.example.auth.Vo;

public class ResponseMessage {

    public static final String LOGIN_SUCCESS = "로그인 성공";
    public static final String LOGIN_FAIL = "로그인 실패";
    public static final String LOGOUT_SUCCESSS="로그아웃 성공";
    public static final String READ_USER_SUCCESS = "회원 정보 조회 성공";
    public static final String READ_USER_FAILURE = "회원 정보 조회 실패";
    public static final String TOKEN_INVALID = "토큰 무효함";
    public static final String TOKEN_REISSUE = "액세스토큰 정상 발급";
    public static final String LOGIN_AGAIN = "재로그인 요청";
    public static final String STOVE_URL_AGAIN = "스토브 URL 정확히 기입";
    public static final String STOVE_INTRODUCTION_SUCCESS = "스토브 자기소개글 조회 성공";
    public static final String STOVE_LOSTARK_SUCCESS = "스토브 계정으로부터 로스트아크 캐릭터 조회 성공";
    public static final String BAD_REQUEST="BAD REQUEST";
    public static final String STOVE_NUMBER_FAILURE="회원테이블 스토브 번호 업데이트 실패";
    public static final String STOVE_NUMBER_SUCCESS="회원테이블 스토브 번호 업데이트 성공";
    public static final String WRONG_JWT="잘못된 JWT 서명입니다";
    public static final String EXPIRED_JWT="만료된 JWT 토큰입니다";
    public static final String UNSUPPORTED_JWT="지원되지 않는 JWT 토큰입니다";
    public static final String Illegal_JWT="잘못된 JWT 토큰입니다";
    public static final String NO_JWT="JWT 토큰이 존재하지 않습니다";
    public static final String LOGOUT_JWT="로그아웃한 사용자 입니다.";
}
