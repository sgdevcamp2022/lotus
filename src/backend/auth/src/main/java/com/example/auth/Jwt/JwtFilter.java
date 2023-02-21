package com.example.auth.Jwt;

import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.Dto.Response.ResponseMessage;
import java.util.Base64;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
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

        /*
         * validate token에서 못잡은 예외는 access token이 첨부되지않았을때가 유일하다고 가정
         * */
        httpServletRequest.setAttribute("exception",
                ResponseMessage.NO_JWT);   //exception attribute에 no_jwt로 기본 설정

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(httpServletRequest, jwt)) {
            /*
             * securitycontextholder에 authentication을 set하지 않으면
             * 다음 요청이 들어왔을때 authenticationentrypoint로 가는듯하다(인증되지 않았을때 처리)
             * 즉 여기가 실행돼야 인증됐다는 뜻이고
             * validate token-> 토큰 예외에 각 상황을 set해두고
             * jwt가 존재하지 않는경우는 no_jwt로 초기에 설정을 해둔것이다
             * */
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}",
                    authentication.getName(),
                    requestURI);
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

}
