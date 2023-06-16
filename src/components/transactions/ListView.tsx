import { ListViewItem } from './ListViewItem'
import { TransactionI } from '../../api/transactionsApi'

interface PropsI {
    transactions: TransactionI[],
    handleUpdateButton: (transaction: TransactionI) => void,
    handleDeleteButton: (transaction: TransactionI) => void,
}


export function ListView ({
  transactions,
  handleUpdateButton,
  handleDeleteButton
}: PropsI) {
  return (
    <table className="border-spacing-6 border w-full">
      <thead className="hidden md:table-header-group">
        <tr className="border">
          <th className="p-2">Id</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Beneficiary</th>
          <th className="p-2">Account</th>
          <th className="p-2">Date</th>
          <th className="p-2">Description</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody data-testid="transactions-list">
        {
          transactions?.map((transaction) => (
            <ListViewItem key={transaction.id}
                          transaction={transaction}
                          handleUpdateButton={handleUpdateButton}
                          handleDeleteButton={handleDeleteButton} />
          ))
        }
      </tbody>
    </table>
  )
}
