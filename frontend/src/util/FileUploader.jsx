import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadImage = (file, receiveDownloadUrl, onProgress, onError) => {
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress)
        },
        (error) => {
            onError(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                receiveDownloadUrl(downloadURL)
            });
        }
    );
}

export default uploadImage