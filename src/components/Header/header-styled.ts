import styled from "styled-components"

const Wrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-bottom: 1px solid var(--light-blue);
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: center;
    margin: 0 auto;
    width: 80%;
    padding: 16px 0;
  }
  button {
    border-radius: none;
    padding: 0;
    background-color: transparent;
    border: none;
    color: var(--greyish-blue);
    margin-left: 30px;
    cursor: pointer;
    font-weight: 600;
  }
`

export default Wrapper
