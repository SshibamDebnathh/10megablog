import React, { useEffect, useState } from 'react';
import { Container, PostCard } from './../index';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                
            }
        });
    }, []);



    if (authStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="w-full flex flex-wrap justify-evenly">
                    {posts?.map((post, index) => (
                        <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <PostCard {...post} isFirst={index === 0} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
