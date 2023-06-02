import styled from "styled-components"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 15px;
  text-align: left;
  margin-bottom: 50px;

  .publication-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 800px;
    padding: 20px 23px;
    background-color: var(--grey);
    border-radius: 8px;

    .publication-title {
      color: var(--dark);
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .publication-authors span {
      color: var(--dark);
      font-size: 14px;
      font-weight: 400;
      text-decoration: underline;
    }
    .subtitle-grey-text {
      color: var(--dark-grey);
    }
    p {
      font-size: 14px;
    }
    p:last-of-type {
      margin-bottom: 23px;
    }
    .publication-links-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      .publication-link {
        border: 1px solid var(--active-blue);
        border-radius: 8px;
        padding: 5px 9px;
        color: var(--active-blue);
        vertical-align: middle;
        line-height: 12px;
      }
      .publication-link.disabled {
        border: 1px solid var(--dark-grey-2);
        color: var(--dark-grey-2);
        svg path {
          fill: var(--dark-grey-2);
        }
      }
    }
  }
`

export default Wrapper
