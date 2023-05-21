import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, ActivitiesDetail, CountryDetail, About } from './views/index';
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      
      <Route exact path="/" component={Landing} />
      <Route exact path="/activites" component={ActivitiesDetail} />
      <Route exact path="/detail/:id" component={CountryDetail} />
      <Route exact path="/about" component={About} />
      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
