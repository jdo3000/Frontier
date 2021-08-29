import { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useLocation, useHistory } from 'react-router-dom'
import custom from './EditForm.module.css'

const EditForm = () => {
    const { edit, currentUser, db, storage, deletePost } = useAuth();

    const location = useLocation();
    const { id, uid } = location.state;
    const history = useHistory();

    var titleInputRef = useRef();
    var locationInputRef = useRef();
    var descriptionInputRef = useRef();
    const [image, setImage] = useState(null);
    const [currentImageName, setCurrentImageName] = useState();
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');

    db.collection('frontiers').doc(id).get()
        .then((doc) => {
            setCurrentImageName(doc.data().imageName);
            setImage();
            setCurrentTitle(doc.data().title);
            setCurrentDescription(doc.data().description);
            setCurrentLocation(doc.data().location);       
        })
        
    
    async function handleSubmit(event) {
        event.preventDefault();

        const titleInput = titleInputRef.current.value;
        const locationInput = locationInputRef.current.value;
        const descriptionInput = descriptionInputRef.current.value;
        await edit(id, titleInput, locationInput, descriptionInput, image)
        setImage('');
        history.push('/');
    }

    async function handleDelete(event) {
        event.preventDefault();
        console.log('deleting post: '+id+", user: "+uid)
        await deletePost(id, uid);
        history.push('/');
    }

    return (
        <div className='container'>
            <h1 className="mb-4">Edit</h1>

            <div className="form-floating mb-4">
                <input required type="text" className="form-control" id="titleInput" placeholder="title" ref={titleInputRef} defaultValue={currentTitle}/>
                <label for="titleInput">title</label>
            </div>
            
            {/* <div className={custom.imageInput}>
                <p>Current photo: {currentImageName}</p>
                <input required type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div> */}
            
            <div className="form-floating mb-4">
                <input required type="text" className="form-control" id="locationInput" placeholder="location" ref={locationInputRef} defaultValue={currentLocation}/>
                <label for="locationInput">location</label>
            </div>

            <div className="form mb-4">
                <label for="comment">edit your comment</label>
                <textarea required className="form-control" id="comment" rows="3" ref={descriptionInputRef} defaultValue={currentDescription} />
            </div>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>Edit</button>
            <button className="btn btn-outline-danger ms-5" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default EditForm;