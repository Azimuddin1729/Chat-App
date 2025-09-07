import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors= 
[
 "bg-amber-300 text-red-900 border-[1px] border-red-600",
 "bg-emerald-600 text-yellow-400 border-[1px] border-amber-600",
 "bg-fuchsia-950 text-lime-500 border-[1px] border-red-600"
]


// uppercase h-32 w-40 md:w-48 md:h-48 text-5xl border-[1px] border-red-600
//                    flex items-center justify-center rounded-full 
//                    bg-amber-300 text-red-900 


// uppercase h-32 w-40 md:w-48 md:h-48 text-5xl border-[1px] border-amber-600
//                    flex items-center justify-center rounded-full 
//                    bg-emerald-600
//                    text-yellow-400

// uppercase h-32 w-40 md:w-48 md:h-48 text-5xl border-[1px] border-red-600
//                    flex items-center justify-center rounded-full 
//                    bg-fuchsia-950 text-lime-500


export function getColor(color:number|undefined){
  if(color===undefined){
     return colors[0];
  }
  else{
   if(color>=0&&color<colors.length){
    return colors[color];
   }
  }
  return colors[0];
}