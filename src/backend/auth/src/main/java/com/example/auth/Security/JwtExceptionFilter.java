//package com.example.auth.Security;
//
//import com.example.auth.Vo.DefaultResponse;
//import com.example.auth.Vo.ResponseMessage;
//import com.example.auth.Vo.StatusCode;
//import io.jsonwebtoken.JwtException;
//import java.io.IOException;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Component
//public class JwtExceptionFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
//            FilterChain chain) throws ServletException, IOException {
//        try {
//            chain.doFilter(req, res); // go to 'JwtAuthenticationFilter'
//        } catch (JwtException ex) {
//            setErrorResponse(HttpStatus.UNAUTHORIZED, res, ex);
//        }
//    }

//    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex)
//            throws IOException {
//        res.setStatus(status.value());
//        res.setContentType("application/json; charset=UTF-8");
//
//        //JwtExceptionResponse jwtExceptionResponse = new JwtExceptionResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
//        DefaultResponse defaultResponse = new DefaultResponse(StatusCode.TOKEN_INVALID,
//                ResponseMessage.TOKEN_INVALID, null);
//        res.getWriter().write(defaultResponse);
//    }

//}