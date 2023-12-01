import AuthorSingle from "@/components/AuthorSingle/AuthorSingle"
import UserApiService from "@/utils/UserApiService"

export default async function AuthorSinglePage({ params }) {
    const data = await UserApiService.getUserBySlug(params.slug)
    const user = data.user
    
    return (
        <AuthorSingle user={user} />
    )
}
