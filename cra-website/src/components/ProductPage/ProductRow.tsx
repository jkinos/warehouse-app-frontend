import React from 'react'
import {Product} from '../../types'
import styled from 'styled-components'
import {capitalize} from '../../utils'
import {AiFillCheckCircle, AiFillCloseCircle,AiFillExclamationCircle} from 'react-icons/ai'

const Availability = styled.div`
white-space: nowrap;
&.instock {
    span {
        color: #00E676;
    }
}
&.lessThan10 {
    span {
        color: #FDD835
    }
}
&.outofstock {
    span {
          color: #FF1744;
    }
}
`
interface ProductRowProps {
    product: Product
}
const ProductRow:React.FC<ProductRowProps>= ({product}) => {

const availability = (availability:string) => {
    switch(availability){
        case('INSTOCK'):
            return (
            <Availability className='instock'>
                <span><AiFillCheckCircle/></span> {availability}
                </Availability>)
                case('LESSTHAN10'):
                return(
                <Availability className='lessThan10'>
                    <span ><AiFillExclamationCircle/></span> {availability}
                    </Availability>)
                    case('OUTOFSTOCK'):
                    return(
                    <Availability className='outofstock'>
                        <span ><AiFillCloseCircle/></span> {availability}
                        </Availability>
            )
            default: return availability
        }
    }

    return (
      <tr>
        <td className='type'> {capitalize(product.type)} </td>
        <td className='name'> {product.name} </td>
        <td className='id'> {product.id} </td>
        <td className='manufacturer'> {capitalize(product.manufacturer)} </td>
        <td className='color'> {product.color.join(', ')} </td>
        <td className='price'> {product.price} </td>
        <td className='availability'> {availability(product.availability)} </td>
      </tr>
    )
  }

  export default ProductRow