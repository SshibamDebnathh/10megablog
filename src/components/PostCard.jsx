import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage},isFirst) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-48 h-48 bg-gray-100 rounded-xl p-4 mx-8">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            loading={isFirst ? 'eager' : 'lazy'}
            fetchpriority="high"
            decoding="async"
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
