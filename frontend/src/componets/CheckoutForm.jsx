import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useTheme } from "@emotion/react";

const CheckoutForm = () => {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const homePage = import.meta.env.VITE_FRONTEND_URL;
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const GreyBox = styled(Box)({
    backgroundColor: theme.palette.secondary.light,
    padding: "4vh 2vw 1vh 2vw",
    marginBlock: "24px",
    borderRadius: "20px"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    // setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${homePage}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    // setIsLoading(false);
  };

  return (
    <Box>
      <GreyBox>
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement id="link-authentication-element" />
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            style={{
              color: "#fff",
              width: "100%",
              border: "none",
              cursor: "pointer",
              backgroundColor: theme.palette.primary.main,
              padding: "0.6rem 2rem",
              borderRadius: "10px",
              marginBlock: "30px",
              transition: "all 0.3s ease-in",
            }}
            id="submit"
          >
            <span id="button-text">
              Pay Now
            </span>
            {/* <span id="button-text">
              {isLoading ? "Loading..." : "Pay now"}
            </span> */}
            {/* <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span> */}
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </GreyBox>
    </Box>
  );
};

export default CheckoutForm;
