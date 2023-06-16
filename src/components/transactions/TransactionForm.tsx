import { useForm } from 'react-hook-form'
import { type TransactionI } from '../../api/transactionsApi'
import { ReactComponent as IconSend } from '../../assets/send.svg'
import { ReactComponent as IconUpdate } from '../../assets/update.svg'
import { useCreateTransaction, useUpdateTransaction } from '../../hooks/UseTransactions'

type transactionFormI = Omit<TransactionI, 'id' | 'date'>

const defaultValues = {
  amount: null,
  beneficiary: null,
  account: null,
  address: null,
  description: null
}

interface PropsI {
  transactionToUpdate?: Partial<TransactionI> | typeof defaultValues;
  onModalUpdate?: boolean;
  handleCloseModal?: () => void | null;
}
 
type FormValues = typeof defaultValues | transactionFormI

export function TransactionForm ({
  transactionToUpdate = defaultValues,
  onModalUpdate = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleCloseModal = () => {},
}: PropsI ): JSX.Element  {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: onModalUpdate ? transactionToUpdate : defaultValues
  })

  const createTransaction = useCreateTransaction()
  const updateTransaction = useUpdateTransaction()

  const onSubmit = handleSubmit((data) => {
    const newTransaction = data as Omit<TransactionI, 'id' | 'date'>
    if (onModalUpdate) {
      const updatedTransaction = { ...transactionToUpdate, ...newTransaction } as TransactionI
      updateTransaction.mutateAsync(updatedTransaction)
      handleCloseModal()
    } else {
      createTransaction.mutateAsync(newTransaction)
    }
    reset()
  })

  return (
    <>
      {
        onModalUpdate
          ? null
          : (<h2 className="block text-lg font-medium pb-6 text-center">
                Add transaction
            </h2>)
      }

      <form onSubmit={onSubmit}>
        <div className="md:flex md:items-center gap-3">
          <label htmlFor="input-amount" className="basis-1/6">Amount</label>
          <input
            id="input-amount"
            className="block border rounded-md w-full px-4 py-2 basis-5/6"
            type="number"
            step="any"
            {...register('amount', { required: true, min: 1 })}
          />
        </div>
        {errors.amount !== null && errors.amount !== undefined && (
          <p className="text-rose-800 text-center py-2">
            Must be a number greater than 0
          </p>
        )}

        <div className="md:flex md:items-center gap-3 mt-4">
          <label htmlFor="input-beneficiary" className="basis-1/6">Beneficiary</label>
          <input
            id="input-beneficiary"
            className="block border rounded-md w-full px-4 py-2 basis-5/6"
            {...register('beneficiary', { required: true })}
          />
        </div>
        {errors.beneficiary !== null && errors.beneficiary !== undefined && (
          <p className="text-rose-800 text-center py-2">
            This field is required
          </p>
        )}

        <div className="md:flex md:items-center gap-3 mt-4">
          <label htmlFor="input-account" className="basis-1/6">Account</label>
          <input
            id="input-account"
            className="block border rounded-md w-full px-4 py-2 basis-5/6"
            type="number"
            {...register('account', { required: true, minLength: 1 })}
          />
        </div>
        {errors.account !== null && errors.account !== undefined && (
          <p className="text-rose-800 text-center py-2">
            This field is required
          </p>
        )}

        <div className="md:flex md:items-center gap-3 mt-4">
          <label htmlFor="input-address" className="basis-1/6">Address</label>
          <input
            id="input-address"
            className="block border rounded-md w-full px-4 py-2 basis-5/6"
            {...register('address', { required: true })}
          />
        </div>

        {errors.address !== null && errors.address !== undefined && (
          <p className="text-rose-800 text-center py-2">
            This field is required
          </p>
        )}

        <div className="md:flex md:items-center gap-3 mt-4">
          <label htmlFor="input-description" className="basis-1/6">Description</label>
          <input
            id="input-description"
            className="block border rounded-md w-full px-4 py-2 basis-5/6"
            {...register('description', { required: true })}
          />
        </div>
        {errors.description !== null && errors.description !== undefined && (
          <p className="text-rose-800 text-center py-2">
            This field is required
          </p>
        )}

        {onModalUpdate
          ? (
          <div className="flex items-center justify-end border-solid border-slate-200 rounded-b mt-8 pt-6">
            <button
              className="button-cancel <bg-gray-200 text-sm px-4 py-2 rounded-md outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              className="button-update bg-emerald-500 text-white text-sm px-4 py-2 rounded-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              <IconUpdate className="w-6 inline-block pr-2" />
              Save Changes
            </button>
          </div>
            )
          : (
          <button
            className="bg-lime-900 text-white px-4 py-2 rounded-md mt-8 w-full"
            type="submit"
          >
            <IconSend className="w-6 inline-block pr-2" />
            Send
          </button>
            )}
      </form>
    </>
  )
}
