import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const MealPackage = () => {
  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto my-16">
      <SectionTitle heading="Payment Section"></SectionTitle>
      
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutFrom></CheckoutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default MealPackage;
