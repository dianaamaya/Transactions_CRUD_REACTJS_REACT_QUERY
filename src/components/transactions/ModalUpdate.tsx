import { TransactionForm } from './TransactionForm'
import { TransactionI } from '../../api/transactionsApi'

interface PropsI {
    transaction: Partial<TransactionI>,
    handleCloseModal: () => void,
}

export function ModalUpdate ({ handleCloseModal, transaction }: PropsI): JSX.Element {

  return (
    <>
      <div className="update-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Update transaction</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-slate-300 opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleCloseModal()}
              >
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="relative p-6 flex-auto">
              <TransactionForm
                transactionToUpdate={{...transaction, account: transaction?.account?.replace('PL', '')}}
                onModalUpdate={true}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
