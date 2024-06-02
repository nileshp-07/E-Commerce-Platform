import React, {useEffect, useState} from 'react'
import truckImage from "../../../assets/icon-truck.png"
import cartImage from "../../../assets/icon-cart.png"
import bagImage from "../../../assets/icon-shopping-bag.png"
import { PieChart } from '@mui/x-charts/PieChart';
import { getSellerDashboardData } from '../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const {token} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
      const response = await getSellerDashboardData(token);

      if(response){
        setData(response?.productsRevenue);
        setOrdersDetails(response?.orderDetails);
        setTotalRevenue(response?.totalRevenue);
      }
  }
  useEffect(() => {
     getDashboardData();
  }, [])

  if(loading){
     return (
      <div className='w-full h-[calc(100vh-3.5rem)] grid place-items-center'>
         <div className='spinner'></div>
      </div>
     )
  }
  return (
    <div className='my-10'>
       <h2 className='md:text-2xl text-xl font-semibold'>Dashboard</h2>

       <div className='mt-8'>
          <h2 className='text-xl font-medium'>Total Revenue</h2>
          <p className='text-2xl text-[#037957] font-bold'>Rs. {totalRevenue}</p>

          <div className='flex flex-col md:flex-row gap-5 mt-7'>
              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#6BAAFC,#305FEC)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>Orders Delivered </p>
                  <img
                    src={truckImage}
                    className='h-[100px] object-cover -rotate-45 absolute bottom-2 opacity-10 overflow-hidden'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>{ordersDetails?.orderDelivered}</p>
              </div>

              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#EF5E7A,#D35385)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>Orders Shipped</p>
                  <img
                    src={cartImage}
                    className='h-[100px] object-cover -rotate-45 absolute  -bottom-2 opacity-10'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>{ordersDetails?.orderShipped}</p>
              </div>

              <div className='relative h-[160px] w-[350px] rounded-md bg-[linear-gradient(to_right,#D623FE,#A530F2)]  overflow-hidden'>
                  <p className='text-[22px] font-semibold text-white absolute top-5 left-8'>New Orders</p>
                  <img
                    src={bagImage}
                    className='h-[90px] object-cover rotate-45 absolute left-2 bottom-2 opacity-10'
                  />
                  <p className='absolute right-5 bottom-5 text-6xl text-white font-bold'>{ordersDetails?.newOrders}</p>
              </div>
          </div>

          <div className='mt-20 hidden md:block' >
            <p className='text-2xl font-semibold'>Products Revenue</p>
            <p className=' mb-10 text-[18px]'>revenue from the top 10 highest-earning products</p>
            <div className='lg:block hidden'>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    cx: 235,
                  },
                ]}
                height={500}
              />
            </div>
            <div className='lg:hidden block overflow-hidden'>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    cx: 200,
                  },
                ]}
                height={350}
                width={850}

                
              />
            </div>
          </div>
       </div>
    </div>
  )
}

export default Dashboard