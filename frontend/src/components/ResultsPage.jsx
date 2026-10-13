import React, { useState } from 'react';
import { 
  Download, RotateCcw, ExternalLink, CheckCircle2, Flame, Award, 
  Sparkles, Layers, BookOpen, Target, Calendar, Clock, ChevronRight, ChevronLeft 
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultsPage = ({ roadmap, onReset }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  if (!roadmap) return null;

  const currentPhase = roadmap.phases?.[activePhaseIndex] || roadmap.phases?.[0];
  const totalPhases = roadmap.phases?.length || 0;

  const handleDownloadPDF = async () => {
    const element = document.getElementById('roadmap-printable-area');
    if (!element) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${roadmap.role_title.replace(/[^a-zA-Z0-9]/g, '_')}_Roadmap.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Could not export PDF. Please use browser print (Ctrl+P).');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Top Action Bar */}
      <div className="no-print" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          onClick={onReset}
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            fontSize: '14px'
          }}
        >
          <RotateCcw size={16} />
          Edit & Generate Another
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="btn-rausch"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 22px',
            fontSize: '14px'
          }}
        >
          <Download size={16} />
          {isExporting ? 'Generating PDF...' : 'Download as PDF'}
        </button>
      </div>

      <div id="roadmap-printable-area" style={{ background: '#ffffff', padding: '4px' }}>
        {/* Banner Header */}
        <div style={{ 
          padding: '28px', 
          marginBottom: '24px',
          background: '#ffffff',
          border: '1px solid #ebebeb',
          borderRadius: '16px',
          boxShadow: 'rgba(0, 0, 0, 0.04) 0 2px 6px, rgba(0, 0, 0, 0.08) 0 4px 12px'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: '#fff0f2',
              color: '#ff385c',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid #ffd1da',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              Customized Career Path
            </span>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#222222' }}>
            {roadmap.role_title} <span style={{ color: '#ff385c' }}>Roadmap</span>
          </h1>

          <p style={{ color: '#6a6a6a', fontSize: '15px', lineHeight: '1.6', marginBottom: '18px' }}>
            {roadmap.overview}
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid #ebebeb' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3f3f3f', fontSize: '14px' }}>
              <Calendar size={16} color="#ff385c" />
              <span>Target: <strong>{roadmap.target_timeline}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3f3f3f', fontSize: '14px' }}>
              <Clock size={16} color="#222222" />
              <span>Commitment: <strong>{roadmap.commitment_summary}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3f3f3f', fontSize: '14px' }}>
              <Sparkles size={16} color="#ff385c" />
              <span>Phases: <strong>{totalPhases} Sprints</strong></span>
            </div>
          </div>
        </div>

        {/* Phase Timeline / Tabs Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, 
            gap: '10px',
            marginBottom: '14px'
          }}>
            {roadmap.phases?.map((p, idx) => {
              const isActive = idx === activePhaseIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  style={{
                    padding: '14px 14px',
                    borderRadius: '12px',
                    background: isActive ? '#fff0f2' : '#ffffff',
                    border: isActive ? '2px solid #ff385c' : '1px solid #ebebeb',
                    color: '#222222',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(255, 56, 92, 0.15)' : 'none'
                  }}
                >
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    color: isActive ? '#ff385c' : '#6a6a6a',
                    marginBottom: '3px' 
                  }}>
                    Phase {p.phase_number}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6a6a6a', marginTop: '2px' }}>
                    {p.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Card */}
        {currentPhase && (
          <div style={{ 
            padding: '28px', 
            marginBottom: '24px',
            background: '#ffffff',
            border: '1px solid #ebebeb',
            borderRadius: '16px',
            boxShadow: 'rgba(0, 0, 0, 0.04) 0 2px 6px, rgba(0, 0, 0, 0.08) 0 4px 12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ 
                  color: '#ff385c', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px'
                }}>
                  {currentPhase.duration}
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '3px', color: '#222222' }}>
                  Phase {currentPhase.phase_number}: {currentPhase.title}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  disabled={activePhaseIndex === 0}
                  onClick={() => setActivePhaseIndex((prev) => Math.max(0, prev - 1))}
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: activePhaseIndex === 0 ? 0.4 : 1,
                    cursor: activePhaseIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  disabled={activePhaseIndex === totalPhases - 1}
                  onClick={() => setActivePhaseIndex((prev) => Math.min(totalPhases - 1, prev + 1))}
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: activePhaseIndex === totalPhases - 1 ? 0.4 : 1,
                    cursor: activePhaseIndex === totalPhases - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <p style={{ color: '#3f3f3f', fontSize: '15px', marginBottom: '22px', lineHeight: '1.6' }}>
              {currentPhase.focus_summary}
            </p>

            {/* Topics to Master */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                color: '#222222', 
                letterSpacing: '0.6px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Layers size={15} color="#ff385c" />
                Topics to Master in this Phase
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentPhase.topics?.map((topic, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f7f7f7',
                      border: '1px solid #ebebeb',
                      color: '#222222',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}
                  >
                    ✓ {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Free Resources */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                color: '#222222', 
                letterSpacing: '0.6px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BookOpen size={15} color="#ff385c" />
                Recommended Free Learning Resources
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                {currentPhase.resources?.map((res, i) => (
                  <a
                    key={i}
                    href={res.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      background: '#ffffff',
                      border: '1px solid #ebebeb',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#222222';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#ebebeb';
                    }}
                  >
                    <div>
                      <div style={{ color: '#222222', fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                        {res.title}
                      </div>
                      <div style={{ color: '#6a6a6a', fontSize: '12px' }}>
                        {res.platform} · <span style={{ color: '#ff385c' }}>{res.type}</span>
                      </div>
                    </div>
                    <ExternalLink size={15} color="#6a6a6a" />
                  </a>
                ))}
              </div>
            </div>

            {/* Hands-on Project to Build */}
            {currentPhase.project && (
              <div style={{
                background: '#f7f7f7',
                border: '1px solid #ebebeb',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Flame size={16} color="#ff385c" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#ff385c', textTransform: 'uppercase' }}>
                    Hands-on Portfolio Project
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
                  {currentPhase.project.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#3f3f3f', lineHeight: '1.5', marginBottom: '12px' }}>
                  {currentPhase.project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {currentPhase.project.tech_stack?.map((tech, i) => (
                    <span key={i} style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: '#ffffff',
                      border: '1px solid #dddddd',
                      color: '#222222'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '13px', color: '#6a6a6a', borderTop: '1px solid #ebebeb', paddingTop: '10px' }}>
                  📁 <strong>Deliverable:</strong> {currentPhase.project.deliverable}
                </div>
              </div>
            )}

            {/* Milestone & Social Proof */}
            {currentPhase.milestone && (
              <div style={{
                background: '#ffffff',
                border: '1px solid #ebebeb',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#f7f7f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#222222',
                  flexShrink: 0
                }}>
                  <Award size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6a6a6a' }}>
                    Phase Completion Milestone
                  </div>
                  <div style={{ fontSize: '13px', color: '#222222', fontWeight: '600', marginTop: '1px' }}>
                    {currentPhase.milestone}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Job Readiness Checklist */}
        {roadmap.job_readiness_checklist?.length > 0 && (
          <div style={{ 
            padding: '24px', 
            marginBottom: '24px',
            background: '#ffffff',
            border: '1px solid #ebebeb',
            borderRadius: '16px',
            boxShadow: 'rgba(0, 0, 0, 0.04) 0 2px 6px, rgba(0, 0, 0, 0.08) 0 4px 12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CheckCircle2 size={18} color="#ff385c" />
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#222222' }}>
                Job-Readiness & Interview Checklist
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {roadmap.job_readiness_checklist.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 12px',
                    background: '#f7f7f7',
                    border: '1px solid #ebebeb',
                    borderRadius: '8px'
                  }}
                >
                  <CheckCircle2 size={15} color="#222222" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#3f3f3f', lineHeight: '1.4' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Tip Footer */}
        {roadmap.motivational_tip && (
          <div style={{
            background: '#fff0f2',
            border: '1px solid #ffd1da',
            borderRadius: '14px',
            padding: '18px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#ff385c', fontStyle: 'italic' }}>
              💡 "{roadmap.motivational_tip}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
