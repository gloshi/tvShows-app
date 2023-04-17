import React from 'react'

interface NavbarItemProps {
    label: string;
    active?: boolean;
  }

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {

  const scrollFn = () => {
    if(label === 'Избранное') {
      scrollTo(1400,1400)
    }
  }

  return (
    <div onClick={scrollFn} className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
    {label}
  </div>
  )
}

export default NavbarItem