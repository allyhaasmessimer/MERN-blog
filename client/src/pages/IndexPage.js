import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        fetch(
            "http://backend-blog-env.eba-qumq2maa.us-east-1.elasticbeanstalk.com/post"
        ).then((response) => {
            response.json().then((posts) => {
                setPost(posts);
            });
        });
    }, []);
    return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
