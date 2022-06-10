import axios from 'axios'
import { useEffect, useState, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/Home.module.css'
export default function Home() {
 const PageInfiniteScroll = () => {
 const PAGE_LIMIT = 20;
 const apiPath = 'https://gorest.co.in/public/v2/posts'
 const [products, setProducts] = useState([])
 //const [totleCount, setTotleCount] = useState()
 const [curData, setCurData] = useState(0)
 const [error, setError] = useState(false)
 const getProductList = () => {
   let pageNo = Math.ceil(products.length / PAGE_LIMIT) + 1;
   const queryParam = "?page=" + pageNo + "&limit=" + PAGE_LIMIT
   const finalUrl = apiPath + queryParam
   axios.get(finalUrl)
   .then((res) => {
     const apiRes = res?.data;
     const margeData = [...products, ...apiRes]
     setProducts(margeData)
     //console.log("update data", apiRes)
     if(apiRes.length == 0){
      //console.log("array is null");
      setCurData(1)
     }
   })
   .catch((error) => {
    setError(error.message)
   }) 
 }
 useEffect(() => {
    getProductList()
 }, [])
//console.log(totleCount);
 const fetchMoreData = () => {
  if(curData !== 1){
    getProductList()
  }
 }
 if(error){
  return(<div class="">Error</div>)
  }
    return(
      <Fragment>
         <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={curData !== 1}
          loader={<h4>Loading...</h4>}
        >
          <div className={styles.allPostItem}>
          {
             products && products.length > 0 && products.map((item, ind) => (
              <div className={styles.postItem} key={ind}>
                <h4>{item.id} {item.name}</h4>
                <h4>{item.body}</h4>
              </div>
             ))
           }
           </div>
           <div className={styles.endStyle}>End of post.....</div>
        </InfiniteScroll>
      </Fragment>
    )
  }
  return (
    <div className={styles.container}>
      <PageInfiniteScroll />
    </div>
  )
}
