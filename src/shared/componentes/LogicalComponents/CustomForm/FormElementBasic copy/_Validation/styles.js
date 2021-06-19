import styled from "styled-components";

export const Container = styled.span`
  box-sizing: border-box;
  background: #000c;
  padding: 0.25em;
  font-size: 0.85em;
  line-height: 1;
  border-radius: 0.25em;
  width: fit-content;
  max-width: 100%;
  color: #f0f0f0;
  position: fixed;
  z-index: 1;

  ${({ childrenref }) => {
    if (childrenref instanceof HTMLElement) {
      const { width } = childrenref.parentElement.getBoundingClientRect();
      const { top, left, height } = childrenref.getBoundingClientRect();
      const { clientWidth } = document.documentElement;

      return `
        left: ${left}px;
        top: ${top + height}px;
        max-width: ${width > clientWidth ? clientWidth : width}px;
      `;
    } else {
      return "display: none;";
    }
  }}
`;
