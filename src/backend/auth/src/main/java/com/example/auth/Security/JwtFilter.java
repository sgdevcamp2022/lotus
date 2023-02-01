package com.example.auth.Security;

import com.example.auth.Entity.AccessToken;
import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.exception.DuplicateMemberException;
import java.util.Base64;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;
    private final AccessTokenRepository accessTokenRepository;

    public JwtFilter(TokenProvider tokenProvider,
            AccessTokenRepository accessTokenRepository) {
        this.tokenProvider = tokenProvider;
        this.accessTokenRepository = accessTokenRepository;
    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
            FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String jwt = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userIdFromToken = getUserIdFromToken(jwt);
            Boolean isLogout = checkAccessTokenExists(userIdFromToken);
            if(!isLogout){
                Authentication authentication = tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}",
                        authentication.getName(),
                        requestURI);
            }





        } else {
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private Map<String, Object> decodeToken(String token) {
        String payloadJWT = token.split("\\.")[1];
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(payloadJWT));
        JsonParser jsonParser = new BasicJsonParser();
        Map<String, Object> jsonArray = jsonParser.parseMap(payload);
        return jsonArray;
    }

    private Long getUserIdFromToken(String token) {
        Map<String, Object> stringObjectMap = decodeToken(token);
        Long id = (Long) stringObjectMap.get("id");
        return id;
    }
    
    private Boolean checkAccessTokenExists(Long userId){
        Optional<AccessToken> accessTokenByUserId = accessTokenRepository.findAccessTokenByUserId(
                userId);
        if(accessTokenRepository.findAccessTokenByUserId(userId).orElse(null)!=null){
            return true;        //로그아웃상태
        }
        else {
            return false;       //로그아웃상태x
        }


    }
}
