import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcModal from "../../shared/NcModal/NcModal";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import { toastNotification } from "../ToastNTF";
import { postService } from "../../services/post.service";
import { addPosts } from "../../store/posts";
// import { ThreeDots } from "react-loader-spinner";
export interface ModalCreateProps {
  createshow: boolean;
  onCloseModalSetting: () => void;
  setPageNum: (any) => void;
  
  repostImage: string;
  repostDescription: string;
}

const RepostCreate: FC<ModalCreateProps> = ({
  createshow,
  onCloseModalSetting,
  setPageNum,
  repostImage,
  repostDescription,
}) => {
  const [text, setText] = React.useState(repostDescription);
  const [isErrText, setErrText] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState(repostImage);
  const curUser = useSelector(selectUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (text !== "" && text.length > 0) {
  //     setErrText(false);
  //   }
  // }, [text]);
  const onLoadImage = (e: any) => {
    let file = e.target.files[0];
    if (file && file.size < 10000000) {
      setImageFile(file);
      setImageName(file.name);
    } else {
      // setError(true);
    }
  };

  const onSubmit = async () => {
    if (text === "") {
      setErrText(true);
      return;
    }
    setIsUpdating(true);
    const formdata = new FormData();
    formdata.append("name", curUser.user.name);
    formdata.append("description", text);
    if (imageFile) {
      formdata.append("file", imageFile);
    }
    formdata.append("repostfile", repostImage)
    const data: any = await postService.create(formdata);
    if (data.message === "success") {
      data.post.followers = 0;
      dispatch(addPosts(data.post));
      setPageNum(1);
      toastNotification("Post creation success", "success", 5000);
      setIsUpdating(false);
      onCloseModalSetting();
    } else {
      setIsUpdating(false);
      toastNotification("Post creation failed", "error", 5000);
    }
    setText("");
    setImageFile(null);
    setImageName("");
  };

  const renderContent = () => {
    return (
      <>
        {/* inuput */}
        <div
          className={`relative 2xl:h-[220px] xl:h-[200px] md:h-[160px] h-[130px] 2xl:mx-[26px] xl:mx-[22px] mx-[16px] mt-[0px] 2xl:rounded-[14px] rounded-[10px] ${isErrText ? "border-[1px] border-solid border-[#FFFF00]" : ""
            }`}
        >
          <textarea
            placeholder="What’s on your mind..."
            className=" placeholder:text-placehd w-full h-full 2xl:rounded-[14px] rounded-[10px] bg-transparent p-[20px] font-[700] 2xl:text-[24px] xl:text-[20px] text-[16px] text-white absolute top-0 left-0 z-10 overflow-hidden resize-none"
            style={{ textOverflow: "ellipsis" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute w-full h-full top-0 left-0 2xl:rounded-[14px] rounded-[10px] bg-formback z-1"></div>
        </div>
        {/* button */}
        <div className="flex justify-between px-[30px] 2xl:mt-[13px] xl:mt-[8px] sm:mt-[18px] mt-[18px] items-center">
          <div className="flex sm:gap-[5px] gap-[2px] justify-center items-center">
            <label>
              <div
                className={`relative 2xl:w-[45px] xl:w-[40px] md:w-[35px] w-[30px] 2xl:h-[45px] xl:h-[40px] md:h-[35px] h-[30px] cursor-pointer`}
              >
                <Image
                  alt="imgview"
                  src="/static/images/icons/imgview.png"
                  className="abosolute top-0 left-0 w-full h-full cursor-pointer z-20"
                  width={40}
                  height={40}
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/png"
                  onChange={onLoadImage}
                />
              </div>
            </label>
            <div className="text-white xl:text-[15px] md:text-[13px] sm:text-[12px] text-[11px] sm:max-w-[200px] max-w-[100px] overflow-hidden">
              {imageName}
            </div>
          </div>
          <ButtonPrimary
            sizeClass="2xl:w-[85px] xl:w-[80px] w-[75px] 2xl:h-[30px] xl:h-[25px] h-[20px]"
            fontSize="font-[700] 2xl:text-[16px] xl:text-[14px] text-[12px]"
            className="rounded-[12px] z-10"
            onClick={onSubmit}
            type="submit"
          >
            POST
          </ButtonPrimary>
        </div>
        {/* {isUpdating && ( */}
        {/* <div className="absolute top-[40%] left-0 right-0 ml-auto mr-auto w-fit"> */}
        {/* <ThreeDots height={100} width={100} color="#616161" /> */}
        {/* </div> */}
        {/* )} */}
      </>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={createshow}
      onCloseModal={onCloseModalSetting}
      contentExtraClass="2xl:w-[500px] xl:w-[450px] lg:w-[400px] sm:w-[350px] w-[300px] 2xl:h-[380px] xl:h-[330px] md:h-[320px] h-[250px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      hasLogout={false}
      modalTitle="Repost"
    />
  );
};

export default RepostCreate;
