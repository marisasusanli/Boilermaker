import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Puppies from './Puppies';
import Kittens from './Kittens';
import PageNotFound from './PageNotFound';

const Routes = () => {
  const page = 'page';
  return (
    <Router>
      <div>
        <nav className='nav'>
          <NavLink to='/' activeStyle={{ color: 'white' }}>
            Home
          </NavLink>
          <NavLink to='/puppies' activeStyle={{ color: 'white' }}>
            Puppies
          </NavLink>
          <NavLink to='/kittens' activeStyle={{ color: 'white' }}>
            Kittens
          </NavLink>
        </nav>
        <main>
          <h1>Welcome to Puppy and Kitten World</h1>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />

              <Route exact path='/puppies' component={Puppies} />
              <Route exact path='/kittens' component={Kittens} />

              <Route path='*' render={() => <PageNotFound page={page} />} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
