import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postService } from "../../services/post.service";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import McModal from "../../shared/McModal/McModal";
import { selectPosts, updatePosts } from "../../store/posts";
import { selectUser } from "../../store/user";
import { toastNotification } from "../ToastNTF";
import { ThreeDots } from "react-loader-spinner";

export interface ModalCreateProps {
  createshow: boolean;
  onCloseModalSetting: () => void;
  post_id: any;
  name: any;
}

const CommentCreate: FC<ModalCreateProps> = ({
  createshow,
  onCloseModalSetting,
  post_id,
  name,
}) => {
  const [text, setText] = React.useState("");
  const [isErrText, setErrText] = useState(false);
  const curUser = useSelector(selectUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const allPosts = useSelector(selectPosts);
  const dispatch = useDispatch();
  // setText(post_content);
  // useEffect(() => {
  //   if (text !== "" && text.length > 0) {
  //     setErrText(false);
  //   }
  // }, [text]);
  const onSubmit = async () => {
    let newcomment = {
      name: name,
      comment: text,
      postId: post_id,
    };
    setIsUpdating(true);
    const data: any = await postService.addComment(newcomment);
    if (data.msg === "success") {
      dispatch(updatePosts(data.postAll));
      toastNotification("Comment add  successed", "success", 5000);
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
      toastNotification("Comment add failed", "error", 5000);
    }
    setText("");
    onCloseModalSetting();
  };

  const renderContent = () => {
    return (
      <>
        {/* inuput */}
        <div
          className={`relative 2xl:h-[350px] xl:h-[330px] lg:h-[300px] md:h-[230px] sm:h-[220px] h-[170px] 2xl:mx-[26px] xl:mx-[22px] mx-[16px] mt-[0px] 2xl:rounded-[6px] rounded-[2px] ${
            isErrText ? "border-[1px] border-solid border-[#FFFF00]" : ""
          }`}
        >
          <textarea
            className=" placeholder:text-placehd w-full h-full 2xl:rounded-[14px] rounded-[10px] bg-transparent p-[20px] font-[650] 2xl:text-[24px] xl:text-[22px] text-[18px] text-white absolute top-0 left-0 z-10 overflow-hidden resize-none"
            style={{ textOverflow: "ellipsis" }}
            value={text}
            placeholder="Comments..."
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute w-full h-full top-0 left-0 2xl:rounded-[14px] rounded-[10px] bg-formback2 z-1"></div>
        </div>
        {/* button */}
        <div className="flex justify-center px-[30px] 2xl:mt-[30px] xl:mt-[25px] lg:mt-[20px] mt-[10px]">
          <ButtonPrimary
            sizeClass="2xl:w-[100px] xl:w-[85px] w-[80px] 2xl:h-[40px] xl:h-[30px] h-[28px]"
            fontSize="font-[500] 2xl:text-[18px] xl:text-[16px] text-[14px]"
            className="rounded-[13px] z-10 bg-formbackhover"
            onClick={onSubmit}
            type="submit"
          >
            Submit
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
      contentExtraClass="2xl:w-[550px] xl:w-[500px] lg:w-[450px] md:w-[370px] sm:w-[350px] w-[300px] 2xl:h-[550px] xl:h-[500px] lg:h-[450px] md:h-[370px] sm:h-[350px] h-[300px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      user={curUser.user}
    />
  );
};

export default CommentCreate;
