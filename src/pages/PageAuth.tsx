import background from "../../public/img/dna-representation-collage1.png";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import SignUpModal from "../components/SignUpModal";

const PageAuth = (): JSX.Element => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {isLoginPage ? (
        <LoginModal onPageChange={togglePage} />
      ) : (
        <SignUpModal onPageChange={togglePage} />
      )}
    </div>
  );
};

export default PageAuth;
