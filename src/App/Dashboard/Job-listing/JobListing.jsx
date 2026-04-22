import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { getJobs } from '../../../services/jobs'
import { useSelector } from 'react-redux'

import JobDetailView from './Detail'

export function JobListing () {
  const [selectedJob, setSelectedJob] = useState(null)
  const { appearance } = useSelector(state => state.preferences)
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs
  })

  const prepareJob = job => ({
    id: job.id,
    jobId: job.jobId,
    jobTitle: job.jobTitle,
    employerName: job.employerName,
    employerLogo: job.employerLogo || null,
    employerWebsite: job.employerWebsite || null,
    jobPublisher: job.jobPublisher || null,
    jobApplyLink: job.jobApplyLink,
    jobLocation: job.jobLocation,
    jobCity: job.jobCity || null,
    jobState: job.jobState || null,
    jobCountry: job.jobCountry || null,
    jobEmploymentType: job.jobEmploymentType,
    jobPostedHumanReadable: job.jobPostedHumanReadable || null,
    jobDescription: job.jobDescription,
    jobIsRemote: job.jobIsRemote || false,
    jobSalaryString: job.jobSalaryString || null,
    jobMinSalary: job.jobMinSalary || null,
    jobMaxSalary: job.jobMaxSalary || null,
    jobSalaryPeriod: job.jobSalaryPeriod || null,
    jobHighlights: job.jobHighlights || {}
  })

  const getJobSalary = job =>
    job.jobSalaryString || job.job_salary_string || 'Not disclosed'

  const handleJobClick = job => {
    setSelectedJob(job)
  }

  const closeDetail = () => {
    setSelectedJob(null)
  }

  return (
    <section className={`w-full h-screen overflow-hidden flex flex-col relative ${
      appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
    }`}>
      <div className={`w-full h-full overflow-y-auto [scrollbar-width:none] p-5 ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      }`}>
        <div className='max-w-7xl h-full   mx-auto space-y-5'>
          <div className='space-y-4 h-full justify-between flex  flex-col  '>
            <section className=' flex flex-col p-10 gap-5'>
              <div className='flex items-center justify-between px-1'>
                <h2 className={`text-[13px] font-medium font-satoshi ${
                  appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span className={`font-bold ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {jobs.length}
                  </span>
                  {jobs.length === 1 ? ' job' : ' jobs'}
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {isLoading ? (
                  <div className='col-span-full flex items-center justify-center py-20'>
                    <div className='animate-spin w-8 h-8 border-2 border-[#f17e27] border-t-transparent rounded-full' />
                  </div>
                ) : jobs.length === 0 ? (
                  <div className='col-span-full flex flex-col items-center justify-center py-20 gap-4'>
                    <p className='text-slate-500'>No jobs found</p>
                    <button
                      //   onClick={handlegetJobs}
                      className='px-4 py-2 bg-[#f17e27] text-white rounded-lg text-sm font-semibold'
                    >
                      Fetch Jobs
                    </button>
                  </div>
                ) : (
                  jobs.map(job => {
                    const prepared = prepareJob(job)
                    return (
                      <div
                        key={job.id || job.jobId}
                        className='bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer'
                        onClick={() => handleJobClick(prepared)}
                      >
                        <div className='flex gap-3'>
                          <div className='w-12 h-12 shrink-0'>
                            {prepared.employerLogo ? (
                              <img
                                src={prepared.employerLogo}
                                className='w-full h-full object-contain rounded-lg bg-gray-50'
                                alt=''
                              />
                            ) : (
                              <div className='w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg'>
                                {prepared.employerName?.charAt(0) || 'J'}
                              </div>
                            )}
                          </div>

                          <div className='flex-1 min-w-0'>
                            <h3 className='text-sm font-bold text-slate-900 font-IBM truncate'>
                              {prepared.jobTitle}
                            </h3>
                            <p className='text-xs font-bold text-[#f17e27] uppercase tracking-wide mt-0.5'>
                              {prepared.employerName}
                            </p>
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-2 mt-3'>
                          <span className='px-2.5 py-1 bg-[#fff7ed] text-[#f17e27] rounded-full text-[10px] font-bold'>
                            {prepared.jobEmploymentType}
                          </span>
                          <span className='px-2.5 py-1 bg-gray-100 text-slate-600 rounded-full text-[10px] font-medium'>
                            {getJobSalary(prepared)}
                          </span>
                        </div>

                        <div className='flex items-center gap-2 mt-3 text-xs text-slate-500'>
                          <span className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            {prepared.jobLocation}
                          </span>
                          <span>•</span>
                          <span>{prepared.jobPostedHumanReadable}</span>
                        </div>

                        <p className='text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed'>
                          {prepared.jobDescription}
                        </p>
                      </div>
                    )
                  })
                )}
              </div>
            </section>
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
