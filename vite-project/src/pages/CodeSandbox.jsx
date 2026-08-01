import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeSandbox = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');

    useEffect(() => {
        // Load starter code from localStorage or default template
        const storedCode = localStorage.getItem('sandbox_starter_code');
        if (storedCode) {
            setCode(storedCode);
            updatePreview(storedCode);
        } else {
            const defaultCode = `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; background-color: #f4f6f9; color: #333; padding: 30px; text-align: center; }
  h1 { color: #ea580c; }
  .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: inline-block; }
</style>
</head>
<body>

<div class="card">
  <h1>Tech Roxx Sandbox</h1>
  <p>Modify this code and click <strong>Run Code</strong> above!</p>
</div>

</body>
</html>`;
            setCode(defaultCode);
            updatePreview(defaultCode);
        }
    }, []);

    const updatePreview = (rawCode) => {
        // Safe sanitization or injection into iframe doc
        setPreviewSrc(rawCode);
    };

    const handleRun = () => {
        updatePreview(code);
    };

    useEffect(() => {
        const iframe = document.getElementById('preview-iframe');
        if (iframe && previewSrc) {
            const document = iframe.contentDocument || iframe.contentWindow.document;
            document.open();
            document.write(previewSrc);
            document.close();
        }
    }, [previewSrc]);

    const handleReset = () => {
        localStorage.removeItem('sandbox_starter_code');
        window.location.reload();
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(code);
        alert('Code copied to clipboard!');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: '#0f172a',
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Header Control Panel */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 24px',
                background: '#1e293b',
                borderBottom: '1px solid #334155',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button 
                        onClick={() => navigate('/learn')}
                        style={{
                            background: '#334155',
                            border: 'none',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: '0.2s'
                        }}
                    >
                        <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to Learn
                    </button>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-terminal" style={{ color: '#ea580c' }}></i> Sandbox Editor
                    </h2>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                        onClick={handleCopyToClipboard}
                        style={{
                            background: 'transparent',
                            border: '1px solid #475569',
                            color: '#cbd5e1',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: '0.2s'
                        }}
                    >
                        <i className="far fa-copy" style={{ marginRight: '6px' }}></i> Copy
                    </button>
                    <button 
                        onClick={handleReset}
                        style={{
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#f87171',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: '0.2s'
                        }}
                    >
                        <i className="fas fa-redo" style={{ marginRight: '6px' }}></i> Reset
                    </button>
                    <button 
                        onClick={handleRun}
                        style={{
                            background: '#ea580c',
                            border: 'none',
                            color: 'white',
                            padding: '8px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                            transition: '0.2s'
                        }}
                        className="sandbox-run-btn"
                    >
                        <i className="fas fa-play" style={{ marginRight: '8px' }}></i> Run Code
                    </button>
                </div>
            </header>

            {/* Split Workspace */}
            <div style={{
                display: 'flex',
                flex: 1,
                overflow: 'hidden',
                flexDirection: window.innerWidth < 768 ? 'column' : 'row'
            }} className="sandbox-workspace">
                {/* Code Editor Panel */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #334155',
                    background: '#0f172a'
                }}>
                    <div style={{
                        padding: '8px 16px',
                        background: '#1e293b',
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#94a3b8',
                        letterSpacing: '0.5px'
                    }}>
                        Source Code Editor
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{
                            flex: 1,
                            background: '#090d16',
                            color: '#34d399',
                            fontFamily: '"JetBrains Mono", Consolas, monospace',
                            fontSize: '14px',
                            padding: '20px',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            lineHeight: '1.6'
                        }}
                        placeholder="Write HTML, CSS, or JS code here..."
                    />
                </div>

                {/* Preview Window Panel */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff'
                }}>
                    <div style={{
                        padding: '8px 16px',
                        background: '#e2e8f0',
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#64748b',
                        letterSpacing: '0.5px'
                    }}>
                        Result Preview
                    </div>
                    <iframe
                        id="preview-iframe"
                        style={{
                            flex: 1,
                            border: 'none',
                            background: '#ffffff',
                            width: '100%',
                            height: '100%'
                        }}
                        title="Sandbox Output Preview"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>
            <style>{`
                .sandbox-run-btn:hover {
                    transform: translateY(-2px);
                    background: #f97316 !important;
                }
                @media (max-width: 767px) {
                    .sandbox-workspace {
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CodeSandbox;
