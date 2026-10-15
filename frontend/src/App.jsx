import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Compass, ArrowRight, ArrowLeft, Sparkles, Loader2, RefreshCw, 
  CheckCircle, Lightbulb, GraduationCap, Code2, Target, Clock, Calendar 
} from 'lucide-react';

import ProgressBar from './components/ProgressBar';
import Step1Education from './components/Step1Education';
import Step2Skills from './components/Step2Skills';
import Step3Role from './components/Step3Role';
import Step4StudyTime from './components/Step4StudyTime';
import Step5Timeline from './components/Step5Timeline';
import ResultsPage from './components/ResultsPage';

const INITIAL_FORM_DATA = {
  education: 'B.Tech / BE / BS',
  educationDetail: '',
  skills: ['Python', 'SQL', 'Git & GitHub'],
  customSkills: '',
  targetRole: 'AI / ML Engineer',
  customRole: '',
  hoursPerDay: '2 hours / day',
  daysPerWeek: 'Weekdays only (5 days/week)',
  timeline: '1 Year',
  goal: 'Land first tech job / internship'
};

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      generateRoadmap();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generateRoadmap = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/generate-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          education: formData.education,
          education_detail: formData.educationDetail,
          skills: formData.skills,
          custom_skills: formData.customSkills,
          target_role: formData.targetRole,
          custom_role: formData.customRole,
          hours_per_day: formData.hoursPerDay,
          days_per_week: formData.daysPerWeek,
          timeline: formData.timeline,
          goal: formData.goal,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: Failed to generate roadmap`);
      }

      const data = await response.json();
      setRoadmap(data);
      
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti non-fatal
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Generation error:', err);
      setError('Could not connect to backend server. Ensure backend is running at http://localhost:8000');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoadmap(null);
    setStep(1);
    setError(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Top Navbar (Airbnb clean header) */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid #ebebeb',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={handleReset}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#ff385c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#ff385c', letterSpacing: '-0.4px' }}>
                Career<span style={{ color: '#222222' }}>Craft</span>
              </span>
              <span style={{ 
                fontSize: '10px', 
                fontWeight: '700', 
                color: '#ff385c', 
                marginLeft: '6px', 
                background: '#fff0f2',
                padding: '2px 6px',
                borderRadius: '9999px',
                border: '1px solid #ffd1da'
              }}>
                AI
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="header-tagline">
              Smart Roadmap Architect
            </span>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: '#f7f7f7',
              border: '1px solid #ebebeb',
              color: '#222222'
            }}>
              100% Free
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px 16px', maxWidth: '980px', margin: '0 auto', width: '100%' }}>
        {roadmap ? (
          <ResultsPage roadmap={roadmap} onReset={handleReset} />
        ) : (
          <div className="airbnb-card" style={{ padding: '32px 28px' }}>
            {loading ? (
              <div style={{ padding: '48px 16px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#fff0f2',
                  color: '#ff385c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 0 0 10px rgba(255, 56, 92, 0.08)'
                }} className="animate-pulse-glow">
                  <Sparkles size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '8px' }}>
                  Crafting your personalized {formData.customRole || formData.targetRole} Roadmap...
                </h3>
                <p style={{ color: '#6a6a6a', fontSize: '14px', maxWidth: '480px', margin: '0 auto 28px', lineHeight: '1.5' }}>
                  Gemini AI is analyzing your education, existing skills, and {formData.timeline} commitment to structure your step-by-step career plan.
                </p>
                <div style={{
                  maxWidth: '380px',
                  margin: '0 auto',
                  background: '#f7f7f7',
                  border: '1px solid #ebebeb',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#222222', fontWeight: '500' }}>
                    <CheckCircle size={16} color="#ff385c" />
                    <span>Mapping skills & prerequisite calibrations</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#222222', fontWeight: '500' }}>
                    <Loader2 size={16} className="animate-spin" color="#ff385c" />
                    <span>Generating sequential learning phases</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#888888' }}>
                    <Clock size={16} color="#cccccc" />
                    <span>Curating top free tutorials & capstone projects</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Wizard Header Progress */}
                <ProgressBar currentStep={step} totalSteps={5} onStepClick={(s) => setStep(s)} />

                {/* Error Banner */}
                {error && (
                  <div style={{
                    background: '#fff5f5',
                    border: '1px solid #fed7d7',
                    color: '#c53030',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <span>⚠️ {error}</span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Step Views */}
                <div style={{ minHeight: '360px' }}>
                  {step === 1 && <Step1Education formData={formData} updateFormData={updateFormData} />}
                  {step === 2 && <Step2Skills formData={formData} updateFormData={updateFormData} />}
                  {step === 3 && <Step3Role formData={formData} updateFormData={updateFormData} />}
                  {step === 4 && <Step4StudyTime formData={formData} updateFormData={updateFormData} />}
                  {step === 5 && <Step5Timeline formData={formData} updateFormData={updateFormData} />}
                </div>

                {/* Navigation Actions Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '36px',
                  paddingTop: '20px',
                  borderTop: '1px solid #ebebeb'
                }}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                      className="btn-secondary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        fontSize: '14px'
                      }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="btn-rausch"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      fontSize: '15px'
                    }}
                  >
                    {step === 5 ? (
                      <>
                        Generate AI Roadmap <Sparkles size={18} />
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px',
        textAlign: 'center',
        borderTop: '1px solid #ebebeb',
        color: '#6a6a6a',
        fontSize: '13px',
        backgroundColor: '#ffffff'
      }}>
        © 2026 CareerCraft AI · Inspired by Airbnb Design System · Powered by FastAPI & Gemini AI
      </footer>
    </div>
  );
}

export default App;
