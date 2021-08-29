import { useState, useEffect } from 'react'
import app from '../firebase'

const UseFetchUserData = (dataLocation) => {

    //look through all documents in collection
    //get doc id of each doc
    //find the doc id in frontiers collection 
    //add doc to 'data'
    const db = app.firestore();

    // an array of documents
    const [data, setData] = useState([]);
    // the current loading state
    const [isPending, setIsPending] = useState(true);
    // the current error
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setIsPending(true);
            if(dataLocation === null) return;
            const fetchData = async () => {
                const dataCollection = await db.collection(dataLocation).get();
                dataCollection.docs.map((userdoc) => {
                    db.collection('frontiers').doc(userdoc.data().docRef).get()
                        .then((doc) => {
                            if(doc.exists) {    
                                setData(isPending => [...isPending, doc.data()] );
                                console.log('doc exists')
                            } else {
                                userdoc.delete();
                                console.log('doc does not exist...deleted doc')
                            }
                            
                        }).catch((err) => {
                            console.log(err.message);
                        })
                })
            }
           
            fetchData();
            setIsPending(false);
            setError(null);
        } catch(err) {
            setError(err);
        }
        return;
    }, []);

    return (
        {data, isPending, error}
    );
}

export default UseFetchUserData;