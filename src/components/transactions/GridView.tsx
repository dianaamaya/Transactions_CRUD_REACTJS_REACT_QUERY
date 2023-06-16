import { GridViewItem } from './GridViewItem'
import { TransactionI } from '../../api/transactionsApi'

interface PropsI {
    transactions: TransactionI[],
    handleUpdateButton: (transaction: TransactionI) => void,
    handleDeleteButton: (transaction: TransactionI) => void,
}

export function GridView ({
  transactions,
  handleUpdateButton,
  handleDeleteButton
}: PropsI): JSX.Element {
  return (
    <div className="grid sm:grid-clos-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        transactions?.map((transaction) => (
          <GridViewItem key={transaction.id}
                        transaction={transaction}
                        handleUpdateButton={handleUpdateButton}
                        handleDeleteButton={handleDeleteButton} />
        ))
      }
    </div>
  )
}
