import { apiRequest } from "./api";

export type PayFastCheckoutResponse = {
  checkout_url?: string;
  payment_url?: string;
  redirect_url?: string;
  url?: string;
  data?: Record<string, string | number | boolean | null | undefined>;

};

export const initiatePayFastCheckout = async (
  planId: string | number,
  idempotencyKey?: string
): Promise<PayFastCheckoutResponse> => {
  return apiRequest<PayFastCheckoutResponse>("/auth/subscriptions/checkout", {
    method: "POST",
    body: JSON.stringify({
      plan_id: planId,
      idempotency_key: idempotencyKey,
      return_url:
        import.meta.env.VITE_PAYFAST_RETURN_URL ||
        "http://localhost:5173/signin?payment=success",
      cancel_url:
        import.meta.env.VITE_PAYFAST_CANCEL_URL ||
        "http://localhost:5173/payment/cancel",
    }),
  });
};