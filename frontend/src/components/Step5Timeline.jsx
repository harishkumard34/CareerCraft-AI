import React from 'react';
import { TIMELINES, GOALS } from '../constants';
import { Zap, Sparkles, CheckCircle2, Sprout, Briefcase, Repeat, TrendingUp, Rocket, Timer, Target } from 'lucide-react';

const timelineIcons = {
  Zap,
  Sparkles,
  CheckCircle2,
  Sprout,
};

const goalIcons = {
  Briefcase,
  Repeat,
  TrendingUp,
  Rocket,
};

const Step5Timeline = ({ formData, updateFormData }) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
          When do you want to be job-ready?
        </h2>
        <p style={{ color: '#6a6a6a', fontSize: '15px' }}>
          Choose your target duration and your primary goal.
        </p>
      </div>

      {/* Timeline Selection */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#222222', 
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Timer size={16} color="#ff385c" />
          Target Timeline:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px'
        }}>
          {TIMELINES.map((tl) => {
            const IconComp = timelineIcons[tl.icon] || Sparkles;
            const isSelected = formData.timeline === tl.label;

            return (
              <div
                key={tl.id}
                onClick={() => updateFormData({ timeline: tl.label })}
                className={`step-card ${isSelected ? 'selected' : ''}`}
                style={{
                  padding: '16px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSelected ? '#ff385c' : '#f7f7f7',
                  color: isSelected ? '#ffffff' : '#222222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={18} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: '#222222', marginBottom: '2px' }}>
                    {tl.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6a6a6a' }}>
                    {tl.subtitle}
                  </div>
                </div>

                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: isSelected ? '5px solid #ff385c' : '1.5px solid #dddddd',
                  background: '#ffffff',
                  transition: 'all 0.2s'
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ height: '1px', background: '#ebebeb', margin: '24px 0' }} />

      {/* Primary Goal Selection */}
      <div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#222222', 
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Target size={16} color="#222222" />
          What is your ultimate goal?
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '12px'
        }}>
          {GOALS.map((g) => {
            const IconComp = goalIcons[g.icon] || Rocket;
            const isSelected = formData.goal === g.label;

            return (
              <div
                key={g.id}
                onClick={() => updateFormData({ goal: g.label })}
                className={`step-card ${isSelected ? 'selected' : ''}`}
                style={{
                  padding: '16px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSelected ? '#ff385c' : '#f7f7f7',
                  color: isSelected ? '#ffffff' : '#222222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={18} />
                </div>
                <div style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#222222' }}>
                  {g.label}
                </div>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: isSelected ? '5px solid #ff385c' : '1.5px solid #dddddd',
                  background: '#ffffff',
                  transition: 'all 0.2s'
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step5Timeline;
