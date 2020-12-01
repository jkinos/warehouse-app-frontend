import React, { useEffect, useState, useRef  } from 'react';
import {Product} from '../../types'
import ProductRow from './ProductRow'

interface Props {
    data: Product[] | undefined
}
const InfiniteScroll:React.FC<Props> = ({data}) => {
    const [dataList, setDatalist] = useState<Product[]>([])
    const itemsOnPage = 20
    const [rows, setRows] = useState(dataList.slice(0, itemsOnPage))
    const [count, setCount] = useState({
        prev: itemsOnPage,
        next: itemsOnPage + itemsOnPage
    })
    const [page, setPage] = useState(1);
    const loader: any= useRef(null);

    useEffect(() => {
        if(data) {
            setDatalist(data)
            setRows(dataList.slice(0, itemsOnPage))
            setCount({
                prev: itemsOnPage,
                next: itemsOnPage + itemsOnPage
            })
        }
    },[data, dataList])

    useEffect(() => {
         var options = {
            root: document.querySelector('.infiniteScrollRoot'),
            rootMargin: undefined,
            threshold: 0.1
         };
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }
    }, []);


    useEffect(() => {
        if(data) {
        const newRows = rows?.concat(dataList.slice(count.prev, count.next));
        setCount({prev: count.prev + itemsOnPage, next: count.next + itemsOnPage})
        setRows(newRows)
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const handleObserver = (entities: any) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }

    return (
            <>
                {
                rows.map((product) =>
                    <ProductRow key={product.id} product={product}/>)
                }
            <tr className="loading" ref={loader}></tr>
        </>
    )
}

export default InfiniteScroll;