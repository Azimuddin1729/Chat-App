import {RiCloseFill} from "react-icons/ri"
const Header = () => {
  return (
    <div className="h-[10vh] border-b-3 border-[#353855] flex items-center justify-center px-20 "
    >
      <div className="flex gap-5 items-center ">

         <div className="gap-5  flex items-center">
         </div>

         <div className="flex gap-3 items-center justify-center">
            <button className="text-neutral-500 focus:outline-none focus:border-none
            hover:text-white duration-300 transition-all cursor-pointer">
                <RiCloseFill className="text-3xl"/>
            </button>
         </div>

      </div>

    </div>
  )
}

export default Header