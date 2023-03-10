package com.example.auth.Oauth2;

import com.example.auth.Entity.User;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Service.FriendService;
import java.util.Collections;
import java.util.Optional;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomOAuth2AuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final FriendService friendService;

    public CustomOAuth2AuthService(UserRepository userRepository, FriendService friendService) {
        this.userRepository = userRepository;
        this.friendService = friendService;
    }




    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2AuthService");
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(request);

        String registrationId = request.getClientRegistration().getRegistrationId();
        String userNameAttributeName = request.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();
        OAuth2Attributes attributes = OAuth2Attributes.of(registrationId, userNameAttributeName,
                oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);
        Optional<User> oneByEmailAndProvider = userRepository.findOneByEmailAndProvider(
                user.getEmail(), user.getProvider());
        friendService.createFriendListSns(oneByEmailAndProvider.get().getUserId());

        System.out.println("user.getEmail() = " + user.getEmail());
        System.out.println("user.getProvider() = " + user.getProvider());
        System.out.println("attributes.getAttributes() = " + attributes.getAttributes());

//        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
//                attributes.getAttributes(), attributes.getNameAttributeKey());
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes.getAttributes(), attributes.getNameAttributeKey());
    }

    private User saveOrUpdate(OAuth2Attributes attributes) {

        User user = userRepository.findOneByEmailAndProvider(attributes.getEmail(),
                        attributes.getProvider().toString())
                .map(u -> u.update(attributes.getPicture(), attributes.getNickname()))
                .orElse(attributes.toEntity());



        return userRepository.save(user);
    }


}