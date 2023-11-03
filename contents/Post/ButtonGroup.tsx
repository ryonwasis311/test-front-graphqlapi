import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import UserCreate from "../../components/ModalSetting/UserCreate";
import { useRouter } from "next/router";

export const ButtonGroup = () => {
  const [isSetting , setIsSetting] = useState<boolean>(false);
  const closeModalSetting = () => {
    setIsSetting(false);
  }
  const openModalSetting = () =>{
    setIsSetting(true);
  }
  const router = useRouter()
  const dispatch =useDispatch();
  const [activeBtn, setActiveBtn] = useState<string>("Posts");
  const [isdisabled, SetIsdisabled] = useState<boolean>(false);
  const handleDashboard = () =>{
    router.push("/dashboard")
   }
   const handleLogOut = () =>{
    router.push("/auth/signup");
  }  
 
  return (
    <>
      <div className="w-full h-full relative lg:mt-10 mt-16">
        <div className="lg:mt-5 mt-0 h-fit">
          {/* Button_Group */}
          <div className="lg:flex-col lg:gap-6 flex justify-center sm:gap-10 gap-5 lg:mb-8 sm:mb-10 mb-5">
            <button
              className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[97px] lg:w-[90px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-center sm:justify-around button-effect px-2 ${activeBtn.toLowerCase() === "posts"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }
               
                `}
                onClick={openModalSetting}
            >
              <p
                className={`lg:text-[16px] 2xl:text-[18px] sm:text-[17px] text-[10px] lg:tracking-[0.5px] sm:tracking-[3px]   font-semibold font-Inter  text-white ${isdisabled ? `text-opacity-40` : `text-opacity-100`
                  }`}
              >
                Create
              </p>
            </button>
            <UserCreate
            show={isSetting}
            onCloseModalSetting={closeModalSetting}
          />
            <button
              className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[127px] lg:w-[110px] sm:w-[120px] w-[100px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-center sm:justify-around button-effect px-2 ${activeBtn.toLowerCase() === "posts"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }
               
                `}
                onClick={handleDashboard}
            >
              <p
                className={`lg:text-[14px] 2xl:text-[16px] sm:text-[17px] text-[10px] lg:tracking-[0.5px] sm:tracking-[3px]   font-semibold font-Inter  text-white ${isdisabled ? `text-opacity-40` : `text-opacity-100`
                  }`}
              >
                Dashboard
              </p>
            </button>
            <button
              className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[127px] lg:w-[110px] sm:w-[120px] w-[100px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-center sm:justify-around button-effect px-2 ${activeBtn.toLowerCase() === "posts"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }
               
                `}
                onClick={handleLogOut}
            >
              <p
                className={`lg:text-[16px] 2xl:text-[18px] sm:text-[17px] text-[10px] lg:tracking-[0.5px]    font-semibold font-Inter  text-white ${isdisabled ? `text-opacity-40` : `text-opacity-100`
                  }`}
              >
                Log Out
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
