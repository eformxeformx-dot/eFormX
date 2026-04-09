import React from 'react';
import { FiChevronDown, FiShield, FiFileText } from 'react-icons/fi';

const TermAndCondition = () => {
  const sections = [
    {
      title: "1. Nature of Service",
      content: "EFORMX is a private Digital Service Aggregator platform that provides digital assistance, information display, and form-filling support based on publicly available data from official government websites. We are not affiliated with any government authority and do not provide official government services or guarantees of approval, jobs, certificates, or benefits."
    },
    {
      title: "2. User Responsibilities",
      list: [
        "Provide accurate, complete, and updated information.",
        "Do not submit false, forged, or misleading documents.",
        "Do not misuse the platform for illegal or fraudulent activities.",
        "You are responsible for maintaining the confidentiality of your account credentials."
      ]
    },
    {
      title: "3. Payments & Fees",
      content: "Fees charged by EFORMX are for digital assistance and service facilitation only. Payments are generally non-refundable unless otherwise specified in the refund policy or required under applicable law."
    },
    {
      title: "4. Account & KYC Verification",
      content: "Certain services may require identity verification (KYC). Users agree to provide necessary documents for verification. Failure to comply may result in service limitations or account suspension."
    },
    {
      title: "5. Limitation of Liability",
      content: "EFORMX shall not be responsible for any delays, rejections, decisions, losses, or damages arising from actions or decisions taken by government authorities, third-party service providers, or external systems."
    },
    {
      title: "6. Data Usage",
      content: "User data is collected, processed, and stored in accordance with our Privacy Policy."
    },
    {
      title: "7. Account Suspension or Termination",
      content: "We reserve the right to suspend or terminate user accounts without prior notice if users violate these terms, provide false information, or engage in unlawful activity."
    },
    {
      title: "8. Intellectual Property",
      content: "All platform content, design, branding, and materials belong to EFORMX Digital Solutions Pvt. Ltd. and may not be copied, reproduced, or distributed without permission."
    },
    {
      title: "9. Changes to Terms",
      content: "We reserve the right to update or modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms."
    },
    {
      title: "10. Governing Law",
      content: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of competent courts in India."
    }
  ];

  return (
    <div className="min-h-screen bg-light pt-32 pb-20">
      <main className="max-w-5xl mx-auto px-4 md:px-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="bg-secondary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FiFileText size={40} className="text-secondary" />
          </div>
          <h1 className="text-4xl font-display font-black text-primary tracking-tight">Terms & Conditions</h1>
          <p className="text-muted mt-2">Last Updated: April 2026</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          
          {/* English Section Header */}
          <div className="bg-primary px-8 py-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <FiShield size={24} className="text-secondary" />
              <h3 className="text-xl font-bold">Terms & Conditions (English)</h3>
            </div>
            <FiChevronDown className="w-6 h-6 text-secondary" />
          </div>

          {/* English Content */}
          <div className="p-10 text-slate-600 leading-relaxed space-y-8">
            <p className="italic text-lg text-primary font-medium border-l-4 border-secondary pl-6">
              These Terms & Conditions govern the use of the EFORMX application and website operated by EFORMX Digital Solutions Pvt. Ltd. By accessing or using our platform, you agree to comply with and be legally bound by these terms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {sections.slice(0, 5).map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-primary text-xl flex items-center gap-2">
                    <span className="text-secondary tracking-widest text-sm opacity-50">#{idx + 1}</span>
                    {section.title.split('. ')[1]}
                  </h4>
                  {section.content && <p className="text-muted leading-relaxed">{section.content}</p>}
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex gap-3 text-muted">
                          <span className="text-secondary mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
              {sections.slice(5).map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-primary text-xl flex items-center gap-2">
                    <span className="text-secondary tracking-widest text-sm opacity-50">#{idx + 6}</span>
                    {section.title.split('. ')[1]}
                  </h4>
                  {section.content && <p className="text-muted leading-relaxed">{section.content}</p>}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="pt-10 border-t border-slate-100 bg-slate-50 -mx-10 px-10 pb-10">
              <h4 className="font-bold text-primary text-xl mb-4">Questions about these Terms?</h4>
              <p className="text-muted mb-6">If you have any questions regarding these Terms and Conditions, please contact us.</p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-secondary font-bold">support@eformx.com</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Official Website</p>
                  <p className="text-secondary font-bold underline">https://www.eformx.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hindi Section Header */}
          <div className="bg-slate-100 px-8 py-6 flex justify-between items-center border-t border-slate-200">
            <h3 className="text-primary font-bold text-xl">नियम और शर्तें (Hindi)</h3>
            <FiChevronDown className="w-6 h-6 text-slate-400" />
          </div>
          
          <div className="p-10 text-slate-400 bg-slate-50/50 text-center italic">
            Hindi version of the terms and conditions is available upon request or in the downloadable PDF version of this document.
          </div>

        </div>
      </main>
    </div>
  );
};

export default TermAndCondition;