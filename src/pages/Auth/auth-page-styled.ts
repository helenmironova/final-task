import styled from "styled-components"

import backgroundImg from "../../assets/background-img.png"

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImg});
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 28px 30px;
    border-radius: 12px;
    align-self: center;
    background-color: var(--white);
    min-width: 400px;
  }
  h1 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 28px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    justify-content: flex-start;
  }

  label p {
    font-weight: 600;
    line-height: 19px;
    margin-bottom: 2px;
  }

  input {
    background-color: var(--grey);
    border: none;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0;
  }

  .btn-container span {
    font-size: 12px;
    margin-top: 12px;
  }

  button[type="submit"] {
    background-color: var(--light-blue);
    border: none;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    color: var(--blue);
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
  }

  button[type="submit"]:disabled {
    background-color: var(--dark-grey-2);
    color: var(--white);
    cursor: not-allowed;
  }

  button[type="button"] {
    font-weight: 700;
    font-size: 12px;
  }

  .error-message {
    margin: 17px 20px;
    color: var(--alert-red);
    font-size: 12px;
    font-weight: 600;
  }
`

export default Wrapper
