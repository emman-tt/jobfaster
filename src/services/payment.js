import { api } from '../libs/axios'

export async function createCheckout(variantKey) {
  const res = await api.post('/payment/checkout', {
    variantKey,
  })
  return res.data.data
}
