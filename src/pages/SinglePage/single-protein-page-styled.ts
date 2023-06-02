import styled from "styled-components"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  margin-top: 30px;
  main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 130px;
    header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      .title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        span {
          background-color: var(--light-blue);
          border-radius: 12px;
          padding: 2px 12px;
          margin-left: 13px;
        }
      }
    }
    h1 {
      font-size: 22px;
      font-weight: 600;
    }
    h2 {
      color: var(--dark-grey-3);
      margin-bottom: 12px;
    }

    p {
      margin-bottom: 12px;
    }
  }
`

export default Wrapper
