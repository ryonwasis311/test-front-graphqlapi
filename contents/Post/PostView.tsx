import { Button } from "antd";
import { useEffect } from "react";
import useState from "react-usestateref";
import Card from "../../components/Card";
import { postService } from "../../services/post.service";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLikePosts,
  selectPosts,
  updateLikePosts,
  updatePosts,
  addComment,
} from "../../store/posts";
import { selectUser } from "../../store/user";
import { getFollowPosts } from "../../utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { POSTS_COUNT_PER_PAGE } from "../../utils/constant";

export const PostView = ({ pageNum, setPageNum }) => {
  const [activeBtn, setActiveBtn] = useState<string>("following");
  // const [pageNum, setPageNum] = useState(1);
  const [pageNum1, setPageNum1] = useState(1);
  const [hasMoreAllPosts, setHasMoreAllPosts, hasMoreAllPostsRef] =
    useState(true);
  const [hasMoreLikePosts, setHasMoreLikePosts, hasMoreLikePostsRef] =
    useState(true);
  const [subAllPosts, setSubAllPosts] = useState<any>([]);
  const [subLikePosts, setSubLikePosts] = useState<any>([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const comment = useSelector(addComment);
  const allPosts = useSelector(selectPosts);
  const likePosts = useSelector(selectLikePosts);

  useEffect(() => {
    const getAllPosts = async () => {
      const postsData: any = await postService.getAll();
      const likeData: any = await postService.followAll({
        name: user.user.name,
      });

      console.log("posts: ", likeData);
      dispatch(updatePosts(postsData));
      dispatch(updateLikePosts(getFollowPosts(likeData)));
    };
    getAllPosts();
  }, []);

  useEffect(() => {
    setPageNum(1);
    setHasMoreAllPosts(true);
    if (allPosts === null || allPosts === undefined || allPosts.length === 0) {
      return;
    }
    let initData = allPosts.slice(0, POSTS_COUNT_PER_PAGE);
    setSubAllPosts(initData);
    if (allPosts.length < POSTS_COUNT_PER_PAGE) {
      setHasMoreAllPosts(false);
    }
  }, [allPosts]);

  useEffect(() => {
    setPageNum1(1);
    setHasMoreLikePosts(true);
    if (
      likePosts === null ||
      likePosts === undefined
    ) {
      return;
    }
    let initData = likePosts.slice(0, POSTS_COUNT_PER_PAGE);
    setSubLikePosts(initData);
    

    if (likePosts.length < POSTS_COUNT_PER_PAGE) {
      setHasMoreLikePosts(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likePosts]);

  const fetchAllPosts = async () => {
    if (hasMoreAllPostsRef.current) {
      if (allPosts === null || allPosts.length === 0) {
        setHasMoreAllPosts(false);
        return;
      }
      setTimeout(() => {
        const subArray: any = allPosts.slice(
          pageNum * POSTS_COUNT_PER_PAGE,
          (pageNum + 1) * POSTS_COUNT_PER_PAGE
        );
        let tempArray: any = [...subAllPosts];
        tempArray = tempArray.concat(subArray);
        setSubAllPosts(tempArray);
        setPageNum(pageNum + 1);

        if (subArray.length < POSTS_COUNT_PER_PAGE) {
          setHasMoreAllPosts(false);
          return;
        }
      }, 1000);
    }
  };
  const fetchLikePosts = async () => {
    if (hasMoreLikePostsRef.current) {
      if (likePosts === null || likePosts.length === 0) {
        setHasMoreLikePosts(false);
        return;
      }
      setTimeout(() => {
        const subArray: any = likePosts.slice(
          pageNum1 * POSTS_COUNT_PER_PAGE,
          (pageNum1 + 1) * POSTS_COUNT_PER_PAGE
        );
        let tempArray: any = [...subLikePosts];
        tempArray = tempArray.concat(subArray);
        setSubLikePosts(tempArray);
        setPageNum1(pageNum1 + 1);

        if (subArray.length < POSTS_COUNT_PER_PAGE) {
          setHasMoreLikePosts(false);
          return;
        }
      }, 1000);
    }
  };

  const handleclick = (e, label) => {
    setActiveBtn(label);
  };

  return (
    <div className="w-full h-full justify-center items-center 2xl:px-[50px] py-[20px]">
      <div className="h-full rounded-[20px] border-[2px] border-solid border-[#5C5C5C] bg-[#212121] flex flex-col">
        <div className="flex">
          <button
            className={`w-full button-effect h-full border-b-[2px] border-r-[1px] rounded-tl-[20px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[0px] border-[#5C5C5C] max-w-[460px] max-h-[69px] py-2
          ${activeBtn === "following"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
              }`}
            onClick={(e) => handleclick(e, "following")}
          >
            <p className="text-white xl:text-[20px] lg:text-[15px] text-[16px] font-Inter font-medium ">
              Following
            </p>
          </button>
          <button
            className={`w-full h-full button-effect border-b-[2px] bordere-l-[1px] rounded-tr-[20px] rounded-tl-[0px] rounded-br-[0px] rounded-bl-[0px] border-[#5C5C5C] max-w-[460px] max-h-[69px] py-2
            ${activeBtn === "explorer"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
              }`}
            onClick={(e) => handleclick(e, "explorer")}
          >
            <p className="text-white xl:text-[20px] lg:text-[15px] text-[16px] mx-auto font-Inter font-medium">
              Explorer
            </p>
          </button>
        </div>
        <div
          id="carousel-post"
          className="xl:m-4 lg:m-[10px] m-4 flex-grow h-[calc(100%-50px)] justify-center items-center overflow-auto post-carousel"
        >
          {activeBtn === "following" && (
            <InfiniteScroll
              dataLength={subLikePosts.length}
              next={fetchLikePosts}
              hasMore={hasMoreLikePostsRef.current}
              loader={
                <div className="2xl:mt-[300px] xl:mt-[250px] lg:mt-[200px] sm:mt-[180px] mt-[160px] font-bold xl:text-xl lg:text-lg text-base text-[#f4f4f44d] text-center">
                  Data doesn't exist...
                </div>
              }
              scrollableTarget="carousel-post"
            >
              {subLikePosts?.map((post: any, index: any) => {
                return <Card key={index} post={post} />;
              })}
            </InfiniteScroll>
          )}
          {activeBtn === "explorer" && (
            <InfiniteScroll
              dataLength={subAllPosts.length}
              next={fetchAllPosts}
              hasMore={hasMoreAllPostsRef.current}
              loader={
                <div className="2xl:mt-[300px] xl:mt-[250px] lg:mt-[200px] sm:mt-[180px] mt-[160px] font-bold xl:text-xl lg:text-lg text-base text-[#f4f4f44d] text-center">
                  Data doesn't exist...
                </div>
              }
              scrollableTarget="carousel-post"
            >
              {subAllPosts?.map((post: any, index: any) => {
                return <Card key={index} post={post} />;
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};
