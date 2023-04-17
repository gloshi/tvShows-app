import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "./navbaritem";
import {BsChevronDown,BsSearch,BsBell} from 'react-icons/bs'
import MobileMenu from "./mobilemenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;


const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBg, setShowBg]= useState(false)
    const toggleMenu = useCallback(() => {
        setShowMenu((current) => !current)
    },[])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    },[])

    useEffect(()=> {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBg(true)
            }else {
                setShowBg(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBg ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
      <img src="/images/logoTv1.svg" className="h-20 lg:h-40" alt="Logo" />
      <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="На главную" active />
          <NavbarItem label="Сериалы" />
          <NavbarItem label="Фильмы" />
          <NavbarItem label="Новое и популярное" />
          <NavbarItem  label="Избранное" />
        </div>
        <div  className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
        <BsChevronDown onClick={toggleMenu} className={`w-4 text-white fill-white transition ${showMenu ? 'rotate-180' : 'rotate-0'}`}  />
        <MobileMenu  visible={showMenu}/>
        </div>
        <div className="flex flex-row ml-auto gap-10 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-10 h-10" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-10 h-10" />
          </div>
          <div  className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/user1.png" alt="user" />
            </div>
            <BsChevronDown onClick={toggleAccountMenu} className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
