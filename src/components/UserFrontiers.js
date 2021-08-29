import useFetchUserData from "./UseFetchUserData";
import ImageList from "./imageList";
const UserFrontiers = ({uid}) => {

    const {data, isPending, error} = useFetchUserData('users/'+uid+'/frontiers');

    return (
        <div>
            {console.log(data)}
            {isPending && <div>{isPending}</div>}
            {error && <div>{error}</div>}
            {data && <ImageList data={data} />}
        </div>
    )
}

export default UserFrontiers;