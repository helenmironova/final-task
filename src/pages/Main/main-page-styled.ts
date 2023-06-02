import styled from "styled-components"

import backgroundImg from "../../assets/background-img.png"

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 35%;
    left: 60%;
    gap: 30px;
    max-width: 400px;
    p {
      color: var(--dark-grey-3);
    }
    button {
      border-radius: 24px;
      background-color: var(--white);
      border: none;
      padding: 16px 62px;
      color: var(--blue);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    button:hover {
      background-color: var(--light-blue);
    }
  }
`

export default Wrapper
