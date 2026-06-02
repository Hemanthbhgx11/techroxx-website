import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobArchitect = () => {
    const navigate = useNavigate();
    const [jaSkillsInput, setJaSkillsInput] = useState('');
    const [jaSuggestedSections, setJaSuggestedSections] = useState([]);
    const [jaSuggestedProjects, setJaSuggestedProjects] = useState([]);
    const [jaIsLoading, setJaIsLoading] = useState(false);
    const [jaError, setJaError] = useState(null);

    const generateResumeSuggestions = async () => {
        setJaIsLoading(true);
        setJaError(null);
    
        if (!jaSkillsInput.trim()) {
            setJaError("Please provide your skills to help the assistant generate tailored advice.");
            setJaIsLoading(false);
            return;
        }
    
        try {
            const prompt = `
    Analyze these skills and provide expert resume advice:
    1. Impactful resume sections for this profile (name, description, and strategic reason).
    2. 3-5 high-impact project ideas (name, description, and key skills demonstrated).
    
    Skills: ${jaSkillsInput}
    
    Respond strictly in valid JSON format:
    {
      "suggestedResumeSections": [{"sectionName": "", "description": "", "reason": ""}],
      "suggestedProjects": [{"projectName": "", "description": "", "skillsShowcased": [""]}]
    }
    `;
    
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.REACT_APP_GEMINI_API_KEY || ''; // Adjust based on Vite env variables
    
            const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            });
    
            const result = await response.json();
            
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    
            if (!text) {
                throw new Error("No suggestions returned.");
            }
    
            // Clean markdown if Gemini wraps JSON in ```json
            let cleanedText = text.trim();
    
            if (cleanedText.startsWith("```")) {
                cleanedText = cleanedText
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();
            }
    
            const data = JSON.parse(cleanedText);
    
            setJaSuggestedSections(data.suggestedResumeSections || []);
            setJaSuggestedProjects(data.suggestedProjects || []);
    
        } catch (err) {
            console.error("Resume generation error:", err);
            setJaError("Failed to generate suggestions. Please try again.");
        } finally {
            setJaIsLoading(false);
        }
    };
    
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Description copied!");
        });
    };

    return (
        <section className="section-padding animate-enter">
            <div className="container">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => navigate('/services')}>
                        <i className="fas fa-arrow-left"></i> Back to Services
                    </button>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <h2 className="section-title" style={{ marginBottom: 0, fontSize: '2rem' }}>Job Architect</h2>
                        <span style={{fontSize:'0.7rem', padding:'2px 6px', background:'#ea580c', color:'white', borderRadius:'4px', fontWeight:'bold', textTransform:'uppercase'}}>Beta</span>
                    </div>
                </div>

                <div style={{maxWidth: '800px', margin: '0 auto'}}>
                    <div style={{textAlign: 'center', marginBottom: '30px'}}>
                        <h3 style={{color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '10px'}}>AI Resume Assistant</h3>
                        <p style={{color: 'var(--text-muted)'}}>Enter your skills below to receive industry-standard resume architecture and project roadmaps tailored for you.</p>
                    </div>

                    <div style={{background: 'var(--bg-panel)', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)'}}>
                        <div style={{marginBottom: '20px'}}>
                            <label style={{display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', textTransform: 'uppercase'}}>Your Skillset</label>
                            <textarea 
                                value={jaSkillsInput}
                                onChange={(e) => setJaSkillsInput(e.target.value)}
                                placeholder="e.g. AI, Machine Learning, Python, Full Stack Development, IoT..."
                                style={{width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '120px', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', resize: 'vertical'}}
                            />
                        </div>
                        <button 
                            onClick={generateResumeSuggestions}
                            disabled={jaIsLoading}
                            className="btn btn-primary" 
                            style={{width: '100%', padding: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}
                        >
                            {jaIsLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Analyzing Skills...
                                </>
                            ) : "Get Expert Suggestions"}
                        </button>
                        {jaError && <p style={{color: 'red', marginTop: '15px', textAlign: 'center', fontSize: '0.9rem'}}>{jaError}</p>}
                    </div>

                    {(jaSuggestedSections.length > 0 || jaSuggestedProjects.length > 0) && (
                        <div className="animate-enter" style={{marginTop: '40px'}}>
                            {/* Resume Sections */}
                            <div style={{marginBottom: '40px'}}>
                                <h3 style={{color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.3rem'}}>Recommended Resume Sections</h3>
                                <div style={{display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
                                    {jaSuggestedSections.map((item, idx) => (
                                        <div key={idx} style={{background: 'var(--bg-panel)', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}}>
                                            <h4 style={{color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold'}}>{item.sectionName}</h4>
                                            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5'}}>{item.description}</p>
                                            <div style={{fontSize: '0.8rem', color: '#ea580c', fontWeight: '600', textTransform: 'uppercase'}}>Strategic Reason:</div>
                                            <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic'}}>{item.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            <div>
                                <h3 style={{color: 'var(--secondary-blue)', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.3rem'}}>Showcase Projects</h3>
                                <div style={{display: 'grid', gap: '20px'}}>
                                    {jaSuggestedProjects.map((proj, idx) => (
                                        <div key={idx} onClick={() => handleCopy(proj.description)} style={{background: 'var(--bg-panel)', padding: '25px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--secondary-blue)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative'}}>
                                            <i className="fas fa-copy" style={{position: 'absolute', top: '20px', right: '20px', color: '#cbd5e1'}}></i>
                                            <h4 style={{color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'bold'}}>{proj.projectName}</h4>
                                            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '15px', lineHeight: '1.6'}}>{proj.description}</p>
                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                                                {proj.skillsShowcased.map((skill, sIdx) => (
                                                    <span key={sIdx} style={{background: '#f1f5f9', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase'}}>{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p style={{textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.85rem'}}>Click on a project card to copy the description.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default JobArchitect;
