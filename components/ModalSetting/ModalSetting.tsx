import React, { FC, useEffect, useRef } from "react";
import useState from "react-usestateref";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcModal from "../../shared/NcModal/NcModal";
import Image from "next/image";
import ButtonFile from "../../shared/Button/ButtonFile";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../store/user";
import { ThreeDots } from "react-loader-spinner";
import { toastNotification } from "../ToastNTF";
import { userService } from "../../services";

export interface ModalSettingProps {
  show: boolean;
  onCloseModalSetting: () => void;
}

const ModalSetting: FC<ModalSettingProps> = ({
  show,
  onCloseModalSetting,
}) => {
  const textareaRef = useRef(null);
  const curUser = useSelector(selectUser);
  const [password, setPassword] = useState(curUser.user.password);
  const [email, setEmail] = useState(curUser.user.email);
  const [name, setName] = useState(curUser.user.username);
  const [isPass, setIsPass] = useState(true);
  const [isEmailEdit, setisEmailEdit] = useState(false);
  const [isNameEdit, setNameEdit] = useState(false);
  const [newImage, setNewImage] = useState<File>();
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const [editImage, setEditImage] = useState(curUser.user.avatar);
  const hasNumber = /\d/;
  const [isUpdating, setIsUpdating] = useState(false);
  const [invalidName, setInvalidName, invalidNameRef] = useState(false);
  const [invalidEmail, setInvalidEmail, invalidEmailRef] = useState(false);
  const [invalidPass, setInvalidPass, invalidPassRef] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isCoverLetter, setIsCoverLetter] = useState(false)
  const dispatch = useDispatch();
  const onChangeBio = () => {
    setIsCoverLetter(!isCoverLetter);
  }
  const onSelectPic = (e: any) => {
    let file = e.target.files[0];
    if (file && file.size < 10000000) {
      setNewImage(file);
      setIsSelectImage(true);
    } else {
    }
  };

  const onChangePic = async () => {
    setIsSelectImage(false);

  };

  const handleUpdate =()=>{
    const submit = async (payload) =>{
      return await userService.updateUser(payload)
    }
    const userId = curUser.user._id;
    const newUser ={
      username: name,
      email:email,
      password: password,
    }
    const payload ={
      userId,
      newUser,
    }
    submit(payload)
    .then ((data:any) =>{
      if(data.message ==="User updated successfully!")
      {
        toastNotification("User was updated successfully!", "success", 5000);
        dispatch(updateUser(payload.newUser))
        onCloseModalSetting()
      }
    })

  }

  const renderContent = () => {
    return (
      <>
        {/* user name and email */}
        <div className="grid grid-cols-2 border-b-[2px] border-[#3d3a3a] w-full md:px-[30px] sm:px-[20px] px-[15px] md:pt-[20px] pt-[20px] md:gap-[40px] sm:gap-[20px] gap-[30px]">
          {/* edit username */}
          <div className="col-span-1 flex justify-center items-center gap-[10px]">
            <div className="flex flex-col items-center justify-center ">
              {/* name inputfield */}
              <div
                className={`2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[100px] 2xl:h-50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center ${!isNameEdit && "cursor-not-allowed"
                  }`}
              >
                <input
                  type="text"
                  className={`placeholder:text-placehd w-full h-full md:px-[15px] sm:px-[10px] px-[7px] rounded-full bg-transparent font-[700]  2xl:text-[18px] xl:text-[16px] sm:text-[14px] text-[14px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center`}
                  style={{ textOverflow: "ellipsis" }}
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback  z-1"></div>
              </div>
              {/* name validate */}
              <div
                className={` 2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]    `}
                style={{
                  visibility: invalidNameRef.current ? "visible" : "hidden",
                }}
              >
                Name is incorrect
              </div>
            </div>
          </div>
          {/* edit email */}
          <div className="col-span-1 flex justify-center items-center gap-[10px]">
            <div className="flex flex-col items-center justify-center ">
              {/* email inputfield */}
              <div
                className={`2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[100px] 2xl:h-50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center`}
              >
                <input
                  type="text"
                  className={`placeholder:text-placehd w-full h-full md:px-[15px] sm:px-[10px] px-[7px] rounded-full bg-transparent font-[700] 2xl:text-[18px] xl:text-[16px] sm:text-[14px] text-[14px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center `}
                  style={{ textOverflow: "ellipsis" }}
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback  z-1"></div>
              </div>
              {/* email validate */}
              <div
                className={` 2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]    `}
                style={{
                  visibility: invalidNameRef.current ? "visible" : "hidden",
                }}
              >
                Email is incorrect
              </div>
            </div>
          </div>
        </div>
        {/* user password and avatar */}
        <div className="grid grid-cols-2 border-b-[2px] border-[#3d3a3a] w-full md:px-[30px] sm:px-[20px] px-[15px] 2xl:py-[30px] md:py-[20px] py-[20px] md:gap-[40px] sm:gap-[20px] gap-[30px]">
          <div className="col-span-1 flex justify-center gap-[10px]">
            <div className="flex flex-col items-center justify-center">
              <div className="2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[80px] 2xl:h-[50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center">
                <input
                  id="pass"
                  type="password"
                  className="px-[15px] placeholder:text-placehd w-full h-full rounded-full bg-transparent font-[700] 2xl:text-[24px] xl:text-[20px] sm:text-[19px] text-[15px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center"
                  value={password}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback z-1"></div>
              </div>
              {/* password validate */}
              <div
                className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]`}
                style={{
                  visibility: invalidPassRef.current ? "visible" : "hidden",
                }}
              >
                min 7 letters and 1 number
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center items-center gap-[10px]">
            <Image
              alt="avatar"
              // src="/static/images/user/default.png"
              src="/static/images/user/default.png"
              unoptimized
              className="2xl:w-[70px] lg:w-[55px] w-[40px] 2xl:h-[70px] lg:h-[55px] h-[40px] rounded-full"
              width={55}
              height={55}
            />
            {isSelectImage ? (
              <ButtonPrimary
                sizeClass="2xl:w-[74px] sm:w-[60px] w-[70px] 2xl:h-[28px] h-[24px]"
                fontSize="font-Inter font-[600] 2xl:text-[14px] text-[10px]"
                className="rounded-[14px] w-full h-full"
                onClick={onChangePic}
              >
                UPDATE
              </ButtonPrimary>
            ) : (
              <ButtonFile
                sizeClass="2xl:w-[74px] w-[60px] 2xl:h-[28px] h-[24px]"
                fontSize="font-Inter font-[600] 2xl:text-[14px] text-[10px]"
                className="rounded-[14px] top-0 left-0 w-full h-full"
                onChange={(e: any) => {
                  onSelectPic(e);
                }}
              >
                EDIT
              </ButtonFile>
            )}
          </div>
        </div>
        {/* BIO */}
        <div className="w-full 2xl:h-[350px] xl:h-[350px] lg:h-[250px] md:h-[200px]   flex justify-center items-center">
          <div className="2xl:w-[80%] lg:w-[80%] flex-col w-[75%] 2xl:h-[80%] h-[80%] pt-[7px] relative flex justify-center border-[#5C5C5C]   items-center xl:mt-[10px] mt-[5px]">
            <textarea
              className="placeholder:text-placehd w-full h-full  md:px-[10px] sm:px-[8px] px-[3px] rounded-[15px] bg-[#212121] font-[400] 2xl:text-[14px] xl:text-[12px] sm:text-[12px] text-[10px] text-white   border -[2px] border-solid border-[#5C5C5C]   flex justify-start resize-none overflow-y-hidden py-1   max-w-[600px]"
              style={{}}
              disabled={isCoverLetter ? false : true}
              value={coverLetter}
              readOnly={!isCoverLetter ? true : false}
              maxLength={80}
              onChange={(e: any) => {
                const { value } = e.target;
                setCoverLetter(e.target.value);
              }}
            />
            <ButtonPrimary
              sizeClass="2xl:w-[74px] sm:w-[60px] w-[70px] 2xl:h-[28px] h-[24px]"
              fontSize="font-Inter font-[600] 2xl:text-[14px] text-[10px]"
              className="rounded-[14px] w-full h-full mt-4"
              onClick={onChangeBio}
            >
              {isCoverLetter ? "UPDATE" : "EDIT"}
            </ButtonPrimary>
            <ButtonPrimary
              sizeClass="2xl:w-[174px] sm:w-[160px] w-[100px] 2xl:h-[48px] h-[40px]"
              fontSize="font-Inter font-[600] 2xl:text-[14px] text-[10px]"
              className="rounded-[14px] w-full h-full mt-4"
              onClick={handleUpdate}
            >
              Update
            </ButtonPrimary>
          </div>
        </div>
        {isUpdating && (
          <div className="absolute top-[40%] left-0 right-0 ml-auto mr-auto w-fit">
            <ThreeDots height={100} width={100} color="#616161" />
          </div>
        )}
      </>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalSetting}
      contentExtraClass="max-w-[700px] xl:w-[700px] lg:w-[600px] sm:w-[500px] w-[330px] 2xl:h-[670px] xl:h-[600px] md:h-[570px] h-[400px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="My Profile"
    />
  );
};

export default ModalSetting;
