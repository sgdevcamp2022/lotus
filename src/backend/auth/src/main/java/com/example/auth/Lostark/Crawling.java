package com.example.auth.Lostark;



import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;


@Service
public class Crawling {

    /**
     * 조회할 URL셋팅 및 Document 객체 로드하기
     */
   // private static final String url = "https://yourei.jp/腕を磨く";
  //    private static final String url = "https://timeline.onstove.com/83742732";
//   private static final String url = "http://www.cgv.co.kr/movies/";
    private static final String url = "https://timeline.onstove.com/83742733";
   // private static final String url = "https://www.naver.com/";
   // Window, Chrome의 User Agent.
   String userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36";

    public List<String> process() {

        Connection conn = Jsoup.connect(url)
                .userAgent(userAgent)
                .referrer("http://www.google.com");
        //Jsoup 커넥션 생성

        Document document = null;
        try {
            document = conn.get();
            //url의 내용을 HTML Document 객체로 가져온다.
            //https://jsoup.org/apidocs/org/jsoup/nodes/Document.html 참고
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("document = " + document);
        List<String> list = getDataList(document);
        return list;
    }


    /**
     * data가져오기
     */
    private List<String> getDataList(Document document) {
        List<String> list = new ArrayList<>();
      //  Elements selects = document.select(".sentence-list");	//⭐⭐⭐
        Elements selects = document.select("div");
        //select 메서드 안에 css selector를 작성하여 Elements를 가져올 수 있다.
     //   System.out.println("selects = " + selects);
        for (Element select : selects) {
            System.out.println("check2");
            System.out.println(select.html());		//⭐⭐⭐
            //html(), text(), children(), append().... 등 다양한 메서드 사용 가능
            //https://jsoup.org/apidocs/org/jsoup/nodes/Element.html 참고
        }
        return list;
    }

}