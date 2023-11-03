import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcModal from "../../shared/NcModal/NcModal";
import Image from "next/image";

export interface ModalTagProps {
  show: boolean;
  onCloseModalNotification: () => void;
  setError: (value: boolean) => void;
}

const ModalNotification = (props) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (props.show) {
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
  }, [props.show]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center items-center xl:gap-[24px] lg:gap-[15px] gap-[10px] 2xl:px-[30px] lg:px-[20px] px-[10px] py-[10px]">
          <div className="font-[500] text-[#eeeeee] md:text-[23px] sm:text-[20px] text-[18px] text-center">
            The input value may be incorrect or{" "}
            <span className="">your WALLET may not be connected</span>.{" "}
            <br></br>Please try again.
          </div>
        </div>
        <div className="flex relative md:mt-[30px] mt-[20px] w-full justify-center items-center">
          <ButtonPrimary
            sizeClass="2xl:w-[100px] w-[70px] 2xl:h-[40px] h-[28px]"
            fontSize="font-Inter font-[500] 2xl:text-[14px] text-[12px]"
            className="rounded-[14px] z-10"
            onClick={props.onCloseModalNotification}
          >
            OK
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
      isOpenProp={props.show}
      onCloseModal={props.onCloseModalNotification}
      contentExtraClass="max-w-[450px] lg:w-[450px] md:w-[420px] w-[400px] xl:h-[310px] lg:h-[280px] md:h-[280px] h-[240px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Warning!"
    />
  );
};

export default ModalNotification;
