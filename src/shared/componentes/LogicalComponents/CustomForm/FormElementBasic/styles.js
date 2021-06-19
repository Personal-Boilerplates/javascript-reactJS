import styled from "styled-components";

export const ValidationMessage = styled.span`
  box-sizing: border-box;
  font-size: 0.85em;
  line-height: 1;
  border-radius: 0.25em;
  width: fit-content;
  position: fixed;
  /* z-index: 1; */
  max-width: 100%;
  /* padding: 0.25em; */
  /* color: #f0f0f0; */
  /* background: #000c; */

  span {
    /* padding: 0.25em;
    max-width: 100%;
    position: relative;
    border-radius: 0.4em;
    box-shadow: 0 0 0.4em #b2b2b2;
    background: #ffffff; */

    background: #fff;
    border: 0.05em solid #a7a7a7;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    -webkit-box-shadow: 0.25em 0.25em 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0.25em 0.25em 0 rgba(0, 0, 0, 0.2);
    max-width: 100%;
    padding: 0.25em;
    position: relative;

    ::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: 0.5em solid transparent;
      border-bottom-color: #fff;
      border-top: 0;
    }

    ::before {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: calc(0.5em + 0.05em + 0.05em) solid transparent;
      border-bottom-color: #a7a7a7;
      border-top: 0;
    }

    /* .speech-bubble-ds-arrow {
      border: 0.5em solid transparent;
      border-bottom-color: #a7a7a7;
      border-top: 0;
      top: -0.5em;
      position: absolute;
      left: 50%;
    }
    .speech-bubble-ds-arrow::after {
      border: 0.4em solid transparent;
      border-bottom-color: #fff;
      border-top: 0;
      top: 0.1em;
      left: 50%;
      content: "";
      position: absolute;
    } */
  }

  ${({ childrenref }) => {
    if (childrenref instanceof HTMLElement) {
      const { width } = childrenref.parentElement.getBoundingClientRect();
      const { top, left, height, width: w } = childrenref.getBoundingClientRect();
      const { clientWidth } = document.documentElement;

      return `
        left: ${left + w / 2}px;
        transform: translateX(-50%);
        top: calc(${top + height}px + 0.9em);
        max-width: ${width > clientWidth ? clientWidth : width}px;
      `;
    } else {
      return "display: none;";
    }
  }}
`;
