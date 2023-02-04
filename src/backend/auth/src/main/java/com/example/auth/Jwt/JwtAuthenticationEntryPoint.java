package com.example.auth.Jwt;

import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.StatusCode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        String exception = (String) request.getAttribute("exception");

        if (exception.equals(ResponseMessage.WRONG_JWT)) {
            setResponse(response, ResponseMessage.WRONG_JWT);
        } else if (exception.equals(ResponseMessage.EXPIRED_JWT)) {
            setResponse(response, ResponseMessage.EXPIRED_JWT);

        } else if (exception.equals(ResponseMessage.UNSUPPORTED_JWT)) {
            setResponse(response, ResponseMessage.UNSUPPORTED_JWT);
        } else if (exception.equals(ResponseMessage.Illegal_JWT)) {
            setResponse(response, ResponseMessage.Illegal_JWT);
        } else if (exception.equals(ResponseMessage.NO_JWT)) {
            setResponse(response, ResponseMessage.NO_JWT);
        } else if (exception.equals(ResponseMessage.LOGOUT_JWT)) {
            setResponse(response, ResponseMessage.LOGOUT_JWT);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }

        // 유효한 자격증명을 제공하지 않고 접근하려 할때 401
        // response.sendError(HttpServletResponse.SC_UNAUTHORIZED);

    }


    //한글 출력을 위해 getWriter() 사용
    private void setResponse(HttpServletResponse response, String responseMessage)
            throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        DefaultResponse defaultResponse = new DefaultResponse(StatusCode.UNAUTHORIZED,
                responseMessage, null);
        Gson gson = new GsonBuilder()
                .serializeNulls()
                .create();
        response.getWriter().println(gson.toJson(defaultResponse));
    }

}
