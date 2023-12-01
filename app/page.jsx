import AllContents from '@/components/allblogcontent/AllContents';
import Banner from '@/components/banner/Banner';
import RecentPost from '@/components/slider/RecentPost';
import PostApiService from '@/utils/PostApiService';

export default async function Home({params}) {
  const data = await PostApiService.getAllPosts()
  const posts = data.posts

  return (
    <div className="">
      <Banner />
      <RecentPost posts={posts} />
      <AllContents posts={posts} />
    </div>
  );
}
