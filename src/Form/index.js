import { useState } from "react";
// import { currencies } from "../currencies";
import { Result } from "../Result";
import { Clock } from "./Clock";
import {
  Failure,
  Field,
  FormField,
  Header,
  Info,
  Loading,
  SubmitButton,
  Wrapper,
  WrapperButton,
} from "./styled";
import { useRatesData } from "./useRatesData";

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

  return (
    <FormField onSubmit={onSubmit}>
      <Clock />
      <Header>CURRENCY CONVERTER</Header>
      <Wrapper>
        {ratesData.success === "loading" ? (
          <Loading>
            Loading exchange rates from European Central Bank...
          </Loading>
        ) : ratesData.success === false ? (
          <Failure>
            Something went wrong! Check your internet connection!
          </Failure>
        ) : (
          <>
            <p>
              <label>
                Amount:{" "}
                <Field
                  type="number"
                  min=".01"
                  step="0.01"
                  placeholder="enter amount in PLN*"
                  value={amount}
                  onChange={({ target }) => setAmount(target.value)}
                  required
                />
              </label>
            </p>
            <p>
              <label>
                Currency:
                <Field
                  as="select"
                  name="Currency"
                  value={currency}
                  onChange={({ target }) => setCurrency(target.value)}
                >
                  {Object.keys(ratesData.data).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Field>
              </label>
            </p>
          </>
        )}
      </Wrapper>

      <div>
        <Result result={result} />
      </div>

      <WrapperButton>
        <SubmitButton type="submit">CALCULATE</SubmitButton>
      </WrapperButton>

      <Info>
        Currency rates in line with <strong>European Central Bank</strong>(currencyapi.com website).
      </Info>
    </FormField>
  );
};

export default Form;
