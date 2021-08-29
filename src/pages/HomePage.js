import ImageList from '../components/imageList';
import custom from './HomePage.module.css';
import UseFetch from '../components/UseFetch';

const HomePage = () => {
    
    const {data, isPending, error} = UseFetch('frontiers')    

    return (
        <div className="container">

            <div className={custom.header}>
                <h1>Explore new frontiers</h1>
            </div>

            <div className={custom.content}>
                {isPending && <div>{isPending}</div>}
                {error && <div>{error}</div>}
                {data && <ImageList data={data} listType='listAllFrontiers'/>}
            </div>

        </div>
    );
}

export default HomePage;