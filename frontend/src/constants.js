export const EDUCATION_OPTIONS = [
  { id: 'btech', label: 'B.Tech / BE / BS', icon: 'GraduationCap', desc: 'Engineering & Technology' },
  { id: 'bca', label: 'BCA / MCA', icon: 'Laptop', desc: 'Computer Applications' },
  { id: 'bcom', label: 'BCom / BA / BSc', icon: 'BookOpen', desc: 'Arts, Science & Commerce' },
  { id: 'diploma', label: 'Diploma / Polytechnic', icon: 'Award', desc: 'Technical Diploma' },
  { id: 'other', label: 'Other Degree / Self-Taught', icon: 'Compass', desc: 'Non-traditional or Bootcamps' },
];

export const SKILL_CATEGORIES = {
  Programming: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C / C++', 'HTML/CSS', 'SQL', 'Go', 'PHP'],
  Tools: ['Git & GitHub', 'Docker', 'Linux', 'VS Code', 'Figma', 'Excel / Sheets', 'Postman'],
  AI_Data: ['ML Basics', 'Pandas & NumPy', 'TensorFlow / PyTorch', 'LangChain', 'Power BI / Tableau', 'Scikit-Learn'],
  Web_Cloud: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'FastAPI', 'AWS Basics', 'Firebase', 'MongoDB']
};

export const TARGET_ROLES = [
  {
    id: 'ai_engineer',
    title: 'AI / ML Engineer',
    icon: 'Bot',
    badge: 'High Demand',
    desc: 'Build intelligent LLM apps, fine-tune models, and deploy scalable ML systems.'
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: 'Code2',
    badge: 'Evergreen',
    desc: 'Craft complete dynamic web apps from interactive UIs to scalable backend APIs.'
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    icon: 'BarChart3',
    badge: 'Popular',
    desc: 'Turn raw data into actionable business dashboards with SQL, Python & BI tools.'
  },
  {
    id: 'devops_cloud',
    title: 'DevOps / Cloud Engineer',
    icon: 'Cloud',
    badge: 'High Pay',
    desc: 'Automate CI/CD pipelines, container orchestration, and cloud infrastructure.'
  },
  {
    id: 'frontend',
    title: 'Frontend Specialist',
    icon: 'Palette',
    badge: 'Creative',
    desc: 'Design pixel-perfect user experiences, responsive layouts, and modern web apps.'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    icon: 'ShieldCheck',
    badge: 'Critical',
    desc: 'Protect infrastructure, perform vulnerability assessments, and secure systems.'
  }
];

export const STUDY_HOURS = [
  { id: '1hr', label: '1 hour / day', subtitle: 'Slow & steady pace', badge: 'Casual' },
  { id: '2hr', label: '2 hours / day', subtitle: 'Balanced & sustainable', badge: 'Recommended', isRecommended: true },
  { id: '3_4hr', label: '3 - 4 hours / day', subtitle: 'Fast-track progression', badge: 'Intensive' },
  { id: '5plus', label: '5+ hours / day', subtitle: 'Bootcamp immersion', badge: 'Hardcore' }
];

export const STUDY_DAYS = [
  { id: 'weekends', label: 'Weekends only (2 days/week)', icon: 'Coffee' },
  { id: 'weekdays', label: 'Weekdays only (5 days/week)', icon: 'CalendarDays', isDefault: true },
  { id: 'all_days', label: 'All 7 days a week', icon: 'Flame' }
];

export const TIMELINES = [
  { id: '3m', label: '3 Months', subtitle: 'Super intensive sprint', icon: 'Zap' },
  { id: '6m', label: '6 Months', subtitle: 'Focused fast-track', icon: 'Sparkles' },
  { id: '1y', label: '1 Year', subtitle: 'Optimal balance & deep mastery', icon: 'CheckCircle2', isRecommended: true },
  { id: '1_5y', label: '1.5 Years', subtitle: 'Comfortable, in-depth pace', icon: 'Sprout' }
];

export const GOALS = [
  { id: 'first_job', label: 'Land first tech job / internship', icon: 'Briefcase' },
  { id: 'switch_tech', label: 'Switch into tech from non-tech domain', icon: 'Repeat' },
  { id: 'upskill', label: 'Upskill for promotion / appraisal', icon: 'TrendingUp' },
  { id: 'freelance', label: 'Freelancing / Build own product & startup', icon: 'Rocket' }
];
