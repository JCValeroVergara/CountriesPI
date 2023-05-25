import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Landing, Home, ActivitiesDetail, CountryDetail, About, ActivitiesList, ActivityDelete, NotFound } from './views/index';
import NavBar from './components/NavBar/NavBar';



function App() {
   const location = useLocation();

   return (
   <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <div className="content-container">
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create" component={ActivitiesDetail} />
            <Route exact path="/list" component={ActivitiesList} />
            <Route exact path="/delete" component={ActivityDelete} />
            <Route exact path="/detail/:id" component={CountryDetail} />
            <Route exact path="/about" component={About} />
            <Route path="/home" render={() => <Home />} />
            <Route component={NotFound} />
         </Switch>
      </div>
   </div>
   );
}

export default App;
