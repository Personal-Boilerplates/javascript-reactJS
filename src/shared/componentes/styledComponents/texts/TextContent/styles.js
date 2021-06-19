import styled from "styled-components";

export const Container = styled.div`
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  -webkit-line-clamp: ${(props) => props?.lines || 1};

  line-height: ${(props) => props.lineHeight || 1.2};

  ${(props) => {
    if (!props.relativeHeight) {
      const lineHeight = props?.lineHeight || 1.2;
      const lines = props?.lines || 1;
      let thisHeight = `${lineHeight * lines}em`;
      return `height: ${thisHeight};`;
    }
  }}
`;
