import { Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import useState from "react-usestateref";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const floatingOrbit = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(30px, 30px);
  }
  to {
    transform: translate(0, 0px);
  }
`;

const floatingOrbit1 = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(-50px, 50px);
  }
  to {
    transform: translate(0, 0px);
  }
`;
const floatingOrbit11 = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(-90px, 100px);
  }
  to {
    transform: translate(0, 0px);
  }
`;
const floatingOrbit2 = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(-10px, 40px);
  }
  to {
    transform: translate(0, 0px);
  }
`;
const floatingOrbit3 = keyframes`
  from {
    transform: translate(0,  -0px);
  }
  50% {
    transform: translate(-30px, 10px);
  }
  to {
    transform: translate(0, 0px);
  }
`;
const StyledOrbitGroup = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & :nth-child(1) {
    animation: ${floatingOrbit} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 15%;
    left: 150px;
  }
  & :nth-child(2) {
    animation: ${floatingOrbit11} 6s ease-in-out infinite;
    animation-delay: 0.85s;
    position: absolute;
    top: 50%;
    left: 200px;
  }
  & :nth-child(3) {
    animation: ${floatingOrbit2} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 15%;
    left: 40%;
  }
  & :nth-child(4) {
    animation: ${floatingOrbit1} 3s ease-in-out infinite;
    animation-delay: 0.65s;
    position: absolute;
    top: 50%;
    left: 43%;
  }
  & :nth-child(5) {
    animation: ${floatingOrbit} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 15%;
    left: 70%;
  }
  & :nth-child(6) {
    animation: ${floatingOrbit1} 3s ease-in-out infinite;
    animation-delay: 0.85s;
    position: absolute;
    top: 50%;
    left: 73%;
  }
  & :nth-child(7) {
    animation: ${floatingOrbit1} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 30%;
    left: 25%;
  }
  & :nth-child(8) {
    animation: ${floatingOrbit3} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 65%;
    left: 27%;
  }
  & :nth-child(9) {
    animation: ${floatingOrbit} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 30%;
    left: 56%;
  }
  & :nth-child(10) {
    animation: ${floatingOrbit} 3s ease-in-out infinite;
    animation-delay: 0.25s;
    position: absolute;
    top: 65%;
    left: 59%;
  }

  @media (max-width: 1200px) {
    & :nth-child(1) {
      top: 15%;
      left: 80px;
    }
    & :nth-child(2) {
      top: 50%;
      left: 120px;
    }
    & :nth-child(3) {
      top: 15%;
      left: 40%;
    }
    & :nth-child(4) {
      top: 50%;
      left: 43%;
    }
    & :nth-child(5) {
      top: 15%;
      left: 75%;
    }
    & :nth-child(6) {
      top: 50%;
      left: 80%;
    }
    & :nth-child(7) {
      top: 30%;
      left: 25%;
    }
    & :nth-child(8) {
      top: 65%;
      left: 25%;
    }
    & :nth-child(9) {
      top: 30%;
      left: 56%;
    }
    & :nth-child(10) {
      top: 65%;
      left: 59%;
    }
  }
  @media (max-width: 900px) {
    & :nth-child(1) {
      top: 20%;
      left: 80px;
    }
    & :nth-child(2) {
      top: 45%;
      left: 160px;
    }
    & :nth-child(3) {
      top: 15%;
      left: 40%;
    }
    & :nth-child(4) {
      top: 50%;
      left: 47%;
    }
    & :nth-child(5) {
      top: 20%;
      left: 68%;
    }
    & :nth-child(6) {
      top: 50%;
      left: 73%;
    }
    & :nth-child(7) {
      display: none;
    }
    & :nth-child(8) {
      display: none;
    }
    & :nth-child(9) {
      display: none;
    }
    & :nth-child(10) {
      display: none;
    }
  }
  @media (max-width: 700px) {
    & :nth-child(1) {
      display: none;
    }
    & :nth-child(2) {
      top: 45%;
      left: 160px;
    }
    & :nth-child(3) {
      top: 20%;
      left: 40%;
    }
    & :nth-child(4) {
      display: none;
    }
    & :nth-child(5) {
      display: none;
    }
    & :nth-child(6) {
      top: 50%;
      left: 63%;
    }
  }
`;

interface Props {
  isShow: boolean;
}

const CreateNotification = ({ isShow }: Props) => {
  const [isAlarm, setAlarm, isAlarmRef] = useState(false);
  const [isCreated, setCreated, isCreatedRef] = useState(false);
  const [isShowTitle, setShowTitle] = useState(false);
  const [isShowBottom, setShowBottom] = useState(false);

  useEffect(() => {
    let nIntervId = setInterval(callbackAlarm, 1000);
    setTimeout(() => {
      setShowTitle(true);
      setTimeout(() => {
        setShowBottom(true);
      }, 1000);
    }, 1000);
    return () => {
      clearInterval(nIntervId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let num: number = 0;
  const callbackAlarm = () => {
    setAlarm(!isAlarmRef.current);
    num++;
    if (num % 3 === 0) {
      setCreated(!isCreatedRef.current);
    }
  };

  return (
    <>
      <Transition
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
        appear
        show={isShow}
        as={Fragment}
      >
        <div
          className="w-full h-full z-50 flex justify-center items-center relative"
          style={{
            background: "linear-gradient(180deg, #2D2D2D 0%, #4B4B4B 100%)",
          }}
        >
          <div
            className={`font-[700] 2xl:text-[60px] xl:text-[50px] lg:text-[45px] md:text-[35px] sm:text-[30px] text-[26px] text-center text-[#F4F4F4] pb-[100px] px-[10px] ${
              !isShowTitle ? "opacity-0" : "opacity-100"
            } transition-all ease-in-out duration-1000`}
          >
            YOUR ORBIT ACCOUNT HAS BEEN{" "}
            <span className="text-[#B4FFB2]">CREATED!</span>
          </div>
          <div
            className={`absolute 2xl:bottom-[100px] xl:bottom-[70px] md:bottom-[40px] bottom-[30px] lg:px-[20px] px-[16px] lg:py-[10px] py-[8px] rounded-[20px] border-[1px] border-[#949494] font-[600] 2xl:text-[19px] lg:text-[16px] md:text-[14px] text-[12px] text-[#F4F4F4] text-center z-50 mx-[10px] ${
              !isShowBottom ? "opacity-0" : "opacity-100"
            } transition-all ease-in-out duration-1000`}
          >
            FOLLOW{" "}
            <a
              href="https://twitter.com/OrbitW3"
              className={`${
                isAlarmRef.current ? "text-[#949494]" : "text-[#72BEF5]"
              } transition duration-1000 2xl:text-[21px] lg:text-[18px] md:text-[16px] text-[14px]`}
              target="_blank"
              rel="noreferrer"
            >
              @ORBITW3
            </a>{" "}
            FOR UPDATES AND MORE INFORMATION
          </div>
          <div className="w-full h-full absolute top-0 left-0">
            <StyledOrbitGroup>
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-[2%] xl:w-[220px] xl:h-[220px] lg:w-[190px] lg:h-[190px] md:w-[170px] md:h-[170px] w-[150px] h-[150px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-5 xl:w-[250px] xl:h-[250px] lg:w-[220px] lg:h-[220px] md:w-[190px] md:h-[190px] w-[170px] h-[170px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-[2%] xl:w-[220px] xl:h-[220px] lg:w-[190px] lg:h-[190px] md:w-[170px] md:h-[170px] w-[150px] h-[150px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-5 xl:w-[250px] xl:h-[250px] lg:w-[220px] lg:h-[220px] md:w-[190px] md:h-[190px] w-[170px] h-[170px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-[2%] xl:w-[220px] xl:h-[220px] lg:w-[190px] lg:h-[190px] md:w-[170px] md:h-[170px] w-[150px] h-[150px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-5 xl:w-[250px] xl:h-[250px] lg:w-[220px] lg:h-[220px] md:w-[190px] md:h-[190px] w-[170px] h-[170px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-[4%] xl:w-[220px] xl:h-[220px] lg:w-[190px] lg:h-[190px] md:w-[170px] md:h-[170px] w-[150px] h-[150px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-5 xl:w-[250px] xl:h-[250px] lg:w-[220px] lg:h-[220px] md:w-[190px] md:h-[190px] w-[170px] h-[170px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-[4%] xl:w-[220px] xl:h-[220px] lg:w-[190px] lg:h-[190px] md:w-[170px] md:h-[170px] w-[150px] h-[150px]"
              />
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                width={300}
                height={300}
                className="opacity-5 xl:w-[250px] xl:h-[250px] lg:w-[220px] lg:h-[220px] md:w-[190px] md:h-[190px] w-[170px] h-[170px]"
              />
            </StyledOrbitGroup>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default CreateNotification;
