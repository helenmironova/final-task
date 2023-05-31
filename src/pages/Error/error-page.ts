import styled from "styled-components"

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  min-height: fit-content;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  h1 {
    font-size: 72px;
    margin-top: 255px;
    font-weight: 600;
  }
  h3 {
    font-size: 16px;
    color: var(--dark-grey-2);
    margin-bottom: 19px;
  }
  .btn {
    background-color: var(--light-blue);
    text-decoration: none;
    color: var(--black);
    padding: 16px 35px;
    font-weight: 700;
    font-size: 12px;
    border-radius: 24px; /* Add this line */
  }
`

export default Wrapper
