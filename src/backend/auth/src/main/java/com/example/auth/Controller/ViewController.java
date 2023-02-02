package com.example.auth.Controller;

import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ViewController {

    @GetMapping("/social")
    public String socialSuccess(Model model,
            @RequestParam(value = "provider", required = false) String provider,
            @RequestParam(value = "oauthId", required = false) String oauthId,
            @RequestParam(value = "grantType", required = false) String grantType,
            @RequestParam(value = "accessToken", required = false) String accessToken,
            @RequestParam(value = "refreshToken", required = false) String refreshToken
    ) {


        model.addAttribute("provider", provider);
        model.addAttribute("oauthId", oauthId);
        model.addAttribute("grantType", grantType);
        model.addAttribute("accessToken", accessToken);
        model.addAttribute("refreshToken", refreshToken);

        return "social-success";
    }


}
