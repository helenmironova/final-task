import styled from "styled-components"

const Wrapper = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  table {
    border-collapse: collapse;
    min-width: 100%;
    text-align: left;
  }
  th {
    position: sticky;
    top: 0;
    background-color: var(--grey);
    padding: 12px;
    font-weight: 600;
    border-left: 1px solid var(--white);
  }
  td {
    padding: 12px 15px;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: normal;
  }

  th:first-of-type {
    border-radius: 8px 0 0 8px;
  }

  th:last-of-type {
    border-radius: 0 8px 8px 0;
  }

  th {
    width: fit-content;
  }

  .entry-link {
    color: var(--blue);
    font-weight: 600;
  }

  .container {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
  h3 {
    text-align: left;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .cursor-pointer {
    cursor: pointer;
  }

  .sorted-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default Wrapper
