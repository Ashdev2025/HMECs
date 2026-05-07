import { apiRequest } from "./api";

export type PayFastCheckoutResponse = {
  checkout_url?: string;
  payment_url?: string;
  redirect_url?: string;
  url?: string;
};

export const initiatePayFastCheckout = async (
  planId: string | number
): Promise<PayFastCheckoutResponse> => {
  return apiRequest<PayFastCheckoutResponse>(
    "/api/auth/subscriptions/checkout",
    {
      method: "POST",
      body: JSON.stringify({
        plan_id: planId,
      }),
    }
  );
};