import React from 'react';
import { STUDY_HOURS, STUDY_DAYS } from '../constants';
import { Clock, Calendar, Coffee, CalendarDays, Flame } from 'lucide-react';

const dayIcons = {
  Coffee,
  CalendarDays,
  Flame,
};

const Step4StudyTime = ({ formData, updateFormData }) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
          How much time can you commit?
        </h2>
        <p style={{ color: '#6a6a6a', fontSize: '15px' }}>
          A consistent 2 hours per day is far more sustainable than weekend cramming.
        </p>
      </div>

      {/* Daily Study Hours Selection */}
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
          <Clock size={16} color="#ff385c" />
          Hours per day:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px'
        }}>
          {STUDY_HOURS.map((opt) => {
            const isSelected = formData.hoursPerDay === opt.label;

            return (
              <div
                key={opt.id}
                onClick={() => updateFormData({ hoursPerDay: opt.label })}
                className={`step-card ${isSelected ? 'selected' : ''}`}
                style={{
                  padding: '16px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: '#222222', marginBottom: '2px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6a6a6a' }}>
                    {opt.subtitle}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {opt.badge && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      background: opt.isRecommended ? '#fff0f2' : '#f7f7f7',
                      color: opt.isRecommended ? '#ff385c' : '#6a6a6a',
                      border: opt.isRecommended ? '1px solid #ffd1da' : '1px solid #ebebeb'
                    }}>
                      {opt.badge}
                    </span>
                  )}
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: isSelected ? '5px solid #ff385c' : '1.5px solid #dddddd',
                    background: '#ffffff',
                    transition: 'all 0.2s'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ height: '1px', background: '#ebebeb', margin: '24px 0' }} />

      {/* Days Per Week Selection */}
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
          <Calendar size={16} color="#222222" />
          Days per week available:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px'
        }}>
          {STUDY_DAYS.map((day) => {
            const IconComp = dayIcons[day.icon] || CalendarDays;
            const isSelected = formData.daysPerWeek === day.label;

            return (
              <div
                key={day.id}
                onClick={() => updateFormData({ daysPerWeek: day.label })}
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
                  width: '36px',
                  height: '36px',
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
                  {day.label}
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

export default Step4StudyTime;
