import { useState, useCallback } from 'react'
import { GridView } from './GridView'
import { ListView } from './ListView'
import { ModalDelete } from './ModalDelete'
import { ModalUpdate } from './ModalUpdate'
import { ReactComponent as IconSquares } from '../../assets/squares.svg'
import { ReactComponent as IconList } from '../../assets/list.svg'
import { TransactionI } from '../../api/transactionsApi'
import { useGetTransactions } from '../../hooks/UseTransactions'

import { type FilterI } from '../MainTransactions'

interface PropsI {
  filters: FilterI;
}

export function Transactions({ filters }: PropsI): JSX.Element {

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Partial <TransactionI>>({})
  const [listView, setListView] = useState(true)

  const { data: transactions, isLoading, isError, error } = useGetTransactions(filters) 

  const handleUpdateButton = useCallback((transaction: TransactionI) => {
    setSelectedTransaction({ ...transaction })
    setShowModal(true)
  }, [])

  const handleDeleteButton = useCallback((transaction: TransactionI) => {
    setSelectedTransaction({ ...transaction })
    setShowDeleteModal(true)
  }, [])

  if (isLoading) return <div>Loading...</div>
  else if (isError && error instanceof Error) return <div>Error: {error.message}</div>
  else if (transactions === null || transactions === undefined) return <></>

  const handleCloseModal = () => {
    setShowModal(false)
    setShowDeleteModal(false)
    setSelectedTransaction({})
  }

  return (
    <>
    <div className="flex justify-between items-center bg-neutral-100 rounded-md p-4 mb-8">
      <h2 className="text-center font-medium text-lg">My Transactions</h2>
      {
        listView
          ? <IconSquares className='cursor-pointer w-8' onClick={() => setListView(false)} />
          : <IconList className='cursor-pointer w-8' onClick={() => setListView(true)}/>
      }

    </div>

    {
      listView
        ? (<ListView
            transactions={transactions}
            handleUpdateButton={handleUpdateButton}
            handleDeleteButton={handleDeleteButton}
        />)
        : (<GridView
            transactions={transactions}
            handleUpdateButton={handleUpdateButton}
            handleDeleteButton={handleDeleteButton}
        />)
    }

    {
      showModal
        ? (<ModalUpdate
          handleCloseModal={handleCloseModal}
          transaction={selectedTransaction}
        />)
        : null
    }

    {
      showDeleteModal
        ? (<ModalDelete
          handleCloseModal={handleCloseModal}
          transactionId={selectedTransaction.id}
        />)
        : null
    }   
  </>
  )
}
