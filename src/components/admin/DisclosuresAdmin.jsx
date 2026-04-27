import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Save, Loader2, FileText, Upload, AlertCircle, Plus, Trash2 } from 'lucide-react';

const PdfUploader = ({ currentUrl, onUploadPending, onDelete }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (Firestore limit is 1MB for a single doc)
        if (file.size > 800000) { // 800KB limit to stay safe with Base64 overhead
            alert("File is too large! Please compress your PDF to under 800KB before uploading.");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            onUploadPending(base64String); // Send base64 to parent state
            setUploading(false);
        };
        reader.onerror = () => {
            alert("Failed to read file.");
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex gap-2 flex-none items-center">
            {currentUrl && currentUrl !== "NA" && !currentUrl.includes("example.com") && currentUrl !== "Click to View" && (
                <button 
                    onClick={onDelete}
                    className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 px-4 py-3 rounded-lg font-bold text-sm transition-colors border border-red-200 flex items-center justify-center gap-2"
                    title="Remove File"
                >
                    Delete File
                </button>
            )}
            <label className="bg-[#0D2C54]/10 hover:bg-[#0D2C54]/20 text-[#0D2C54] px-4 py-3 rounded-lg font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-colors border border-transparent h-full min-w-[160px] relative overflow-hidden">
                <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
                <div className="relative z-10 flex items-center gap-2">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? "Processing..." : (currentUrl?.startsWith("data:") ? "File Ready (unsaved)" : "Upload PDF")}
                </div>
            </label>
        </div>
    );
};

const defaultContent = {
    generalInfo: [
        { label: "NAME OF THE SCHOOL", details: "NAVRACHNA PUBLIC SCHOOL" },
        { label: "AFFILIATION NO. (IF APPLICABLE)", details: "-" },
        { label: "SCHOOL CODE (IF APPLICABLE)", details: "-" },
        { label: "COMPLETE ADDRESS WITH PIN CODE", details: "AKBARPUR-FAZILPUR (ASAF NAGAR – IQBALPUR ROAD) Roorkee, Uttarakhand, India 247668" },
        { label: "PRINCIPAL NAME & QUALIFICATION", details: "MRS. ANURADHA, M.A. B.Ed" },
        { label: "SCHOOL EMAIL ID", details: "navrachnaroorkee@gmail.com" },
        { label: "CONTACT DETAILS (LANDLINE/MOBILE)", details: "9568198225" }
    ],
    documentsInfo: [
        { label: "COPIES OF AFFILIATION/UPGRADATION LETTER", details: "NA", isLink: false },
        { label: "COPIES OF SOCIETIES/TRUST REGISTRATION", details: "https://example.com/link", isLink: true },
        { label: "COPY OF NOC ISSUED BY STATE GOVT", details: "https://example.com/link", isLink: true },
        { label: "COPIES OF RECOGNITION CERTIFICATE RTE", details: "https://example.com/link", isLink: true },
        { label: "COPY OF VALID BUILDING SAFETY CERTIFICATE", details: "https://example.com/link", isLink: true },
        { label: "COPY OF VALID FIRE SAFETY CERTIFICATE", details: "https://example.com/link", isLink: true },
        { label: "COPY OF THE DEO CERTIFICATE", details: "https://example.com/link", isLink: true },
        { label: "COPIES OF WATER, HEALTH CERTIFICATES", details: "https://example.com/link", isLink: true }
    ],
    resultsInfo: [
        { label: "FEE STRUCTURE OF THE SCHOOL", details: "https://example.com/link", isLink: true },
        { label: "ANNUAL ACADEMIC CALENDAR", details: "https://example.com/link", isLink: true },
        { label: "LIST OF SCHOOL MANAGEMENT COMMITTEE", details: "https://example.com/link", isLink: true },
        { label: "LIST OF PARENTS TEACHERS ASSOCIATION", details: "https://example.com/link", isLink: true }
    ],
    staffInfo: [
        { label: "PRINCIPAL", details: "MRS. ANURADHA , M.A. B.Ed," },
        { label: "TOTAL NO. OF TEACHERS", details: "14" },
        { label: "TEACHERS SECTION RATIO", details: "1.5:1" },
        { label: "DETAILS OF SPECIAL EDUCATOR", details: "Ms. PARVATI PANDEY" },
        { label: "DETAILS OF COUNSELLOR", details: "Dr. SUCHI SINGH" }
    ],
    infrastructureInfo: [
        { label: "TOTAL CAMPUS AREA (IN SQ MTR)", details: "8438Sq. Mtr" },
        { label: "NO. AND SIZE OF CLASSROOMS", details: "16 & (47 Sqmt)" },
        { label: "NO. AND SIZE OF LABORATORIES", details: "6 & (56 Sqmt)" },
        { label: "INTERNET FACILITY (Y/N)", details: "YES" },
        { label: "NO. OF GIRLS TOILETS", details: "5" },
        { label: "NO. OF BOYS TOILETS", details: "5" },
        { label: "LINK OF YOUTUBE VIDEO OF INSPECTION", details: "NA" }
    ],
    resultXInfo: [
        { session: "2022-23", enrollment: "-", pass: "-" },
        { session: "2021-22", enrollment: "-", pass: "-" },
        { session: "2020-21", enrollment: "-", pass: "-" }
    ],
    resultXIIInfo: [
        { session: "2022-23", enrollment: "-", pass: "-" }
    ]
};

const DisclosuresAdmin = () => {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const docRef = doc(db, 'site_content', 'disclosures');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setContent({ ...defaultContent, ...docSnap.data() });
                } else {
                    setContent(defaultContent);
                }
            } catch (error) {
                console.error("Error fetching Disclosures content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            // First, process any pending base64 strings
            const updatedContent = { ...content };
            
            // Function to check and upload base64 fields
            const processTable = async (tableName) => {
                const rows = [...updatedContent[tableName]];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].details?.startsWith('data:')) {
                        // This is a new base64 file that needs to be moved to its own document
                        const docRef = await addDoc(collection(db, 'disclosure_pdfs'), {
                            base64: rows[i].details,
                            name: rows[i].label,
                            timestamp: new Date()
                        });
                        // Replace base64 in main doc with a reference ID
                        rows[i].details = `db://${docRef.id}`;
                    }
                }
                updatedContent[tableName] = rows;
            };

            await processTable('documentsInfo');
            await processTable('resultsInfo');

            // Save the main doc with references
            await setDoc(doc(db, 'site_content', 'disclosures'), updatedContent);
            setContent(updatedContent);
            alert("Disclosures tables and files saved successfully!");
        } catch (error) {
            console.error("Error saving Disclosures content:", error);
            alert("Failed to save. Please check console.");
        } finally {
            setSaving(false);
        }
    };

    const handleResetToDefaults = async () => {
        if (window.confirm("Are you sure you want to restore the original Disclosure tables? This will overwrite your changes.")) {
            setSaving(true);
            try {
                await setDoc(doc(db, 'site_content', 'disclosures'), defaultContent);
                setContent(defaultContent);
                alert("Disclosures restored to default settings!");
            } catch (error) {
                console.error("Error resetting content:", error);
            } finally {
                setSaving(false);
            }
        }
    };

    const handleLabelDetailsChange = (tableName, idx, field, val) => {
        const newArr = [...content[tableName]];
        newArr[idx] = { ...newArr[idx], [field]: val };
        setContent({ ...content, [tableName]: newArr });
    };

    const handleAddSession = (tableName) => {
        const newArr = [...content[tableName], { session: "20XX-XX", enrollment: "-", pass: "-" }];
        setContent({ ...content, [tableName]: newArr });
    };

    const handleDeleteSession = (tableName, idx) => {
        if (content[tableName].length <= 1) {
            alert("At least one session must remain in the table.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this session row?")) {
            const newArr = content[tableName].filter((_, i) => i !== idx);
            setContent({ ...content, [tableName]: newArr });
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-bold flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Loading Disclosures CMS...</div>;

    const renderLabelDetailsTable = (title, tableName) => (
        <div className="mb-12">
            <h4 className="text-xl font-black text-[#0D2C54] mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200 uppercase tracking-widest">{title}</h4>
            <div className="space-y-3">
                {content[tableName].map((row, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-3">
                        <span className="bg-gray-100 text-gray-500 w-full md:w-10 flex flex-none items-center justify-center rounded-lg font-bold py-2 md:py-0">
                            {idx + 1}
                        </span>
                        <input 
                            type="text"
                            value={row.label}
                            onChange={(e) => handleLabelDetailsChange(tableName, idx, 'label', e.target.value)}
                            className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none font-bold text-sm bg-gray-50"
                            placeholder="Heading..."
                        />
                        <div className="flex-1 flex gap-2 w-full">
                            <input 
                                type="text"
                                value={row.details}
                                onChange={(e) => handleLabelDetailsChange(tableName, idx, 'details', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none"
                                placeholder={row.isLink ? "Insert URL here or upload a file ->" : "Details text..."}
                            />
                            {row.isLink && (
                                <PdfUploader 
                                    currentUrl={row.details}
                                    onUploadPending={(base64) => handleLabelDetailsChange(tableName, idx, 'details', base64)} 
                                    onDelete={() => handleLabelDetailsChange(tableName, idx, 'details', 'NA')}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderResultsTable = (title, tableName) => (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-xl font-black text-[#0D2C54] uppercase tracking-widest leading-none">{title}</h4>
                <button 
                    onClick={() => handleAddSession(tableName)}
                    className="bg-[#0D2C54] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#123A6B] transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Session
                </button>
            </div>
            <div className="space-y-3 overflow-x-auto">
                <div className="flex gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest px-2 min-w-[700px]">
                    <div className="w-10">NO</div>
                    <div className="flex-1">Session</div>
                    <div className="flex-1">Enrollment</div>
                    <div className="flex-1">Pass %</div>
                    <div className="w-12"></div>
                </div>
                {content[tableName].map((row, idx) => (
                    <div key={idx} className="flex gap-3 min-w-[700px] items-center">
                        <span className="bg-gray-100 text-gray-500 w-10 h-11 flex flex-none items-center justify-center rounded-lg font-bold">
                            {idx + 1}
                        </span>
                        <input 
                            type="text"
                            value={row.session}
                            onChange={(e) => handleLabelDetailsChange(tableName, idx, 'session', e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none font-bold text-sm bg-gray-50"
                        />
                        <input 
                            type="text"
                            value={row.enrollment}
                            onChange={(e) => handleLabelDetailsChange(tableName, idx, 'enrollment', e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none"
                        />
                        <input 
                            type="text"
                            value={row.pass}
                            onChange={(e) => handleLabelDetailsChange(tableName, idx, 'pass', e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0D2C54] outline-none"
                        />
                        <button 
                            onClick={() => handleDeleteSession(tableName, idx)}
                            className="w-12 h-11 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            title="Delete Session"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                <div>
                    <h3 className="text-2xl font-black text-[#0D2C54] flex items-center gap-2">
                        <FileText className="w-6 h-6 text-accent" />
                        Disclosures Tables Manager
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Edit the structured data tables displayed securely on the public disclosures page.
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

            <div className="p-8">
                {renderLabelDetailsTable("General Information", "generalInfo")}
                {renderLabelDetailsTable("Documents & Information (Links)", "documentsInfo")}
                {renderLabelDetailsTable("Results & Academics (Links)", "resultsInfo")}
                {renderLabelDetailsTable("Staff Selection", "staffInfo")}
                {renderLabelDetailsTable("School Infrastructure", "infrastructureInfo")}
                {renderResultsTable("Class X Results", "resultXInfo")}
                {renderResultsTable("Class XII Results", "resultXIIInfo")}
            </div>
        </div>
    );
};

export default DisclosuresAdmin;
