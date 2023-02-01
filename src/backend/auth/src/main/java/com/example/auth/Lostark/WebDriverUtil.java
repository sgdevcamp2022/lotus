package com.example.auth.Lostark;

import com.example.auth.Vo.DefaultResponse;
import com.example.auth.Vo.ResponseMessage;
import com.example.auth.Vo.StatusCode;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.concurrent.TimeUnit;

@Slf4j
public class WebDriverUtil {

    private WebDriver driver;
    public static String WEB_DRIVER_ID = "webdriver.chrome.driver"; // Properties 설정
   // public static String WEB_DRIVER_PATH = "C:/dev/python/crawling/webdriver/chromedriver.exe"; // WebDriver 경로
    public static String WEB_DRIVER_PATH = "D:/Software/chromedriver/chromedriver.exe"; // WebDriver 경로

    public WebDriverUtil() {
        chrome();
    }

    private void chrome() {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        // webDriver 옵션 설정.
        ChromeOptions options = new ChromeOptions();
        options.setHeadless(true);
        options.addArguments("--lang=ko");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.setCapability("ignoreProtectedModeSettings", true);

        // weDriver 생성.
        driver = new ChromeDriver(options);
        driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);
    }

    public DefaultResponse getIntroductionInStove(String url) {

        //url 형식이 다를때(길이가 안맞을떄)
        if(url.length()<29){
            DefaultResponse defaultResponse=new DefaultResponse(StatusCode.URL_ERROR,
                    ResponseMessage.STOVE_URL_AGAIN,null);
        }
        String memberNo = url.substring(29);

        try{
            Integer.parseInt(memberNo);
        } catch(NumberFormatException e){
            DefaultResponse defaultResponse=new DefaultResponse(StatusCode.URL_ERROR,
                    ResponseMessage.STOVE_URL_AGAIN,null);
            return defaultResponse;
        }



        driver.get(url);
        driver.manage().timeouts().implicitlyWait(500, TimeUnit.MILLISECONDS);  // 페이지 불러오는 여유시간.
        String xpath="//*[@id=\"navContent\"]/div/div[2]/section[1]/div[2]/p";
        WebElement element = driver.findElement(By.xpath(xpath));
        System.out.println("element.getText() = " + element.getText());
        String result=element.getText();

        quitDriver();
        return new DefaultResponse(StatusCode.OK, ResponseMessage.STOVE_INTRODUCTION_SUCCESS, result);
    }

    public String getCharacterInLostark(String url) {
        System.out.println("url = " + url);
        driver.get(url);
        driver.manage().timeouts().implicitlyWait(500, TimeUnit.MILLISECONDS);  // 페이지 불러오는 여유시간.
        String xpath="//*[@id=\"lostark-wrapper\"]/div/main/div/div[1]/span[2]";
        WebElement element = driver.findElement(By.xpath(xpath));
        String result=element.getText();


        quitDriver();
        return result;
    }

    private void quitDriver() {
        driver.quit(); // webDriver 종료
    }

}
