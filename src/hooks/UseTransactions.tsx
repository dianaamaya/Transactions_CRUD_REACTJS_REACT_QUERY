import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../api/transactionsApi';
import { type FilterI } from '../components/MainTransactions'
import { toast } from 'react-hot-toast'

export const useGetTransactions = (filters: FilterI) => {
  return useQuery(
    ['transactions'],
    getTransactions,
    {
      onError: () => {
        toast.error('Error getting transactions')
      },
      select: (transactions) => transactions?.filter(
        (transaction) => transaction?.beneficiary?.toLowerCase().includes(filters?.beneficiary)),
    }
  );
};

export const useCreateTransaction = () => {

  const queryClient = useQueryClient();

  return useMutation(createTransaction, {
    onError: () => {
      toast.error('Transaction could not be created')
    },
    onSuccess: (/* transaction: TransactionI */) => {
      toast.success('Transaction created successfully')
      queryClient.invalidateQueries(['transactions'])
      /*queryClient.setQueryData(['transactions'],
        (prevTransactions: TransactionI[] | undefined) => prevTransactions 
            ? [transaction, ...prevTransactions] 
            : [transaction])*/
    }
  })
} 

export const useUpdateTransaction = () => {

  const queryClient = useQueryClient();

  return useMutation(updateTransaction, {
    onError: () => {
      toast.error('Transaction could not be updated')
    },
    onSuccess: () => {
      toast.success('Transaction updated successfully')
      queryClient.invalidateQueries(['transactions'])
    }
  })
}

export const useDeleteTransaction = () => {

  const queryClient = useQueryClient();

  return useMutation(deleteTransaction, {
    onError: () => {
      toast.error('Transaction could not be deleted')
    },
    onSuccess: () => {
      toast.success('Transaction deleted successfully')
      queryClient.invalidateQueries(['transactions'])
    }
  })
}
    