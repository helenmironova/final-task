import background from "../../public/img/dna-representation-collage1.png";

import AuthModal from "../components/AuthModal";

const PageAuth = (): JSX.Element => {
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
      <AuthModal></AuthModal>
    </div>
  );
};

export default PageAuth;
