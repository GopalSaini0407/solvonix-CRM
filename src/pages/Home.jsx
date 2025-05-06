import React from 'react'

function Home() {
  return (
    <div className='home-pages container mx-auto'>
        <section className='home-section-one mt-3'>
            <div className="flex">
                <div className="gift-box basis-1/6 me-5">
                <ul class="bg-white text-black p-3 relative rounded">
                    <li className='text-blue-700'>TOTAL DEAL</li>
                    <li className='pb-3 font-bold'>0</li>
                    <li>
                    <img src="./images/line.png" className='absolute top-[-30px] left-0' alt="img" />

                    </li>
                    <li>0 Deals</li>

                </ul>
                </div>
               <div className='basis-5/6'>
               <div className="grid grid-cols-5 gap-3">
                <ul class="bg-white text-black py-3 relative rounded">
                    <li className='text-blue-700 px-3'>TOTAL DEAL</li>
                    <li className='font-bold px-3'>0</li>
                    <li className='bg-black h-[5px] my-1'>
                    {/* <img src="./images/line.png" className='absolute top-[-35px] left-0' alt="img" /> */}

                    </li>
                    <li className='px-3'>0 Deals</li>

                </ul>
           
                </div>
               </div>
                
            </div>
        </section>
    </div>
  )
}

export default Home