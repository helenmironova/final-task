import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: calc(100% - 335px);
  margin-top: 2px;
  width: 335px;
  background-color: var(--white);
  display: flex;
  z-index: 1;
  flex-direction: column;
  box-shadow: 1px 2px 20px 1px #d2d2d28b;
  border-radius: 12px;
  align-items: flex-start;
  padding: 19px 14px 14px 14px;
  .filters-loading {
    font-size: 14px;
    color: var(--dark-grey);
    align-self: center;
  }

  h1 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 29px;
  }
  form.filters-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    input[type="text"]::placeholder {
      color: var(--dark-grey);
    }

    .filter-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
      width: 100%;
      label {
        margin-bottom: 7px;
      }
    }

    .length-filter-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 50px;
      label {
        margin-bottom: 7px;
      }
      .length-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 300px;
        input {
          width: 40%;
        }
        hr {
          width: 15%;
          height: 2px;
          background-color: var(--dark-grey-2);
        }
      }
    }

    input {
      background-color: var(--grey);
      width: 100%;
    }
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
      width: 100%;
      padding: 21px 11px;
      background-color: var(--grey);
      border-radius: 8px;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='7' height='14' viewBox='0 0 7 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.47788 0.806335C3.66235 0.806382 3.83926 0.892078 3.96968 1.04458L6.7521 4.297C6.87881 4.45035 6.94893 4.65575 6.94734 4.86894C6.94576 5.08213 6.8726 5.28607 6.74363 5.43683C6.61466 5.58758 6.44019 5.6731 6.25781 5.67495C6.07542 5.6768 5.89971 5.59485 5.76852 5.44673L3.47788 2.76917L1.18725 5.44673C1.05606 5.59485 0.880347 5.6768 0.697961 5.67495C0.515576 5.6731 0.341109 5.58758 0.212138 5.43683C0.0831665 5.28607 0.0100102 5.08213 0.00842528 4.86894C0.0068404 4.65575 0.0769539 4.45035 0.203664 4.297L2.98609 1.04458C3.11651 0.892078 3.29341 0.806382 3.47788 0.806335ZM0.203664 9.17564C0.33411 9.0232 0.511008 8.93757 0.695458 8.93757C0.879908 8.93757 1.05681 9.0232 1.18725 9.17564L3.47788 11.8532L5.76852 9.17564C5.89971 9.02752 6.07542 8.94557 6.25781 8.94742C6.44019 8.94927 6.61466 9.03478 6.74363 9.18554C6.8726 9.3363 6.94576 9.54023 6.94734 9.75343C6.94893 9.96662 6.87881 10.172 6.7521 10.3254L3.96968 13.5778C3.83923 13.7302 3.66233 13.8159 3.47788 13.8159C3.29343 13.8159 3.11654 13.7302 2.98609 13.5778L0.203664 10.3254C0.0732582 10.1729 0 9.96611 0 9.7505C0 9.5349 0.0732582 9.32812 0.203664 9.17564Z' fill='%23BFBFBF'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position-x: calc(100% - 19px);
      background-position-y: 50%;
      border: none;
      font-family: "Open Sans", sans-serif;
    }

    .filters-btn-container {
      display: flex;
      align-self: center;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      width: 100%;
      button[type="button"] {
        background-color: var(--white);
        color: var(--blue);
        padding: 10px 29px;
      }

      button[type="submit"] {
        padding: 10px 29px;
      }
    }
  }
`

export default Wrapper
