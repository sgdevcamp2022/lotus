import styled from '@emotion/styled';
import { Container } from 'react-bootstrap';

export const PartyContainer = styled(Container)`
  &.w-full {
    width: 100%;
    min-width: 1084px;
    & div.menubar {
      display: flex;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      background-color: rgb(40 40 48);
      & span.text-3xs {
        width: 9rem;
        white-space: nowrap;
        border-top-left-radius: 0.25rem;
        padding: 0.5rem 0.5rem 0.625rem 0.625rem;
        font-size: 15px;
        line-height: 14px;
        font-weight: 400;
        color: rgb(123 122 142);
        text-align: center;
      }
    }
  }
`;

export const Lists = styled.ul`
  padding-left: 0;
  margin-left: 0;
  list-style: none;
  & li {
    display: list-item;
    text-align: -webkit-match-parent;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border: 0.1px solid rgb(28 28 31);
    background-color: rgb(49 49 60);
    overflow: visible;
    transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-height: 0px;
    height: auto;
    transition-duration: 300ms;
    & div.MulCollapse-wrapper {
      display: flex;
      width: 100%;

      & div.partner {
        color: white;
        width: 9rem;
        padding: 0.5rem 0.5rem 0.625rem 0.625rem;
        font-size: 15px;
        text-align: center;
      }
    }
  }
`;

export const ItemLevel = styled.span`
  font-size: 31px;
  color: #ff009b;
`;

export const Expedition = styled.span`
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
`;

export const RaidTime = styled.span`
  color: white;
`;

export const Memo = styled.div`
  background-color: #4f4f4f;
  width: 100%;
  height: 100%;
`;
