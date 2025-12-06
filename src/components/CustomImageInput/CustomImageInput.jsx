import React, { useState } from 'react';
import { useInput, useNotify } from 'react-admin';
import { fileUploadAPI } from '../../api/fileUploadApi.jsx';

const CustomImageInput = ({ source, label }) => {
    const { field } = useInput({ source });
    const notify = useNotify();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(field.value || '');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        
        try {
            // Generate unique filename
            const timestamp = Date.now();
            const fileName = `product-${timestamp}-${file.name}`;
            
            // Upload to Cloudinary via your backend
            const result = await fileUploadAPI(file, fileName);
            
            // Set the Cloudinary URL to the field
            field.onChange(result.fileUrl);
            setPreview(result.fileUrl);
            
            notify('Image uploaded successfully!', { type: 'success' });
        } catch (error) {
            notify('Image upload failed: ' + error.message, { type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '12px',
                color: 'rgba(0, 0, 0, 0.6)'
            }}>
                {label}
            </label>
            
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ marginBottom: '12px' }}
            />
            
            {uploading && (
                <p style={{ color: '#1976d2', fontSize: '14px' }}>
                    Uploading...
                </p>
            )}
            
            {preview && !uploading && (
                <div>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '200px', 
                            maxHeight: '200px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '4px'
                        }} 
                    />
                    <p style={{ fontSize: '12px', color: 'green', marginTop: '8px' }}>
                        ✓ Image uploaded
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomImageInput;