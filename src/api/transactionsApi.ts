import axios from 'axios'
import moment from 'moment'

export interface TransactionI {
  id: number | string
  amount: number
  beneficiary: string
  account: string
  address: string
  date: string
  description: string
}

export interface DataI {
  transactions: TransactionI[]
}

const transactionsApi = axios.create({
  baseURL: 'http://localhost:3000/transactions',
})

export const getTransactions = async (): Promise<TransactionI[]> => {
  try {
    const res = await transactionsApi.get('/')
    const data = res.data as TransactionI[]
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getTransactionById = async (id: number): Promise<TransactionI> =>
  await transactionsApi.get(`/${id}`)

export const createTransaction = async (
  transaction: Omit<TransactionI, 'id' | 'date'>,
): Promise<TransactionI> => {
    const newTransaction = {
      ...transaction,
      account: 'PL'+ transaction.account,
      amount: parseFloat((transaction.amount).toString()),
      date: moment().format()
    }
     return await transactionsApi.post('/', newTransaction)
}

export const updateTransaction = async (transaction: TransactionI): Promise<void> => {
  const newTransaction = {
    ...transaction,
    account: 'PL'+ transaction.account,
    amount: parseFloat((transaction.amount).toString()),
    date: moment().format(),
  }
  return await transactionsApi.put(`/${transaction.id}`, newTransaction)
}

export const deleteTransaction = async (id: number | string | undefined): Promise<void> => {
  return await transactionsApi.delete(`/${id}`) 
}

export default transactionsApi
