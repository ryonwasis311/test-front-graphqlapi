import Image from "next/image";
import UserUpdate from "../ModalSetting/UserUpdate";
import { useState } from "react";
import { IUser } from "../../types";
import { toastNotification } from "../ToastNTF";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../GraphQLQperation/mutation";
import { GET_ALL_USERS } from "../../GraphQLQperation/queries";
import { Router, useRouter } from "next/router";
export interface CardProps {
  index : any,
  user : IUser,
}

export const Card = (props:CardProps) => {
  const router = useRouter()
  const { user } = props;
  const [isSetting , setIsSetting] = useState<boolean>(false);
  const [ isVisiuable, setVisiuable] =useState(true)
  const closeModalSetting = () => {
    setIsSetting(false);
  }
  const openModalSetting = () =>{
    setIsSetting(true);
  }
  
  const [ deleteUser, { data, loading , error} ] = useMutation
  (DELETE_USER, {
    onCompleted(){
      toastNotification("Deleted User Successfully! " , "success", 4000);
    },
    onError()
      {
      toastNotification("Deleted Failed !" ,"error", 4000);
      }  })

  const handleDelete = () =>{
    deleteUser({
      variables:{
        deleteUserId  :user.id,
      },
      refetchQueries: [GET_ALL_USERS, "Users"]
    });
    router.push("/")
  }
  return (
    <>
        {/* user information */}
        <div className={`pb-3 sm:pb-4 pt-4 px-10 ${isVisiuable ? '':'hidden'}`}>
          <div className="flex items-center space-x-4">
            <div
            onClick={openModalSetting}
            className="flex-shrink-0 cursor-pointer
            ">
              <Image
                width={500}
                height={500}
                className="w-8 h-8 rounded-full"
                src="/static/images/user/post_member.png"
                alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0 cursor-pointer">
              <p 
              
              className={`text-sm font-medium  text-white truncate `}>
                {user?.name}
              </p>
              <p className="text-sm font-[400] text-[#6C6C6C] truncate dark:text-gray-400">
              {user?.email}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 max-sm:hidden dark:text-white">
              ABOUT ME
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <button
                className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[77px] lg:w-[70px] sm:w-[70px] w-[50px] 2xl:h-[40px] lg:h-[40px] sm:h-[40px] h-[30px]  items-center flex lg:justify-center sm:justify-around button-effect px-2
                bg-[#272727] opacity-100
                 `}
                 onClick={handleDelete}
              >
                <p
                  className={`lg:text-[10px] 2xl:text-[10px] sm:text-[6px] text-[8px] lg:tracking-[0.5px] sm:tracking-[3px]   font-semibold font-Inter  text-whitetext-opacity-100  `}
                >
                  DELETE
                </p>
              </button>
            </div>
          </div>
          <UserUpdate
            user={user}
            show={isSetting}
            onCloseModalSetting={closeModalSetting}
          />
        </div>

    </>
  )
}