import React from 'react';
import { useForm } from 'react-hook-form';
import { ShippingInfo } from '@/types/order';
import { useTranslation } from '@/hooks';

interface CheckoutFormProps {
  onSubmit: (data: ShippingInfo) => void;
  initialValues?: Partial<ShippingInfo>;
  id?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, initialValues, id }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingInfo>({
    defaultValues: initialValues
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-green-primary uppercase">{t("checkout.shippingInfoTitle")}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.fullName")} <span className="text-red-500">*</span></label>
          <input
            {...register('fullName', { required: t("checkout.fullNameRequired") })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
            placeholder={t("checkout.fullNamePlaceholder")}
          />
          {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.phone")} <span className="text-red-500">*</span></label>
          <input
            {...register('phone', { 
              required: t("checkout.phoneRequired"),
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: t("checkout.phoneInvalid")
              }
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
            placeholder={t("checkout.phonePlaceholder")}
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.email")} <span className="text-red-500">*</span></label>
        <input
          {...register('email', { 
            required: t("checkout.emailRequired"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("checkout.emailInvalid")
            }
          })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder={t("checkout.emailPlaceholder")}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.address")} <span className="text-red-500">*</span></label>
        <input
          {...register('address', { required: t("checkout.addressRequired") })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder={t("checkout.addressPlaceholder")}
        />
        {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.city")}</label>
        <input
          {...register('city')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          placeholder={t("checkout.cityPlaceholder")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.note")}</label>
        <textarea
          {...register('note')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-primary"
          rows={3}
          placeholder={t("checkout.notePlaceholder")}
        />
      </div>
    </form>
  );
};
