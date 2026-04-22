import { useSelector, useDispatch } from 'react-redux'
import { FileText, Bot, Palette, Share2, Bell, Type } from 'lucide-react'
import {
  setResumeTemplate,
  setPaperSize,
  setDefaultFont,
  setDefaultFontSize,
  setLineSpacing,
  setAiTone,
  setAutoOptimize,
  setAddMetrics,
  setStrengthenVerbs,
  setTheme,
  setSidebar,
  setCompactMode,
  setExportFormat,
  setFileNaming,
  setIncludeCoverLetter,
  setAiCompleteNotification,
  setWeeklyDigestNotification,
  setAppStatusNotification,
  setMarketingNotification,
  setAutoSave,
  setCharCount,
  setAtsScore,
  setSpellCheck
} from '../../store/preferencesSlice'

const Radio = ({ label, checked, onChange }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <label className='flex items-center gap-1.5 cursor-pointer'>
      <div
        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? 'border-[#f17e27]' : 'border-slate-300'
        }`}
      >
        {checked && <div className='w-1.5 h-1.5 rounded-full bg-[#f17e27]' />}
      </div>
      <span className={`text-xs ${
        appearance.theme == 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>{label}</span>
      <input
        type='radio'
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
    </label>
  )
}

const Checkbox = ({ label, checked, onChange }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          checked ? 'bg-[#f17e27] border-[#f17e27]' : 'border-slate-300'
        }`}
      >
        {checked && <span className='text-white text-[10px]'>✓</span>}
      </div>
      <span className={`text-xs ${
        appearance.theme == 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>{label}</span>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
    </label>
  )
}

const Select = ({ value, options, onChange }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-3 py-1.5 text-xs rounded-lg border text-slate-700 outline-none focus:border-[#f17e27] transition-colors cursor-pointer ${
        appearance.theme == 'dark'
          ? 'bg-[#202020] border-slate-700'
          : 'border-slate-200 bg-white'
      }`}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

const Row = ({ label, children }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className={`flex items-center justify-between py-2 border-b last:border-0 ${
      appearance.theme == 'dark' ? 'border-slate-700' : 'border-slate-100'
    }`}>
      <span className={`text-xs w-36 ${
        appearance.theme == 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>{label}</span>
      <div className='flex items-center gap-3'>{children}</div>
    </div>
  )
}

const SectionHeading = ({ icon: Icon, children }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <h2 className={`text-sm font-semibold flex items-center gap-2 border-b border-slate-200 pb-2 mb-4 ${
      appearance.theme == 'dark' ? 'text-white' : 'text-slate-800'
    }`}>
      <Icon size={15} className='text-[#f17e27]' />
      {children}
    </h2>
  )
}

const Card = ({ children }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className={`rounded-xl p-5 border space-y-1 ${
      appearance.theme == 'dark' 
        ? 'bg-[#2a2a2a] border-slate-700' 
        : 'bg-white border-slate-200'
    }`}>
      {children}
    </div>
  )
}

export default function Prefrences () {
  const dispatch = useDispatch()
  const { appearance } = useSelector(state => state.preferences)
  const pref = useSelector(state => state.preferences)

  return (
    <section className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-6 ${
      appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
    }`}>
      <div className='max-w-2xl mx-auto space-y-6 pb-16'>
        <div>
          <h1 className={`text-2xl font-bold font-IBM ${
            appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Preferences
          </h1>
          <p className={`text-xs mt-0.5 ${
            appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Customize your experience
          </p>
        </div>

        <Card>
          <SectionHeading icon={FileText}>Resume Defaults</SectionHeading>
          <Row label='Default Template'>
            <Select
              value={pref.resume.template}
              options={[
                'Classic Chronological',
                'Modern',
                'Minimal',
                'Creative'
              ]}
              onChange={v =>
                dispatch(setResumeTemplate(v.toLowerCase().split(' ')[0]))
              }
            />
          </Row>
          <Row label='Paper Size'>
            <div className='flex items-center gap-4'>
              <Radio
                label='A4'
                checked={pref.resume.paperSize === 'a4'}
                onChange={() => dispatch(setPaperSize('a4'))}
              />
              <Radio
                label='Letter'
                checked={pref.resume.paperSize === 'letter'}
                onChange={() => dispatch(setPaperSize('letter'))}
              />
            </div>
          </Row>
          <Row label='Default Font'>
            <Select
              value={pref.resume.font}
              options={['Inter', 'Arial', 'Calibri', 'Roboto', 'Open Sans']}
              onChange={v => dispatch(setDefaultFont(v.toLowerCase()))}
            />
          </Row>
          <Row label='Font Size'>
            <Select
              value={pref.resume.fontSize}
              options={['10pt', '11pt', '12pt', '13pt', '14pt']}
              onChange={v => dispatch(setDefaultFontSize(v))}
            />
          </Row>
          <Row label='Line Spacing'>
            <Select
              value={pref.resume.lineSpacing}
              options={['1.0', '1.15', '1.5', '2.0']}
              onChange={v => dispatch(setLineSpacing(v))}
            />
          </Row>
        </Card>

        <Card>
          <SectionHeading icon={Bot}>AI Optimization</SectionHeading>
          <Row label='Default Tone'>
            <Select
              value={pref.ai.tone}
              options={['Professional', 'Friendly', 'Formal', 'Creative']}
              onChange={v => dispatch(setAiTone(v.toLowerCase()))}
            />
          </Row>
          <Row label='Auto-optimize on save'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Yes'
                checked={pref.ai.autoOptimize}
                onChange={() => dispatch(setAutoOptimize(true))}
              />
              <Radio
                label='No'
                checked={!pref.ai.autoOptimize}
                onChange={() => dispatch(setAutoOptimize(false))}
              />
            </div>
          </Row>
          <Row label='Add metrics'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Always'
                checked={pref.ai.addMetrics === 'always'}
                onChange={() => dispatch(setAddMetrics('always'))}
              />
              <Radio
                label='Ask me'
                checked={pref.ai.addMetrics === 'ask'}
                onChange={() => dispatch(setAddMetrics('ask'))}
              />
            </div>
          </Row>
          <Row label='Strengthen verbs'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Always'
                checked={pref.ai.strengthenVerbs === 'always'}
                onChange={() => dispatch(setStrengthenVerbs('always'))}
              />
              <Radio
                label='Ask me'
                checked={pref.ai.strengthenVerbs === 'ask'}
                onChange={() => dispatch(setStrengthenVerbs('ask'))}
              />
            </div>
          </Row>
        </Card>

        <Card>
          <SectionHeading icon={Palette}>Appearance</SectionHeading>
          <Row label='Theme'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Light'
                checked={pref.appearance.theme === 'light'}
                onChange={() => dispatch(setTheme('light'))}
              />
              <Radio
                label='Dark'
                checked={pref.appearance.theme === 'dark'}
                onChange={() => dispatch(setTheme('dark'))}
              />
              <Radio
                label='System'
                checked={pref.appearance.theme === 'system'}
                onChange={() => dispatch(setTheme('system'))}
              />
            </div>
          </Row>
          <Row label='Sidebar'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Expanded'
                checked={pref.appearance.sidebar === 'expanded'}
                onChange={() => dispatch(setSidebar('expanded'))}
              />
              <Radio
                label='Collapsed'
                checked={pref.appearance.sidebar === 'collapsed'}
                onChange={() => dispatch(setSidebar('collapsed'))}
              />
            </div>
          </Row>
          <Row label='Compact Mode'>
            <div className='flex items-center gap-4'>
              <Radio
                label='Yes'
                checked={pref.appearance.compactMode}
                onChange={() => dispatch(setCompactMode(true))}
              />
              <Radio
                label='No'
                checked={!pref.appearance.compactMode}
                onChange={() => dispatch(setCompactMode(false))}
              />
            </div>
          </Row>
        </Card>

        <Card>
          <SectionHeading icon={Share2}>Export & Sharing</SectionHeading>
          <Row label='Default Format'>
            <div className='flex items-center gap-4'>
              <Radio
                label='PDF'
                checked={pref.export.format === 'pdf'}
                onChange={() => dispatch(setExportFormat('pdf'))}
              />
              <Radio
                label='DOCX'
                checked={pref.export.format === 'docx'}
                onChange={() => dispatch(setExportFormat('docx'))}
              />
            </div>
          </Row>
          <Row label='File Naming'>
            <Select
              value={pref.export.fileNaming}
              options={['Resume_{name}', 'Name_Resume', 'Date_Name', 'Custom']}
              onChange={v => dispatch(setFileNaming(v.toLowerCase()))}
            />
          </Row>
        </Card>
      </div>
    </section>
  )
}
