import { type ChangeEvent } from 'react'
import { type FilterI } from '../MainTransactions'
import { ReactComponent as IconSearch } from '../../assets/search.svg'

interface PropsI {
  setFilters: React.Dispatch<React.SetStateAction<FilterI>>;
}

export function Filter({ setFilters }: PropsI): JSX.Element {

  const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((current) => ({ ...current, beneficiary: e?.target?.value?.toLowerCase() || '' }))
  }

  return (
    <>
      <IconSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" />
      <input
        className="search-beneficiary block border rounded-md w-full pl-12 pr-4 py-2"
        type="search"
        onChange={handleFilter}
        placeholder="Search beneficiary..."
      />
    </>
  )
}


