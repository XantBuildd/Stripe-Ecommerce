import Hero from "../components/Hero.jsx";
import Services from "../components/Services";
import Categories from "../components/Categories";
import NewReleases from "../components/NewReleases";
import CustomProductBanner from "../components/CustomProductBanner.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Categories />
      <NewReleases />
      <CustomProductBanner />
    </>
  );
};

export default Home;
