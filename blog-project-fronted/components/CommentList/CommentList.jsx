import React from "react";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/Navbar/ProfileImage/ProfileImage";
import timeAgo from "@/utils/timeAgo";

const CommentList = ({ comments, loggedInUserId }) => {
  const router = useRouter();

  return (
    <div className="p-4 bg-neutral-800 rounded-lg mt-6">
      <h2 className="text-2xl text-white mb-4">Yorumlar</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex items-center space-x-2">
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() =>
                  loggedInUserId === comment.userId
                    ? router.push("/users/profile")
                    : router.push(`/users/${comment.userId}`)
                }
              >
                <div className="h-7 w-7">
                  <ProfileImage
                    src={
                      comment.user?.profileImagePath || "/images/default.jpg"
                    }
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-white text-lg hover:underline">
                  {comment.user?.displayName}
                </div>
              </div>
              <div className="text-gray-300">•</div>
              <div className="text-gray-400 text-sm">
                {timeAgo(comment.createdAt)}
              </div>
            </div>
            <p className="text-white mt-2">{comment.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Henüz yorum yok.</p>
      )}
    </div>
  );
};

export default CommentList;
