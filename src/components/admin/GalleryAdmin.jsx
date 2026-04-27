import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Image as ImageIcon, Upload, Trash2, Loader2, CheckCircle2 } from 'lucide-react';

const GalleryAdmin = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const CLOUD_NAME = 'dayvs4apn';
    const UPLOAD_PRESET = 'school_gallery';

    useEffect(() => {
        const q = query(collection(db, 'gallery_images'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET);

                // Upload to Cloudinary
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    throw new Error("Upload failed. Make sure your upload preset is 'school_gallery' and set to Unsigned.");
                }

                const data = await res.json();

                // Save URL to Firebase
                await addDoc(collection(db, 'gallery_images'), {
                    url: data.secure_url,
                    public_id: data.public_id,
                    timestamp: serverTimestamp()
                });

                setUploadProgress(Math.round(((i + 1) / files.length) * 100));
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert(error.message || "Failed to upload images. Please check the console.");
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this image from the gallery?")) {
            await deleteDoc(doc(db, 'gallery_images', id));
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-bold">Loading gallery...</div>;
    }

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-2xl font-black text-[#0D2C54] mb-1">Gallery Manager</h3>
                    <p className="text-gray-500 text-sm font-medium">Upload and manage images shown on the public gallery page.</p>
                </div>
                
                <label className="bg-[#0D2C54] hover:bg-[#123A6B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 relative overflow-hidden group">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    {uploading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading ({uploadProgress}%)
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                            Upload Images
                        </>
                    )}
                </label>
            </div>

            <div className="p-8">
                {images.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-gray-500 font-bold text-lg mb-1">No uploaded images</h4>
                        <p className="text-gray-400 text-sm">Upload some photos using the button above to add them to your website.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {images.map((img) => (
                            <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                                <img 
                                    src={img.url} 
                                    alt="Gallery upload" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        onClick={() => handleDelete(img.id)}
                                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                                        title="Delete from website"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryAdmin;
