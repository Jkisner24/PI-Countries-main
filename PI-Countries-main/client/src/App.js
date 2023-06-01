import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import CountryDetail from './Components/CountryDetail/CountryDetail';

function App() {
  return (
      <div className="App">
          <Route exact path= "/" component = {LandingPage}/>
          <Route path= "/home" component = {Home}/>
          <Route path= "/activities" component= {CreateActivity}/>
          <Route path= "/countries/:id" component= {CountryDetail}/>
     </div>

  );
}

export default App;
