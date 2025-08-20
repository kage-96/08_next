"use client"
import { PostType } from "@/types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";
import classes from "../styles/Home.module.scss";

export default function Home() {
  const [ posts, setPosts ] = useState<PostType[]>([]);
  const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'

  useEffect(() => {
    const getDatas = async () => {
      try{
        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts);
      }catch(err){
        console.log(err);
      }
    }
    getDatas();
  },[])
  
  if(posts.length === 0)return <p>投稿がありません。</p>

  return (
    <div className={classes.container}>
      <ul>
        {posts.map((post) => {
          const date = new Date(post.createdAt)
          return(
            <li key={post.id}>
              <Link href={`/posts/${post.id}/`}>
              <div className={classes.post}>
                <div className={classes.postInfo}>
                  <p className={classes.postDate}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
                  <ul className={classes.postCategories}>
                    {post.categories.map((category) => (
                      <li key={category} className={classes.postCategory}>{category}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={classes.postTitle}>{post.title}</p>
                  <p className={classes.postBody} dangerouslySetInnerHTML={{__html:post.content}} />
                </div>
              </div>
              </Link>
            </li>
          )
        })}
      </ul>

    </div>
  );
}
