import {
  ChevronRight,
  Download,
  FilePlusCornerIcon,
  FolderCodeIcon,
  FolderOpen,
  Pencil,
  Search,
  Trash2
} from 'lucide-react'
import Folder from '../../../components/Folder'

import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toggleModals } from '../../../store/modalSlice'
import FilePreview from '../Resume/FilePreview'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchPrograms, MoveFile } from '../../../services/Program'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { toastPresets } from '../../../components/toasters'

function formatBytes (bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function Main () {
  const { id } = useParams()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const actualPath = location.pathname.split('/').at(-1)
  const [, setDraggedItem] = useState(null)
  const [touchDrag, setTouchDrag] = useState(null)
  const [movingFiles, setMovingFiles] = useState([])
  const [menuConfig, setMenuConfig] = useState({
    visible: false,
    x: 0,
    y: 0,
    folder: null
  })

  useEffect(() => {
    const handleClickOutside = () =>
      setMenuConfig(prev => ({ ...prev, visible: false }))
    if (menuConfig.visible) {
      window.addEventListener('click', handleClickOutside)
    }
    return () => window.removeEventListener('click', handleClickOutside)
  }, [menuConfig.visible])

  function handleFolderClick (e, item) {
    e.preventDefault()
    e.stopPropagation()
    setMenuConfig({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      item: item
    })
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program'],
    queryFn: () => FetchPrograms(),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
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
    // queryClient.invalidateQueries({ queryKey: ['program'] })
    navigate(`/dashboard/folder/${item.folder.id}`)
  }

  function openFileModal () {
    dispatch(toggleModals('uploadFile'))
  }
  function openFolderModal () {
    dispatch(toggleModals('folder'))
  }

  function handleDragStart (e, item, type) {
    e.dataTransfer.setData(
      'itemId',
      type === 'folder' ? item.folder.id : item.file.id
    )
    e.dataTransfer.setData('itemType', type)
    setDraggedItem({ item, type })
  }

  function handleDragOver (e) {
    e.preventDefault()
  }

  async function handleDrop (e, targetFolderId) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('itemId')
    const itemType = e.dataTransfer.getData('itemType')

    if (itemType === 'file') {
      setMovingFiles(prev => [...prev, itemId])
      const loadingToast = toast.loading('Moving file...', {
        ...toastPresets.generalLoading('Moving file to folder'),
        position: 'top-center'
      })

      try {
        await MoveFile(itemId, targetFolderId)
        toast.dismiss(loadingToast)
        toast.success('File moved', {
          ...toastPresets.generalSuccess('File moved to folder'),
          position: 'top-center'
        })
        queryClient.invalidateQueries({ queryKey: ['program'] })
      } catch (err) {
        console.error('Failed to move file:', err)
        toast.dismiss(loadingToast)
        toast.error('Failed to move file', {
          ...toastPresets.generalError('Please try again'),
          position: 'top-center'
        })
      } finally {
        setMovingFiles(prev => prev.filter(id => id !== itemId))
      }
    }
  }

  function handleTouchStart (e, item, type) {
    const touch = e.touches[0]
    setTouchDrag({
      itemId: type === 'folder' ? item.folder.id : item.file.id,
      itemType: type,
      startX: touch.clientX,
      startY: touch.clientY
    })
    setDraggedItem({ item, type })
  }

  function handleTouchMove (e) {
    if (!touchDrag) return

    e.preventDefault()
    const touch = e.touches[0]
    const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY)
    const dropZone = elementUnder?.closest('[data-droppable="true"]')

    document.querySelectorAll('[data-droppable="true"]').forEach(el => {
      el.classList.remove('ring-2', 'ring-orange-400')
    })

    if (dropZone) {
      dropZone.classList.add('ring-2', 'ring-orange-400')
    }
  }

  async function handleTouchEnd (e) {
    if (!touchDrag) return

    const touch = e.changedTouches[0]
    let dropZone = null

    if (touch.clientX > 0 && touch.clientY > 0) {
      const elementUnder = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      )
      dropZone = elementUnder?.closest('[data-droppable="true"]')
    }

    document.querySelectorAll('[data-droppable="true"]').forEach(el => {
      el.classList.remove('ring-2', 'ring-orange-400')
    })

    if (dropZone) {
      const targetFolderId = dropZone.getAttribute('data-folder-id')
      if (touchDrag.itemType === 'file' && targetFolderId) {
        setMovingFiles(prev => [...prev, touchDrag.itemId])
        const loadingToast = toast.loading('Moving file...', {
          ...toastPresets.generalLoading('Moving file to folder'),
          position: 'top-center'
        })

        try {
          await MoveFile(touchDrag.itemId, targetFolderId)
          toast.dismiss(loadingToast)
          toast.success('File moved', {
            ...toastPresets.generalSuccess('File moved to folder'),
            position: 'top-center'
          })
          queryClient.invalidateQueries({ queryKey: ['program'] })
        } catch (err) {
          console.error('Failed to move file:', err)
          toast.dismiss(loadingToast)
          toast.error('Failed to move file', {
            ...toastPresets.generalError('Please try again'),
            position: 'top-center'
          })
        } finally {
          setMovingFiles(prev => prev.filter(id => id !== touchDrag.itemId))
        }
      }
    }

    setTouchDrag(null)
    setDraggedItem(null)
  }

  return (
    <section className='flex flex-col pl-5  gap-0 pt-0'>
      <div className='px-5 '>
        <div className='w-full flex  justify-between items-center pr-15 '>
          <h2 className=' w-full text-2xl font-IBM'>{headerText}</h2>

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
            <div className=' w-70 grow border-slate-200 p-3 py-2.5   rounded-xl items-center gap-5 border flex'>
              <Search className='w-5 h-5' />
              <input
                type='text'
                placeholder='Search by Folder or File name'
                className='w-full text-xs font-satoshi h-full outline-0'
                name=''
                id=''
              />
            </div>
          </div>
        </div>

        <div className=' flex gap-5 mt-5 items-center pl-5 text-xs font-semibold font-satoshi'>
          <p
            onClick={() => {
              if (id) navigate(-1)
            }}
            className={`${
              id ? 'text-gray-400' : 'text-black'
            }  cursor-pointer  border-white hover:border-black border-b `}
          >
            Home
          </p>
          {id && (
            <>
              <ChevronRight className=' w-4 h-4' />
              <p className=' capitalize'>{openedFolder?.metaData?.name}</p>
            </>
          )}
        </div>
      </div>

      <section
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`grid grid-cols-8 gap-4 mt-0 pt-5 pl-10 overflow-hidden 
            justify-start pb-0 mb-0 items-center max-h-130  gap-y-10
          overflow-y-auto ${
            actualPath == 'overview' ? 'h-75' : ''
          } [scrollbar-width:thin] w-full`}
      >
        {/* specific files in an opened folder  */}
        {openedFolder && id && (
          <section className='col-span-7 grid grid-cols-7 gap-4 w-full'>
            {openedFolder?.files?.map(item => (
              <section
                key={item.id}
                draggable={!movingFiles.includes(item.id)}
                onDragStart={e => handleDragStart(e, { file: item }, 'file')}
                onTouchStart={e => handleTouchStart(e, { file: item }, 'file')}
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

                  {item.source == 'upload' ? (
                    <MiniIframe src={item.metaData.content} />
                  ) : (
                    <FilePreview
                      data={item.metaData.content}
                      layoutId={item.layoutId}
                    />
                  )}
                </div>
                <div className='flex w-[90%]  mt-1 pl-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                  <p className=' truncate'>{item.metaData.name}.pdf</p>
                  <p className=' whitespace-nowrap'>
                    {formatBytes(item.metaData.size)}
                  </p>
                </div>
              </section>
            ))}
          </section>
        )}
        {isFetching && (
          <>
            <div className='custom-loader absolute bottom-0 top-0 left-0 right-0 w-full '></div>

            {isLoading && (
              <section className='flex col-span-7 gap-5 flex-wrap'>
                <>
                  {[...Array(16)].map((_, i) => (
                    <Skeleton key={i} />
                  ))}
                </>
              </section>
            )}
          </>
        )}

        {/* All folders and files in overview and resumes */}
        {!isLoading &&
          !id &&
          programs?.map(item =>
            item?.type === 'FOLDER' ? (
              <div
                data-droppable='true'
                data-folder-id={item.folder.id}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={() => {
                  openFolder(item)
                }}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, item.folder.id)}
                onClick={e => handleFolderClick(e, item)}
                key={item.folder.id}
                className='w-28 shrink-0 cursor-pointer'
              >
                <Folder files={item?.folder.files} />
                <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                  <p className=' truncate'>{item.folder.metaData.name}</p>
                  <p>{formatBytes(item.folder.metaData.size)}</p>
                </div>
              </div>
            ) : (
              !item.file?.folderId?.length > 0 && (
                <section
                  draggable={!movingFiles.includes(item.file.id)}
                  onDragStart={e => handleDragStart(e, item, 'file')}
                  onTouchStart={e => handleTouchStart(e, item, 'file')}
                  key={item.file.id}
                  onClick={() => {
                    openFile(null, item.file.id)
                  }}
                  className={`cursor-pointer pl-2 gap-2 h-26 w-32 shrink-0 flex flex-col items-start ${
                    movingFiles.includes(item.file.id) ? 'opacity-50' : ''
                  }`}
                >
                  <div className='bg-[#c4c7cc15] shadow-sm  rounded-xl w-full h-full flex'>
                    <div className=' mt-5'>
                      {item.file.metaData.extension == 'pdf' ? (
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
                    {item?.file.source == 'upload' ? (
                      <MiniIframe src={item.file.metaData.content} />
                    ) : (
                      <FilePreview
                        className={'h-26'}
                        data={item?.file?.metaData?.content}
                        layoutId={item?.file?.metaData?.layoutId}
                      />
                    )}
                  </div>
                  <div className='flex w-full  mt-1 pl-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                    <p className=' truncate'>{item.file.metaData.name}.pdf</p>
                    <p className=' whitespace-nowrap'>
                      {formatBytes(item.file.metaData.size)}
                    </p>
                  </div>
                </section>
              )
            )
          )}
      </section>
      {menuConfig.visible && !openedFolder && (
        <FolderMenu
          config={menuConfig}
          onOpen={() => openFolder(menuConfig.item)}
          onClose={() => setMenuConfig(prev => ({ ...prev, visible: false }))}
        />
      )}
    </section>
  )
}

function FolderMenu ({ config, onClose, onOpen }) {
  return (
    <div
      className='fixed z-50 bg-white shadow-xl border border-slate-100/50 rounded-2xl py-1.5 w-40 flex flex-col font-satoshi'
      style={{
        top: config.y,
        left: config.x,
        transform: 'translate(10px, 10px)'
      }}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => {
          onOpen()
          onClose()
        }}
        className='flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-all cursor-pointer'
      >
        <FolderOpen size={14} strokeWidth={2.5} />
        <span>Open</span>
      </button>

      <button
        onClick={() => {
          toast.info(`Downloading ${config.item.folder.metaData.name}`)
          onClose()
        }}
        className='flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-all cursor-pointer'
      >
        <Download size={14} strokeWidth={2.5} />
        <span>Download</span>
      </button>

      <button
        onClick={() => {
          toast.info(`Renaming ${config.item.folder.metaData.name}`)
          onClose()
        }}
        className='flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-all cursor-pointer'
      >
        <Pencil size={14} strokeWidth={2.5} />
        <span>Rename</span>
      </button>

      <div className='h-px bg-slate-100 my-1 mx-3' />

      <button
        onClick={() => {
          toast.error(`Deleted ${config.item.folder.metaData.name}`)
          onClose()
        }}
        className='flex items-center gap-3 px-4 py-2 hover:bg-rose-50 text-rose-500 text-[11px] font-semibold transition-all cursor-pointer'
      >
        <Trash2 size={14} strokeWidth={2.5} />
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

function Skeleton () {
  return (
    <div className='w-30 animate-pulse'>
      <div className='bg-slate-100 rounded-xl w-full h-26 flex flex-col items-center justify-center'>
        <div className='w-12 h-12 bg-slate-150 rounded-lg mb-2' />
        <div className='w-20 h-3 bg-slate-200 rounded' />
      </div>
      <div className='flex w-full text-xs mt-2 items-center justify-center gap-1'>
        <div className='w-16 h-3 bg-slate-200 rounded' />
      </div>
    </div>
  )
}
