import { useState, useEffect } from 'react';
import app from '../firebase'

const UseFetch = (dataLocation) => {

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
                setData(
                    dataCollection.docs.map((doc) => {
                        return doc.data();
                    })
                );
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

export default UseFetch;