package com.example.auth.Lostark;

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

    public void useDriver(String url) {
        driver.get(url);
        driver.manage().timeouts().implicitlyWait(500, TimeUnit.MILLISECONDS);  // 페이지 불러오는 여유시간.
        String xpath="//*[@id=\"navContent\"]/div/div[2]/section[1]/div[2]/p";
        WebElement element = driver.findElement(By.xpath(xpath));
        System.out.println("element.getText() = " + element.getText());
        System.out.println("element = " + element);

//        log.info("++++++++++++++++++++++===================+++++++++++++ selenium : " + driver.getTitle());
//        System.out.println("driver = " + driver);
//        System.out.println("driver.getClass() = " + driver.getClass());
//        List<WebElement> elements=driver.findElements(By);
//        int a=1;
//        for(WebElement element: elements){
//            a++;
//            System.out.println("element = " + element);
//            System.out.println("element.getText() = " + element.getText());
//           // List<WebElement> allChildElements=element.findElements(By.xpath("*"));
//          //  System.out.println(allChildElements.size());
//            System.out.println("a="+a);
//        }

      //  WebElement searchLabel = driver.findElement(By.id("label-text"));
     //   log.info("++++++++++++++++++++++===================+++++++++++++ searchLabel : " + searchLabel.getText());

        quitDriver();
    }

    private void quitDriver() {
        driver.quit(); // webDriver 종료
    }

}
