import HeroSection from "./components/HeroSection/HeroSection"
import NewArrival from "./components/Sections/NewArrival"
import content from "./data/content.json"
import Category from "./components/Sections/Category"

function App() {
  return (
    <>
      <HeroSection/>
      <NewArrival/>
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title+index} {...item} />)}
    </>
  )
}

export default App