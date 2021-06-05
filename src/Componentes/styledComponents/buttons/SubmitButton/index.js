import styled from "styled-components";

const SubmitButton = styled.button`
  border: none;
  background: #43aea8;
  color: #fff;
  padding: 0.25em 0.5em;
  border-radius: 0.15em;
  box-shadow: 0 0 0.1em rgba(0, 0, 0, 0.5);
  text-decoration: none;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;

  :after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    transform-style: flat;
    transform: translate3d(-50%, -50%, 0);
    background: #fff2;
    border-radius: 100%;
    transition: 200ms ease;
  }

  &:hover {
    box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
  }

  &:active {
    &:after {
      width: 150%;
      height: 150%;
    }

    transform: scale(0.98);
  }
`;

export default SubmitButton;
