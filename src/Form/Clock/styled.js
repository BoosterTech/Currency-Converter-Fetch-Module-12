import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
  font-family: monospace;
  color: ${({ theme }) => theme.color.MineShaft};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobileNarrow}px) {
    word-wrap: break-word;
    width: 80%;
    margin-bottom: 5px;
  }
`;
