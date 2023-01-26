package com.example.auth.Oauth2;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;

@Slf4j
@Getter
public class OAuth2Attributes {

    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String oauthId;
    private final String nickname;
    private final String email;
    private final String picture;
    private final Provider provider;

    @Builder
    public OAuth2Attributes(Map<String, Object> attributes, String nameAttributeKey, String oauthId,
            String nickname, String email, String picture, Provider provider) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.oauthId = oauthId;
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.provider = provider;
    }

    @SneakyThrows
    public static OAuth2Attributes of(String registrationId, String userNameAttributeName,
            Map<String, Object> attributes) {
        log.info("userNameAttributeName = {}", new ObjectMapper().writerWithDefaultPrettyPrinter()
                .writeValueAsString(userNameAttributeName));
        log.info("attributes = {}",
                new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
        String registrationIdToLower = registrationId.toLowerCase();
        switch (registrationIdToLower) {
            case "naver":
                return ofNaver(userNameAttributeName, attributes);
            case "kakao":
                return ofKakao(userNameAttributeName, attributes);
            case "google":
                return ofGoogle(userNameAttributeName, attributes);
            case "facebook":
                return ofFacebook(userNameAttributeName, attributes);
            case "github":
                return ofGithub(userNameAttributeName, attributes);
            default:
                throw new OAuth2RegistrationException("해당 소셜 로그인은 현재 지원하지 않습니다.");
        }
    }

    @SuppressWarnings("unchecked")
    private static OAuth2Attributes ofNaver(String userNameAttributeName,
            Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return OAuth2Attributes.builder()
                .oauthId((String) response.get("id"))
                .nickname((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("profile_image"))
                .provider(Provider.NAVER)
                .attributes(response)
                .nameAttributeKey("id")
                .build();
    }


    @SuppressWarnings("unchecked")
    private static OAuth2Attributes ofKakao(String userNameAttributeName,
            Map<String, Object> attributes) {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");
        return OAuth2Attributes.builder()
                .oauthId(attributes.get(userNameAttributeName).toString())
                .nickname((String) profile.get("nickname"))
                .email((String) account.get("email"))
                .picture((String) profile.get("profile_image_url"))
                .provider(Provider.KAKAO)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuth2Attributes ofFacebook(String userNameAttributeName,
            Map<String, Object> attributes) throws JsonProcessingException {
        return OAuth2Attributes.builder()
                .oauthId((String) attributes.get("id"))
                .nickname((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .provider(Provider.FACEBOOK)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuth2Attributes ofGoogle(String userNameAttributeName,
            Map<String, Object> attributes) {
        return OAuth2Attributes.builder()
                .oauthId((String) attributes.get(userNameAttributeName))
                .nickname((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .provider(Provider.GOOGLE)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuth2Attributes ofGithub(String userNameAttributeName,
            Map<String, Object> attributes) {
        String nickname = ObjectUtils.isEmpty(attributes.get("name")) ? "login" : "name";
        return OAuth2Attributes.builder()
                .oauthId(attributes.get(userNameAttributeName).toString())
                .nickname((String) attributes.get(nickname))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("avatar_url"))
                .provider(Provider.GITHUB)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

}