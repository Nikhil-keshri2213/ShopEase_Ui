import HeroSection from "./components/HeroSection/HeroSection.jsx";
import NewArrival from "./components/Sections/NewArrival.jsx";
import content from "./data/content.json";
import contentHome from "./data/homepage.json";
import Category from "./components/Sections/Category.jsx";
import ScatteredIcons from "./styles/ScatteredIcons.jsx";
import { useEffect } from "react";
import { fetchCategories } from "./api/fetchCategories.jsx";
import { useDispatch } from "react-redux";
import { loadCategories } from "./store/features/category.js";
import { setLoading } from "./store/features/common.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetchCategories()
      .then((res) => {
        dispatch(loadCategories(res));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);
  
  return (
    <>
      <HeroSection />

      <div
        className="text-gray-900 font-sans relative overflow-hidden"
        style={{
          background: `linear-gradient(60deg, #EAEAEA, #ced4da)`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}>
        
        {/* Scattered icons background layer */}
        <ScatteredIcons numIcons={30} />

        {/* Main content layer */}
        <div className="relative z-10">
          <section className="max-w-7xl mx-auto py-12 px-4">
            <NewArrival />
          </section>

          <section className="w-full mx-auto py-12 px-4">
            {contentHome?.pages?.shop?.sections?.map((item, index) => (
              <Category key={item?.title + index} {...item} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default App;