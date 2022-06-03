import styled from "styled-components";
export const StyledRoot = styled.div<{ isLong }>`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${({ isLongg}) => (isLongg ? 'span 2' : '')};
`;