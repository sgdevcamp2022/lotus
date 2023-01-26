package com.example.auth.Controller;

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
            @RequestParam(value = "oauthId", required = false) String oauthId
    ) {
        System.out.println("provider = " + provider);
        System.out.println("oauthId = " + oauthId);

        model.addAttribute("provider", provider);
        model.addAttribute("oauthId", oauthId);
        return "social-success";
    }


}
