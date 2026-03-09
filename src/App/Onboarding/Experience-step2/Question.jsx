import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { BackNext } from '../../../components/BackNext'
import { ChevronDown } from 'lucide-react'

export default function Question () {
  const [mainExperience, setMainExperience] = useState('')
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [followUps, setFollowUps] = useState({
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: ''
  })

  const handleChange = (id, value) => {
    setFollowUps(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const toggleAccordion = id => {
    setActiveAccordion(prev => (prev === id ? null : id))
  }

  return (
    <section className='w-full'>
      {/* Main Question */}
      <section className='w-full'>
        <QuestionHeader question='Tell me about a major experience you want on your resume. This could be a Job, a Technical Project, an Internship, or Volunteer Work What was your role and what did you primarily do?'>
          Start with the most relevant or recent role. This forms the foundation
          of your experience section.
        </QuestionHeader>

        <div className='w-[80%] px-10 flex items-center gap-7 mt-6'>
          <textarea
            value={mainExperience}
            onChange={e => setMainExperience(e.target.value)}
            rows={5}
            placeholder='e.g., Software Engineer at Google, led the development of a new cloud storage feature...'
            className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-4 px-6 shadow-sm focus:border-[#ec5b13] transition-colors'
          />
        </div>
      </section>

      {/* Dynamic Follow-up Accordion */}
      <div className='flex flex-col gap-4 mt-10 w-full  px-10'>
        <h3 className='font-bold text-lg text-slate-800 mb-2'>
          Boost your experience details (Optional but Recommended)
        </h3>
        {condensedFollowUps.map(item => (
          <div
            key={item.id}
            className={`  ${
              activeAccordion === item.id
                ? 'border-orange-400 border'
                : 'border-0'
            }    rounded-2xl overflow-hidden shadow-sm`}
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className='w-full flex justify-between items-center py-5 px-8  cursor-pointer transition-colors'
            >
              <span className='font-semibold text-sm text-slate-700'>
                {item.label}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                  activeAccordion === item.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                activeAccordion === item.id
                  ? 'max-h-[500px]  opacity-100 py-6'
                  : 'max-h-0 opacity-0'
              } px-8   overflow-hidden`}
            >
              <QuestionHeader question={item.question}>
                {item.insight}
              </QuestionHeader>

              <div className='mt-6'>
                <textarea
                  value={followUps[item.id]}
                  onChange={e => handleChange(item.id, e.target.value)}
                  rows={4}
                  placeholder={`Tell us more about ${item.label.toLowerCase()}...`}
                  className='w-full border text-sm  rounded-xl text-black outline-0 py-4 px-6 focus:border-[#ec5b13] transition-colors'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const condensedFollowUps = [
  {
    id: 'p1',
    label: 'Tech & Tools',
    question:
      'What specific tools, software, or languages did you use (e.g., React, Node, SQL, Excel)?',
    purpose: 'Hard skill extraction & ATS optimization.',
    insight:
      "These are the 'keywords' recruiters search for first. Be specific with libraries or frameworks."
  },
  {
    id: 'p2',
    label: 'Efficiency & Numbers',
    question:
      'Did you make a process faster, save money, or handle a high volume of tasks? (Give an estimate).',
    purpose: 'Quantifiable ROI and Productivity.',
    insight:
      "Time saved = money saved. Even a '20% improvement' or '50 tasks/day' makes a huge impact."
  },
  {
    id: 'p3',
    label: 'Problem Solving & Innovation',
    question:
      'What was a major challenge you solved, or an idea you suggested that was actually used?',
    purpose: 'Demonstrate initiative and critical thinking.',
    insight:
      "This turns a 'Duty' into an 'Achievement.' It shows you think about the 'How' and 'Why,' not just the 'What.'"
  },
  {
    id: 'p4',
    label: 'Leadership & Collaboration',
    question:
      'Did you mentor others, lead a group, or work across different teams/clients?',
    purpose: 'Identify soft skills and management potential.',
    insight:
      'Modern work is a team sport. Showing you can lead or communicate across teams is a massive plus.'
  },
  {
    id: 'p5',
    label: 'The Big Win (Result)',
    question:
      'What was the final result or best feedback you received? (e.g., A live URL, a finished app, a 5-star review).',
    purpose: "Capture the 'Outcome' and Social Proof.",
    insight:
      'Employers hire for results. Ending with a tangible deliverable proves you can finish what you start.'
  }
]
