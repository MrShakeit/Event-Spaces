import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Send a request to the backend to reset the password for the given email
    console.log(`Password reset requested for email: ${email}`);
  };

  return (
    <div>
      <p>Please enter your email to reset your password:</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;
