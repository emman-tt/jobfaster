import { api } from '../libs/axios'

export async function getTransactions() {
  const res = await api.get('/payment/transactions')
  return res.data.data
}
