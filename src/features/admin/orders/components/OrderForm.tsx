import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ordersApi } from "../api";
import { Order, OrderItem } from "../types";

interface Props {
  order?: Order | null;
  onSuccess: () => void;
}

interface OrderFormValues {
  userId: number;
  items: OrderItem[];
  total: number;
}

export default function OrderForm({ order, onSuccess }: Props) {
  const { register, handleSubmit, reset, setValue, control, watch } =
    useForm<OrderFormValues>({
      defaultValues: {
        userId: 0,
        items: [],
        total: 0,
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Tự động tính tổng tiền mỗi khi items thay đổi
  const itemsWatch = watch("items");
  useEffect(() => {
    const total = (itemsWatch || []).reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
      0
    );
    setValue("total", total);
  }, [itemsWatch, setValue]);

  // Fill form khi edit
  useEffect(() => {
    if (order) {
      reset({
        userId: order.userId,
        items: order.items || [],
        total: order.total,
      });
    } else {
      reset({
        userId: 0,
        items: [],
        total: 0,
      });
    }
  }, [order, reset]);

  const onSubmit = async (data: OrderFormValues) => {
    const payload = {
      userId: data.userId,
      items: data.items,
      total: data.total,
    };

    if (order) {
      await ordersApi.update(order.id, payload);
    } else {
      await ordersApi.create(payload);
    }

    reset();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded mt-4"
    >
      <h2 className="text-xl font-bold mb-2">
        {order ? "Update Order" : "Create Order"}
      </h2>

      {/* User ID */}
      <div>
        <label className="block mb-1">User ID</label>
        <input
          type="number"
          {...register("userId", { required: true })}
          className="border p-2 w-full"
          placeholder="User ID"
        />
      </div>

      {/* Order Items */}
      <div>
        <label className="block mb-2 font-semibold">Order Items</label>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-4 gap-2 border p-3 mb-2 rounded bg-gray-50"
          >
            <input
              {...register(`items.${index}.name` as const, { required: true })}
              className="border p-2"
              placeholder="Product name"
            />

            <input
              type="number"
              {...register(`items.${index}.quantity` as const, {
                required: true,
                min: 1,
              })}
              className="border p-2"
              placeholder="Qty"
            />

            <input
              type="number"
              {...register(`items.${index}.price` as const, {
                required: true,
                min: 0,
              })}
              className="border p-2"
              placeholder="Price"
            />

            {/* Thành tiền */}
            <div className="p-2 flex items-center font-semibold">
              {(
                (itemsWatch?.[index]?.quantity || 0) *
                (itemsWatch?.[index]?.price || 0)
              ).toLocaleString()}
              ₫
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="col-span-4 mt-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ productId: 0, name: "", quantity: 1, price: 0 })
          }
          className="px-3 py-1 bg-yellow-600 text-white rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Total */}
      <div>
        <label className="block mb-1 font-semibold">Total</label>
        <input
          type="number"
          {...register("total")}
          readOnly
          className="border p-2 w-full bg-gray-100"
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        {order ? "Update" : "Create"}
      </button>
    </form>
  );
}
