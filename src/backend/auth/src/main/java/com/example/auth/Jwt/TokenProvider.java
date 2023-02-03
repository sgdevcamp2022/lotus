package com.example.auth.Jwt;

import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.LoginResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    private static final String AUTHORITIES_KEY = "auth";
    private final String secret;
    private final long accessTokenValidityInMilliseconds;
    private final long refreshTokenValidityInMilliseconds;
    private final AccessTokenRepository accessTokenRepository;
    private Key key;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.accessToken-validity-in-seconds}") long accessTokenValidityInSeconds,
            @Value("${jwt.refreshToken-validity-in-seconds}") long refreshTokenValidityInSeconds,
            AccessTokenRepository accessTokenRepository) {
        this.secret = secret;
        this.accessTokenValidityInMilliseconds = accessTokenValidityInSeconds * 1000;
        this.refreshTokenValidityInMilliseconds = refreshTokenValidityInSeconds * 1000;
        this.accessTokenRepository = accessTokenRepository;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public LoginResponse createToken(Authentication authentication) {
        String accessToken = createAccessToken(authentication);
        String refreshToken = createRefreshToken();
        String username = authentication.getName();

        return LoginResponse.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(username)
                .build();

    }

    public LoginResponse createToken(Authentication authentication, Long userId) {
        String accessToken = createAccessToken(authentication, userId);
        String refreshToken = createRefreshToken();
        String username = authentication.getName();

        return LoginResponse.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(username)
                .build();

    }

    public String createAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessValidity = new Date(now + this.accessTokenValidityInMilliseconds);

        System.out.println("authentication.getPrincipal() = " + authentication.getPrincipal());
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(accessValidity)
                .compact();

        return accessToken;
    }

    public String createAccessToken(Authentication authentication, Long userId) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessValidity = new Date(now + this.accessTokenValidityInMilliseconds);

        System.out.println("authentication.getPrincipal() = " + authentication.getPrincipal());
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("id", userId)
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(accessValidity)
                .compact();

        return accessToken;
    }

    public String createRefreshToken() {

        long now = (new Date()).getTime();
        Date refreshValidity = new Date(now + this.refreshTokenValidityInMilliseconds);

        String refreshToken = Jwts.builder()
                .setExpiration(refreshValidity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return refreshToken;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        System.out.println("claims.getid" + claims.get("id"));

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        System.out.println("authorities = " + authorities);

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(HttpServletRequest request, String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            Long userIdFromToken = getUserIdFromAccessToken(token);

            if (accessTokenRepository.findAccessTokenByUserId(userIdFromToken).orElse(null)
                    != null) {
                logger.info("로그아웃한 사용자입니다.");
                request.setAttribute("exception", ResponseMessage.LOGOUT_JWT);
                return false;        //로그아웃상태
            }
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            request.setAttribute("exception", ResponseMessage.WRONG_JWT);
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", ResponseMessage.EXPIRED_JWT);
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            request.setAttribute("exception", ResponseMessage.UNSUPPORTED_JWT);
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            request.setAttribute("exception", ResponseMessage.Illegal_JWT);
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public Claims extractAllClaims(String token) { // 2

        System.out.println("token = " + token);
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

//    public Map<String, Object> decodeToken(String token){
//        String payloadJWT = token.split("\\.")[1];
//        Base64.Decoder decoder = Base64.getUrlDecoder();
//
//        String payload = new String(decoder.decode(payloadJWT));
//        JsonParser jsonParser = new BasicJsonParser();
//        Map<String, Object> jsonArray = jsonParser.parseMap(payload);
//        return jsonArray;
//    }

    public Long getUserIdFromAccessToken(String accessToken) {
        String id = extractAllClaims(accessToken).get("id").toString();
        return Long.parseLong(id);
    }

    public long getRemainMilliSeconds(String accessToken) {
        Date expiration = extractAllClaims(accessToken).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
        // return Long.parseLong(exp);
    }


}