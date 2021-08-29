import custom from './imageList.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import modalStyle from './DetailsPopUp.module.css';
import pinIcon from '../icons/pin.svg';
import editIcon from '../icons/edit.svg';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';

function ImageList({data}) {

    const { db, currentUser } = useAuth();
    var currentuid = null;
    if(currentUser !== null) currentuid = currentUser.uid;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalUsername, setModalUsername] = useState('username');
    const [modalTitle, setModalTitle] = useState('title');
    const [modalPins, setModalPins] = useState();
    const [modalUser, setModalUser] = useState('user');
    const [modalImage, setModalImage] = useState();
    const [modalDescription, setModalDescription] = useState('...');
    const [modalLocation, setModalLocation] = useState('');
    const [modalId, setModalId] = useState();

    async function handleClick(place) {
        const userDoc = db.collection('users').doc(place.user);
        await userDoc.get().then((doc) => {
            setModalUsername(doc.data().username)
        }).catch(err => {console.log(err)})
        setModalId(place.id);
        setModalPins(place.pins);
        setModalTitle(place.title);
        setModalImage(place.image);
        setModalLocation(place.location);
        setModalDescription(place.description);
        setModalUser(place.user);

        openModal();
    }

    async function pinFrontier() {
        const pinnedFrontiersCollection = await db.collection('users').doc(currentUser.uid).collection('pinnedFrontiers');
        const frontiersDoc = await db.collection('frontiers').doc(modalId);
        pinnedFrontiersCollection.doc(modalId).get()
            .then((doc) => {
                if(doc.exists) {
                    //remove from collection
                    pinnedFrontiersCollection.doc(modalId).delete()
                        .then(() => {
                            console.log("doc deleted from pins")
                            frontiersDoc.get().then((doc) => {
                                frontiersDoc.update({pins: doc.data().pins - 1})
                            })
                            
                        }).catch(err => {
                            console.log(err.message)
                        })

                } else {
                    //add to collection
                    pinnedFrontiersCollection.doc(modalId).set({
                        docRef: modalId
                    }).then(() => {
                        console.log("doc added to pins")
                        frontiersDoc.get().then((doc) => {
                            frontiersDoc.update({pins: doc.data().pins + 1})
                        })
                    }).catch(err => {
                        console.log(err.message)
                    })
                }
            })
    }

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }
    function closeModal() {
        setIsOpen(false);
    }
    

    return (
        <div>

            <div className={custom.row}>
                {
                    data.map(place => (
                    <div className={custom.col}>
                        <button className={custom.button} onClick={() => handleClick(place)}>
                            <img src={place.image} alt="image unavailable" />
                        </button>
                    </div>
                    )
                )}
                
            </div>

            <div className={modalStyle.modalObject}>
                <Modal className={modalStyle.modalObject}
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >

                    <div className={modalStyle.content}>

                        <div className={modalStyle.imageContainer}>
                            <img className={modalStyle.image} src={modalImage} alt="..." />
                        </div>

                        <div className={modalStyle.infoArea}>
                            <div className={modalStyle.title}>{modalTitle}, {modalLocation}</div>
                            {
                                modalUser !== currentuid && currentuid !== null &&
                                    <button onClick={pinFrontier} className={modalStyle.pinButton}>
                                        <img src={pinIcon} alt="pin" />
                                    </button>
                            }
                            {
                                modalUser === currentuid && currentuid !== null &&
                                    <Link to={{
                                        pathname: "/edit",
                                        state: {
                                            id: modalId,
                                            uid: modalUser
                                            }
                                        }}>
                                        <button className={modalStyle.pinButton}>
                                            <img src={editIcon} alt="edit" />
                                        </button>
                                    </Link>
                            }
                        </div>
                            <div className={modalStyle.user}><Link to={{
                                pathname: "/user/"+modalUsername,
                                state: modalUser
                                }}>- {modalUsername}</Link></div>
                        <div className={modalStyle.description}>
                                <p>{modalDescription}</p>
                            </div>
                        
                    </div>

                </Modal>
            </div>

        </div>
    );

}

export default ImageList;