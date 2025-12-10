import React from 'react';
import { useForm } from 'react-hook-form';
import { ShippingInfo } from '@/types/order';

interface CheckoutFormProps {
  onSubmit: (data: ShippingInfo) => void;
  initialValues?: Partial<ShippingInfo>;
  id?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, initialValues, id }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingInfo>({
    defaultValues: initialValues
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-green-primary uppercase">Thông tin giao hàng</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
          <input
            {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
            placeholder="Nguyễn Văn A"
          />
          {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
          <input
            {...register('phone', { 
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: 'Số điện thoại không hợp lệ'
              }
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
            placeholder="0901234567"
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
        <input
          {...register('email', { 
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ'
            }
          })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder="email@example.com"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ <span className="text-red-500">*</span></label>
        <input
          {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder="Số nhà, tên đường, phường/xã"
        />
        {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố / Tỉnh</label>
        <input
          {...register('city')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder="Hà Nội, TP.HCM..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
        <textarea
          {...register('note')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          rows={3}
          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
        />
      </div>
    </form>
  );
};
