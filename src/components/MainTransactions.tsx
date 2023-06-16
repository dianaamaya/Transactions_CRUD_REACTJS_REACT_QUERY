import { useState } from 'react'
import { TransactionForm } from './transactions/TransactionForm'
import { Balance } from './transactions/Balance'
import { Filter } from './transactions/Filter'
import { Transactions } from './transactions/Transactions'

export interface FilterI {
  beneficiary: string;
}

export function MainTransactions (): JSX.Element {
  const [filters, setFilters] = useState<FilterI>({ beneficiary: '' })
  return (
    <main className="px-8 py-12 max-w-5xl mx-auto">
      <div className="md:flex md:flex-row-reverse md:gap-12">
        <div className="md:basis-1/2">
          <TransactionForm />
        </div>
        <div className="mt-12 md:mt-0 md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="mb-8 md:mb-0">
            <Balance />
          </div>
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <Filter setFilters={setFilters}/>
          </div>
        </div>
      </div>
      <div className="py-8">
        <Transactions filters={filters} />
      </div>
    </main>
  )
}
