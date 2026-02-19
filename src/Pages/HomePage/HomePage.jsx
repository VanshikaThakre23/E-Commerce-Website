import React from 'react'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import HomeCategorySlider from '../../components/HomeCategorySlider/HomeCategorySlider'
import Banner from '../../components/Banner/Banner'

import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductSlider from '../../components/ProductSlider/ProductSlider';


const HomePage = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const tabsList = [
    { id: 1, title: "Fashion" },
    { id: 2, title: "Appliances" },
    { id: 3, title: "Bags" },
    { id: 4, title: "Footwear" },
    { id: 5, title: "Groceries" },
    { id: 6, title: "Beauty" },
    { id: 7, title: "Wellness" },
    { id: 8, title: "Jewellary" },
  ]

  return (
    <>
      <HomeSlider />
      <HomeCategorySlider />
      {/* <Banner/> */}

      <section className='bg-white py-5 '>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            <div className="leftSec w-[30%]">
              <h3 className='text-[22px] font-semibold'> Popular Products</h3>
              <p className='text-[12px] font-semibold'>Do not miss the current offers until the end of March</p>

            </div>

            <div className="rightSec w-[70%] bg-amber-200">

              <Box
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  bgcolor: 'background.paper',
                }}
              >
                <Tabs

                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"

                >
                  {
                    tabsList.map((item) => (
                      <Tab key={item.id} label={item.title} />
                    ))
                  }

                </Tabs>
              </Box>

            </div>


          </div>

          <ProductSlider items={5}/>

        </div>

      </section>


    </>
  )
}

export default HomePage
