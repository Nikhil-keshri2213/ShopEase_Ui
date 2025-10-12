import HeroSection from "./components/HeroSection/HeroSection";
import NewArrival from "./components/Sections/NewArrival";
import content from "./data/content.json";
import Category from "./components/Sections/Category";
import ScatteredIcons from "./styles/ScatteredIcons";
import { useEffect } from "react";
import { fetchCategories } from "./api/fetchCategories";
import { useDispatch } from "react-redux";
import { loadCategories } from "./store/features/category";
import { setLoading } from "./store/features/common";

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
          background: `linear-gradient(60deg, #D2C598, #807049)`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}>
        
        {/* Scattered icons background layer */}
        <ScatteredIcons numIcons={25} />

        {/* Main content layer */}
        <div className="relative z-10">
          <section className="max-w-7xl mx-auto py-12 px-4">
            <NewArrival />
          </section>

          <section className="max-w-7xl mx-auto py-12 px-4">
            {content?.pages?.shop?.sections?.map((item, index) => (
              <Category key={item?.title + index} {...item} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default App;