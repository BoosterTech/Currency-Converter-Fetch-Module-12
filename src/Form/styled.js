import styled from "styled-components";

export const FormField = styled.form`
  margin: auto;
  min-width: none;
  max-width: 600px;
  background-color: ${({ theme }) => theme.color.Negroni};
  padding: 15px;

  @media (max-width<${({ theme }) => theme.breakpoint.mobile}px) {
    width: 600px;
  }
`;

export const Header = styled.h1`
  max-width: 100vh;
  text-align: center;
  font-size: large;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.PictonBlue};
  margin: 0 auto 30px;
  padding: 10px 75px;
  border: 1px solid ${({ theme }) => theme.color.Tropaz};
  border-radius: 5px;
`;

export const Wrapper = styled.div`
  width: 300px;
  margin: auto;
`;

export const Field = styled.input`
  width: 190px;
  max-width: 190px;
  float: right;
`;

export const WrapperButton = styled.div`
  text-align: center;
  padding: 10px 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  margin: 50px auto 5px;
  background-color: ${({ theme }) => theme.color.GreySpring};
  border: 1px solid ${({ theme }) => theme.color.Stack};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.CodGrey};
  font-size: 15px;

  &:hover {
    background-color: ${({ theme }) => theme.color.GreySpringLight};
    cursor: pointer;
  }
`;

export const Info = styled.p`
  margin: 0 auto;
  font-size: small;
  text-align: center;
`;

export const Loading = styled.p`
  color: ${({ theme }) => theme.color.teal};
`;

export const Failure = styled.p`
  color: ${({ theme }) => theme.color.crimson};
`;
