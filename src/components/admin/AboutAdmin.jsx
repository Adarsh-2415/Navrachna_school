import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Save, Plus, Trash2, Loader2, Info } from 'lucide-react';

const AboutAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const defaultContent = {
        description: "Navrachna Public School is a co-educational English Medium School from Nursery to class 12th. The School is committed to develop self confidence, discipline, determination, sincerity and loyalty in every child. We believe that learning should be enjoyable, a process of imagination & Innovation, a gradual unfolding of mind. We value and nurture individuality of every child.",
        facilities: [
            "Lush green campus with swings and other play equipment for small kids.",
            "Spacious and well ventilated classrooms specially designed to suit the needs of the little ones.",
            "Well Stocked library, Computer Room Studio for Painting, Music and Dance.",
            "Well maintained sport's facilities for various indoor and out door games.",
            "Literary Club, Science Club, Cultural club.",
            "Campus is Equipped with CCTV surveillance."
        ]
    };
    
    // Default structure matching the current AboutSection.jsx
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const docRef = doc(db, 'site_content', 'about_us');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setContent(docSnap.data());
                } else {
                    // Initialize the document with defaults if it doesn't exist
                    await setDoc(docRef, content);
                }
            } catch (error) {
                console.error("Error fetching About content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'site_content', 'about_us'), content);
            alert("About Us section saved successfully!");
        } catch (error) {
            console.error("Error saving About content:", error);
            alert("Failed to save. Please check console.");
        } finally {
            setSaving(false);
        }
    };

    const handleResetToDefaults = async () => {
        if (window.confirm("Are you sure you want to restore the original About Us data? This will overwrite your current changes.")) {
            setSaving(true);
            try {
                await setDoc(doc(db, 'site_content', 'about_us'), defaultContent);
                setContent(defaultContent);
                alert("About Us has been restored to default settings!");
            } catch (error) {
                console.error("Error resetting content:", error);
                alert("Failed to reset. Please check console.");
            } finally {
                setSaving(false);
            }
        }
    };

    const handleFacilityChange = (idx, val) => {
        const newFacilities = [...content.facilities];
        newFacilities[idx] = val;
        setContent({ ...content, facilities: newFacilities });
    };

    const addFacility = () => {
        setContent({ ...content, facilities: [...content.facilities, "New facility description..."] });
    };

    const removeFacility = (idx) => {
        const newFacilities = content.facilities.filter((_, i) => i !== idx);
        setContent({ ...content, facilities: newFacilities });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-bold flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Loading About Us CMS...</div>;

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black text-[#0D2C54] flex items-center gap-2">
                        <Info className="w-6 h-6 text-accent" />
                        About Us Content Manager
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Edit the main description and the bullet points shown on the homepage.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleResetToDefaults}
                        disabled={saving}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-colors border border-gray-200"
                        title="Reset Page to Original Defaults"
                    >
                        Reset
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#0D2C54] hover:bg-[#123A6B] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-colors"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Description Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                        Main Introduction Paragraph
                    </label>
                    <textarea 
                        value={content.description}
                        onChange={(e) => setContent({...content, description: e.target.value})}
                        rows={5}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all resize-none leading-relaxed"
                        placeholder="Welcome to Navrachna Public School..."
                    />
                </div>

                {/* Facilities List Field */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                            School Facilities / Features List
                        </label>
                        <button 
                            onClick={addFacility}
                            className="bg-[#0D2C54]/10 text-[#0D2C54] hover:bg-[#0D2C54]/20 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add Facility
                        </button>
                    </div>

                    <div className="space-y-3">
                        {content.facilities.map((facility, idx) => (
                            <div key={idx} className="flex gap-3">
                                <span className="bg-gray-100 text-gray-500 w-10 flex items-center justify-center rounded-lg font-bold">
                                    {idx + 1}
                                </span>
                                <input 
                                    type="text"
                                    value={facility}
                                    onChange={(e) => handleFacilityChange(idx, e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none"
                                />
                                <button 
                                    onClick={() => removeFacility(idx)}
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                    title="Remove Facility"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        {content.facilities.length === 0 && (
                            <p className="text-gray-400 text-center py-4 border-2 border-dashed border-gray-100 rounded-xl">
                                No facilities listed. Add one!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutAdmin;
