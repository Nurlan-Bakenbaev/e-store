import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";
const SignUpModel = ({ isOpen, setIsOpen, closeModal }) => {
  const router = useRouter();
  const navigateToLogin = () => {
    router.push("/login");
    setIsOpen(false);
  };
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "text.primary",
          width: 400,
          height: 200,
          bgcolor: "background.paper",
          borderRadius: "10px",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h5" component="h5">
          You are not signed in
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Please sign up to continue using the application.
        </Typography>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}>
          <Button sx={{ mt: 2 }} variant="contained" onClick={navigateToLogin}>
            Go to Sign Up
          </Button>
        </motion.div>
        <button
          onClick={closeModal}
          className="absolute text-error top-2 right-3 p-2 ">
          <CircleX />
        </button>
      </Box>
    </Modal>
  );
};
export default SignUpModel;
