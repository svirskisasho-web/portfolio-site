import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { DemoApp } from './sections/demo/DemoApp'
import { CaseStudies } from './sections/CaseStudies'
import { Work } from './sections/Work'
import { Process } from './sections/Process'
import { Background } from './sections/Background'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <DemoApp />
        <Work />
        <CaseStudies />
        <Process />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
