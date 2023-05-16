import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Form, Detail, About } from './views/index'
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <h1>Henry Countries</h1>
      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/about" component={About} />
      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
