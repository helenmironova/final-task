import {useDispatch, useSelector } from 'react-redux';
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader';
import './ProteinPage.css';
import { useEffect, useRef, useState } from 'react';
import BasicData from '../../components/ProteinPageComponents/BasicData/BasicData';
import Paths from '../../components/ProteinPageComponents/Paths/Paths';
import DetailsTab from '../../components/ProteinPageComponents/DetailsTab/DetailsTab';
import PublicationsTab from '../../components/ProteinPageComponents/PublicationsTab/PublicationsTab';
import { useNavigate } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setNewSelectedProteinName, fetchProteinReferencesData, fetchProteinData } from '../../store/selectedProtein';
import ProtvistaUniprot from 'protvista-uniprot'

window.customElements.define("protvista-uniprot", ProtvistaUniprot);

const ProteinPage = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const initialRender = useRef(true);
    const navigate = useNavigate();

    /*
      current selected protein:
      on default is first element of the fetched items array 
      (becouse fetching is assyncronus, for some miliseconds displays default value and then changes);
    */
    const protein = useSelector((state: any) => state.selectedProtein);
    //determines which tab is opened;
    const [tab, setTab] = useState('details'); //details || feature || publications

    const setParams = (arg: string) => {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        params.set('protein', arg);
        window.history.replaceState({}, '', `${currentUrl.pathname}?${params}`);
    }  

    //checks if api has information about given protein;
    const isValid = (testProtein: string) => {
        return fetch(`https://rest.uniprot.org/uniprotkb/${testProtein}`)
          .then(response => response.json())
          .then(data => {
            if (data.messages) {
              return false;
            } else {
              return true;
            }
          })
          .catch(() => false);
    };


    /*
        on first render does the following:
        checks if query has parameter 'protein'
        ->
        if yes: checks if it is valid protein name
            ->
            if yes: sets selectedProtein name to this parameter, fetches this protein data;
            if no: navigates to '/not-found';
        if no: sets query parameter to protain name stored in redux;
    */
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        const searchParams = new URLSearchParams(document.location.search);
        if(searchParams.has("protein")){
            isValid(searchParams.get("protein") as string)
            .then(valid => {
                if (valid) {
                 console.log("Query is valid");
                    dispatch(setNewSelectedProteinName(searchParams.get("protein") as string));
                    dispatch(fetchProteinReferencesData(searchParams.get("protein") as string));
                    dispatch(fetchProteinData(searchParams.get("protein") as string));
                } else {
                 console.log("Sorry, not a valid query");
                    navigate('/not-found');
                }
            })
            .catch(error => {
                console.log("Error occurred during query validation:", error);
            });
        }else{
            setParams(protein.name)
        }
    }, []);

  return (
    <div className='body'>
      <>
        <HomePageHeader />
        <div className='proteinDataWrapper'>
          <BasicData protein={protein?.protein} />
          <Paths tab={tab} setTab={setTab} />
          {/* Render content based on the selected tab */}
          <div className='content'>
            {tab === 'details' && <DetailsTab />}
            {tab === 'feature' && 
              <div className='protvistaWrapper'>
                <protvista-uniprot accession={protein?.name} />
              </div>}
            {tab === 'publications' && <PublicationsTab />}
          </div>
        </div>
      </>
    </div>
  );
};

export default ProteinPage;
