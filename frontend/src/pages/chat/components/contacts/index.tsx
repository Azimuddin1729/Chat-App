const ContactsContainer = () => {
  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#090a16] border-r-3 border-[#011d39] ">

      <Logo/>

      <div className="my-5">
        <div className="flex items-center justify-center pr-10">
           <Title text="Direct Messages"/>
        </div>
      </div>
      
      <div className="my-5">
        <div className="flex items-center justify-center pr-10">
           <Title text="Channels"/>
        </div>
      </div>
    
    </div>
  )
}

export default ContactsContainer

const Logo=()=>{

  return (
    <div className="flex justify-start items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="360" height="120" viewBox="0 0 360 120" fill="none">
          {/* <!-- Background --> */}
          <rect width="360" height="120" rx="16" fill="#0f172a"/>

          {/* <!-- Orbiting Sync Orbs (left) --> */}
          <g transform="translate(60,60)">
            <circle r="8" fill="#ffffff" opacity="0.95"/>
            <circle r="20" fill="none" stroke="#334155" stroke-width="1.5"/>
            <circle cx="0" cy="-36" r="3.8" fill="#7c3aed">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="-26" cy="20" r="3.2" fill="#06b6d4">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="28" cy="18" r="3.4" fill="#ef4444">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="7s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* <!-- SyncTalk text (right) --> */}
          <text x="130" y="68" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="42" font-weight="600" fill="url(#grad)">
            SyncTalk
          </text>

          {/* <!-- gradient for text --> */}
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#6366f1"/>
              <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
          </defs>
        </svg>
     </div>
  )
}


const Title=({text}:{text:string})=>{
    return (
    <h6 className="uppercase tracking-widest text-neutral-400 font-light text-sm">
      {text}
    </h6>
    )
}

