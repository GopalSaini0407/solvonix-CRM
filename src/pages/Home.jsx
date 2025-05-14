import React from 'react'
import { GiftIcon,UserGroupIcon,HandThumbUpIcon,BanknotesIcon,CalendarDaysIcon} from '@heroicons/react/24/outline'
const giftData=[
{
heading:"TOTAL DEAL",value:0,dealValue:0,titile:"Deals",
},
{
heading:"WAITING",value:0,dealValue:0,titile:"Deals",
},
{
heading:"SELF PAYMENT",value:0,dealValue:0,titile:"Deals",
},
{
heading:"LOAN APPLIED",value:0,dealValue:0,titile:"Deals",
},
{
heading:"PAYMENT DONE",value:0,dealValue:0,titile:"Deals",
},
{
heading:"BOOKING CANCEL",value:0,dealValue:0,titile:"Deals",
}
]
const groupData=[
{
heading:"All",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"APPLICATION RECEIVED",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"ELIGIBILITY APPROVED",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"ELIGIBILITY REJECTED",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"LIMIT APPROVED",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"LIMIT USED",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"LIMIT UNUSED (APPR..)",value:0,titile:"Leads",leadsValue:"0.00%",
},
{
heading:"LOAN REJECTED",value:0,titile:"Leads",leadsValue:"0.00%",
},
]
const okData=[
{
heading:"TOTAL LEADS",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
{
heading:"GOOGLE AD",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
{
heading:"FACEBOOK AD",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
{
heading:"OFFLINE",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
{
heading:"REFERENCE",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
{
heading:"ASSOCIATE",value:0,titile:"Leads",leadsValue:"0.00%",bookingValue:0,bookingTitle:"Booking",vertiLine:"|",visitValue:0,visitTitle:"Visits"
},
]
const paymentData=[
{
heading:"INCENTIVE PAYABLE",value:0,dealValue:0,titile:"Deals",
},
{
heading:"PAID",value:0,dealValue:0,titile:"Deals",
},
{
heading:"BALANCE",value:0,dealValue:0,titile:"Deals",
},
]
const calenderData=[
{
heading:"TODAY FOLLOW UP",value:0,
},
{
heading:"PENDING FOLLOW UP",value:0,
},
{
heading:"TODAY VISIT PLAN",value:0,
},
{
heading:"PENDING VISIT PLAN",value:0,
},
{
heading:"TODAY TASK",value:0,
},
{
heading:"PENDING TASK",value:0,
},
]
function Home() {
return (
<div className='home-pages container mx-auto'>
   <section className='home-section-one mt-3'>
      <div className="flex flex-col sm:flex-row mx-3 sm:mx-0 gap-5 sm:gap-0">
         <div className="gift-box sm:basis-1/10  sm:me-5 bg-white rounded shadow-2xl h-[102.5px] max-h-[102.5px]">
            <div className='bg-[#EF6D8D] w-[100%] sm:w-[100px] h-full flex justify-center items-center rounded-bl rounded-tl'>
               <GiftIcon className="size-15 text-white" />
            </div>
         </div>
         <div className='sm:basis-9/10'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
               {
               giftData.map((data,ind)=>(
               <ul class="bg-white shadow-2xl text-black py-3 relative rounded h-[102.5px]" key={ind}>
                  <li className='text-blue-700 px-3 text-[13px]'>{data.heading}</li>
                  <li className='font-bold px-3'>{data.value}</li>
                  <li className='bg-gray-700 h-[2px] my-1'>
                  </li>
                  <li className='px-3'>{data.dealValue} {data.titile}</li>
               </ul>
               ))
               }
            </div>
         </div>
      </div>
   </section>
   <section className='home-section-two mt-3'>
      <div className="flex flex-col sm:flex-row mx-3 sm:mx-0 gap-5 sm:gap-0">
         <div className="gift-box sm:basis-1/10  sm:me-5 bg-white rounded shadow-2xl h-[102.5px] max-h-[102.5px]">
            <div className='bg-[#EF6D8D] w-[100%] sm:w-[100px] h-full flex justify-center items-center rounded-bl rounded-tl'>
               <UserGroupIcon className="size-15 text-white" />
            </div>
         </div>
         <div className='sm:basis-9/10'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
               {
               groupData.map((data,ind)=>(
               <ul class="bg-white shadow-2xl text-black py-3 relative rounded h-[102.5px]" key={ind}>
                  <li className='text-blue-700 px-3 text-[13px]'>{data.heading}</li>
                  <li className='font-bold px-3'>{data.value} {data.titile}</li>
                  <li className='bg-gray-700 h-[2px] my-1'>
                  </li>
                  <li className='px-3'>{data.leadsValue}</li>
               </ul>
               ))
               }
            </div>
         </div>
      </div>
   </section>
   <section className='home-section-three mt-3'>
      <div className="flex flex-col sm:flex-row mx-3 sm:mx-0 gap-5 sm:gap-0">
         <div className="gift-box sm:basis-1/10  sm:me-5 bg-white rounded shadow-2xl h-[102.5px] max-h-[102.5px]">
            <div className='bg-[#EF6D8D] w-[100%] sm:w-[100px] h-full flex justify-center items-center rounded-bl rounded-tl'>
               <HandThumbUpIcon className="size-15 text-white" />
            </div>
         </div>
         <div className='sm:basis-9/10'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
               {
               okData.map((data,ind)=>(
               <ul class="bg-white shadow-2xl text-black py-3 relative rounded h-[102.5px]" key={ind}>
                  <li className='text-blue-700 px-3 text-[13px]'>{data.heading}</li>
                  <li className='font-bold px-3'>{data.value} {data.titile} {data.vertiLine} {data.leadsValue}</li>
                  <li className='bg-gray-700 h-[2px] my-1'>
                  </li>
                  <li className='px-3'>{data.bookingValue} {data.bookingTitle} {data.vertiLine} {data.visitValue} {data.visitTitle}</li>
               </ul>
               ))
               }
            </div>
         </div>
      </div>
   </section>
   <section className='home-section-four mt-3'>
      <div className="flex flex-col sm:flex-row mx-3 sm:mx-0 gap-5 sm:gap-0">
         <div className="gift-box sm:basis-1/10  sm:me-5 bg-white rounded shadow-2xl h-[102.5px] max-h-[102.5px]">
            <div className='bg-[#EF6D8D] w-[100%] sm:w-[100px] h-full flex justify-center items-center rounded-bl rounded-tl'>
               <BanknotesIcon className="size-15 text-white" />
            </div>
         </div>
         <div className='sm:basis-9/10'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
               {
               paymentData.map((data,ind)=>(
               <ul class="bg-white shadow-2xl text-black py-3 relative rounded" key={ind}>
                  <li className='text-blue-700 px-3 text-[13px]'>{data.heading}</li>
                  <li className='font-bold px-3'>{data.value}</li>
                  <li className='bg-gray-700 h-[2px] my-1'>
                  </li>
                  <li className='px-3'>{data.dealValue} {data.titile}</li>
               </ul>
               ))
               }
            </div>
         </div>
      </div>
   </section>
   <section className='home-section-five mt-3'>
      <div className="flex flex-col sm:flex-row mx-3 sm:mx-0 gap-5 sm:gap-0">
         <div className="gift-box sm:basis-1/10  sm:me-5 bg-white rounded shadow-2xl h-[102.5px] max-h-[102.5px]">
            <div className='bg-[#EF6D8D] w-[100%] sm:w-[100px] h-full flex justify-center items-center rounded-bl rounded-tl'>
               <CalendarDaysIcon className="size-15 text-white" />
            </div>
         </div>
         <div className='sm:basis-9/10'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
               {
               calenderData.map((data,ind)=>(
               <ul class="bg-white shadow-2xl text-black py-3 relative rounded h-[102.5px]" key={ind}>
                  <li className='text-blue-700 px-3 text-[13px]'>{data.heading}</li>
                  <li className='font-bold px-3'>{data.value}</li>
               </ul>
               ))
               }
            </div>
         </div>
      </div>
   </section>
</div>
)
}
export default Home
