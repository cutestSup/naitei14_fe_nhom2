import { Order } from '@/types/order'
import { 
  API_BASE_URL,
  CONTENT_TYPE_JSON,
  FIELD_CREATED_AT,
  ERROR_CREATE_ORDER,
  ERROR_GET_ORDERS,
  ERROR_GET_ORDER,
  ERROR_CANCEL_ORDER,
  ERROR_INVALID_ORDER_STATUS,
  VALIDATION_USER_ID_REQUIRED,
  VALIDATION_ORDER_ITEMS_REQUIRED,
  VALIDATION_TOTAL_AMOUNT_INVALID,
  VALIDATION_SHIPPING_INFO_REQUIRED,
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
  if (!order.userId) throw new OrderError(VALIDATION_USER_ID_REQUIRED);
  if (!order.items || order.items.length === 0) throw new OrderError(VALIDATION_ORDER_ITEMS_REQUIRED);
  if (order.totalAmount <= 0) throw new OrderError(VALIDATION_TOTAL_AMOUNT_INVALID);
  if (!order.shippingInfo) throw new OrderError(VALIDATION_SHIPPING_INFO_REQUIRED);
  
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

export const getOrders = async (
  userId: string | number,
  page: number = 1,
  limit: number = 10
): Promise<{ data: Order[]; total: number }> => {
  await createDelayPromise(API_DELAY_MS)
  
  const response = await fetch(
    `${API_BASE_URL}/orders?userId=${encodeURIComponent(userId)}&_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': CONTENT_TYPE_JSON,
      },
    }
  )

  if (!response.ok) {
    throw new OrderError(ERROR_GET_ORDERS)
  }

  const totalCount = response.headers.get('X-Total-Count')
  const data = await response.json()

  return {
    data,
    total: totalCount ? parseInt(totalCount, 10) : data.length,
  }
}

export const getOrderById = async (id: string): Promise<Order> => {
  await createDelayPromise(API_DELAY_MS)

  const response = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
  })
  
  if (!response.ok) {
    throw new OrderError(ERROR_GET_ORDER)
  }

  return response.json()
}

export const cancelOrder = async (id: string): Promise<Order> => {
  await createDelayPromise(API_DELAY_MS)

  // Server-side validation simulation
  try {
    const currentOrder = await getOrderById(id);
    if (currentOrder.status !== 'pending') {
      throw new OrderError(ERROR_INVALID_ORDER_STATUS);
    }
  } catch (error) {
    if (error instanceof OrderError && error.message === ERROR_INVALID_ORDER_STATUS) {
      throw error;
    }
    // If getOrderById fails, we might still want to try cancelling or just fail.
    // For safety, let's fail if we can't verify status.
    throw new OrderError(ERROR_GET_ORDER);
  }

  const response = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`, {
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
    throw new OrderError(ERROR_CANCEL_ORDER)
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

export const hasUserPurchasedProduct = async (userId: string, productId: number): Promise<boolean> => {
  await createDelayPromise(API_DELAY_MS)
  
  const orders = await getOrdersByUserId(userId)
  
  return orders.some(order => 
    order.status === 'completed' &&
    order.items.some(item => item.productId === productId)
  )
}

