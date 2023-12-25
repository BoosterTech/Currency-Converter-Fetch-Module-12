import { useState } from "react";
import { currencies } from "../currencies";
import { Result } from "../Result";
import { Clock } from "./Clock";
import {
  Field,
  FormField,
  Header,
  Info,
  SubmitButton,
  Wrapper,
  WrapperButton,
} from "./styled";

const Form = () => {
  const [currency, setCurrency] = useState(currencies[0].abbreviation);
  const [amount, setAmount] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  const [result, setResult] = useState(null);

  const calculateResult = (currency, amount) => {
    const rate = currencies.find(
      ({ abbreviation }) => abbreviation === currency
    ).rate;

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
              {currencies.map((currency) => (
                <option
                  key={currency.abbreviation}
                  value={currency.abbreviation}
                >
                  {currency.name}
                </option>
              ))}
            </Field>
          </label>
        </p>
      </Wrapper>

      <div>
        <Result result={result} />
      </div>

      <WrapperButton>
        <SubmitButton type="submit">CALCULATE</SubmitButton>
      </WrapperButton>

      <Info>
        Currency rates taken from <strong>Google Finance</strong> website on
        19.08.2023
      </Info>
    </FormField>
  );
};

export default Form;
