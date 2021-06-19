import React from "react";

import { Container } from "./styles";

/**
 * Caso deseje alterar o lineHeight, faça através da propriedade lineHeight e não do style.
 * Esse component possui o max-height igual ao lineHeigt * lines, utilizando o "em" como tamanho.
 * @param {Object} props
 * @param {Number} props.relativeHeight Padrão true. Se false, fará que o componente tenha uma altura fixa.
 * @param {Number} props.lineHeight
 * @param {Number} props.lines
 */
function TextContent({
  children,
  lineHeight,
  relativeHeight = true,
  lines,
  ...rest
}) {
  return (
    <Container
      relativeHeight={relativeHeight}
      lineHeight={lineHeight}
      lines={lines}
      {...rest}
    >
      {children}
    </Container>
  );
}

export default TextContent;
