import { useState } from "react";
import { Result } from "../Result";
import { Clock } from "./Clock";
import {
  Failure,
  Field,
  FormField,
  Header,
  Info,
  Label,
  Loading,
  SubmitButton,
  Wrapper,
  WrapperButton,
  LoaderWrapper,
} from "./styled";
import { useRatesData } from "./useRatesData";
import { currencies } from "../currencies";
import { LoadingSpinner } from "./Loader";

const Form = () => {
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  const [result, setResult] = useState(null);
  const ratesData = useRatesData();

  const calculateResult = (currency, amount) => {
    const rate = ratesData.data[currency].value; //

    setResult({
      sourceAmount: +amount,
      finalAmount: amount / rate,
      currency,
    });
  };

  const findFullName = (currencyAbbreviation) => {
    const foundCurrency = currencies.find(
      (currency) => currency.shortName === currencyAbbreviation
    );
    return foundCurrency ? foundCurrency.fullName : "";
  };

  return (
    <FormField onSubmit={onSubmit}>
      <Clock />
      <Header>CURRENCY CONVERTER</Header>

      {ratesData.success === "loading" ? (
        <Loading>
          <>
            Loading exchange rates from European Central Bank...
            <LoaderWrapper>
              <LoadingSpinner />
            </LoaderWrapper>
          </>
        </Loading>
      ) : ratesData.success === false ? (
        <Failure>Something went wrong! Check your internet connection!</Failure>
      ) : (
        <>
          <Wrapper>
            <Label for="inputAmount">Amount: </Label>
            <Field
              id="inputamount"
              type="number"
              min=".01"
              step="0.01"
              placeholder="enter amount in PLN*"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              required
            />

            <Label for="currencyAmount">Currency:</Label>
            <Field
              as="select"
              name="Currency"
              value={currency}
              onChange={({ target }) => setCurrency(target.value)}
            >
              {Object.keys(ratesData.data).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}&nbsp;-&nbsp;{findFullName(currency)}
                </option>
              ))}
            </Field>
          </Wrapper>
        </>
      )}

      <div>
        <Result result={result} />
      </div>

      <WrapperButton>
        <SubmitButton type="submit">CALCULATE</SubmitButton>
      </WrapperButton>

      <Info>
        Currency rates in line with <strong>European Central Bank</strong>
        (currencyapi.com website).
      </Info>
    </FormField>
  );
};

export default Form;
