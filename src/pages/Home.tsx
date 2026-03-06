// import HeroSection from "../Components/home/HeroSection";
// import CategorySection from "../Components/home/CategorySection";
// import FeaturedAuctions from "../Components/home/FeaturedAuctions";
// import EndingSoon from "../Components/home/EndingSoon";
// import HowItWorks from "../Components/home/HowItWorks";

// export default function Home() {

//   return (
//     <div>

//       <HeroSection />

//       <CategorySection />

//       <FeaturedAuctions />

//       <EndingSoon />

//       <HowItWorks />

//     </div>
//   );
// }


import FeaturedAuctions from "../Components/home/FeaturedAuctions";
import CategorySection from "../Components/home/CategorySection";

export default function Home() {

  return (
    <>
      <CategorySection />
      <FeaturedAuctions />
    </>
  );
}