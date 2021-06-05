import styled from "styled-components";

export const Container = styled.label`
  position: relative;

  input {
    padding: 0.5em 0.5em;
    border: 0.1em solid #dadada;
    border-radius: 0.25em;
    outline: 0;
    font-size: 1em;
    width: 100%;
    height: 100%;

    :focus {
      border-color: #1976d2;
    }
  }
`;

export const SpanLabel = styled.span`
  position: absolute;
  padding: 0 0.15em;
  margin: 0;
  line-height: 1;
  height: fit-content;
  transition: 500ms;
  font-weight: 500;
  color: #2c3e50;
  left: 0.5em;
  top: 50%;
  transform: translate(0, -50%);

  ${({ focused }) => {
    if (focused) {
      return `
          background-color: #fff;
          font-size: 0.9em;
          top: 0;
          transform: translate(0, -50%);
        `;
    }
  }}
`;
