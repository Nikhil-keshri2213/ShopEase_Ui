import React,{useCallback} from 'react'
import GoogleLogo from '../../assets/img/Google.png'
import { API_BASE_URL } from '../../api/constant'
export const GoogleSignIn = () => {

  const handleClick = useCallback(() => {
    window.location.href = API_BASE_URL+"/oauth2/authorization/google"
  },[])


  return (
    <button onClick={handleClick} className='flex justify-center items-center border w-full rounded-2xl border-gray-500 h-[48px] text-gray-500 hover:bg-black hover:text-white/70'>
        <img src={GoogleLogo} alt="" />
        <p className='px-2 '>Continue with Google</p>
    </button>
  )
}
