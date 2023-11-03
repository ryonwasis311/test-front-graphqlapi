import Image from "next/image";
import UserUpdate from "../ModalSetting/UserUpdate";
import { useState } from "react";
import { IUser } from "../../types";
import { userService } from "../../services";
import { toastNotification } from "../ToastNTF";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import { deleteUserGroup } from "../../store/userGroup";
import { actDestroy } from "antd/es/message";
export interface CardProps {
  index : any,
  user : IUser,
}

export const Card = (props:CardProps) => {
  
  const dispatch = useDispatch();
  const { user } = props;
  const adminUser = useSelector(selectUser);
  const [isSetting , setIsSetting] = useState<boolean>(false);
  const [ isVisiuable, setVisiuable] =useState(true)
  const closeModalSetting = () => {
    setIsSetting(false);
  }
  const openModalSetting = () =>{
    setIsSetting(true);
  }
  const handleDelete = () => {
    const submit = async (id) => {
      return await userService.deleteUser(id);
    };
  
    let id = user._id;
    if(adminUser.user._id===id)
    {
      toastNotification("Not allowed action !", "error", 5000)
      return
    }
    submit(id)
      .then((data) => {
        if (data) {
          
          toastNotification("User was deleted successfully!", "success", 5000);
        }
        setVisiuable(false)
      })
      .catch(() => {
        toastNotification("Delete failed", "error", 5000);
      });
  };
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
              
              className={`text-sm font-medium  truncate  ${user?._id===adminUser.user?._id? 'text-bermuda':'text-white'}`}>
                {user?.username}
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