import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage}, isFirst) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-48 h-48 bg-gray-100 rounded-xl p-4 mx-2">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            width={192}
            height={192}
            loading={isFirst ? 'eager' : 'lazy'}
            fetchpriority={isFirst ? 'high' : 'auto'}
            decoding="async"
            type="image/webp"
            className="rounded-xl w-full h-full object-cover"
          />

        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
