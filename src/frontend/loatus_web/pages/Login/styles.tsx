import styled from '@emotion/styled';
import { Form } from 'react-bootstrap';

export const Header = styled.header`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 48px 0 40px;
  width: 100%;
`;

export const Root = styled.div`
  align-items: center;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  -webkit-appearance: none;
  width: 100%;
  max-width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  position: relative;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  box-shadow: none;
  transition: all 80ms linear;
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  min-width: 96px;
  background-color: #fff;
  border: 2.5px solid #000000;
  color: #000000;
  margin-bottom: 20px;
`;

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  clear: both;
  flex-grow: 1;
  margin: 0;
`;

export const Horizon = styled.div`
  align-items: center;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const Page = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  max-width: 800px;
  width: 100%;
  box-sizing: inherit;
`;

export const PageHead = styled.h1`
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -0.75px;
  line-height: 46px;
  margin-bottom: 10px;
  max-width: 700px;
  text-align: center;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const Input = styled.input`
  padding: 11px 12px 13px;
  height: 44px;
  font-size: 18px;
  line-height: 1.33333333;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(29, 28, 29, 0.3);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
`;

export const SignIn = styled.div`
  font-size: 15px;
  line-height: 1.46668;
  font-weight: initial;
  color: #1d1c1d;
  font-variant-ligatures: common-ligatures;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: block;
  width: 400px;
`;
