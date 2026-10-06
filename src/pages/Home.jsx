import Hero from '../components/home/Hero'
import {
  AboutIntro, CtaBanner, FeaturedProperties, PopularLocations, Testimonials, WhyChooseUs,
} from '../components/home/Sections'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <AboutIntro />
      <PopularLocations />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
