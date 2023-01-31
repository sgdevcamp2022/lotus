package com.example.auth.Lostark;

import com.example.auth.Entity.RandomCode;
import com.example.auth.Entity.RefreshToken;
import com.example.auth.Repository.RandomCodeRepository;
import com.example.auth.Security.TokenProvider;
import java.util.Objects;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class LostarkAuthentication {

    private final RandomCodeRepository randomCodeRepository;
    private final TokenProvider tokenProvider;

    public LostarkAuthentication(RandomCodeRepository randomCodeRepository,
            TokenProvider tokenProvider) {
        this.randomCodeRepository = randomCodeRepository;
        this.tokenProvider = tokenProvider;
    }


    public String generateRandomCode(String accessToken){
        /*
        * 랜덤 문자열 생성
        * */
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 80;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        System.out.println(generatedString);


        /*
        * redis에 저장
        * */
        Long userIdFromAccessToken = Long.parseLong(tokenProvider.getUserIdFromAccessToken(accessToken));
        RandomCode randomCodeInRedis = findRandomCode(userIdFromAccessToken);

        if (!Objects.isNull(randomCodeInRedis)) {    //있으면 삭제
            randomCodeRepository.delete(randomCodeInRedis);
        }
        //새로 저장
        RandomCode randomCode=new RandomCode(generatedString, userIdFromAccessToken);
        randomCodeRepository.save(randomCode);

        return generatedString;
    }





    public RandomCode findRandomCode(Long userId) {
        return randomCodeRepository.findRandomCodeByUserId(userId);
    }
}
