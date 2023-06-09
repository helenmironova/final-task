import { useNavigate } from "react-router-dom";
import background from "../assets/img/dna-representation-collage1.png";
import LoginBlock from "../components/LoginBlock";

const PageMain = (): JSX.Element => {
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
      <LoginBlock />
    </div>
  );
};

export default PageMain;
