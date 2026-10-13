import React from 'react';
import { Check } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps = 5, onStepClick }) => {
  const steps = [
    { num: 1, label: 'Education' },
    { num: 2, label: 'Skills' },
    { num: 3, label: 'Target Role' },
    { num: 4, label: 'Daily Time' },
    { num: 5, label: 'Timeline & Goal' },
  ];

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Top Header Label */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '12px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            letterSpacing: '0.6px',
            color: '#ff385c',
            background: '#fff0f2',
            padding: '3px 10px',
            borderRadius: '9999px',
            border: '1px solid #ffd1da'
          }}>
            Step {currentStep} of {totalSteps}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>
            {steps[currentStep - 1]?.label}
          </span>
        </div>
        <span style={{ fontSize: '13px', color: '#6a6a6a', fontWeight: '500' }}>
          {Math.round(progressPercent)}% completed
        </span>
      </div>

      {/* Progress Track */}
      <div style={{ 
        position: 'relative', 
        height: '4px', 
        background: '#ebebeb', 
        borderRadius: '9999px', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          height: '100%', 
          width: `${progressPercent}%`, 
          background: '#ff385c', 
          borderRadius: '9999px',
          transition: 'width 0.35s ease' 
        }} />
      </div>

      {/* Step Dots (Mobile & Web responsive) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '14px' 
      }}>
        {steps.map((s) => {
          const isDone = s.num < currentStep;
          const isCurrent = s.num === currentStep;

          return (
            <div
              key={s.num}
              onClick={() => isDone && onStepClick && onStepClick(s.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: isDone ? 'pointer' : 'default',
                opacity: isDone || isCurrent ? 1 : 0.45,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                background: isDone ? '#222222' : isCurrent ? '#ff385c' : '#f7f7f7',
                color: isDone || isCurrent ? '#ffffff' : '#6a6a6a',
                border: isCurrent ? '1px solid #e00b41' : '1px solid #dddddd',
              }}>
                {isDone ? <Check size={12} /> : s.num}
              </div>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: isCurrent ? '600' : '500',
                color: isCurrent ? '#222222' : '#6a6a6a',
              }} className="step-label-text">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
