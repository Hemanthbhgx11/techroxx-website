import React from 'react';

const TermsOfService = () => {
    return (
        <div style={{
            padding: '120px 24px 60px 24px',
            maxWidth: '900px',
            margin: '0 auto',
            color: 'var(--text-main, #334155)',
            lineHeight: '1.8',
            fontFamily: 'Inter, sans-serif'
        }}>
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight" style={{
                background: 'linear-gradient(135deg, var(--primary-brand, #ea580c) 0%, var(--secondary-blue, #1d4ed8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>Terms of Service</h1>
            <p className="opacity-75 mb-6 text-sm">Last updated: June 26, 2026</p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">1. Agreement to Terms</h2>
                <p className="mb-4">
                    Welcome to Techroxx Ecosystem. By accessing or using our website located at <strong>https://techroxx.in</strong>, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">2. Use License</h2>
                <p className="mb-4">
                    Permission is granted to temporarily view the materials (information or software) on Techroxx's website for personal, non-commercial transitory viewing only. Under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on Techroxx's website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                <p className="mb-4">
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Techroxx at any time.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">3. Disclaimer</h2>
                <p className="mb-4">
                    The materials on Techroxx's website are provided on an 'as is' basis. Techroxx makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">4. Limitations</h2>
                <p className="mb-4">
                    In no event shall Techroxx or its partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Techroxx's website, even if Techroxx or a Techroxx authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">5. Accuracy of Materials</h2>
                <p className="mb-4">
                    The materials appearing on Techroxx's website could include technical, typographical, or photographic errors. Techroxx does not warrant that any of the materials on its website are accurate, complete, or current. Techroxx may make changes to the materials contained on its website at any time without notice. However Techroxx does not make any commitment to update the materials.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">6. Links</h2>
                <p className="mb-4">
                    Techroxx has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Techroxx of the site. Use of any such linked website is at the user's own risk.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">7. Modifications</h2>
                <p className="mb-4">
                    Techroxx may revise these Terms of Service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">8. Governing Law</h2>
                <p className="mb-4">
                    Any claim relating to Techroxx's website shall be governed by the laws of India, without regard to its conflict of law provisions.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">9. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about these Terms of Service, please contact us at <strong>management@techroxx.in</strong>.
                </p>
            </section>
        </div>
    );
};

export default TermsOfService;
