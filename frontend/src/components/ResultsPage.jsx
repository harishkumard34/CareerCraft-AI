import React, { useState } from 'react';
import { 
  Download, RotateCcw, Printer, ExternalLink, CheckCircle2, Flame, Award, 
  Sparkles, Layers, BookOpen, Target, Calendar, Clock, ChevronRight, ChevronLeft,
  LayoutGrid, ListOrdered, CheckSquare, Square
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResultsPage = ({ roadmap, onReset }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [viewMode, setViewMode] = useState('tabs'); // 'tabs' | 'all'
  const [isExporting, setIsExporting] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  if (!roadmap) return null;

  const currentPhase = roadmap.phases?.[activePhaseIndex] || roadmap.phases?.[0];
  const totalPhases = roadmap.phases?.length || 0;

  const toggleChecklist = (index) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const getSafeUrl = (url, fallbackQuery) => {
    if (!url || url === '#') {
      return `https://www.google.com/search?q=${encodeURIComponent(fallbackQuery || 'free tutorial')}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('roadmap-pdf-export-area');
    if (!element) {
      alert('Could not find printable roadmap content.');
      return;
    }

    try {
      setIsExporting(true);

      // Render the dedicated export container with scale: 2 for sharp resolution
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      // Canvas pixels per millimeter
      const pxPerMm = canvas.width / pdfWidth;
      // Height in canvas pixels for a single A4 page
      const pageCanvasHeight = Math.floor(pdfHeight * pxPerMm);

      let renderedHeight = 0;
      let pageNum = 1;
      const totalPages = Math.ceil(canvas.height / pageCanvasHeight) || 1;

      while (renderedHeight < canvas.height) {
        const currentChunkHeight = Math.min(pageCanvasHeight, canvas.height - renderedHeight);

        // Create canvas slice for this page
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageCanvasHeight;
        const ctx = pageCanvas.getContext('2d');

        // Pure white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Draw image slice
        ctx.drawImage(
          canvas,
          0, renderedHeight, canvas.width, currentChunkHeight,
          0, 0, canvas.width, currentChunkHeight
        );

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.96);

        if (pageNum > 1) {
          pdf.addPage();
        }

        pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Add subtle header and footer
        pdf.setFontSize(8);
        pdf.setTextColor(140, 140, 140);
        pdf.text(`CareerCraft AI — ${roadmap.role_title} Complete Roadmap`, 12, pdfHeight - 5);
        pdf.text(`Page ${pageNum} of ${totalPages}`, pdfWidth - 30, pdfHeight - 5);

        renderedHeight += pageCanvasHeight;
        pageNum++;
      }

      const fileName = `${(roadmap.role_title || 'Career').replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Roadmap.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('PDF export failed:', err);
      // Offer graceful fallback to browser print
      if (window.confirm('Could not generate PDF directly in this browser. Would you like to use the Print dialog (Save as PDF) instead?')) {
        window.print();
      }
    } finally {
      setIsExporting(false);
    }
  };

  const completedChecklistCount = checkedItems.size;
  const totalChecklistCount = roadmap.job_readiness_checklist?.length || 0;

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* View Mode Toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#f7f7f7',
            border: '1px solid #ebebeb',
            borderRadius: '10px',
            padding: '3px'
          }}>
            <button
              onClick={() => setViewMode('tabs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'tabs' ? '#ffffff' : 'transparent',
                color: viewMode === 'tabs' ? '#222222' : '#6a6a6a',
                boxShadow: viewMode === 'tabs' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                fontWeight: viewMode === 'tabs' ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <LayoutGrid size={14} /> Tabs View
            </button>
            <button
              onClick={() => setViewMode('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'all' ? '#ffffff' : 'transparent',
                color: viewMode === 'all' ? '#222222' : '#6a6a6a',
                boxShadow: viewMode === 'all' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                fontWeight: viewMode === 'all' ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <ListOrdered size={14} /> View All Phases
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary"
            title="Print or Save as PDF via Browser"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '11px 16px',
              fontSize: '13px'
            }}
          >
            <Printer size={15} />
            Print
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="btn-rausch"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              fontSize: '14px'
            }}
          >
            <Download size={16} />
            {isExporting ? 'Generating Full PDF...' : 'Download Full PDF'}
          </button>
        </div>
      </div>

      {/* Screen Interactive View */}
      <div className="screen-only-view">
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

        {/* Tabbed View Navigation */}
        {viewMode === 'tabs' && (
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
        )}

        {/* Phase Card: Tabbed or All Phases View */}
        {viewMode === 'tabs' ? (
          currentPhase && (
            <PhaseDetailCard 
              phase={currentPhase} 
              activePhaseIndex={activePhaseIndex}
              totalPhases={totalPhases}
              setActivePhaseIndex={setActivePhaseIndex}
              getSafeUrl={getSafeUrl}
              showNavButtons={true}
            />
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
            {roadmap.phases?.map((phase, idx) => (
              <PhaseDetailCard 
                key={idx}
                phase={phase} 
                activePhaseIndex={idx}
                totalPhases={totalPhases}
                setActivePhaseIndex={setActivePhaseIndex}
                getSafeUrl={getSafeUrl}
                showNavButtons={false}
              />
            ))}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#ff385c" />
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#222222' }}>
                  Job-Readiness & Interview Checklist
                </h3>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '9999px',
                background: completedChecklistCount === totalChecklistCount ? '#e6fffa' : '#f7f7f7',
                color: completedChecklistCount === totalChecklistCount ? '#234e52' : '#6a6a6a',
                border: '1px solid #ebebeb'
              }}>
                {completedChecklistCount} of {totalChecklistCount} completed
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {roadmap.job_readiness_checklist.map((item, i) => {
                const isChecked = checkedItems.has(i);
                return (
                  <div
                    key={i}
                    onClick={() => toggleChecklist(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '12px 14px',
                      background: isChecked ? '#fff8f8' : '#f7f7f7',
                      border: isChecked ? '1px solid #ffd1da' : '1px solid #ebebeb',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ marginTop: '2px', flexShrink: 0, color: isChecked ? '#ff385c' : '#888888' }}>
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <span style={{ 
                      fontSize: '13px', 
                      color: isChecked ? '#222222' : '#4a4a4a', 
                      lineHeight: '1.4',
                      textDecoration: isChecked ? 'line-through' : 'none' 
                    }}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Motivational Tip Footer */}
        {roadmap.motivational_tip && (
          <div style={{
            background: '#fff0f2',
            border: '1px solid #ffd1da',
            borderRadius: '14px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#ff385c', fontStyle: 'italic', lineHeight: '1.5' }}>
              💡 "{roadmap.motivational_tip}"
            </p>
          </div>
        )}
      </div>

      {/* DEDICATED FULL ROADMAP PRINT & PDF EXPORT CONTAINER */}
      {/* Contains ALL phases, full projects, complete checklist, ready for html2canvas multi-page export & print */}
      <div 
        id="roadmap-pdf-export-area" 
        className="pdf-hidden-screen"
        style={{ 
          position: 'fixed', 
          left: '-9999px', 
          top: 0, 
          width: '800px', 
          background: '#ffffff', 
          padding: '32px 36px',
          color: '#222222',
          fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
        }}
      >
        {/* Export Document Header */}
        <div style={{ borderBottom: '2px solid #ff385c', paddingBottom: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ff385c',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                CC
              </div>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#ff385c' }}>
                CareerCraft <span style={{ color: '#222222' }}>AI</span>
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '700' }}>
              Personalized Career Architecture
            </span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#222222', margin: '4px 0 8px' }}>
            {roadmap.role_title} Complete Roadmap
          </h1>

          <p style={{ color: '#4a4a4a', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
            {roadmap.overview}
          </p>

          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#333333' }}>
            <div>📅 <strong>Target Timeline:</strong> {roadmap.target_timeline}</div>
            <div>⏱️ <strong>Commitment:</strong> {roadmap.commitment_summary}</div>
            <div>🎯 <strong>Total Sprints:</strong> {totalPhases} Phases</div>
          </div>
        </div>

        {/* ALL PHASES RENDERED SEQUENTIALLY FOR PDF */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
          {roadmap.phases?.map((phase, idx) => (
            <div 
              key={idx} 
              className="print-page-break"
              style={{
                background: '#ffffff',
                border: '1px solid #dddddd',
                borderRadius: '12px',
                padding: '22px 24px',
                boxShadow: 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ 
                  color: '#ff385c', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px'
                }}>
                  Sprint {phase.phase_number} · {phase.duration}
                </span>
                <span style={{
                  background: '#f2f2f2',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#444444'
                }}>
                  Phase {phase.phase_number} of {totalPhases}
                </span>
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', marginBottom: '8px' }}>
                {phase.title}
              </h2>

              <p style={{ color: '#4a4a4a', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' }}>
                {phase.focus_summary}
              </p>

              {/* Topics */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#222222', marginBottom: '6px' }}>
                  📌 Topics to Master:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {phase.topics?.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#f7f7f7',
                        border: '1px solid #e0e0e0',
                        color: '#222222',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#222222', marginBottom: '6px' }}>
                  📚 Recommended Free Resources:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {phase.resources?.map((res, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#fafafa',
                        border: '1px solid #ebebeb',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ fontWeight: '600', color: '#222222' }}>{res.title}</div>
                      <div style={{ color: '#6a6a6a', fontSize: '10px', marginTop: '2px' }}>
                        {res.platform} · <span style={{ color: '#ff385c' }}>{res.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project */}
              {phase.project && (
                <div style={{
                  background: '#fcfcfc',
                  border: '1px solid #ebebeb',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '12px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#ff385c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    🔥 Portfolio Project: {phase.project.title}
                  </div>
                  <p style={{ fontSize: '12px', color: '#333333', lineHeight: '1.4', marginBottom: '8px' }}>
                    {phase.project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                    {phase.project.tech_stack?.map((tech, i) => (
                      <span key={i} style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: '#ffffff',
                        border: '1px solid #cccccc',
                        color: '#222222'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: '#555555' }}>
                    📁 <strong>Deliverable:</strong> {phase.project.deliverable}
                  </div>
                </div>
              )}

              {/* Milestone */}
              {phase.milestone && (
                <div style={{
                  background: '#f7f7f7',
                  border: '1px solid #ebebeb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '11px',
                  color: '#222222'
                }}>
                  🏆 <strong>Milestone:</strong> {phase.milestone}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Checklist for PDF */}
        {roadmap.job_readiness_checklist?.length > 0 && (
          <div className="print-page-break" style={{
            background: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#222222', marginBottom: '12px' }}>
              🎯 Job-Readiness & Interview Checklist
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {roadmap.job_readiness_checklist.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '8px 10px',
                    background: '#f9f9f9',
                    border: '1px solid #ebebeb',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#333333'
                  }}
                >
                  <span style={{ color: '#ff385c', fontWeight: 'bold' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Tip for PDF */}
        {roadmap.motivational_tip && (
          <div style={{
            background: '#fff0f2',
            border: '1px solid #ffd1da',
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#ff385c', fontStyle: 'italic' }}>
              💡 "{roadmap.motivational_tip}"
            </p>
          </div>
        )}

        {/* Export Footer */}
        <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '12px', textAlign: 'center', fontSize: '10px', color: '#888888' }}>
          Generated by CareerCraft AI · Personalized Tech Career Architecture
        </div>
      </div>
    </div>
  );
};

// Subcomponent for rendering a phase card cleanly
const PhaseDetailCard = ({ 
  phase, 
  activePhaseIndex, 
  totalPhases, 
  setActivePhaseIndex, 
  getSafeUrl,
  showNavButtons 
}) => {
  return (
    <div style={{ 
      padding: '28px', 
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
            {phase.duration}
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '3px', color: '#222222' }}>
            Phase {phase.phase_number}: {phase.title}
          </h2>
        </div>

        {showNavButtons && (
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
        )}
      </div>

      <p style={{ color: '#3f3f3f', fontSize: '15px', marginBottom: '22px', lineHeight: '1.6' }}>
        {phase.focus_summary}
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
          {phase.topics?.map((topic, i) => (
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
          {phase.resources?.map((res, i) => (
            <a
              key={i}
              href={getSafeUrl(res.url, `${res.title} ${res.platform}`)}
              target="_blank"
              rel="noopener noreferrer"
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
      {phase.project && (
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
            {phase.project.title}
          </h3>
          <p style={{ fontSize: '14px', color: '#3f3f3f', lineHeight: '1.5', marginBottom: '12px' }}>
            {phase.project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {phase.project.tech_stack?.map((tech, i) => (
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
            📁 <strong>Deliverable:</strong> {phase.project.deliverable}
          </div>
        </div>
      )}

      {/* Milestone */}
      {phase.milestone && (
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
              {phase.milestone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
