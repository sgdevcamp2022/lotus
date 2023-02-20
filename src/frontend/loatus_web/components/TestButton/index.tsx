// if (accessToken) {
//   const base64Payload = accessToken.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
//   const payload = atob(base64Payload);
//   const result = JSON.parse(payload.toString());
//   console.log(result);
// }

import axios from 'axios/index';
import { Button } from '@pages/Login/styles';
import React from 'react';

// const test1 = () => {
//     axios
//         .get('/auth/my', {
//             withCredentials: true,
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         })
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((e) => {
//             axios
//                 .post(
//                     '/auth/reissue/',
//                     {},
//                     {
//                         withCredentials: true,
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`,
//                             refreshToken: token.refreshToken,
//                         },
//                     },
//                 )
//                 .then((res) => {
//                     console.log('엑세스 토큰 재발급');
//                     setAccessToken(res.data.data);
//                 })
//                 .catch((error) => console.log(error));
//         });
// };
//
// const test2 = () => {
//     axios
//         .post(
//             '/auth/reissue/',
//             {},
//             {
//                 withCredentials: true,
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     refreshToken: token.refreshToken,
//                 },
//             },
//         )
//         .then((res) => {
//             console.log('엑세스 토큰 재발급');
//             setAccessToken(res.data.data);
//         })
//         .catch((error) => error);
// };

export const testButton = () => <Button>테스트용 버턴</Button>;
