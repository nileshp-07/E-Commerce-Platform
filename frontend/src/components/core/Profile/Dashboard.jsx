import React from 'react'
import truckImage from "../../../assets/icon-truck.png"
import cartImage from "../../../assets/icon-cart.png"
import bagImage from "../../../assets/icon-shopping-bag.png"
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group E', value: 278 },
  { label: 'Group F', value: 189 },
];

const Dashboard = () => {
  return (
    <div className='my-10'>
       <h2 className='text-2xl font-semibold'>Dashboard</h2>

       <div className='mt-8'>
          <h2 className='text-xl font-medium'>Total Revenue</h2>
          <p className='text-2xl text-[#037957] font-bold'>Rs. 5728392</p>

          <div className='flex gap-5 mt-7'>
              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#6BAAFC,#305FEC)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>Delivered Orders</p>
                  <img
                    src={truckImage}
                    className='h-[100px] object-cover -rotate-45 absolute bottom-0 opacity-10 overflow-hidden'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>45</p>
              </div>

              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#EF5E7A,#D35385)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>Shipped Orders</p>
                  <img
                    src={cartImage}
                    className='h-[100px] object-cover -rotate-45 absolute  -bottom-5 opacity-10'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>36</p>
              </div>

              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#D623FE,#A530F2)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>New Orders</p>
                  <img
                    src={bagImage}
                    className='h-[100px] object-cover rotate-45 absolute  bottom-0 opacity-10'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>51</p>
              </div>
          </div>

          <div className='mt-20'>
            <p className='text-2xl font-semibold'>Products Revenue</p>
            <p className=' mb-10 text-[18px]'>revenue from the top 10 highest-earning products</p>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={500}
            />
          </div>
       </div>
    </div>
  )
}

export default Dashboard