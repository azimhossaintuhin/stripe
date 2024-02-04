import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SimpleHeader from "../../../components/common/SimpleHeader";
import propertyProfile from "../../../assets/featured/feat-1.jpg";
import StarIcon from "@mui/icons-material/Star";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const theme = useTheme();
  const { bookingId, intent } = useParams();

  const handlePaymentClick = () => {
    setClientSecret(intent);
  };

  return (
    <>
      <SimpleHeader />
      <Box width={"100vw"} display={"flex"} justifyContent={"center"}>
        {!clientSecret && (
          <Stack
            marginBottom={"2rem"}
            padding={"20vh 20vh 0vh 20vh"}
            width={"60%"}
            direction={"column"}
            sx={{ backgroundColor: "#fff", height: "auto" }}
          >
            {/* Payment Heading */}
            <Typography marginBottom={5} variant="h1" fontWeight={500}>
              Payment Details
            </Typography>

            {/* Property Details */}
            <Stack
              spacing={3}
              width={"100%"}
              direction={"row"}
              paddingBottom={"1.5rem"}
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box width={"30%"}>
                <img
                  width={"100%"}
                  style={{
                    borderRadius: "10px",
                  }}
                  src={propertyProfile}
                  alt=""
                />
              </Box>

              <Box
                width={"70%"}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Typography
                    fontFamily={"Inter"}
                    fontSize={"1rem"}
                    fontWeight={200}
                  >
                    Room in rental unit
                  </Typography>
                  <Typography fontSize={"1.2rem"} fontWeight={400}>
                    {" "}
                    Enjoy historic Valencia and close to the beach
                  </Typography>
                </Box>

                <Box
                  alignItems={"center"}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <StarIcon fontSize="medium" />
                  <Typography
                    fontSize={"1.1rem"}
                    fontWeight={300}
                    marginLeft={"0.2rem"}
                  >
                    4.87
                  </Typography>
                  <Typography
                    fontFamily={"Inter"}
                    fontSize={"1.1rem"}
                    fontWeight={300}
                    marginLeft={"0.3rem"}
                  >
                    (120 reviews)
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Divider />

            {/* Stay Details */}
            <Stack direction={"column"} spacing={2} paddingBlock={"1.5rem"}>
              <Typography
                fontSize={"1.5rem"}
                variant="subtitle1"
                fontWeight={400}
              >
                Your Total
              </Typography>

              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontWeight={300}
                  fontFamily={"Inter"}
                  fontSize={"1rem"}
                >
                  21 Nights
                </Typography>
                <Typography
                  fontWeight={300}
                  fontFamily={"Inter"}
                  fontSize={"1rem"}
                >
                  Rs. 1,07,453
                </Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Price Total */}
            <Stack paddingBlock={"1.5rem"} direction={"column"} spacing={2}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontSize={"1.2rem"}
                  variant="subtitle1"
                  fontWeight={400}
                >
                  Total
                </Typography>
                <Typography
                  fontSize={"1.2rem"}
                  variant="subtitle1"
                  fontWeight={400}
                >
                  Rs. 1,07,453
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                sx={{ textDecoration: "underline" }}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"1.2rem"}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  Price Breakdown
                </Typography>
              </Box>
            </Stack>

            {/* Payment Button */}
            <Button
              onClick={handlePaymentClick}
              sx={{
                marginTop: "1rem",
                borderRadius: "6px",
                textTransform: "initial",
                padding: "0.8rem",
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Proceed to Payment
            </Button>
          </Stack>
        )}

        {clientSecret && stripePromise && (
          <Stack
            marginBottom={"2rem"}
            padding={"20vh 20vh 0vh 20vh"}
            width={"60%"}
            direction={"column"}
            sx={{ backgroundColor: "#fff", height: "auto" }}
          >
            {/* Payment Heading */}
            <Typography marginBottom={2} variant="h1" fontWeight={500}>
              Payment
            </Typography>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Payment;

// "https://snugstaff.vercel.app/orders/order=940baf6b-4f=d0-402c-a24f-cbe8dcf49361&status=True&intent=pi_3OGilgSBbWg5lJi40TK8dcE6_=secret_5Q7vCxhH9Ws6P65O6Sw68fNOr"
