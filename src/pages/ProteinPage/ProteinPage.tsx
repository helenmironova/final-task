import "./proteinPage.css";
import Header from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProteinDetails } from "../../features/proteinData/proteinDetailsSlice";
import { NavLink, Outlet } from "react-router-dom";
import { fetchProteinPublications } from "../../features/proteinData/proteinPublications";

const ProteinPage = () => {
  const dispatch = useAppDispatch();
  const proteinDetails = useAppSelector(selectProteinDetails);
  const proteinData = proteinDetails?.data;
  const entry = proteinData?.primaryAccession ? proteinData?.primaryAccession : "";
  return (
    <div className="proteinPage__wrapper">
      <Header />
      <div className="proteinPage">
       
        <div className="proteinPage__content">
        <NavLink to="/search" className="proteinPage__back">Back to search</NavLink>
          <div className="proteinPage__header">
            <h2>
              {proteinData?.primaryAccession} / {proteinData?.uniProtkbId}
            </h2>
            <span className="proteinPage__organism">
              {proteinData?.organism?.scientificName}
            </span>
          </div>
          <div className="proteinPage__basic-info">
            <h4>Protein</h4>
            <div>
              {
                proteinData?.proteinDescription?.recommendedName?.fullName
                  ?.value
              }
            </div>
            <h4>Gene</h4>
            <div>
              {proteinData?.genes ? proteinData?.genes[0].geneName?.value : ""}
            </div>
          </div>
          <nav className="proteinPage__navigation">
            <NavLink
              to={`/protein/${proteinDetails?.id}/details`}
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
            onClick={() => {
              dispatch(fetchProteinPublications({entry: entry})) }
          }
              to={`/protein/${proteinData?.primaryAccession}/publications`}
              className={({ isActive }) =>
                isActive ? "proteinPage__link--active" : "proteinPage__link "
              }
            >
              Publications
            </NavLink>
          </nav>

          <div className="proteinPage__details">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinPage;
