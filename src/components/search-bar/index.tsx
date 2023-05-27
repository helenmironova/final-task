import { ChangeEvent } from "react";

import FormInput from "../form-input";

interface SearchBarProps {
  query: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ query, handleSearch }: SearchBarProps) => {
  return (
    <FormInput
      type="search"
      onChange={handleSearch}
      name="searchField"
      placeholder="Enter search value"
      required={false}
      value={query}
      styles="searchField"
    />
  );
};

export default SearchBar;
