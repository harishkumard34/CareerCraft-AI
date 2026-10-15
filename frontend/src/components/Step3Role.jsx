import React from 'react';
import { TARGET_ROLES } from '../constants';
import { Bot, Code2, BarChart3, Cloud, Palette, ShieldCheck, HelpCircle } from 'lucide-react';

const iconMap = {
  Bot,
  Code2,
  BarChart3,
  Cloud,
  Palette,
  ShieldCheck,
};

const Step3Role = ({ formData, updateFormData }) => {
  const isCustomActive = !!formData.customRole;

  const handleSelectPrebuilt = (roleTitle) => {
    updateFormData({
      targetRole: roleTitle,
      customRole: ''
    });
  };

  const handleCustomChange = (val) => {
    updateFormData({
      customRole: val,
      targetRole: val ? val : (formData.targetRole || 'AI / ML Engineer')
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#222222', marginBottom: '6px' }}>
          What role do you want to break into?
        </h2>
        <p style={{ color: '#6a6a6a', fontSize: '15px' }}>
          Choose a target career track or specify your own role.
        </p>
      </div>

      {/* Grid of Roles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {TARGET_ROLES.map((role) => {
          const IconComp = iconMap[role.icon] || Bot;
          const isSelected = !isCustomActive && formData.targetRole === role.title;

          return (
            <div
              key={role.id}
              onClick={() => handleSelectPrebuilt(role.title)}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: isSelected ? '#ff385c' : '#f7f7f7',
                  color: isSelected ? '#ffffff' : '#222222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={20} />
                </div>
                {role.badge && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    background: '#f7f7f7',
                    color: '#6a6a6a',
                    border: '1px solid #ebebeb'
                  }}>
                    {role.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#222222', marginBottom: '4px' }}>
                  {role.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6a6a6a', lineHeight: '1.4' }}>
                  {role.desc}
                </p>
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

      {/* Or Type Your Own Role */}
      <div style={{
        background: '#f7f7f7',
        border: isCustomActive ? '1px solid #ff385c' : '1px solid #ebebeb',
        borderRadius: '14px',
        padding: '18px',
        transition: 'border 0.2s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <HelpCircle size={16} color="#ff385c" />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>
            Aiming for another role? Type your own:
          </span>
        </div>
        <input
          type="text"
          value={formData.customRole || ''}
          onChange={(e) => handleCustomChange(e.target.value)}
          placeholder='e.g. "Product Manager", "QA / Automation Engineer", "Blockchain Dev"'
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '10px',
            color: '#222222',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#222222'}
          onBlur={(e) => e.target.style.borderColor = '#dddddd'}
        />
        {isCustomActive && (
          <p style={{ fontSize: '12px', color: '#ff385c', marginTop: '6px', fontWeight: '600' }}>
            ✨ Custom role active: AI will generate a tailored curriculum for "{formData.customRole}".
          </p>
        )}
      </div>
    </div>
  );
};

export default Step3Role;
