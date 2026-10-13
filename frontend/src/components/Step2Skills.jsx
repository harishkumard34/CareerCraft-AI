import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { Plus, X, Check, Code, Wrench, Brain, Globe } from 'lucide-react';

const categoryHeaders = {
  Programming: { title: 'Programming & Core', icon: Code },
  Tools: { title: 'Tools & Platforms', icon: Wrench },
  AI_Data: { title: 'AI & Data Tools', icon: Brain },
  Web_Cloud: { title: 'Web & Cloud', icon: Globe },
};

const Step2Skills = ({ formData, updateFormData }) => {
  const [customInput, setCustomInput] = useState('');

  const toggleSkill = (skill) => {
    const current = formData.skills || [];
    if (current.includes(skill)) {
      updateFormData({ skills: current.filter((s) => s !== skill) });
    } else {
      updateFormData({ skills: [...current, skill] });
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const trimmed = customInput.trim();
    if (!formData.skills.includes(trimmed)) {
      updateFormData({ skills: [...formData.skills, trimmed] });
    }
    setCustomInput('');
  };

  const removeSkill = (skill) => {
    updateFormData({ skills: formData.skills.filter((s) => s !== skill) });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
          What do you already know?
        </h2>
        <p style={{ color: '#6a6a6a', fontSize: '15px' }}>
          Select skills you've touched before. We'll skip basic concepts you already understand.
        </p>
      </div>

      {/* Selected Skills Summary Bar */}
      {formData.skills.length > 0 && (
        <div style={{
          marginBottom: '24px',
          padding: '14px 18px',
          background: '#fff8f8',
          border: '1px solid #ffd1da',
          borderRadius: '14px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#ff385c', marginRight: '6px' }}>
            Selected ({formData.skills.length}):
          </span>
          {formData.skills.map((s) => (
            <span
              key={s}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: '#ff385c',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {s}
              <X
                size={14}
                style={{ cursor: 'pointer', opacity: 0.85 }}
                onClick={() => removeSkill(s)}
              />
            </span>
          ))}
        </div>
      )}

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '24px' }}>
        {Object.entries(SKILL_CATEGORIES).map(([key, list]) => {
          const config = categoryHeaders[key] || { title: key, icon: Code };
          const IconComp = config.icon;

          return (
            <div key={key}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '13px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                color: '#6a6a6a', 
                letterSpacing: '0.5px',
                marginBottom: '10px' 
              }}>
                <IconComp size={15} color="#222222" />
                {config.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {list.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`chip ${isSelected ? 'active' : ''}`}
                      style={{
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isSelected ? <Check size={14} /> : null}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Skill */}
      <div style={{
        background: '#f7f7f7',
        border: '1px solid #ebebeb',
        borderRadius: '14px',
        padding: '16px'
      }}>
        <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder='Type custom skill (e.g. "REST APIs", "Postman", "C#", "Next.js")...'
            style={{
              flex: '1 1 200px',
              padding: '10px 14px',
              background: '#ffffff',
              border: '1px solid #dddddd',
              borderRadius: '8px',
              color: '#222222',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#222222'}
            onBlur={(e) => e.target.style.borderColor = '#dddddd'}
          />
          <button
            type="submit"
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              fontSize: '13px'
            }}
          >
            <Plus size={16} />
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step2Skills;
