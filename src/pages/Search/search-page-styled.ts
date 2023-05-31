import styled from "styled-components"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
    margin-top: 30px;
    .form-container {
      position: relative;
      width: 100%;
    }
    form {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 9px;
      position: relative;
      input {
        width: 80%;
        border: 1px solid var(--light-grey);
        border-radius: 8px;
        padding: 11px 16px;
        font-size: 14px;
        line-height: 19px;
        color: var(--dark);
        height: 40px;
      }

      input::placeholder {
        color: var(--dark-grey-2);
      }

      button {
        border-radius: 8px;
        background-color: var(--light-blue);
        border: none;
        padding: 11px 66px;
        height: 40px;
        color: var(--active-blue);
        font-weight: 600;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        height: 100%;
      }

      button[type="button"] {
        height: 100%;
        line-height: 0.5;
        padding: 11px 9px;
      }
      button:hover {
        background-color: var(--light-blue);
      }
    }
    .no-data-text {
      position: absolute;
      top: 50%;
    }
    .table-container {
      margin-top: 30px;
      .organism-name {
        background-color: var(--light-blue);
        color: var(--dark);
        border-radius: 12px;
        padding: 2px 12px;
      }
    }
  }
`

export default Wrapper
