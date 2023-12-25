import "./styled.js";
import { Wrapper } from "./styled";

export const Result = ({ result }) => (
  <Wrapper>
    {!!result && (
      <>
        {result.sourceAmount.toFixed(2)}&nbsp;PLN =&nbsp;
        <strong>
          {result.finalAmount.toFixed(2)}&nbsp;{result.currency}
        </strong>
      </>
    )}
  </Wrapper>
);
