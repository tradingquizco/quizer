import React from 'react'
import DesktopNavbar from './navbars/desktopNavbar'
import MobileNavbar from './navbars/mobileNavbar'

const Header = () => {
  return (
    <header className='w-full h-14 border-b-[1px] border-${#f5f5f5}'>
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  )
}

export default Header