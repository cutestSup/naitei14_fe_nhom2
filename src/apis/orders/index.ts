import { Order } from '@/types/order'
import { 
  API_BASE_URL,
  CONTENT_TYPE_JSON,
  FIELD_CREATED_AT,
  ERROR_CREATE_ORDER,
  ERROR_GET_ORDERS,
  ERROR_GET_PRODUCT,
} from '@/constants/common'
import { OrderError } from '@/lib/errors'

const API_DELAY_MS = 100

const createDelayPromise = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  await createDelayPromise(API_DELAY_MS)

  // Validation
  if (!order.userId) throw new OrderError('User ID is required');
  if (!order.items || order.items.length === 0) throw new OrderError('Order items are required');
  if (order.totalAmount <= 0) throw new OrderError('Invalid total amount');
  if (!order.shippingInfo) throw new OrderError('Shipping info is required');
  
  const newOrder: Order = {
    ...order,
    id: crypto.randomUUID(),
    [FIELD_CREATED_AT]: new Date().toISOString(),
  }

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
    body: JSON.stringify(newOrder),
  })

  if (!response.ok) {
    throw new OrderError(ERROR_CREATE_ORDER)
  }

  return response.json()
}

export const getOrders = async (userId: string | number): Promise<Order[]> => {
  await createDelayPromise(API_DELAY_MS)
  
  const response = await fetch(`${API_BASE_URL}/orders?userId=${encodeURIComponent(userId)}&_sort=createdAt&_order=desc`, {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
  })

  if (!response.ok) {
    throw new OrderError(ERROR_GET_ORDERS)
  }

  return response.json()
}

export const getOrderById = async (id: string): Promise<Order> => {
  await createDelayPromise(API_DELAY_MS)

  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
  })
  
  if (!response.ok) {
    throw new OrderError(ERROR_GET_PRODUCT) // Using generic error or add specific one
  }

  return response.json()
}

export const cancelOrder = async (id: string): Promise<Order> => {
  await createDelayPromise(API_DELAY_MS)

  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
    body: JSON.stringify({
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new OrderError('Failed to cancel order')
  }

  return response.json()
}

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  await createDelayPromise(API_DELAY_MS)
  
  const response = await fetch(`${API_BASE_URL}/orders?userId=${encodeURIComponent(userId)}&status=completed`, {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
  })

  if (!response.ok) {
    throw new OrderError(ERROR_GET_ORDERS)
  }

  return response.json()
}

export const hasUserPurchasedProduct = async (userId: string | number, productId: number): Promise<boolean> => {
  await createDelayPromise(API_DELAY_MS)
  
  const orders = await getOrders(userId)
  
  return orders.some(order => 
    (order.status === 'completed' || order.status === 'delivered') &&
    order.items.some(item => item.productId === productId)
  )
}

