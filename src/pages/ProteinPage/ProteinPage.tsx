import "./proteinPage.css";
import Header from "../../components/Header/Header";
import { useAppSelector,} from "../../app/hooks";
import { selectProteinDetails } from "../../features/proteinData/proteinDetailsSlice";
import { NavLink, Outlet } from "react-router-dom";

const NotFoundPage = () => {
  const  proteinDetails = useAppSelector(selectProteinDetails);
  const proteinData = proteinDetails.data;
  return (
    <div className="proteinPage__wrapper">
      <Header />
      <div className="proteinPage">
        <div className="proteinPage__content">
          <div className="proteinPage__header">
            <h2>{proteinData?.primaryAccession} / {proteinData?.uniProtkbId}</h2>{" "}
            <span className="proteinPage__organism">{proteinData?.organism.scientificName}</span>
          </div>
          <div className="proteinPage__basic-info">
            <h4>Protein</h4>
            <div>{proteinData?.proteinDescription.recommendedName.fullName.value}</div>
            <h4>Gene</h4>
            <div>{proteinData?.genes[0].geneName.value}</div>
          </div>
          <nav className="proteinPage__navigation">
            <NavLink
              to={`/protein/${proteinDetails.id}/details`}
              className={({ isActive }) =>
                isActive ? "proteinPage__link--active" : "proteinPage__link "
              }
            >
              Details
            </NavLink>
            <NavLink
              to={`/protein/${proteinData?.primaryAccession}/feature-viewer`}
              className={({ isActive }) =>
                isActive ? "proteinPage__link--active" : "proteinPage__link "
              }
            >
             Feature viewer
            </NavLink>
            <NavLink
              to={`/protein/${proteinData?.primaryAccession}/publications`}
              className={({ isActive }) =>
                isActive ? "proteinPage__link--active" : "proteinPage__link "
              }
            >
              Publications
            </NavLink>
          </nav>

         
              <div className="proteinPage__details"><Outlet /></div>
         
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
