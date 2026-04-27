import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Save, Loader2, FileText, ChevronDown, CreditCard, Calendar } from 'lucide-react';
import FeeAdmin from './FeeAdmin';
import HolidayAdmin from './HolidayAdmin';

const availablePages = [
    { id: 'admissions', label: 'Admissions Page' },
    { id: 'classroom', label: 'Classroom Page' },
    { id: 'computer_lab', label: 'Computer Lab Page' },
    { id: 'library', label: 'Library Page' },
    { id: 'rules', label: 'Rules & Guidelines Page' },
    { id: 'fee_structure', label: 'Fee Structure Management', icon: CreditCard },
    { id: 'holiday_list', label: 'Holiday List Management', icon: Calendar }
];

const defaultSchemas = {
    admissions: {
        title: "Admission Open",
        subtitle: "Nursery to class 12th",
        description: "Your journey towards excellence begins here. Join a community dedicated to holistic development and academic brilliance.",
        cta_text: "Unlock Your Child's Full Potential at Navrachna"
    },
    classroom: {
        title: "Nurturing Environments",
        subtitle: "Elite Infrastructure",
        description: "Spacious, clean, and modern classrooms designed to inspire curiosity and effective learning.",
        cta_text: "Creating a space where curiosity leads to lifelong motivation and inspirational learning."
    },
    computer_lab: {
        title: "Creative Computing",
        subtitle: "Digital Excellence Center",
        description: "Computers nowadays are not only about computing, they are about living. Proficiency has become a key to success in the modern world.",
        cta_text: "Mastering the Digital Frontier"
    },
    library: {
        title: "Knowledge Hub",
        subtitle: "World Class Library",
        description: "A sanctuary of knowledge featuring thousands of books, digital resources, and quiet reading zones.",
        cta_text: "Fostering a lifelong love for reading and continuous learning."
    },
    rules: {
        title: "Rules & Guidelines",
        subtitle: "Discipline & Harmony",
        description: "To maintain a healthy and productive learning environment, we expect all students and parents to adhere to these core guidelines.",
        cta_text: "Training minds, building values, and shaping a brighter future.",
        warning_msg: "Use of foul language and/or abusive behaviour may lead to suspension.",
        generalRules: [
            "Students are not allowed to go out of the campus during school hours, including recess time.",
            "No student shall be absent from class without sufficient reason. Parents/Guardians must clearly state the reason for the absence in the Leave Record of the School Diary.",
            "Timely deposition of fee is necessary as per the prescribed schedule given at the time of admission.",
            "The school prescribes uniform for all students. Every student should attend the school in the prescribed uniform. Students are expected to take pride in their personal appearance and to conform to all rules governing the school uniform. It is to instill a sense of belonging, camaraderie among fellow students.",
            "Students will not wear ornaments/carry valuables in school.",
            "Detailed guidelines are given in school diary."
        ]
    }
};

const PagesAdmin = () => {
    const [selectedPage, setSelectedPage] = useState('admissions');
    const [content, setContent] = useState(defaultSchemas['admissions']);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (selectedPage === 'fee_structure' || selectedPage === 'holiday_list') {
            setLoading(false);
            return;
        }
        
        const fetchContent = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, 'pages', selectedPage);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    // Merge firebase data on top of defaults to prevent missing arrays!
                    setContent({ ...defaultSchemas[selectedPage], ...docSnap.data() });
                } else {
                    setContent(defaultSchemas[selectedPage]);
                }
            } catch (error) {
                console.error("Error fetching page content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [selectedPage]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'pages', selectedPage), content);
            alert(`${availablePages.find(p => p.id === selectedPage).label} saved successfully!`);
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save. Please check console.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setContent({
            ...content,
            [e.target.name]: e.target.value
        });
    };

    const handleResetToDefaults = async () => {
        if (window.confirm("Are you sure you want to reset this page to its original default content? This cannot be undone.")) {
            setSaving(true);
            try {
                const defaultContent = defaultSchemas[selectedPage];
                await setDoc(doc(db, 'pages', selectedPage), defaultContent);
                setContent(defaultContent);
                alert(`${availablePages.find(p => p.id === selectedPage).label} has been restored to default settings!`);
            } catch (error) {
                console.error("Error resetting content:", error);
                alert("Failed to reset. Please check console.");
            } finally {
                setSaving(false);
            }
        }
    };

    const handleArrayChange = (arrayName, idx, val) => {
        const newArr = [...content[arrayName]];
        newArr[idx] = val;
        setContent({ ...content, [arrayName]: newArr });
    };

    const handleAddArrayItem = (arrayName) => {
        const newArr = content[arrayName] ? [...content[arrayName]] : [];
        newArr.push("New item description...");
        setContent({ ...content, [arrayName]: newArr });
    };

    const handleRemoveArrayItem = (arrayName, idx) => {
        const newArr = content[arrayName].filter((_, i) => i !== idx);
        setContent({ ...content, [arrayName]: newArr });
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-black text-[#0D2C54] flex items-center gap-2">
                        <FileText className="w-6 h-6 text-accent" />
                        Pages Manager
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Select a page to edit its main textual content.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <select 
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(e.target.value)}
                            className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all font-bold text-gray-700 bg-white cursor-pointer"
                        >
                            {availablePages.map(page => (
                                <option key={page.id} value={page.id}>{page.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {selectedPage !== 'fee_structure' && selectedPage !== 'holiday_list' && (
                        <div className="flex gap-2">
                            <button 
                                onClick={handleResetToDefaults}
                                disabled={saving || loading}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-colors border border-gray-200"
                                title="Reset Page to Original Defaults"
                            >
                                Reset
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={saving || loading}
                                className="bg-[#0D2C54] hover:bg-[#123A6B] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-colors"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 space-y-6">
                {loading ? (
                    <div className="py-20 text-center text-gray-500 font-bold flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-[#0D2C54]" />
                        Loading page data...
                    </div>
                ) : selectedPage === 'fee_structure' ? (
                    <FeeAdmin />
                ) : selectedPage === 'holiday_list' ? (
                    <HolidayAdmin />
                ) : (
                    <div className="grid gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Hero Main Title
                            </label>
                            <input 
                                type="text"
                                name="title"
                                value={content.title || ''}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] outline-none font-medium"
                                placeholder="e.g. Admission Open"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Hero Subtitle / Highlight text
                            </label>
                            <input 
                                type="text"
                                name="subtitle"
                                value={content.subtitle || ''}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] outline-none font-medium"
                                placeholder="e.g. Nursery to class 12th"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Main Description Paragraph
                            </label>
                            <textarea 
                                name="description"
                                value={content.description || ''}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0D2C54] outline-none resize-none leading-relaxed"
                                placeholder="Page description text..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Call to Action / Footer Text
                            </label>
                            <input 
                                type="text"
                                name="cta_text"
                                value={content.cta_text || ''}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] outline-none font-medium"
                                placeholder="Text shown at the bottom of the page..."
                            />
                        </div>

                        {selectedPage === 'rules' && (
                            <div className="pt-8 border-t border-gray-100">
                                <h4 className="text-xl font-black text-[#0D2C54] mb-6">Specific Content for Rules Page</h4>
                                
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-red-500 uppercase tracking-wide mb-2">
                                        Red Warning Message
                                    </label>
                                    <input 
                                        type="text"
                                        name="warning_msg"
                                        value={content.warning_msg || ''}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl border border-red-200 focus:border-red-500 outline-none font-medium text-red-700 bg-red-50/50"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                                            General Rules Guidelines List
                                        </label>
                                        <button 
                                            onClick={() => handleAddArrayItem('generalRules')}
                                            className="bg-[#0D2C54]/10 text-[#0D2C54] hover:bg-[#0D2C54]/20 px-3 py-1.5 rounded-lg font-bold text-sm transition-colors"
                                        >
                                            + Add Rule
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(content.generalRules || []).map((rule, idx) => (
                                            <div key={idx} className="flex gap-3">
                                                <span className="bg-gray-100 text-gray-500 w-10 flex items-center justify-center rounded-lg font-bold">
                                                    {idx + 1}
                                                </span>
                                                <input 
                                                    type="text"
                                                    value={rule}
                                                    onChange={(e) => handleArrayChange('generalRules', idx, e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none"
                                                />
                                                <button 
                                                    onClick={() => handleRemoveArrayItem('generalRules', idx)}
                                                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PagesAdmin;
