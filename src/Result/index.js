import "./styled.js";
import { Wrapper } from "./styled";

export const Result = ({ result }) => (
  <Wrapper>
    {!!result && (
      <>
        {result.sourceAmount.toFixed(2)}&nbsp;{result.fromCurrency}=&nbsp;
        <strong>
          {result.finalAmount.toFixed(2)}&nbsp;{result.toCurrency}
        </strong>
      </>
    )}
  </Wrapper>
);
