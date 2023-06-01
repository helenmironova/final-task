import { useEffect, useRef, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setFilters, setIsFiltersModalOpen } from "../../slices/search-slice"
import Wrapper from "./filters-modal-styled"

const FiltersModal = () => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery)
  const appliedFilters = useAppSelector((state) => state.search.selectedFilters)
  const [dynamicFilters, setDynamicFilters] = useState<any>([])
  const [selectedFilters, setSelectedFilters] = useState<any>([])

  const [lengthFilterOptions, setLengthFilterOptions] = useState<any>({})

  const [resetFilters, setResetFilters] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [noFilters, setNoFilters] = useState<boolean>(false)

  const minLengthRef = useRef<HTMLInputElement>(null)
  const maxLengthRef = useRef<HTMLInputElement>(null)

  const [url, setUrl] = useState<any>(
    `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${
      searchQuery || "*"
    })${
      appliedFilters
        ? (appliedFilters as any)
            ?.map((filter: any) => {
              if (filter.name === "length") {
                return `%20AND%20(${filter.name}:%5B${filter.minLength}%20TO%20${filter.maxLength}%5D)`
              }

              return `%20AND%20(${filter.name}:${filter.value})`
            })
            .join("")
        : ""
    }`,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (resetFilters) {
      setSelectedFilters([])
      setNoFilters(false)
      setResetFilters(false)
    }
  }, [resetFilters])

  const handleCancel = () => {
    dispatch(setFilters(null))
    dispatch(setIsFiltersModalOpen(false))
    setSelectedFilters([]) // Добавить эту строку
  }

  useEffect(() => {
    if (appliedFilters) {
      setSelectedFilters(appliedFilters)
    }

    const filters = (appliedFilters as any)
      ?.map((filter: any) => {
        if (filter.name === "length") {
          return `%20AND%20(${filter.name}:%5B${filter.minLength}%20TO%20${filter.maxLength}%5D)`
        }

        return `%20AND%20(${filter.name}:${filter.value})`
      })
      .join("")

    setUrl(
      `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${
        searchQuery || "*"
      })${appliedFilters && filters}`,
    )
  }, [searchQuery, appliedFilters])

  const getDynamicFilters = async () => {
    try {
      setIsLoading(true)

      const filters = (selectedFilters as any)
        ?.map((filter: any) => {
          if (filter.name === "length") {
            const { minLength, maxLength } = filter

            return `%20AND%20(${filter.name}:%5B${minLength}%20TO%20${maxLength}%5D)`
          }

          return `%20AND%20(${filter.name}:${filter.value})`
        })
        .join("")

      const response = await fetch(`${url}${appliedFilters && filters}`)

      const minLengthResponse = await fetch(
        `${url}${appliedFilters ? filters : ""}&size=1&sort=length%20asc`,
      )

      const maxLengthResponse = await fetch(
        `${url}${appliedFilters ? filters : ""}&size=1&sort=length%20desc`,
      )

      const minLengthData = await minLengthResponse.json()
      const maxLengthData = await maxLengthResponse.json()
      const minLength = minLengthData.results[0].sequence.length
      const maxLength = maxLengthData.results[0].sequence.length

      setLengthFilterOptions({ min: minLength, max: maxLength })
      const data = await response.json()

      const dynamicFilters = data.facets.map((facet: any) => {
        return {
          label: facet.label,
          name: facet.name,
          values: facet.values.map((value: any) => {
            return {
              label: value.label,
              value: value.value,
              count: value.count,
            }
          }),
        }
      })

      setIsLoading(false)

      return dynamicFilters
    } catch {
      setNoFilters(true)
      setIsLoading(false)

      return null
    }
  }

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target

    if (name === "minLength" || name === "maxLength") {
      const filter = { name: "length", value: `${value}:${value}` }

      setSelectedFilters((prevState: any) => {
        const filterExists = prevState.some(
          (item: any) => item.name === filter.name,
        )

        return filterExists
          ? prevState.filter(
              (item: any) =>
                item.name !== filter.name || item.value !== filter.value,
            )
          : [...prevState, filter]
      })

      return
    }

    const filter = { name, value }

    setSelectedFilters((prevState: any) => {
      const filterExists = prevState.some(
        (item: any) => item.name === filter.name,
      )

      return filterExists
        ? prevState.filter(
            (item: any) =>
              item.name !== filter.name || item.value !== filter.value,
          )
        : [...prevState, filter]
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (
      minLengthRef.current &&
      maxLengthRef.current &&
      (minLengthRef.current.value || maxLengthRef.current.value)
    ) {
      const minLength = minLengthRef.current.value
      const maxLength = maxLengthRef.current.value

      const filter = { name: "length", minLength, maxLength }

      dispatch(setFilters([...selectedFilters, filter]))
      dispatch(setIsFiltersModalOpen(false))

      return
    }

    if (selectedFilters.length === 0 || !selectedFilters) {
      dispatch(setFilters(null))
      dispatch(setIsFiltersModalOpen(false))

      return
    }

    dispatch(setFilters(selectedFilters))
    dispatch(setIsFiltersModalOpen(false))
  }

  useEffect(() => {
    getDynamicFilters().then((data) => {
      if (data) {
        setDynamicFilters(data)

        const selectElement = document.getElementById(
          data[0].name,
        ) as HTMLSelectElement

        if (selectElement && selectElement.options.length > 0) {
          selectElement.value = selectElement.options[0].value
        }
      } else {
        setNoFilters(true)
      }
    })
  }, [searchQuery])

  return (
    <Wrapper>
      <h1>{"Filters"}</h1>

      {isLoading ? (
        <p className="filters-loading">{"Loading available filters..."}</p>
      ) : (noFilters ? (
        <p className="filters-loading">{"No filters available"}</p>
      ) : (
        <form className="filters-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="gene">{"Gene Name"}</label>
          <input
            type="text"
            name="gene"
            id="gene"
            placeholder="Enter gene name"
            onChange={(e) => handleFilterChange(e)}
          />
          {dynamicFilters.map((filter: any) => {
            return (
              <div className="filter-container" key={filter.name}>
                <label htmlFor={filter.name}>{filter.label}</label>
                <select
                  name={filter.name}
                  defaultValue=""
                  id={filter.name}
                  onChange={(e) => handleFilterChange(e)}
                >
                  <option value="" disabled>
                    {" "}
                    {"Select an option"}{" "}
                  </option>
                  {filter.values.map((value: any) => {
                    return (
                      <option
                        value={value.value}
                        key={`${value?.label}${value.value}${value?.count}`}
                      >
                        {value.label ? value.label : value.value}
                        {" ("}
                        {value?.count}
                        {")"}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          })}

          <div className="length-filter-container">
            <label htmlFor="length">{"Sequence length"}</label>
            <div className="length-input">
              <input
                type="number"
                id="length"
                name="minLength"
                min={lengthFilterOptions.min && lengthFilterOptions.min}
                ref={minLengthRef}
                max={lengthFilterOptions.max && lengthFilterOptions.max}
                defaultValue={
                  lengthFilterOptions.min && lengthFilterOptions.min
                }
              />
              <hr />
              <input
                type="number"
                name="maxLength"
                id="length"
                ref={maxLengthRef}
                min={lengthFilterOptions.min && lengthFilterOptions.min}
                max={lengthFilterOptions.max && lengthFilterOptions.max}
                defaultValue={
                  lengthFilterOptions.max && lengthFilterOptions.max
                }
              />
            </div>
          </div>
          <div className="filters-btn-container">
            <button type="button" onClick={handleCancel}>
              {"Cancel"}
            </button>
            <button type="submit">{"Apply filters"}</button>
          </div>
        </form>
      ))}
    </Wrapper>
  )
}

export default FiltersModal
