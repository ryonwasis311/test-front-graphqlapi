import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useState from "react-usestateref";
import { toastNotification } from "../../components/ToastNTF";
import { BaseLayout } from "../../layouts/BaseLayout";
import { authService } from "../../services";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { useMediaQuery } from "react-responsive";

const SignUpPage = () => {
  const [invalidForm, setInvalidForm, invalidFormRef] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [invalidEmail, setInvalidEmail, invalidEmailRef] = useState(false);
  const [invalidName, setInvalidName, invalidNameRef] = useState(false);
  const [invalidPass, setInvalidPass, invalidPassRef] = useState(false);
  const [isClickSubmit, SetClickSubmit] = useState(false);
  const [notMatchPass, setNotMatchPass, notMatchPassRef] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const dispatch = useDispatch();
  const router = useRouter();
  const hasNumber = /\d/;

  useEffect(() => {

    if (name !== "" && !name.includes("@")) {
      setInvalidName(false);
    }
    if (email !== "" && !email.includes("@")) {
      setInvalidName(false);
    }

    if (
      password.length > 6 &&
      hasNumber.test(password) &&
      password === rePassword
    ) {
      setInvalidPass(false);
    }
    if (password === rePassword) {
      setNotMatchPass(false);
    }
    if (
      name === "" ||
      name.includes("@") ||
      password.length < 7 ||
      !hasNumber.test(password)
    ) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
    }
  }, [name, password]);

  useEffect(() => {
    const submit = async (user) => {
      return await authService.register(user);
    };
  }, []);

  const handleSubmit = () => {
    const submit = async (user) => {
      return await authService.register(user);
    };

    let user = {
      username: name,
      email: email,
      password: password,
    };

    submit(user)
      .then((data:any) => {
        if (data.message === "User was registered successfully!") {
          toastNotification("User was registered suceessfully!", "success", 5000);
          router.push("/auth/login");  
        }
      })
      .catch(() => {
        toastNotification("Registered failed", "error", 5000);
      });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center py-[20px]">

        <div
          className={`${isDesktop
            ? "text-[64px]"
            : "2xl:text-[55px] xl:text-[55px] lg:text-[43px] md:text-[42px] sm:text-[40px] text-[38px]"
            } font-bold uppercase text-white font-Inter tracking-[6.4px] xl:mt-[-30px] mt-[-20px]`}
        >
          SB Company
        </div>
        <div
          className={`${isDesktop
            ? "text-[24px]"
            : "2xl:text-[19px] xl:text-[20px] lg:text-[16px] md:text-[15px] sm:text-[13px] text-[12px]"
            }  text-[#8F8F8F] font-bold font-Inter mt-[-10px]`}
        >
          <span
            style={{
              background:
                "linear-gradient(180deg, #A098FF 11.46%, #AC8EFF 45.83%, #5200FF 99.99%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome
          </span>{" "}
          Our Service.
        </div>
        <div
          className={`${isDesktop
            ? "w-[600px] h-[470px] mt-[30px] pt-[40px]"
            : "2xl:w-[500px] xl:w-[510px] lg:w-[430px] md:w-[440px] sm:w-[420px] 2xl:h-[420px] xl:h-[400px] lg:h-[430px] md:h-[380px] sm:h-[360px] w-[90%] h-[340px] 2xl:mt-[20px] lg:mt-[20px] md:mt-[20px] sm:mt-[18px] mt-[16px] 2xl:pt-[10px] xl:pt-[20px] pt-0"
            } relative`}
        >
          <div
            className="absolute w-full h-full left-0 top-0 md:rounded-[40px] sm:rounded-[30px] rounded-[20px] opacity-60 z-0 p-[3px]"
            style={{
              background:
                "linear-gradient(to bottom, #921DEE 56.25%, #2B2B2B 100%)",
              opacity: "0.6",
            }}
          >
            <div className="w-full h-full bg-[#2B2B2B] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] z-10"></div>
          </div>
          <div
            className={`${isDesktop
              ? "px-[57px]"
              : "2xl:px-[50px] xl:px-[40px] md:px-[48px] sm:px-[30px] px-[20px]"
              } w-full h-full flex flex-col justify-center items-center z-10`}
          >
            <div
              className={`${isDesktop
                ? "text-[32px] mb-[35px]"
                : "xl:text-[30px] lg:text-[24px] md:text-[23px] sm:text-[22px] text-[21px] 2xl:mb-[20px] xl:mb-[20px] lg:mb-[13px] mb-[16px]"
                } font-semibold uppercase text-white opacity-100 z-10 mt-5`}
            >
              sign up
            </div>
            {/* user name */}
            <div
              className={`${isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
                } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
              <input
                type="text"
                placeholder="USERNAME"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                autoComplete="off"
                className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
              />
              <div className="absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                <Image
                  alt="person"
                  src="/static/images/icons/person.png"
                  className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <div
              className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
              style={{
                visibility: invalidNameRef.current ? "visible" : "hidden",
              }}
            >
              Name is incorrect
            </div>
            {/* user email */}
            <div
              className={`${isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
                } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20 mt-[10px]`}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
              <input
                type="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoComplete="off"
                className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
              />
              <div className=" absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                <Image
                  alt="person"
                  src="/static/images/icons/lock.png"
                  className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <div
              className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
              style={{
                visibility: invalidEmailRef.current ? "visible" : "hidden",
              }}
            >
              Email is incorrect
            </div>
            {/* password and comfirm password */}
            <div
              className={`${isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
                } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                autoComplete="off"
                className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-textwhite xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
              />
              <div className=" absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
                <Image
                  alt="person"
                  src="/static/images/icons/lock.png"
                  className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <ButtonPrimary
              sizeClass={`${isDesktop
                ? "mt-[15px] w-[180px] h-[55px]"
                : "2xl:mt-[10px] lg:mt-[11px] md:mt-[10px] mt-[8px] 2xl:w-[170px] xl:w-[160px] md:w-[150px] w-[140px] 2xl:h-[47px] xl:h-[45px] lg:h-[43px] sm:h-[42px] h-[40px]"
                }`}
              fontSize="font-[600] 2xl:text-[30px] xl:text-[22px] lg:text-[18px] text-[12px]"
              className={`rounded-full`}
              onClick={handleSubmit}
            >

              <div className="w-full h-full flex justify-center items-center gap-[10px]">

                <span
                  className={`${isDesktop
                    ? "text-[18px]"
                    : "2xl:text-[16px] lg:text-[15px] sm:text-[14px] text-[12px]"
                    } font-[600] font-Inter`}
                  style={{ fontFamily: "Inter" }}
                >
                  Sign Up
                </span>
              </div>

            </ButtonPrimary>
            <Link
              href={"/auth/login"}
              className={`${isDesktop
                ? "mt-[20px] mb-3"
                : "2xl:mt-[17px] lg:mt-[15px] md:mt-[15px] mt-[10px]"
                } text-[#f4f4f4b3] z-10 font-bold mb-3`}
            >
              <span className="text-[#f4f4f480] font-[600]">Or</span> LOGIN
            </Link>
          </div>
        </div>
        <div
          className={`${isDesktop
            ? "text-[24px]"
            : "2xl:text-[21px] xl:text-[20px] lg:text-[16px] sm:text-[15px] text-[13px]"
            } text-[#f4f4f4b3] z-10 font-bold 2xl:mt-[30px] xl:mt-[25px] lg:mt-[20px] md:mt-[18px] mt-[15px]`}
        >
          <span className="text-[#f4f4f480] font-[600]">Powered by</span> Suits
          Wasis.
        </div>
      </div>
    </>
  );
};
SignUpPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
export default SignUpPage;
