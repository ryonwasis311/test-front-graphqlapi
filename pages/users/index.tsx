import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import useState from "react-usestateref";
import { Card } from "../../components/Card";
import { ButtonGroup } from "../../contents/Post/ButtonGroup";
import { useEffect } from "react";
import { userService } from "../../services";
import { selectUserGroup } from "../../store/userGroup";
import { updateUserGroup } from "../../store/userGroup";
const PostPage = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const userGroup = useSelector(selectUserGroup);
  const [allUsers, setAllUsers] = useState<any>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const userData: any = await userService.getAll();
      dispatch(updateUserGroup(userData))

    }
    getAllUsers();

  }, []);

  useEffect(() => {
    setAllUsers(userGroup);
  }, [userGroup]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(prevItems => prevItems.concat(Array.from({ length: 10 })));
    }, 1500);
  };
  return (
    <>
      <div className="lg:flex-row lg:justify-center items-center flex flex-col relative w-full h-full lg:overflow-hidden">
        <div className="lg:w-[20%] md:w-[30%] w-0 h-full">
          <ButtonGroup />
        </div>
        <div className="lg:w-[60%] md:w-[60%] sm:w-[80%] w-[95%] lg:h-full md:h-[90%] h-full">
          <div className="w-full h-full justify-center items-center 2xl:px-[50px] py-[20px]">
            <div className="h-full rounded-[20px] border-[2px] border-solid border-[#5C5C5C] bg-[#212121] flex flex-col">
              {/* header */}
              <div className="flex justify-center items-center mt-5 mb-5">
                <p className="text-white 2xl:text-[30px] xl:text-[28px] sm:text-[24px] text-[18px] font-[500] "> User Management</p>
              </div>
              {/* user infromation */}
              <div
                style={{ scrollbarWidth: 'none' }}
                className="carousel-post h-full w-full overflow-auto">
                <style>
                  {`::-webkit-scrollbar {display: none;}`}
                </style>
                <InfiniteScroll
                  dataLength={5}
                  next={fetchMoreData}
                  hasMore={true}

                  loader={<div>loading...</div>}
                >
                  {allUsers?.map((eachUser: any, index: any) => {
                    return (
                      <Card index={index} user={eachUser} />
                    );
                  })}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PostPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default PostPage;
