import styled from "styled-components";

function getShadow(numb, hover) {
  function checkHover(px) {
    return hover ? px + 11 : px;
  }

  switch (numb) {
    case 1 || `1`:
      return `0 ${checkHover(1)}px ${checkHover(
        3
      )}px rgba(0, 0, 0, 0.12), 0 ${checkHover(1)}px ${checkHover(
        2
      )}px rgba(0, 0, 0, 0.24)`;
    case 2 || `2`:
      return `0 ${checkHover(3)}px ${checkHover(
        6
      )}px rgba(0,0,0,0.16), 0 ${checkHover(3)}px ${checkHover(
        6
      )}px rgba(0,0,0,0.23)`;
    case 4 || `4`:
      return `0 ${checkHover(14)}px ${checkHover(
        28
      )}px rgba(0,0,0,0.25), 0 ${checkHover(10)}px ${checkHover(
        10
      )}px rgba(0,0,0,0.22)`;
    case 5 || `5`:
      return `0 ${checkHover(19)}px ${checkHover(
        38
      )}px rgba(0,0,0,0.30), 0 ${checkHover(15)}px ${checkHover(
        12
      )}px rgba(0,0,0,0.22)`;
    default:
      return `0 ${checkHover(10)}px ${checkHover(
        20
      )}px rgba(0,0,0,0.19), 0 ${checkHover(6)}px ${checkHover(
        6
      )}px rgba(0,0,0,0.23)`;
  }
}

const ShadowBox = styled.div.attrs(({ shadowIntensity, defaultHover }) => ({
  shadowIntensity,
  defaultHover,
}))`
  background: #ffffff;
  border-radius: 0.2rem;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${({ shadowIntensity, defaultHover }) => {
    return `
      box-shadow: ${getShadow(shadowIntensity)};
      box-shadow: ${getShadow(shadowIntensity)};

      ${
        defaultHover &&
        `:hover {
        box-shadow: ${getShadow(shadowIntensity, true)};
      }`
      }
    `;
  }}
`;

export default ShadowBox;
