import styled from "styled-components"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  .title {
    color: var(--black);
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 17px;
  }

  .data-title {
    color: var(--dark-grey-3);
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .data-text {
    color: var(--black);
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }

  .sequence-container {
    width: 100%;
    word-break: break-all;
    background-color: var(--light-grey-2);
    padding: 12px;
    border-radius: 8px;
    position: relative;
    .copy-btn {
      position: absolute;
      top: -25px;
      right: 0;
      display: flex;
      gap: 5px;
      font-weight: 600;
      align-items: center;
    }
  }
  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 21px;
    width: 50%;
    text-align: left;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
  }
`

export default Wrapper
