import React from 'react';
import { Route, Switch} from "react-router-dom";
import useFetch from '../hooks/useFetch'
import {API_BASEURL} from '../constants'
import ProductPage from './ProductPage/'
import NavBar from './NavBar'
import HomePage from './Home/HomePage'
import GlobalStyle from './GlobalStyle'

function App() {

    const jackets = useFetch(`${API_BASEURL}/jackets`)
    const shirts = useFetch(`${API_BASEURL}/shirts`)
    const accessories = useFetch(`${API_BASEURL}/accessories`)
  
  return (
    <div className='App'>
      <GlobalStyle/>
      <NavBar/>
      <main>
      <Switch>
        <Route path='/jackets'>
        <ProductPage content={jackets} category='jackets'/>
        </Route>
        <Route path='/shirts'>
        <ProductPage content={shirts} category='shirts'/>
        </Route>
        <Route path='/accessories'>
        <ProductPage content={accessories} category='accessories'/>
        </Route>
        <Route path='/'>
        <HomePage jackets={jackets} shirts={shirts} accessories={accessories}/>
        </Route>
      </Switch>
      </main>
    </div>
  );
  }


export default App;
