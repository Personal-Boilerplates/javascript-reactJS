import styled from "styled-components";

export const ClearButton = styled.button`
  background: none;
  border: none;
  outline: none;

  &:active {
    transition: 300ms ease;
    transform: scale(0.98);
  }

  * {
    text-decoration: none;
  }
`;
