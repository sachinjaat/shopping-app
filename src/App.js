import Home from './Home';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { useEffect } from 'react';

function App() {

  const [{ user }, dispatch] = useStateValue();

  //if u use a return in your useEffect then the result of that wiil run 
  //when the component is unmounted
  useEffect(() => {
    //listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
          dispatch({
            type: 'SET_USER',
            user: authUser
          });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });

    console.log(user);

    return () => {
      //Any cleanup operation goes here
      unsubscribe();
    }

  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
