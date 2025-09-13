

const EmptyChatContainer = () => {
  return (
    <div className="hidden xs:bg-[#1c1d25] xs:flex xs:flex-1  xs:flex-col justify-center items-center duration-1000 transition-all">
      {/* EmptyChatContainer */}

      {/*  */}

      <div className="text-white text-3xl flex flex-col gap-5 items-center justify-center mt-10 lg:text-4xl transition-all duration-200 text-center ">

         <h2 className="poppins-extralight">
            Hi<span className="text-red-600">!</span> Welcome to <span className="text-red-600"> Sync</span> Talk  <span className="text-red-600"> .</span>
         </h2>
      </div>

    </div>
  )
}

export default EmptyChatContainer