import HeroSection from "../Components/home/HeroSection";
import CategorySection from "../Components/home/CategorySection";
import FeaturedAuctions from "../Components/home/FeaturedAuctions";
import EndingSoon from "../Components/home/EndingSoon";
import Navbar from "../Components/layout/Navbar";
// import HowItWorks from "../Components/home/HowItWorks";

export default function Home() {

  return (
    <div>
      <Navbar/>

      <HeroSection />

      <CategorySection />

      <FeaturedAuctions />

      <EndingSoon />

      {/* <HowItWorks /> */}

    </div>
  );
}
