import { useMemo, useEffect, useState } from 'react'
import { useQueryClient, QueryObserver } from '@tanstack/react-query'
import { getTransactions, TransactionI } from '../../api/transactionsApi'

export function Balance (): JSX.Element {

  const queryClient = useQueryClient()
  const [transactions, setTransactions] = useState<TransactionI[]>([])

  useEffect(() => {
    
    const observer = new QueryObserver<TransactionI[]>(
      queryClient, { queryKey: ['transactions'], queryFn: getTransactions })
   
    const unsubscribe = observer.subscribe(result => {
        if (result.data) setTransactions(result.data)
    })

    return () => {
        unsubscribe()
    }

}, [queryClient])


const balance = useMemo(() => {
  return transactions?.length ? parseFloat(transactions?.reduce(
      (acumulator, current) => current.amount ? acumulator + current.amount : acumulator, 0).toString()).toFixed(2)
      : 0    
}, [transactions])

  return (<p className="text-2xl font-semibold">Balance {balance} PLN</p>)
}

