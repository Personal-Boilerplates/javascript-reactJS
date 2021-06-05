import styled from "styled-components";

const LoadingDots = styled.p`
  ::after {
    ${(props) => {
      if (props.dotStyle) return props.dotStyle;
    }}
    content: " .";
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: ${(props) => props.dotColor || "#293f57"};
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 ${(props) => props.dotColor || "#293f57"},
        0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 ${(props) => props.dotColor || "#293f57"},
        0.5em 0 0 ${(props) => props.dotColor || "#293f57"};
    }
  }
`;

export default LoadingDots;
