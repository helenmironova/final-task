import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import FiltersIcon from "../../assets/filters-icon"
import FiltersIconActive from "../../assets/filters-icon-active" // Новая иконка
import FiltersModal from "../../components/Filters/filters-modal"
import Header from "../../components/Header/header"
import TableWithReactQuery from "../../components/Table/table"
import {
  setFilters,
  setIsFiltersModalOpen,
  setSearchQuery,
} from "../../slices/search-slice"
import Wrapper from "./search-page-styled"

const SearchPage = () => {
  const dispatch = useAppDispatch()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const queryParam = new URLSearchParams(window.location.search)
  const urlSearchQuery = queryParam.get("query")

  const isFiltersModalOpen = useAppSelector(
    (state) => state.search.isFiltersModalOpen,
  )

  const [isFiltersButtonActive, setIsFiltersButtonActive] = useState(false)

  useEffect(() => {
    if (urlSearchQuery && searchInputRef.current) {
      searchInputRef.current.value = urlSearchQuery
      dispatch(setSearchQuery(urlSearchQuery))
    }
  }, [urlSearchQuery, searchInputRef, dispatch])

  const toggleFiltersModal = () => {
    dispatch(setIsFiltersModalOpen(!isFiltersModalOpen))
    setIsFiltersButtonActive(!isFiltersModalOpen)
  }

  const handleFormSubmit = (event: any) => {
    event.preventDefault()
    const searchValue = searchInputRef.current?.value

    dispatch(setFilters(null))
    dispatch(setIsFiltersModalOpen(false))

    if (!searchValue) {
      dispatch(setSearchQuery("*"))

      return
    }

    queryParam.set("query", searchValue)
    dispatch(setSearchQuery(searchValue))
  }

  return (
    <Wrapper>
      <Header />
      <main>
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Enter search value"
              ref={searchInputRef}
            />
            <button type="submit">{"Search"}</button>
            <button
              type="button"
              onClick={toggleFiltersModal}
              style={{
                backgroundColor: isFiltersButtonActive
                  ? "var(--active-blue)"
                  : "var(--light-blue)",
              }}
            >
              {isFiltersButtonActive ? <FiltersIconActive /> : <FiltersIcon />}
            </button>
          </form>
          {isFiltersModalOpen && <FiltersModal />}
        </div>

        <div className="table-container">
          <TableWithReactQuery />
        </div>
      </main>
    </Wrapper>
  )
}

export default SearchPage
