import React, { useState } from "react"
import { Product } from '../../types'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductRow from './ProductRow'

interface ScrollerProps {
    data: Product[] | []
}
const InfiniteScroller: React.FC<ScrollerProps> = ({data}) => {
    const [count, setCount] = useState({
        prev: 0,
        next: 100
    })
    console.log(count)
    console.log(data.length)

    const [hasMore, setHasMore] = useState(true)
    const [current, setCurrent] = useState(data.slice(count.prev, count.next))
console.log('current', current)
    const getMoreData = () => {
        if (current.length === data.length) {
            setHasMore(false)
            return
        }
        setTimeout(() => {
            console.log("i'm i doing anything?")
            setCurrent(current.concat(data.slice(count.prev +100, count.next + 100)))
        },2000)
        setCount((prevState) => ({ prev: prevState.prev + 100, next: prevState.next + 100}))
    }
    return (
        
        <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<tr>Loading...</tr>}
        endMessage={
            <tr style={{ textAlign: 'center' }}>
              <td>Yay! You have seen it all</td>
            </tr>
          }
        >
            {current && current.map((product) => 
            <ProductRow key={product.id} product={product}/>)}
    </InfiniteScroll>
    )

}
export default InfiniteScroller