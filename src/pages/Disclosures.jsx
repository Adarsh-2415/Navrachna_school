import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FileText, Info, GraduationCap, MapPin, Mail, Phone, ShieldCheck, Loader2, ExternalLink } from 'lucide-react';

const Disclosures = () => {
    const defaultGeneralInfoIcons = [
        <Info className="w-5 h-5" />,
        <ShieldCheck className="w-5 h-5" />,
        <FileText className="w-5 h-5" />,
        <MapPin className="w-5 h-5" />,
        <GraduationCap className="w-5 h-5" />,
        <Mail className="w-5 h-5" />,
        <Phone className="w-5 h-5" />
    ];

    const [content, setContent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'site_content', 'disclosures'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                setContent({
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
                        { label: "COPIES OF SOCIETIES/TRUST REGISTRATION", details: "Click to View", isLink: true },
                        { label: "COPY OF NOC ISSUED BY STATE GOVT", details: "Click to View", isLink: true },
                        { label: "COPIES OF RECOGNITION CERTIFICATE RTE", details: "Click to View", isLink: true },
                        { label: "COPY OF VALID BUILDING SAFETY CERTIFICATE", details: "Click to View", isLink: true },
                        { label: "COPY OF VALID FIRE SAFETY CERTIFICATE", details: "Click to View", isLink: true },
                        { label: "COPY OF THE DEO CERTIFICATE", details: "Click to View", isLink: true },
                        { label: "COPIES OF WATER, HEALTH CERTIFICATES", details: "Click to View", isLink: true }
                    ],
                    resultsInfo: [
                        { label: "FEE STRUCTURE OF THE SCHOOL", details: "Click to View", isLink: true },
                        { label: "ANNUAL ACADEMIC CALENDAR", details: "Click to View", isLink: true },
                        { label: "LIST OF SCHOOL MANAGEMENT COMMITTEE", details: "Click to View", isLink: true },
                        { label: "LIST OF PARENTS TEACHERS ASSOCIATION", details: "Click to View", isLink: true }
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
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const [viewing, setViewing] = useState(null);

    const handleViewFile = async (url) => {
        if (!url) return;

        if (url.startsWith('db://')) {
            const docId = url.replace('db://', '');
            setViewing(docId);
            try {
                const docSnap = await getDoc(doc(db, 'disclosure_pdfs', docId));
                if (docSnap.exists()) {
                    const { base64 } = docSnap.data();
                    
                    // Convert base64 to Blob
                    const base64Content = base64.split(',')[1];
                    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
                    const byteCharacters = atob(base64Content);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: mimeType });
                    
                    // Create object URL and open in new tab
                    const blobUrl = URL.createObjectURL(blob);
                    window.open(blobUrl, '_blank');
                    
                    // Cleanup (optional, but good for memory)
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                } else {
                    alert("File not found in database.");
                }
            } catch (error) {
                console.error("Error fetching file from DB:", error);
                alert("Failed to load file from database.");
            } finally {
                setViewing(null);
            }
        } else if (url !== "Click to View" && url !== "#") {
            window.open(url, '_blank');
        }
    };

    if (!content) return (
        <div className="bg-white min-h-screen flex items-center justify-center pt-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#0D2C54]" />
        </div>
    );

    const TableRow = ({ info, isDocument = false, isResult = false }) => (
        <>
            <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-6 px-6 text-gray-500 font-medium align-top">{info.sl}</td>
                <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                        {!isDocument && !isResult && (
                            <span className="p-2 bg-[#0D2C54]/5 rounded-lg text-[#0D2C54] group-hover:bg-[#0D2C54] group-hover:text-white transition-colors">
                                {defaultGeneralInfoIcons[info.originalIdx] || <Info className="w-5 h-5"/>}
                            </span>
                        )}
                        <span className="font-bold text-[#0D2C54] text-sm md:text-base leading-tight uppercase">
                            {isResult ? info.session : info.label}
                        </span>
                    </div>
                </td>
                {isResult ? (
                    <>
                        <td className="py-6 px-6">
                            <span className="text-gray-600 font-semibold">{info.enrollment}</span>
                        </td>
                        <td className="py-6 px-6">
                            <span className="text-gray-600 font-semibold">{info.pass}</span>
                        </td>
                    </>
                ) : (
                    <td className="py-6 px-6">
                        {isDocument && info.isLink && info.details && info.details !== "NA" && info.details !== "" ? (
                            <button 
                                onClick={() => handleViewFile(info.details)} 
                                disabled={viewing === info.details.replace('db://', '')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D2C54] text-white text-sm font-bold rounded-lg hover:bg-[#123A6B] transition-all shadow-sm disabled:opacity-50"
                            >
                                {viewing === info.details.replace('db://', '') ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <FileText className="w-4 h-4" />
                                )}
                                Click to View
                            </button>
                        ) : (
                            <span className="text-gray-600 font-semibold leading-relaxed">
                                {info.details || "NA"}
                            </span>
                        )}
                    </td>
                )}
            </tr>
            {info.isSubParent && info.subItems?.map((sub, idx) => (
                <tr key={idx} className="bg-gray-50/30">
                    <td className="py-3 px-6"></td>
                    <td className="py-3 px-6 pl-12">
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full border border-gray-400"></span>
                            <span className="text-sm font-bold uppercase text-gray-500">{sub.label}</span>
                        </div>
                    </td>
                    <td className="py-3 px-6">
                        <span className="text-sm font-semibold text-gray-500">{sub.details}</span>
                    </td>
                </tr>
            ))}
        </>
    );

    const InfoTable = ({ title, data, isDocument = false }) => (
        <div className="bg-white rounded-3xl shadow-[0_10px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-12">
            <div className="bg-[#0D2C54] p-6 text-white flex items-center gap-3">
                <Info className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold uppercase tracking-wider">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider w-20">SL NO.</th>
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Documents/Information</th>
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Documents</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((info, idx) => (
                            <TableRow key={idx} info={{ ...info, sl: idx + 1, originalIdx: idx }} isDocument={isDocument} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const ResultTable = ({ title, data }) => (
        <div className="bg-white rounded-3xl shadow-[0_10px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-12">
            <div className="bg-[#0D2C54] p-6 text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold uppercase tracking-wider">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider w-20">S.NO.</th>
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Session</th>
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Total Enrollment</th>
                            <th className="py-5 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Pass Percentage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((info, idx) => (
                            <TableRow key={idx} info={{ ...info, sl: idx + 1, originalIdx: idx }} isResult={true} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0D2C54] mb-4">Mandatory Public Disclosure</h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </div>

            {/* Section A */}
            <div id="general">
                <InfoTable title="A: General Information" data={content.generalInfo || []} />
            </div>

            {/* Section B */}
            <div id="documents">
                <InfoTable title="B: Documents and Information" data={content.documentsInfo || []} isDocument={true} />
            </div>

            {/* Section C */}
            <div id="results">
                <InfoTable title="C: Result and Academics" data={content.resultsInfo || []} isDocument={true} />
            </div>

            {/* Result Class X */}
            <div id="resultX">
                <ResultTable title="Result Class: X" data={content.resultXInfo || []} />
            </div>

            {/* Result Class XII */}
            {content.resultXIIInfo?.length > 0 && content.resultXIIInfo[0].session !== "-" && (
                <div id="resultXII">
                    <ResultTable title="Result Class: XII" data={content.resultXIIInfo} />
                </div>
            )}

            {/* Section D */}
            <div id="staff">
                <InfoTable title="Staff (Teaching)" data={content.staffInfo || []} />
            </div>

            {/* Section E */}
            <div id="infrastructure">
                <InfoTable title="School Infrastructure" data={content.infrastructureInfo || []} />
            </div>

            <div className="mt-12 text-center text-gray-400 text-sm italic">
                * All information is listed as per the standard CBSE mandatory disclosure requirements.
            </div>
        </motion.div>
    );
};

export default Disclosures;
