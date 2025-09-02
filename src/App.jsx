import HeroSection from "./components/HeroSection/HeroSection"
import NewArrival from "./components/Sections/NewArrival"
import content from "./data/content.json"
import Category from "./components/Sections/Category"
import { useEffect } from "react"
import { fetchCategories } from "./api/fetchCategories"
import { useDispatch } from "react-redux"
import { loadCategories } from "./store/features/category"
import { setLoading } from "./store/features/common"

function App() {

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setLoading(true));
    fetchCategories().then(res =>{
      dispatch(loadCategories(res));
    }).catch(err =>{

    }).finally(()=>{
      dispatch(setLoading(false));
    })
  },[dispatch]);

  return (
    <>
      <HeroSection/>
      <NewArrival/>
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title+index} {...item} />)}
    </>
  )
}

export default App