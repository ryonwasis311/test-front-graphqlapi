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
  placeholdertext: string;
  imagename: string;
  createshow: boolean;
  onCloseModalSetting: () => void;
  setPageNum: (any) => void;
}

const ModalVideoCreate: FC<ModalCreateProps> = ({
  placeholdertext,
  imagename,
  createshow,
  onCloseModalSetting,
  setPageNum,
}) => {
  const [text, setText] = React.useState("");
  const [upLoaded, setUpLoaded] = useState<boolean>(false)
  const [isErrText, setErrText] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState("");
  const curUser = useSelector(selectUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text !== "" && text.length > 0) {
      setErrText(false);
    }

  }, [text]);
  const onLoadVideo = (e: any) => {
    let file = e.target.files[0];

    // if (!file) {
    setVideoFile(file);
    console.log("videoName++++++++++", file.name);
    setVideoName(file.name);
    setUpLoaded(true);
    console.log(videoName, "videoName");

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
    if (setVideoFile) {
      formdata.append("file", videoFile);
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
    setVideoFile(null);
    setVideoName("");
  };

  const renderContent = () => {
    return (
      <div>
        {/* button */}
        <div className="flex justify-center">
          <div className=" items-center">
            <label className="flex items-center">
              <ButtonPrimary
                sizeClass="2xl:w-[120px] xl:w-[110px] sm:w-[100px] w-[95px] 2xl:h-[35px] xl:h-[30px] h-[27px]"
                fontSize="font-[500] 2xl:text-[16px] xl:text-[15px] text-[12px]"
                className="rounded-[20px] z-10 bg-[#212121] border-[#FFF] border-solid border-[1px]"
              >
                {!upLoaded ?
                  (<p>Upload Video</p>) :
                  (<p className="text-[#6C6C6C] font-[800] 2xl:text-[16px] xl:text-[14px] text-[12px]">File loaded...</p>)
                }
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={onLoadVideo}
                />
              </ButtonPrimary>
              {!upLoaded ?
                (<p></p>) :
                (<ButtonPrimary
                  sizeClass="2xl:w-[50px] xl:w-[45px] sm:w-[43px] w-[40px] 2xl:h-[25px] xl:h-[23px] h-[22px]"
                  fontSize="font-[500] 2xl:text-[14px] xl:text-[12px] text-[10px]"
                  className="rounded-[20px] z-10 bg-[#212121] border-[#FFF] border-solid border-[1px] 2xl:ml-5 xl:ml-4 lg:ml-4 sm:ml-4 ml-3"
                  type="submit"
                >

                  <p className="">Edit</p>

                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={onLoadVideo}
                  />
                </ButtonPrimary>)
              }
            </label>
          </div>
        </div>
        {/* inuput */}
        <div
          className={`relative flex justify-center 2xl:h-[140px] xl:h-[120px] md:h-[110px] h-[100px] 2xl:mx-[26px] xl:mx-[22px] mx-[16px] 2xl:rounded-[14px] rounded-[10px] 2xl:mt-[24px] xl:mt-[22px] lg:mt-[20px] sm:mt-[18x] mt-[16px] ${isErrText ? "border-[1px] border-b-[2px] border-[#3d3a3a]" : ""
            }`}
        >
          <textarea
            placeholder="Enter description..."
            className=" placeholder:text-placehd placeholder:pl-15  w-full h-full 2xl:rounded-[14px] rounded-[10px] bg-transparent p-[20px] font-[700] 2xl:text-[24px] xl:text-[20px] text-[16px] text-white absolute top-0 left-0 z-10 overflow-hidden resize-none"
            style={{
              textAlign: 'center',
              padding: "10px"
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute w-full h-full top-0 left-0 2xl:rounded-[14px] rounded-[10px] bg-formbackhover z-1"></div>
        </div>
        {/* create_clip_button */}
        <div className="flex justify-end p-[20px] max-sm:py-[35px]">
          <ButtonPrimary
            sizeClass="2xl:w-[110px] xl:w-[110px] w-[100px] 2xl:h-[35px] xl:h-[35px] h-[35px]"
            fontSize="font-[500] 2xl:text-[18px] xl:text-[16px] sm:text-[14px] text-[12px]"
            className="rounded-[12px]  bg-[#a94df026] button-effc border-[2px] border-solid border-[#7A7A7A]  2xl:w-[110px] xl:w-[110px] w-[80px] 2xl:h-[35px] xl:h-[35px] sm:h-[35px] h-[25px]"
            onClick={onSubmit}
            type="submit"
          >
            <p>Create clip</p>
          </ButtonPrimary>
        </div>

        {isUpdating && (
          <div className="absolute top-[40%] left-0 right-0 ml-auto mr-auto w-fit">
            <ThreeDots height={100} width={100} color="#616161" />
          </div>
        )}
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <McModal
      isOpenProp={createshow}
      onCloseModal={onCloseModalSetting}
      contentExtraClass="2xl:w-[500px] xl:w-[450px] md:w-[400px] sm:w-[420px] w-[300px] 2xl:h-[400px] xl:h-[350px] md:h-[330px] sm:w-[320px] h-[320px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      user={curUser.user}
    />
  );
};

export default ModalVideoCreate;
