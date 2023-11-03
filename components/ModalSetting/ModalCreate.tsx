import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postService } from "../../services/post.service";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import McModal from "../../shared/McModal/McModal";
import { addPosts } from "../../store/posts";
import { selectUser } from "../../store/user";
import { toastNotification } from "../ToastNTF";
import { ThreeDots } from "react-loader-spinner";
export interface ModalCreateProps {
  placeholdertext:string;
  imagename:string;
  createshow: boolean;
  onCloseModalSetting: () => void;
  setPageNum: (any) => void;
}

const ModalCreate: FC<ModalCreateProps> = ({
  placeholdertext,
  imagename,
  createshow,
  onCloseModalSetting,
  setPageNum,
}) => {
  const [text, setText] = React.useState("");

  const [isErrText, setErrText] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const curUser = useSelector(selectUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text !== "" && text.length > 0) {
      setErrText(false);
    }
    
  }, [text]);
  const onLoadImage = (e: any) => {
    let file = e.target.files[0];
    if (file && file.size < 10000000) {
      setImageFile(file);
      setImageName(file.name);
      console.log(imageName, "imageNmae");
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
    const data: any = await postService.create(formdata);
    if (data.message === "success") {
      data.post.followers = 0;
      data.post.commentcnt = 0;
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
          className={`relative 2xl:h-[340px] xl:h-[305px] md:h-[260px] h-[175px] 2xl:mx-[26px] xl:mx-[22px] mx-[16px] 2xl:rounded-[14px] rounded-[10px] ${isErrText ? "border-[1px] border-b-[2px] border-[#3d3a3a]" : ""
            }`}
        >
          <textarea
            placeholder="What’s on your mind..."
            className=" placeholder:text-placehd w-full h-full 2xl:rounded-[14px] rounded-[10px] bg-transparent p-[20px] font-[700] 2xl:text-[24px] xl:text-[20px] text-[16px] text-white absolute top-0 left-0 z-10 overflow-hidden resize-none"
            style={{ textOverflow: "ellipsis" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute w-full h-full top-0 left-0 2xl:rounded-[14px] rounded-[10px] bg-formbackhover z-1"></div>
        </div>
        {/* button */}
        <div className="flex justify-between xl:px-[25px] lg:px-5 px-4 2xl:mt-[12px] xl:mt-[12px] sm:mt-[12px] mt-[12px] items-center">
          <div className="flex sm:gap-[5px] gap-[2px] justify-center items-center">
            <label>
              <div
                className={`relative 2xl:w-[30px] xl:w-[25px] md:w-[25px] w-[20px] 2xl:h-[30px] xl:h-[25px] md:h-[25px] h-[20px] cursor-pointer`}
              >
                <Image
                  alt="imgview"
                  src="/static/images/icons/imgview.svg"
                  className="abosolute top-0 left-0 w-full h-full cursor-pointer z-20"
                  width={20}
                  height={20}
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/png"
                  onChange={onLoadImage}
                />
              </div>
            </label>
            <p
              className=" z-10 text-white"
            >
              {imageName}
            </p>
          </div>
          <ButtonPrimary
            sizeClass="2xl:w-[80px] xl:w-[70px] w-[60px] 2xl:h-[30px] xl:h-[25px] h-[20px]"
            fontSize="font-[700] 2xl:text-[18px] xl:text-[16px] text-[12px]"
            className="rounded-[13px] z-10 bg-formbackhover"
            onClick={onSubmit}
            type="submit"
          >
            Post
          </ButtonPrimary>
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
    <McModal
      isOpenProp={createshow}
      onCloseModal={onCloseModalSetting}
      contentExtraClass="2xl:w-[500px] xl:w-[450px] md:w-[400px] sm:w-[350px] w-[300px] 2xl:h-[500px] xl:h-[450px] md:h-[400px] sm:w-[350px] h-[300px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      user={curUser.user}
    />
  );
};

export default ModalCreate;
