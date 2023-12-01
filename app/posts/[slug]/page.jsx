import SingleBlog from '@/components/singleBlog/SingleBlog';
import PostApiService from '@/utils/PostApiService';
// import { useParams } from 'next/navigation';

export default async function SinglePostPage({ params }) {
    const data = await PostApiService.getPostBySlug(params.slug)
    const post = data.post
    return (
        <SingleBlog post={post} />
    )
}
