import React from "react";

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

export const MainPage = () => {
    return (
        <div>
            <h1>Loatus</h1>
            <button onClick={onclick}>네이버 버튼</button>
            <button onClick={onclick2}>테스트용 버튼</button>
        </div>
    )
}