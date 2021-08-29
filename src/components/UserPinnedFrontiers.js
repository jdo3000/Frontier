import ImageList from './imageList'
import useFetchUserData from './UseFetchUserData'
import custom from './UserPinnedFrontiers.module.css'

const UserPinnedFrontiers = ({uid}) => {

    const {data, isPending, error} = useFetchUserData('users/'+uid+'/pinnedFrontiers');

    return (
        <div>
            {data.length===0 && <p className={custom.noPinned}>No pinned Frontiers!</p>}
            {isPending && <div>{isPending}</div>}
            {error && <div>{error}</div>}
            {data && <ImageList data={data} />}
        </div>
    )
}

export default UserPinnedFrontiers;