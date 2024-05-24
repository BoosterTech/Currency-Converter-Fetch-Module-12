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
  const [toCurrency, setToCurrency] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(fromCurrency, toCurrency, amount);
  };

  const [result, setResult] = useState(null);
  const ratesData = useRatesData();

  const calculateResult = (fromCurrency, toCurrency, amount) => {
    const valueFrom = ratesData.data[fromCurrency].value;
    const valueTo = ratesData.data[toCurrency].value;
    const conversionFactor = valueTo / valueFrom;

    // const rate = ratesData.data[currency].value; //

    setResult({
      sourceAmount: +amount,
      finalAmount: amount * conversionFactor,
      fromCurrency,
      toCurrency,
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

      {ratesData.state === "loading" ? (
        <Loading>
          <>
            Loading exchange rates from European Central Bank...
            <LoaderWrapper>
              <LoadingSpinner />
            </LoaderWrapper>
          </>
        </Loading>
      ) : ratesData.state === "error" ? (
        <Failure>Something went wrong! Check your internet connection!</Failure>
      ) : (
        <>
          <Wrapper>
            <Label htmlFor="inputAmount">Amount: </Label>
            <Field
              id="inputAmount"
              type="number"
              min=".01"
              step="0.01"
              placeholder={`Enter amount in ${fromCurrency}*`}
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              required
            />

            <Label htmlFor="fromCurrency">Convert from:</Label>
            <Field
              as="select"
              id="fromCurrency"
              name="FromCurrency"
              value={fromCurrency}
              onChange={({ target }) => setFromCurrency(target.value)}
            >
              <option value="">Select a currency</option>
              {Object.keys(ratesData.data).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}&nbsp;-&nbsp;{findFullName(currency)}
                </option>
              ))}
            </Field>
            <Label htmlFor="toCurrency">Convert to:</Label>
            <Field
              as="select"
              id="toCurrency"
              name="ToCurrency"
              value={toCurrency}
              onChange={({ target }) => setToCurrency(target.value)}
            >
              <option value="">Select a currency</option>
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
      </Info>
    </FormField>
  );
};

export default Form;
