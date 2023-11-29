import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/Authprovider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useParams } from "react-router-dom";

const CheckoutFrom = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: mealPackage = [], refetch } = useQuery({
    queryKey: ["mealPackage", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mealPackage/${id}`);
      return res.data;
    },
  });
  console.log(mealPackage);
  const totalPrice = mealPackage.price;

  useEffect(() => {
    if (typeof totalPrice === "number" && totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  console.log(totalPrice);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError(" ");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user.email,
          price: totalPrice,
          badge: mealPackage.type,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("paymentResult---", res);
        Swal.fire("Payment Done Successfully");
        refetch();
      }
    }
  };
  return (
    <div className="max-w-screen-md  mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <button
          className="btn rounded-none mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-500">Your transaction: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutFrom;
