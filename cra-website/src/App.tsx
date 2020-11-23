import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useRecoilState} from 'recoil'
import * as state from './state'
import {Product} from './types'
import './App.css';
import {API_BASEURL} from './constants'

interface Props {
  product: Product
  }

const Product:React.FC<Props>= ({product}) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.type}</td>
      <td>{product.name}</td>
      <td>{product.color}</td>
      <td>{product.price}</td>
      <td>{product.manufacturer}</td>
      <td>{product.availability}</td>
    </tr>
  )
}

function App() {

  const [jackets, setJackets] = useRecoilState<Product[]>(state.jackets)
  const [shirts, setShirts] = useRecoilState<Product[]>(state.shirts)
  const [accessories, setAccessories] = useRecoilState<Product[]>(state.accessories)


  useEffect(()=> {
    const fetchProducts = async() => {
      try {
        const jacketsResponse = await axios.get(`${API_BASEURL}/jackets`)
        const shirtsResponse = await axios.get(`${API_BASEURL}/shirts`)
        const accessoriesResponse = await axios.get(`${API_BASEURL}/accessories`)
        setJackets(jacketsResponse.data)
        setShirts(shirtsResponse.data)
        setAccessories(accessoriesResponse.data)
        setLoading(false)
      }catch(error) {
        console.log(error)
      }
    }
  })

  const jacketsList = () => {
    if (jackets.length!==0) {
    const rows = jackets.map(jacket => <Product product={jacket}/>)
    return (
      <table>
        <thead>
          <th>Id</th>
          <th>Type</th>
          <th>Name</th>
          <th>Color</th>
          <th>Price</th>
          <th>Manufacturer</th>
          <th>Availability</th>
          <tbody>
            {rows}
          </tbody>      
        </thead>
      </table>
    )}else {
      return 'loading...'
    }
  }


  return (
    <div className="App">
      <nav>
        <ul>
          <li>Jackets</li>
          <li>Shirts</li>
          <li>Accessories</li>
        </ul>
        {jacketsList}
      </nav>
    </div>
  );
  }


export default App;
