export const roughData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '(415) 555-0123',
  location: 'San Francisco, CA',
  jobTitle: 'Senior Product Manager',
  education: [
    {
      id: 1,
      level: "Master's",
      instituition: 'Stanford University',
      degree: 'MBA, Product Management',
      startYear: '2016',
      endYear: '2018',
      gpa: '3.9'
    },
    {
      id: 2,
      level: "Bachelor's",
      instituition: 'University of California, Berkeley',
      degree: 'B.S. Business Administration',
      startYear: '2010',
      endYear: '2014',
      gpa: '3.8'
    }
  ],

  skills: [
    'Product Strategy',
    'Agile Methodology',
    'User Research',
    'Data Analytics',
    'Roadmap Planning',
    'Cross-functional Leadership',
    'A/B Testing',
    'Product Launch'
  ],

  kindsOfWork: ['B2B SaaS', 'Consumer Mobile Apps', 'E-commerce Platforms'],

  summary:
    'Results-driven Product Manager with 8+ years of experience in B2B SaaS and consumer applications. Proven track record of launching products that drive $50M+ in revenue. Expert in translating complex customer needs into actionable product roadmaps. Passionate about data-driven decision making and building high-performing cross-functional teams.',

  showSummary: true,

  experience: [
    {
      id: 1,
      jobTitle: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      startMonth: 'January',
      startYear: '2022',
      endMonth: 'Present',
      endYear: null,
      location: 'San Francisco, CA',
      points: [
        'Led product strategy for flagship SaaS platform serving 5,000+ enterprise customers, resulting in 45% YoY revenue growth ($12M → $17.4M)',
        'Launched 3 major features that increased user engagement by 35% and reduced churn by 18%',
        'Managed cross-functional team of 12 engineers, 3 designers, and 2 data scientists through full product lifecycle',
        'Established product metrics framework adopted across 4 product teams, improving decision-making velocity by 40%'
      ]
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'InnovateLabs',
      startMonth: 'June',
      startYear: '2018',
      endMonth: 'December',
      endYear: '2021',
      location: 'Seattle, WA',
      points: [
        'Owned mobile app product line with 2M+ monthly active users, achieving 4.8/5 app store rating',
        'Prioritized and shipped 15+ features based on user research, resulting in 28% increase in user retention',
        'Collaborated with engineering to reduce app load time by 50%, improving user satisfaction scores by 32%',
        'Mentored 3 junior PMs, 2 promoted to mid-level roles'
      ]
    },
    {
      id: 3,
      jobTitle: 'Associate Product Manager',
      company: 'StartupHub',
      startMonth: 'August',
      startYear: '2016',
      endMonth: 'May',
      endYear: '2018',
      location: 'Austin, TX',
      points: [
        'Assisted in launching MVP that acquired 50,000 users in first 3 months',
        'Conducted 100+ customer interviews to validate product-market fit',
        'Created product documentation and user guides adopted by entire sales team'
      ]
    }
  ],

  styles: {
    name: {
      size: 28,
      weight: 'font-bold',
      style: 'normal',
      case: 'none',
      spacing: 2,
      color: 'text-slate-800'
    },
    sectionHeader: {
      size: 13,
      weight: 'font-bold',
      style: 'normal',
      case: 'uppercase',
      spacing: 2,
      color: 'text-slate-800'
    },
    company: {
      size: 12,
      weight: 'font-bold',
      style: 'normal',
      case: 'none',
      color: 'text-slate-800',
      spacing: 0
    },
    jobTitle: {
      size: 12,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      color: 'text-slate-500',
      spacing: 1
    },
    bodyText: {
      size: 12,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: 'text-slate-600'
    },
    date: {
      size: 11,
      weight: 'font-normal',
      style: 'italic',
      case: 'none',
      spacing: 0,
      color: 'text-slate-400'
    },
    contact: {
      size: 11,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: 'text-slate-400'
    }
  }
}
