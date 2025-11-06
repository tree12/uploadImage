'use client';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect, useCallback } from 'react';
import Modal from '../components/modal';
import { imageApi } from '../lib/api'; // Ensure api is imported if needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

export default function ImageUploader({ folder }: { folder: string }) {
    const [images, setImages] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [activeImage, setActiveImage] = useState('');

    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // max 3x zoom
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5)); // min 0.5x zoom
    const resetZoom = () => setScale(1);

    const fetchImages = async () => {
        const res = await imageApi.getImages(folder);
        setImages(res);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const onDrop = useCallback(async (acceptedFiles: any) => {
        const formData = new FormData();
        acceptedFiles.forEach((file: any) => formData.append('images[]', file));
        formData.append('folder', folder);
        await imageApi.uploadImages(formData);


        fetchImages();
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const closeModal = () => {
        setShowModal(false);
    }
    const showImage = (url: string) => () => {
        setActiveImage(url);
        setShowModal(true);
    }
    const showOnlyImageName = (url: string) =>{
        const parts = url.split('/');
        return parts[parts.length - 1];
    }
    return (
        <div>
            <div className="gallery" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {images && images.filter((url) => !url.includes('Thumbs.db')).map((url, index) => (
                    <img key={index} src={url} alt={`img-${index}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} onClick={showImage(url)} />
                ))}
            </div>
            <div
                {...getRootProps()}
                className="dropzone"
                style={{
                    border: '2px dashed #888',
                    padding: '40px',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop files here...</p> : <p>Drag & drop images or click to upload</p>}
            </div>

            <Modal title={showOnlyImageName(activeImage)} isOpen={showModal} size='xl7' onClose={closeModal}>
                <div style={{ position: 'relative', overflow: 'hidden'}}>
                    <div style={{ marginBottom: '10px', textAlign: 'end' }}>
                        <button className='btn-sm btn-primary' onClick={zoomIn}><FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon></button>
                        <button className='btn-sm btn-primary' onClick={zoomOut}><FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon></button>
                        <button className='btn-sm btn-primary' onClick={resetZoom}>Reset</button>
                    </div>

                    <div
                        style={{
                            overflow: 'auto',
                            border: '1px solid #ccc',
                            maxHeight: '80vh',
                        }}
                    >
                        <img
                            src={activeImage}
                            alt="Active"
                            style={{
                                width: '100%',
                                transform: `scale(${scale})`,
                                transformOrigin: 'center center',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
