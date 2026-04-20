import { useState } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  BadgeCheck,
  LayoutGrid,
  List,
  ArrowRight,
  X
} from 'lucide-react'
import JobSearchHeader from './JobSearchHeader'
import JobDetailView from './JobDetailView'

const sampleJobs = [
  {
    job_id: 'VnVsqdlLW-S4XAiNAAAAAA==',
    job_title: 'Software Developer',
    employer_name: 'United Airlines',
    employer_website: 'https://www.united.com',
    job_publisher: 'United Airlines Jobs',
    job_apply_link:
      'https://careers.united.com/us/en/job/WHQ00024224/Software-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
    job_location: 'Chicago, IL',
    job_city: 'Chicago',
    job_state: 'Illinois',
    job_country: 'US',
    job_employment_type: 'FULLTIME',
    job_employment_type_text: 'Full-time',
    job_posted_human_readable: '1 day ago',
    job_description:
      "Description There's never been a more exciting time to join United Airlines. We're on a path towards becoming the best airline in the history of aviation. Our shared purpose – Connecting People, Uniting the World – is about more than getting people from one place to another. It also means that as a global company that operates in hundreds of locations around the world with millions of customers and tens of thousands of employees, we have a unique responsibility to uplift and provide opportunities in the places where we work, live and fly, and we can only do that with a truly diverse and inclusive workforce. And we're growing – in the years ahead, we'll hire tens of thousands of people across every area of the airline. Our careers include a competitive benefits package aimed at keeping you happy, healthy and well-traveled. From employee-run 'Business Resource Group' communities to world-class benefits like parental leave, 401k and privileges like space available travel, United is truly a one-of-a-kind place to work. Are you ready to travel the world? We believe that inclusion propels innovation and is the foundation of all that we do. United's Digital Technology team spans the globe and is made up of diverse individuals all working together with cutting-edge technology to build the best airline in the history of aviation. Our team designs, develops and maintains massively scaling technology solutions brought to life with innovative architectures, data analytics, and digital solutions. Key Responsibilities: United's Revenue Management team is growing and we are seeking a Software Developer to come join us! The Software Developer plays an important role in creating and maintaining the strategic partnership between business needs and technology delivery. The Developer's role is to plan, design, develop and launch efficient systems and solutions in support of core organizational functions. This individual will utilize effective communication, analytical, and problem-solving skills to help identify, communicate / resolve issues, opportunities, or problems to maximize the benefit of IT and Business investments. The Developer is experienced and self-sufficient in performing their responsibilities requiring little supervision, but general guidance and direction. This is a hybrid role at United's headquarters based in Chicago Office, Willis Tower. • Assist in design, develop and modify software applications/systems • Collaborates with cross-functional teams to understand business requirements and deliver solutions • Provides support to the software development leads (Ex: Senior Developer) • Works on one or more moderate to complex projects • Applies security code best practices throughout development cycle • Contributes to software documentation and user manuals • Complete comprehensive unit testing on all developed/enhanced software and supports deployment of software application • Participates in code reviews to ensure code adheres to standards • Support and troubleshoot software systems as required, optimizing performance, resolving problems, and providing follow-up on all issues and solutions • Stays up to date on the latest industry trends and technology United values diverse experiences, perspectives, and we encourage everyone who meets the minimum qualifications to apply. While having the 'desired' qualifications make for a stronger candidate, we encourage applicants who may not feel they check ALL of those boxes! We are always looking for individuals who will bring something new to the table! Qualifications What's needed to succeed (Minimum Qualifications): • Bachelor's degree in Computer science, software engineering, or related field • 3+ years of experience in a similar role • Proficient in a coding language and building back-end components • Problem solving • Attention to detail • Effective Communication (verbal + written) • Demonstrates and eagerness to learn • Demonstrate advanced knowledge of SDLC processes, inputs/outputs, standards and best practices • Demonstrate advance knowledge of development methodologies, software design and design patterns • Demonstrate advance knowledge of the application of development domain areas and specific technologies and tool set • Must be legally authorized to work in the United States for any employer without sponsorship • Successful completion of interview required to meet job qualification • Reliable, punctual attendance is an essential function of the position What will help you propel from the pack (Preferred Qualifications): • Cloud technologies (i.e., Azure, AWS) • Exposure to APPD & Dynatrace • Agile Methodologies • .Net, C, C++, C#, Java • HTML, Java Script (Angular 2.0, JS), CSS • SQL, Oracle Experience, Relational DB Experience • Code Repositories like TFS • Microsoft Office tools, PowerPoint, Excel • Chef/Ansible, Configuration tools • Dev Ops Experience • Infrastructure knowledge • Windows Server 2012 • UI Analytics (Google Analytics) • Continuous Integration & Continuous Deployment • Mobile Technologies • Exposure to Couchbase NoSQL D United Airlines is an equal opportunity employer. United Airlines recruits, employs, trains, compensates and promotes regardless of race, religion, color, national origin, gender identity, sexual orientation, physical ability, age, veteran status and other protected status as required by applicable law. We will ensure that individuals with disabilities are provided reasonable accommodation to participate in the job application or interview process, to perform crucial job functions. Please contact JobAccommodations@united.com to request accommodation. Equal Opportunity Employer - Minorities/Women/Veterans/Disabled/LGBT",
    job_is_remote: false,
    job_benefits: ['health_insurance'],
    job_highlights: {
      Qualifications: [
        "Bachelor's degree in Computer science, software engineering, or related field",
        '3+ years of experience in a similar role',
        'Proficient in a coding language and building back-end components',
        'Problem solving',
        'Attention to detail',
        'Effective Communication (verbal + written)',
        'Must be legally authorized to work in the United States for any employer without sponsorship'
      ],
      Responsibilities: [
        'Assist in design, develop and modify software applications/systems',
        'Collaborates with cross-functional teams to understand business requirements and deliver solutions',
        'Works on one or more moderate to complex projects',
        'Applies security code best practices throughout development cycle',
        'Complete comprehensive unit testing on all developed/enhanced software'
      ]
    }
  }
]

export function JobListing () {
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('All Job Types')

  const getJobSalary = job => job.job_salary || 'Not disclosed'

  const handleSearch = () => {
    console.log('Searching for:', { searchTerm, location, jobType })
  }

  const handleJobClick = job => {
    setSelectedJob(job)
  }

  const closeDetail = () => {
    setSelectedJob(null)
  }

  return (
    <section className='w-full h-screen overflow-hidden flex flex-col relative'>
      <div className='w-full h-full   overflow-y-auto [scrollbar-width:none] p-5'>
        <div className='max-w-7xl h-full   mx-auto space-y-5'>
          <div className='space-y-4 h-full justify-between flex  flex-col  '>
            <section className=' flex flex-col p-10 gap-5'>
              <div className='flex items-center justify-between px-1'>
                <h2 className='text-[13px] font-medium text-slate-500 font-satoshi'>
                  <span className='font-bold text-slate-900'>89</span>
                  jobs today
                </h2>
                {/* <div className='flex items-center gap-1.5 p-1 bg-gray-100/80 rounded-lg'>
                  <button className='p-1 bg-white shadow-sm rounded-md text-slate-600'>
                    <LayoutGrid className='w-3.5 h-3.5' />
                  </button>
                  <button className='p-1 text-slate-400 hover:text-slate-600 transition-colors'>
                    <List className='w-3.5 h-3.5' />
                  </button>
                </div> */}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {sampleJobs.map(job => (
                  <div
                    key={job.job_id}
                    className='bg-white rounded-3xl p-5 border-0 border-gray-100 shadow-sm transition-all group relative flex flex-col gap-4'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex gap-3 items-center'>
                        <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-inner'>
                          UA
                        </div>
                        <div>
                          <div className='flex items-center gap-1'>
                            <span className='text-[10px] font-bold text-slate-400 font-IBM tracking-tight uppercase'>
                              {job.employer_name}
                            </span>
                          </div>
                          <h3 className='text-sm font-bold text-slate-900 font-IBM leading-tight mt-0.5  transition-colors'>
                            {job.job_title}
                          </h3>
                        </div>
                      </div>
                      <button className='p-1.5 text-slate-300 hover:text-[#f17e27] hover:bg-orange-50 rounded-lg transition-all'>
                        <Bookmark className='w-4.5 h-4.5' />
                      </button>
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      <div className='flex items-center gap-1.5 text-[11px] text-slate-400 font-satoshi font-semibold px-2.5 py-1 bg-gray-50 rounded-full'>
                        <Briefcase className='w-3 h-3' />
                        {job.job_employment_type_text}
                      </div>
                      <div className='flex items-center gap-1.5 text-[11px] text-slate-400 font-satoshi font-semibold px-2.5 py-1 bg-gray-50 rounded-full'>
                        <MapPin className='w-3 h-3' />
                        {job.job_location}
                      </div>
                    </div>

                    <p className='text-[12px] text-slate-500 font-satoshi leading-relaxed line-clamp-2'>
                      {job.job_description}
                    </p>

                    <div className='mt-auto pt-1'>
                      <div className='flex justify-between items-end mb-3'>
                        <div className='flex flex-col'>
                          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider'>
                            Salary
                          </span>
                          <span className='text-sm font-bold text-slate-900 font-satoshi'>
                            {getJobSalary(job)}
                          </span>
                        </div>
                        <span className='text-[11px] font-bold text-slate-300 font-satoshi'>
                          {job.job_posted_human_readable}
                        </span>
                      </div>

                      <button
                        className='w-full cursor-pointer py-2.5 bg-[#fff7ed] text-[#f17e27] transition-all hover:bg-[#f17e27] hover:text-white rounded-xl text-[12px] font-bold font-satoshi tracking-tight flex items-center justify-center gap-1.5 group/btn'
                        onClick={() => handleJobClick(job)}
                      >
                        View Details
                        <ArrowRight className='w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pagination */}
            <div className='flex items-center  justify-between mt-8 py-5 border-t border-gray-100'>
              <button className='flex items-center gap-1 px-4 py-2 text-[13px] font-bold text-slate-500 hover:text-[#f17e27] transition-all rounded-lg hover:bg-orange-50'>
                <ChevronLeft className='w-4 h-4' />
                Prev
              </button>
              <div className='flex items-center gap-1.5'>
                {[1, 2, 3, '...', 12].map((p, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      p === 1
                        ? 'bg-[#f17e27] text-white'
                        : 'text-slate-400 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button className='flex items-center gap-1 px-4 py-2 text-[13px] font-bold text-slate-500 hover:text-[#f17e27] transition-all rounded-lg hover:bg-orange-50'>
                Next
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedJob && (
        <div className='fixed inset-0 z-40  '>
          <div
            className='absolute inset-0 bg-black/20 '
            onClick={closeDetail}
          />
          <div className='absolute right-2 rounded-2xl top-2 bottom-10 h-[97%] w-full max-w-xl bg-white scrollbar-none shadow-2xl overflow-y-auto'>
            <button
              onClick={closeDetail}
              className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all z-10'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
            <JobDetailView job={selectedJob} />
          </div>
        </div>
      )}
    </section>
  )
}

export default JobListing
