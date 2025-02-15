import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { categories } from "./Category";
import { useEffect, useState } from "react";
const Categories = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(()=>{
    function widthSize(){
        setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize',widthSize)

    return ()=>{window.removeEventListener('resize',widthSize)}
  },[])
  return (
    <Swiper
      slidesPerView={windowSize < 992 ? 1 : 3}
      spaceBetween={30}
      freeMode={true}
      navigation={true}
      modules={[FreeMode, Pagination, Navigation]}
      className="mySwiper"
    >
      {categories.map((category, index) => (
        <SwiperSlide key={index}>
          <div className="category">
            <img src={category.image} alt={category.name} loading="lazy" />
            <p className="mt-3">{category.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Categories;
