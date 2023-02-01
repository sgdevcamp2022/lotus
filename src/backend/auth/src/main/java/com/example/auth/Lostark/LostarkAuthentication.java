package com.example.auth.Lostark;

import com.example.auth.Entity.RandomCode;
import com.example.auth.Entity.RefreshToken;
import com.example.auth.Repository.RandomCodeRepository;
import com.example.auth.Security.TokenProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonParser.NumberType;
import com.fasterxml.jackson.core.JsonPointer;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;
import com.fasterxml.jackson.databind.node.JsonNodeType;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import java.util.List;
import java.util.Objects;
import java.util.Random;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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


    public String generateRandomCode(){
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


//        /*
//        * redis에 저장
//        * */
//        Long userIdFromAccessToken = Long.parseLong(tokenProvider.getUserIdFromAccessToken(accessToken));
//        RandomCode randomCodeInRedis = findRandomCode(userIdFromAccessToken);
//
//        if (!Objects.isNull(randomCodeInRedis)) {    //있으면 삭제
//            randomCodeRepository.delete(randomCodeInRedis);
//        }
//        //새로 저장
//        RandomCode randomCode=new RandomCode(generatedString, userIdFromAccessToken);
//        randomCodeRepository.save(randomCode);

        return generatedString;
    }





    public RandomCode findRandomCode(Long userId) {
        return randomCodeRepository.findRandomCodeByUserId(userId);
    }

    public String getEncryptedMemberNo(String memberNo){



       // String memberNo = url.substring(29);

        String json="{"+"memberNo:"+memberNo +"}";

        JSONObject jsonObject = httpPostBodyConnection(
                "https://lostark.game.onstove.com/board/IsCharacterList", json);
        System.out.println("jsonObject = " + jsonObject);
        return jsonObject.get("encryptMemberNo").toString();
    }

    public JsonNode getCharactersInLostark(String characterName){

        String json="{"+"memberNo:"+"hi" +"}";
        String encodedCharacterName;
        String url;
        try {
            encodedCharacterName = URLEncoder.encode(characterName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        url="https://developer-lostark.game.onstove.com/characters/"+encodedCharacterName+"/siblings";
        System.out.println("encodedCharacterName = " + encodedCharacterName);

        JsonNode jsonNode = httpGetConnection(
                url, json);
        System.out.println("jsonNode = " + jsonNode);
        System.out.println(jsonNode.get(0).get("ServerName"));
        return jsonNode;
    }


    public static JSONObject httpPostBodyConnection(String UrlData, String ParamData) {

        //http 요청 시 필요한 url 주소를 변수 선언
        String totalUrl = "";
        totalUrl = UrlData.trim().toString();

        //http 통신을 하기위한 객체 선언 실시
        URL url = null;
        HttpURLConnection conn = null;

        //http 통신 요청 후 응답 받은 데이터를 담기 위한 변수
        String responseData = "";
        BufferedReader br = null;
        StringBuffer sb = null;

        //메소드 호출 결과값을 반환하기 위한 변수
        String returnData = "";
        JSONObject jsonObj=new JSONObject();

        try {
            //파라미터로 들어온 url을 사용해 connection 실시
            url = new URL(totalUrl);
            conn = (HttpURLConnection) url.openConnection();

            //http 요청에 필요한 타입 정의 실시
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8"); //post body json으로 던지기 위함
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true); //OutputStream을 사용해서 post body 데이터 전송
            try (OutputStream os = conn.getOutputStream()){
                byte request_data[] = ParamData.getBytes("utf-8");
                os.write(request_data);
                os.close();
            }
            catch(Exception e) {
                e.printStackTrace();
            }

            //http 요청 실시
            conn.connect();
            System.out.println("http 요청 방식 : "+"POST BODY JSON");
            System.out.println("http 요청 타입 : "+"application/json");
            System.out.println("http 요청 주소 : "+UrlData);
            System.out.println("http 요청 데이터 : "+ParamData);
            System.out.println("");

            //http 요청 후 응답 받은 데이터를 버퍼에 쌓는다
            br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            sb = new StringBuffer();
            while ((responseData = br.readLine()) != null) {
                sb.append(responseData); //StringBuffer에 응답받은 데이터 순차적으로 저장 실시
            }

            //메소드 호출 완료 시 반환하는 변수에 버퍼 데이터 삽입 실시
            returnData = sb.toString();

            //http 요청 응답 코드 확인 실시
            String responseCode = String.valueOf(conn.getResponseCode());
            System.out.println("http 응답 코드 : "+responseCode);
            System.out.println("http 응답 데이터 : "+returnData);

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(returnData);
            jsonObj = (JSONObject) obj;



        } catch (IOException | ParseException e) {
            e.printStackTrace();
        } finally {
            //http 요청 및 응답 완료 후 BufferedReader를 닫아줍니다
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return jsonObj;
    }


    public static JsonNode httpGetConnection(String UrlData, String ParamData) {
        System.out.println("UrlData = " + UrlData);

        //http 요청 시 url 주소와 파라미터 데이터를 결합하기 위한 변수 선언
        String totalUrl = UrlData;
     //   String totalUrl="https://developer-lostark.game.onstove.com/characters/%EB%85%B8%EB%A3%A8%EC%84%B8%ED%82%A4/siblings";

        //http 통신을 하기위한 객체 선언 실시
        URL url = null;
        HttpURLConnection conn = null;

        //http 통신 요청 후 응답 받은 데이터를 담기 위한 변수
        String responseData = "";
        BufferedReader br = null;
        StringBuffer sb = null;

        //메소드 호출 결과값을 반환하기 위한 변수
        String returnData = "";
        JsonNode jsonNode=new JsonNode() {
            @Override
            public <T extends JsonNode> T deepCopy() {
                return null;
            }

            @Override
            public JsonNode get(int index) {
                return null;
            }

            @Override
            public JsonNode path(String fieldName) {
                return null;
            }

            @Override
            public JsonNode path(int index) {
                return null;
            }

            @Override
            protected JsonNode _at(JsonPointer ptr) {
                return null;
            }

            @Override
            public JsonNodeType getNodeType() {
                return null;
            }

            @Override
            public String asText() {
                return null;
            }

            @Override
            public JsonNode findValue(String fieldName) {
                return null;
            }

            @Override
            public JsonNode findPath(String fieldName) {
                return null;
            }

            @Override
            public JsonNode findParent(String fieldName) {
                return null;
            }

            @Override
            public List<JsonNode> findValues(String fieldName, List<JsonNode> foundSoFar) {
                return null;
            }

            @Override
            public List<String> findValuesAsText(String fieldName, List<String> foundSoFar) {
                return null;
            }

            @Override
            public List<JsonNode> findParents(String fieldName, List<JsonNode> foundSoFar) {
                return null;
            }

            @Override
            public String toString() {
                return null;
            }

            @Override
            public boolean equals(Object o) {
                return false;
            }

            @Override
            public JsonToken asToken() {
                return null;
            }

            @Override
            public NumberType numberType() {
                return null;
            }

            @Override
            public JsonParser traverse() {
                return null;
            }

            @Override
            public JsonParser traverse(ObjectCodec codec) {
                return null;
            }

            @Override
            public void serialize(JsonGenerator gen, SerializerProvider serializers)
                    throws IOException {

            }

            @Override
            public void serializeWithType(JsonGenerator gen, SerializerProvider serializers,
                    TypeSerializer typeSer) throws IOException {

            }
        };


        try {
            //파라미터로 들어온 url을 사용해 connection 실시
            url = new URL(totalUrl);
            System.out.println("url = " + url);
            conn = (HttpURLConnection) url.openConnection();

            //http 요청에 필요한 타입 정의 실시
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMzkxNDAifQ.h1duCpF8FTw4aH00VTcIXKgvX3LCcAtT8HKUkEDNDdZxa33ZaY8RgphyL9jhFIPDE8dehxi_F3BFe8BUEWlmthYdOm0LcPL5EIJKiPktJ8MPwSRUQbfntCCkSj1EBM6RebXTQ0rmH_EviiPKuwKYOIq0U24I40d_dUBT6iV-5rT6m_JxFxZpSGgz226U6LdOCzoBD5V8Tq0-Nuxx2WaNTb57CjpiQuvt_Oo7oS0LJKcf5JOBRyzUR-JFTPayx3JvzqzRO0CwVTfhUqie3xcu0N2STAmmmH-KKkIQthc3pJRobXsRWfzYDHzsjWlyupeNtEqiPJC3XotoAzSQW0zkmA");


            //http 요청 실시
            conn.connect();
            System.out.println("http 요청 방식 : "+"GET");
            System.out.println("http 요청 타입 : "+"application/json");
            System.out.println("http 요청 주소 : "+UrlData);
            System.out.println("http 요청 데이터 : "+ParamData);
            System.out.println("");

            ObjectMapper mapper=new ObjectMapper();
            jsonNode = mapper.readTree(conn.getInputStream());


            //http 요청 응답 코드 확인 실시
            String responseCode = String.valueOf(conn.getResponseCode());
            System.out.println("http 응답 코드 : "+responseCode);
            System.out.println("http 응답 데이터 : "+jsonNode);



        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //http 요청 및 응답 완료 후 BufferedReader를 닫아줍니다
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return jsonNode;
    }


}
