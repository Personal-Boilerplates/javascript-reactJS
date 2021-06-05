import { createGlobalStyle } from "styled-components";

/**
 * @param {('1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12')} size
 * @param {('s'|'m'|'l')} device
 */
function colWidthOffset(device) {
  let result = `
    .col.${device}0 {
      width: 0 !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      display: hidden !important;
    }
  `;

  for (let index = 1; index <= 12; index++) {
    const thisSize = `calc((100% / 12) * ${index})`;
    result += `
    .col.${device}${index} {
      width: ${thisSize};
    }
    .col.ml-${device}${index} {
      margin-left: ${thisSize};
    }
    .col.mr-${device}${index} {
      margin-right: ${thisSize};
    }
  `;
  }

  return result;
}

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    outline: 0;
    cursor: pointer;
  }

  html, body, #root {
    min-height: 100vh;
    max-width: 100vw;
    width: 100vw;
    overflow-x: hidden;
  }

  html, body, button, input, a, textarea, li, select, option, label {
    font-size: 2.5vh;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    @media (max-width: 640px) {
      ${colWidthOffset("s")}
    }

    @media (min-width: 641px) and (max-width: 1024px) {
      ${colWidthOffset("m")}
    }

    @media (min-width: 1025px) {
      ${colWidthOffset("l")}
    }
  }

  .row:not(.noTransition) {
    .col {
      transition: width 1s;
    }
  }
`;
