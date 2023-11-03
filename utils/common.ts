/**
 *
 * @param {string} str
 * @param {number} length
 * @returns string
 */
export const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
};

export const getFollowPosts = (posts: any) => {
  let temp: any = [];
  posts.map((item, index) => {
    const post = {
      _id: item.post._id,
      description: item.post.description,
      file: item.post.file,
      followers: item.followers,
      user: {
        name: item.post.user.name,
        nickname: item.post.user.nickname,
        avatar: item.post.user.avatar,
      },
      commentcnt: item.commentcnt,
      comments: item.comments,
      createdAt: item.post.createdAt,
    };
    temp.push(post);
  });
  return temp;
};

export function imgSrc(src: string) {
  if (process.env.NODE_ENV === "production") {
    return src && src !== ""
    ? `https://${process.env.NEXT_PUBLIC_PROX}=http://${process.env.NEXT_PUBLIC_BACKEND_API}/${src}`
    : "/static/images/user/default.png";
  } else {
    return src && src !== ""
    ? `${process.env.NEXT_PUBLIC_BACKEND_API}/${src}`
    : "/static/images/user/default.png";
  }

}

export function postSrc(src: string) {
  if (process.env.NODE_ENV === "production") {
    return src && src !== ""
    ? `https://${process.env.NEXT_PUBLIC_PROX}=http://${process.env.NEXT_PUBLIC_BACKEND_API}/${src}`
    : "";
  } else {
    return src && src !== ""
    ? `${process.env.NEXT_PUBLIC_BACKEND_API}/${src}`
    : "";
  }

}

