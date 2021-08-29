import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../contexts/AuthContext"

const UploadForm = () => {
    const { uploadImage } = useAuth();

    const history = useHistory();

    const titleInputRef = useRef();
    const locationInputRef = useRef();
    const descriptionInputRef = useRef();
    const [image, setImage] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();

        if(image === null) {
            return;
        }

        const titleInput = titleInputRef.current.value;
        const locationInput = locationInputRef.current.value;
        const descriptionInput = descriptionInputRef.current.value;

        await uploadImage(image, titleInput, locationInput, descriptionInput);
        setImage('');
        history.push('/');
    }

    return (
        <div className='container'>
            <h1 className="mb-4">Share your frontier</h1>
            <div className="form-floating mb-4">
                <input required type="text" className="form-control" id="titleInput" placeholder="title" ref={titleInputRef} />
                <label for="titleInput">Title</label>
            </div>
            <div className="form-floating mb-4">
                <input required type="file" className="form-control" id="imageInput" onChange={(e)=>{setImage(e.target.files[0])}} />
            </div>
            <div className="form-floating mb-4">
                <input required type="text" className="form-control" id="locationInput" placeholder="location" ref={locationInputRef} />
                <label for="locationInput">Location</label>
            </div>
            <div className="form mb-4">
                <label for="comment">add a comment about your experience</label>
                <textarea required className="form-control" id="comment" rows="3" ref={descriptionInputRef}/>
            </div>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UploadForm;