import {
  ChevronRight,
  Download,
  FilePlusCornerIcon,
  FolderCodeIcon,
  FolderOpen,
  Pencil,
  Search,
  Trash2,
  Upload
} from 'lucide-react'
import Folder from '../../../components/Folder'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toggleModals, openFileDetails } from '../../../store/modalSlice'
import FilePreview from '../Resume/FilePreview'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteProgram,
  FetchPrograms,
  MoveFile
} from '../../../services/Program'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { toastPresets } from '../../../components/toasters'
import { DragDropProvider } from '@dnd-kit/react'
import { Draggable, Droppable } from '../../../components/dragger'

function formatBytes (bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function Main () {
  const { showRightbar } = useSelector(state => state.dashboard)
  const { appearance } = useSelector(state => state.preferences)
  const { id } = useParams()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const actualPath = location.pathname.split('/').at(-1)
  const [movingFiles, setMovingFiles] = useState([])
  const [menuConfig, setMenuConfig] = useState({
    visible: false,
    x: 0,
    y: 0,

    id: null
  })

  useEffect(() => {
    const handleClickOutside = () =>
      setMenuConfig(prev => ({ ...prev, visible: false }))
    if (menuConfig.visible) {
      window.addEventListener('click', handleClickOutside)
    }
    return () => window.removeEventListener('click', handleClickOutside)
  }, [menuConfig.visible])

  function handleClick (e, item) {
    e.preventDefault()
    e.stopPropagation()
    setMenuConfig({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      id: item.folder?.id || item.file?.id,
      item
    })
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program'],
    queryFn: () => FetchPrograms(),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
  const programs = data?.data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )

  const openedFolder = programs?.find(item => item?.folder?.id == id)?.folder

  const headerText =
    actualPath !== 'overview' ? 'Saved Resumes' : 'Recently Opened'

  function openFile (folderid, resumeid) {
    if (folderid == 0 || !folderid) {
      return navigate(`/dashboard/file/?resumeID=${resumeid}`)
    }
    navigate(`/dashboard/file/?folderID=${folderid}&resumeID=${resumeid}`)
  }

  function openFolder (item) {
    queryClient.invalidateQueries({ queryKey: ['program'] })
    navigate(`/dashboard/folder/${item.folder.id}`)
  }

  function openFileModal () {
    dispatch(toggleModals('uploadFile'))
  }
  function openFolderModal () {
    dispatch(toggleModals('folder'))
  }

  function handleDragEnd (event) {
    console.log(event)
    console.log(event.operation)
    const { active, over } = event.operation
    if (!over) return

    const activeId = active.id
    const overId = over.id

    console.log('active', active, 'over', over)

    if (String(activeId) === String(overId)) return

    const activeData = active.data
    if (activeData?.type === 'file') {
      setMovingFiles(prev => [...prev, activeId])
      toast.loading('Moving file...', {
        ...toastPresets.generalLoading('Moving file to folder'),
        position: 'top-center'
      })
    }
  }

  const mutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      // const program = data.data
      queryClient.invalidateQueries({ queryKey: ['program'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
      toast.success(`Program deleted  succesfully`, {
        ...toastPresets.aiSuccess(),
        position: 'top-center'
      })
    },
    onError: () => {
      toast.error('Failed to delete program', {
        ...toastPresets.generalError('Please try again'),
        position: 'top-center'
      })
    }
  })

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <section className='flex flex-col  pl-5   gap-0 pt-0'>
        <div className='px-5'>
          <div className='w-full flex justify-between items-center pr-15'>
            <h2
              className={`w-full text-2xl font-IBM ${
                appearance.theme == 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {headerText}
            </h2>

            <div className=' flex w-full   items-center  gap-5'>
              {!openedFolder && (
                <button
                  onClick={() => {
                    openFolderModal()
                  }}
                  className=' text-xs font-satoshi flex gap-2 shadow-sm shadow-black/40 bg-orange-300 hover:bg-amber-500 px-4 w-max cursor-pointer py-3 text-white items-center h-full rounded-xl'
                >
                  <FolderCodeIcon className=' w-4 h-4' />
                  New Folder
                </button>
              )}

              <button
                onClick={() => {
                  openFileModal()
                }}
                className=' text-xs font-satoshi w-max  px-4 shadow-sm shadow-black/40 flex gap-2 bg-orange-300 hover:bg-amber-500 cursor-pointer py-3 text-white items-center h-full rounded-xl'
              >
                <FilePlusCornerIcon className=' w-4 h-4' />
                Add File
              </button>
              <div
                className={`w-70 grow  p-3 py-2.5 rounded-xl items-center gap-5 border flex ${
                  appearance.theme == 'dark'
                    ? 'bg-[#2a2a2a] border-slate-700'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <Search
                  className={`w-5 h-5 ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-black'
                  }`}
                />
                <input
                  type='text'
                  placeholder='Search by Folder or File name'
                  className={`w-full text-xs font-satoshi h-full outline-0 ${
                    appearance.theme == 'dark'
                      ? 'bg-transparent text-white placeholder:text-slate-400'
                      : 'text-black'
                  }`}
                  name=''
                  id=''
                />
              </div>
            </div>
          </div>

          <div
            className={`flex gap-5 mt-5 items-center pl-5 text-xs font-semibold font-satoshi ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-black'
            }`}
          >
            <p
              onClick={() => {
                if (id) navigate(-1)
              }}
              className={`cursor-pointer border-white hover:border-black border-b ${
                id
                  ? 'text-slate-400'
                  : appearance.theme == 'dark'
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              Home
            </p>
            {id && (
              <>
                <ChevronRight
                  className={`w-4 h-4 ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-black'
                  }`}
                />
                <p
                  className={`capitalize ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  {openedFolder?.metaData?.name}
                </p>
              </>
            )}
          </div>
        </div>

        <section
          className={`grid   gap-4 transform-gpu transition-all duration-150 ease-in-out mt-0 pt-5 pl-10 overflow-hidden 
            
            ${
              showRightbar ? 'grid-cols-6' : 'grid-cols-8'
            } pb-0 mb-0    gap-y-10
           ${
             actualPath == 'resumes' && ' min-h-max overflow-y-auto'
           } [scrollbar-width:thin] w-full`}
        >
          {/* specific files in an opened folder  */}
          {openedFolder && id && (
            <section className='col-span-7 grid grid-cols-7 gap-4 w-full'>
              {openedFolder?.files?.map(item => (
                <Draggable
                  key={item.id}
                  itemId={item.id}
                  parentId={openedFolder.id}
                  disabled={movingFiles.includes(item.id)}
                >
                  <section
                    onClick={() => {
                      openFile(openedFolder.id, item.id)
                    }}
                    className={`pl-2 gap-2 h-26 w-35 shrink-0 flex flex-col items-start ${
                      movingFiles.includes(item.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className='bg-[#c4c7cc15] shadow-sm  rounded-xl w-full h-full flex'>
                      <div className=' mt-5'>
                        {item.metaData.extension == 'pdf' ? (
                          <img
                            width='23'
                            height='23'
                            src='https://img.icons8.com/color/48/pdf-2--v1.png'
                            alt='pdf-2--v1'
                          />
                        ) : (
                          <img
                            width='23'
                            height='23'
                            src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
                            alt='microsoft-word-2019--v2'
                          />
                        )}
                      </div>

                      <MiniIframe src={item.metaData.content} />
                    </div>
                    <div
                      className={`flex w-[90%] mt-1 pl-2 items-center text-[10px] justify-center font-semibold gap-1 ${
                        appearance.theme == 'dark'
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      <p className='truncate'>{item.metaData.name}.pdf</p>
                      <p className='whitespace-nowrap'>
                        {formatBytes(item.metaData.size)}
                      </p>
                    </div>
                  </section>
                </Draggable>
              ))}
            </section>
          )}
          {isFetching && (
            <div className='custom-loader absolute bottom-0 top-0 left-0 right-0 w-full '></div>
          )}

          {/* All folders and files in overview and resumes */}
          {!isLoading && (!programs || programs.length === 0) && (
            <EmptyState onUpload={openFileModal} />
          )}
          {!isLoading &&
            !id &&
            programs?.length > 0 &&
            programs?.map(item =>
              item?.type === 'FOLDER' ? (
                <Droppable
                  data={item.folder}
                  id={item.folder.id}
                  key={item.folder.id}
                >
                  <div
                    onDoubleClick={() => openFolder(item)}
                    onClick={e => handleClick(e, item)}
                    className='w-28 shrink-0 cursor-pointer'
                  >
                    <Folder files={item?.folder.files} />
                    <div
                      className={`flex w-full text-xs mt-2 items-center text-[10px] justify-center font-semibold gap-1 ${
                        appearance.theme == 'dark'
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      <p className='truncate'>{item.folder.metaData.name}</p>
                      <p>{formatBytes(item.folder.metaData.size)}</p>
                    </div>
                  </div>
                </Droppable>
              ) : (
                !item.file?.folderId?.length > 0 && (
                  <Draggable
                    data={item.file}
                    key={item.file.id}
                    itemId={item.file.id}
                    disabled={movingFiles.includes(item.file.id)}
                  >
                    <section
                      onClick={e => handleClick(e, item)}
                      onDoubleClick={() => openFile(null, item.file.id)}
                      className={`cursor-pointer pl-2 gap-2 h-26 w-32 shrink-0 flex flex-col items-start ${
                        movingFiles.includes(item.file.id) ? 'opacity-50' : ''
                      }`}
                    >
                      <div className='bg-[#c4c7cc15] shadow-sm rounded-xl w-full h-full flex'>
                        <div className='mt-5'>
                          {item.file.metaData.extension == 'pdf' ? (
                            <img
                              width='23'
                              height='23'
                              src='https://img.icons8.com/color/48/pdf-2--v1.png'
                              alt='pdf'
                            />
                          ) : (
                            <img
                              width='23'
                              height='23'
                              src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
                              alt='word'
                            />
                          )}
                        </div>

                        <MiniIframe src={item.file.metaData.content} />
                      </div>
                      <div
                        className={`flex w-full mt-1 pl-2 items-center text-[10px] justify-center font-semibold gap-1 ${
                          appearance.theme == 'dark'
                            ? 'text-white'
                            : 'text-gray-700'
                        }`}
                      >
                        <p className='truncate'>
                          {item.file.metaData.name}.pdf
                        </p>
                        <p className='whitespace-nowrap'>
                          {formatBytes(item.file.metaData.size)}
                        </p>
                      </div>
                    </section>
                  </Draggable>
                )
              )
            )}
        </section>
        {menuConfig.visible && !openedFolder && (
          <ContextMenu
            mutation={mutation}
            menuConfig={menuConfig}
            onClose={() => setMenuConfig(prev => ({ ...prev, visible: false }))}
          />
        )}
      </section>
    </DragDropProvider>
  )
}

function ContextMenu ({ onClose, menuConfig, mutation }) {
  const item = menuConfig?.item
  console.log(item)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div
      className='fixed z-50 bg-white shadow-xl border border-slate-100/50 rounded-2xl py-1.5 w-25 p-0 flex flex-col font-satoshi'
      style={{
        top: menuConfig.y,
        left: menuConfig.x,
        transform: 'translate(10px, 10px)'
      }}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => {
          dispatch(openFileDetails(item))
          onClose()
        }}
        className='flex items-center rounded-[inherit] gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold transition-all cursor-pointer'
      >
        <Pencil size={11} strokeWidth={2.5} />
        <span>Edit </span>
      </button>

      <button
        onClick={() => {
          if (item?.file) {
            navigate(`/dashboard/file/?resumeID=${item.file.id}`)
          } else {
            navigate(`/dashboard/folder/${item.folder.id}`)
          }
          onClose()
        }}
        className='flex items-center rounded-[inherit] gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold transition-all cursor-pointer'
      >
        <FolderOpen size={11} strokeWidth={2.5} />
        <span>Open</span>
      </button>

      <button
        onClick={() => onClose()}
        className='flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold transition-all cursor-pointer'
      >
        <Download className='shrink-0' size={11} strokeWidth={2.5} />
        <span>Download</span>
      </button>

      <div className='h-px bg-slate-100 my-1 mx-3' />

      <button
        onClick={() => {
          mutation.mutate(item?.folder?.id || item?.file?.id)
          onClose()
        }}
        className='flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-rose-500 text-[10px] font-semibold transition-all cursor-pointer'
      >
        <Trash2 size={11} strokeWidth={2.5} />
        <span>Delete</span>
      </button>
    </div>
  )
}

function MiniIframe ({ src }) {
  const thumbnailUrl = src.replace(
    '/upload/',
    '/upload/w_300,h_400,pg_1,f_jpg/'
  )
  return (
    <section className='bg-[#c4c7cc15] shadow-sm rounded-xl w-full h-full overflow-hidden'>
      <img src={thumbnailUrl} alt='' className=' h-full w-full object-cover' />
    </section>
  )
}

function EmptyState () {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='col-span-8 flex flex-col items-center justify-center h-75 gap-4'>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-orange-50'
        }`}
      >
        <FolderCodeIcon
          className={`w-6 h-6 ${
            appearance.theme == 'dark' ? 'text-white' : 'text-orange-300'
          }`}
        />
      </div>
      <p
        className={`text-lg font-satoshi font-semibold ${
          appearance.theme == 'dark' ? 'text-white' : 'text-slate-800'
        }`}
      >
        No files yet
      </p>
      <p
        className={`text-sm font-satoshi text-center max-w-60 ${
          appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        Upload your first resume to get started.
      </p>
    </div>
  )
}
