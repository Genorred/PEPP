import React from "react";
import mockedImage from './Strosherer.jpg'
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { CardVariants } from "@/shared/consts/CardVariants";
import Card from "@/shared/ui/Card";
import Rating from "@/shared/ui/Rating";
import Image from "next/image";
import ThoughtsPopup from "@/entities/Post/ThoughtsPopup";
type Comments = (Comment | string)[]
interface Post {
  id: string
  title: string
  description: string
  rating: number
  img?: string
  video?: string
  comments: Comments
}
const PostsList = () => {
  const posts: Post[] = [
    {
      id: 'sdf',
      title: 'Rollcake',
      description: ' ' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        'sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS' +
        '',
      img: '',
      video: '',
      rating: 2,
      comments: [
        'AFdafefejfkjkad',
        'faSAdffdfsdfklf'
      ],

    }
  ]
  return (
    <MaxWidthWrapper variant={'section'}>
      {posts.map(post =>
       <Card className={'rounded-2xl relative font-outline'} key={post.id} variant={'subSection'}>
         <div className='flex justify-between'>
           <h2 className="ml-2">
             {post.title}
           </h2>
           <ThoughtsPopup />
         </div>

         <Rating className="ml-1" stars={post.rating}/>
         <p>
           {post.description}
         </p>
         <Image src={mockedImage} alt={'Strosherer'} quality={1} width={0} height={0} className="-z-20 rounded-2xl blur-[4px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full absolute object-cover" />
         <Image src={mockedImage} alt={'Strosherer'} quality={1} width={0} height={0} className="-z-10 border-2 shadow-2xl rounded-2xl blur-[1px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-[90%] absolute object-contain" />
       </Card>
      )}
    </MaxWidthWrapper>
  );
};

export default PostsList;