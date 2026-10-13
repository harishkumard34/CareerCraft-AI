import React from 'react';
import { EDUCATION_OPTIONS } from '../constants';
import { GraduationCap, Laptop, BookOpen, Award, Compass, Sparkles } from 'lucide-react';

const iconMap = {
  GraduationCap,
  Laptop,
  BookOpen,
  Award,
  Compass,
};

const Step1Education = ({ formData, updateFormData }) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
          What's your educational background?
        </h2>
        <p style={{ color: '#6a6a6a', fontSize: '15px' }}>
          Choose your qualification to calibrate starting fundamentals.
        </p>
      </div>

      {/* Grid of Education Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '14px',
        marginBottom: '28px'
      }}>
        {EDUCATION_OPTIONS.map((item) => {
          const IconComponent = iconMap[item.icon] || GraduationCap;
          const isSelected = formData.education === item.label;

          return (
            <div
              key={item.id}
              onClick={() => updateFormData({ education: item.label })}
              className={`step-card ${isSelected ? 'selected' : ''}`}
              style={{
                padding: '20px 18px',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isSelected ? '#ff385c' : '#f7f7f7',
                color: isSelected ? '#ffffff' : '#222222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent size={20} />
              </div>

              <div>
                <div style={{ fontWeight: '600', fontSize: '15px', color: '#222222', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', color: '#6a6a6a', lineHeight: '1.4' }}>
                  {item.desc}
                </div>
              </div>

              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#ff385c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#ffffff'
                }}>
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Optional Free Text Detail */}
      <div style={{
        background: '#f7f7f7',
        border: '1px solid #ebebeb',
        borderRadius: '14px',
        padding: '18px'
      }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#222222', 
          marginBottom: '8px' 
        }}>
          <Sparkles size={16} color="#ff385c" />
          Add more detail (optional):
        </label>
        <input
          type="text"
          value={formData.educationDetail}
          onChange={(e) => updateFormData({ educationDetail: e.target.value })}
          placeholder='e.g. "2nd year CSE student", "Mechanical engineer switching to IT", "Fresher"'
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '10px',
            color: '#222222',
            fontSize: '14px',
            outline: 'none',
            transition: 'border 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#222222'}
          onBlur={(e) => e.target.style.borderColor = '#dddddd'}
        />
        <p style={{ fontSize: '12px', color: '#6a6a6a', marginTop: '6px' }}>
          💡 Mentioning your college year helps the AI tailor pace and schedule specifically for you.
        </p>
      </div>
    </div>
  );
};

export default Step1Education;
