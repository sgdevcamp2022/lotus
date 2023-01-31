import React, {useState} from "react";
import axios from "axios";

const { naver } = window as any;

export const MainPage = () => {
    const [component, setComponent] = useState('');
    const onclick = () => {
        fetch("http://192.168.115.15:8080/oauth2/authorization/naver")
            .then(response => {
                console.log(response.text())
            })
            .catch(error => {
                console.log(error)
            })
        return;
    }

    const onclick2 = () => {
        fetch("http://192.168.115.15:8080/api/hello")
            .then(response => {
                console.log(response.text())
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onClickNaverButton = () => {
        axios.get('/oauth2.0/authorize?response_type=code&client_id=CLIENT_ID&state=STATE_STRING&redirect_uri=CALLBACK_URL')
            .then((response)=>{
                console.log(response)
                setComponent(response.data);
            })
            .catch((error)=>{
                console.dir(error)
            })
    }
    return (
        <div>
            <h1>Loatus</h1>
            <button onClick={onclick}>네이버 버튼</button>
            <button onClick={onclick2}>테스트용 버튼</button>
            <button onClick={onClickNaverButton}>네이버 인증</button>
            {component}
        </div>
    )
}