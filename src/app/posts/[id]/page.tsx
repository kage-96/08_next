"use client"
import React, { useEffect, useState } from 'react'
import type { PostType } from '../../../types/Post';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import classes from "../../../styles/Detail.module.scss"

export default function Page(){
  const [ loading, setLoading ] = useState(false);
  const [ post , setPost ] = useState<PostType | undefined>(undefined)
  const {id} = useParams();
  const url = `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  

  useEffect(() => {
    const getData = async () => {
      try{
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setPost(data.post);
      }catch(err){
        console.error(err);
      }finally{
        setLoading(false)
      }
    }
    getData()
  },[id])

  if (loading) {
    return <p>読み込み中...</p>
  }

  if (!post) {
    return <p>投稿は見つかりませんでした。</p>;
  }

  const { title, thumbnailUrl, createdAt, categories, content } = post;
  const date = new Date(createdAt)
  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <Image src={thumbnailUrl} alt={title} height={400} width={800} />
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <p className={classes.postDate}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
            <ul className={classes.postCategories}>
              {categories.map(category => <li key={category} className={classes.postCategory}>{category}</li>)}
            </ul>
          </div>
          <div>
            <p className={classes.postTitle}>{title}</p>
            <p className={classes.postBody} dangerouslySetInnerHTML={{__html:content}} />
          </div>
        </div>
      </div>
    </div>
  )
}
