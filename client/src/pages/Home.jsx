// import React from 'react'
// import Navbar from '../components/Navbar'
// import Header from '../components/Header'
// import '/src/assets/bg_img.png'

// const Home = () => {
//   return (
//     <div className="flex flex-col  items-center justify-center bg-[url('/bg_img.png')] min-h-screen bg-cover bg-center">
//        <Navbar />
//        <Header />
//     </div>
//   )
// }

// export default Home

import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import bgImg from '../assets/bg_img.png' // Proper import

const Home = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }} // Use inline style
    >
       <Navbar />
       <Header />
    </div>
  )
}

export default Home