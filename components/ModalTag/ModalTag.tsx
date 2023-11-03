import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcModal from "../../shared/NcModal/NcModal";

export interface ModalTagProps {
  show: boolean;
  onCloseModalTag: () => void;
  setTags: (value: any) => void;
  tagList: any;
  setTagList: (value: any) => void;
}

export interface TTag {
  name: string;
  selected: boolean;
}
const initTag = [
  {
    name: "NFTs",
    selected: false,
  },
  {
    name: "Crypto",
    selected: false,
  },
  {
    name: "Memes",
    selected: false,
  },
  {
    name: "Mint",
    selected: false,
  },
  {
    name: "Project",
    selected: false,
  },
  {
    name: "Web3",
    selected: false,
  },
  {
    name: "Casual",
    selected: false,
  },
  {
    name: "Bullish",
    selected: false,
  },
];

const ModalTag = (props: ModalTagProps) => {
  const { show, onCloseModalTag, setTags, tagList, setTagList } = props;
  // const [tagList, setTagList] = useState(initTag);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTagList(initTag);
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 2400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleTag = (index: any) => {
    let temp: any = [...tagList];

    let selectedTags: any = temp.filter(function (item: any) {
      return item.selected === true;
    });
    if (selectedTags && selectedTags.length > 2 && !temp[index].selected) {
      return;
    }
    try {
      temp[index].selected = !temp[index].selected;
    } catch (error) {
    }
    setTagList(temp);
  };

  const onConfirm = () => {
    let temp: any = [...tagList];
    let selectedTagsss: any = temp.filter(function (item: any) {
      return item.selected === true;
    });

    const result = selectedTagsss.map((a) => {
      return { name: a.name, selected: a.selected };
    });

    setTags(result);

    onCloseModalTag();
  };

  const renderContent = () => {
    return (
      <div>
        <div className="flex flex-wrap xl:gap-[24px] lg:gap-[15px] gap-[10px] 2xl:px-[30px] lg:px-[20px] px-[10px] py-[10px]">
          {tagList.map((item, index) => (
            <div
              key={index}
              className={`w-[100px] px-[22px] py-[10px] pt-[5px] relative cursor-pointer rounded-[49px] z-20 ${
                item.selected ? "border-[2px] border-white" : ""
              }`}
              onClick={() => {
                handleTag(index);
              }}
            >
              <div
                className={`absolute w-full h-full top-0 left-0 rounded-[49px] bg-formback ${
                  !item.selected && "blur-[2px]"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-[49px] flex justify-center items-center`}
              >
                <div className="font-[600] 2xl:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-center text-textwhite z-10 flex justify-center items-center">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex relative md:mt-[30px] mt-[20px] w-full">
          <div className="font-[500] md:text-[13px] sm:text-[11px] text-[9px] text-placehd2 text-center mx-auto">
            MORE OPTIONS AND CUSTOM TAGS COMING SOON
          </div>
          <ButtonPrimary
            sizeClass="2xl:w-[90px] w-[70px] 2xl:h-[30px] h-[28px]"
            fontSize="font-Inter font-[500] 2xl:text-[14px] text-[12px]"
            className="rounded-[14px] z-10 absolute bottom-[5px] right-[50px]"
            onClick={onConfirm}
          >
            CONFIRM
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalTag}
      contentExtraClass="max-w-[550px] lg:w-[550px] md:w-[500px] w-[490px] h-[310px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="ADD TAGS"
    />
  );
};

export default ModalTag;
