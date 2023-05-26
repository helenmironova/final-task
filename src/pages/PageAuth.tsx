import LoginBlock from "../components/LoginBlock";
import background from "../../public/img/dna-representation-collage1.png";
import LoginModal from "../components/LoginModal";

const PageAuth = (): JSX.Element => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",

        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <LoginModal />
    </div>
  );
};

export default PageAuth;
