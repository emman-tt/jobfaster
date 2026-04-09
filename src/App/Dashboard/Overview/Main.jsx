import {
  ChevronRight,
  FilePlusCornerIcon,
  FolderCodeIcon,
  Search
} from 'lucide-react'
import Folder from '../../../components/Folder'

import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toggleModals } from '../../../store/modalSlice'
import FilePreview from '../Resume/FilePreview'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchPrograms, MoveFile } from '../../../services/Program'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Main () {
  const { id } = useParams()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const actualPath = location.pathname.split('/').at(-1)
  const [, setDraggedItem] = useState(null)
  const [touchDrag, setTouchDrag] = useState(null)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program'],
    queryFn: () => FetchPrograms(),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })
  const programs = data?.data

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
      try {
        await MoveFile(itemId, targetFolderId)
        toast.success('File moved successfully')
        queryClient.invalidateQueries({ queryKey: ['program'] })
      } catch (err) {
        console.error('Failed to move file:', err)
        toast.error('Failed to move file')
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
        try {
          await MoveFile(touchDrag.itemId, targetFolderId)
          toast.success('File moved successfully')
          queryClient.invalidateQueries({ queryKey: ['program'] })
        } catch (err) {
          console.error('Failed to move file:', err)
          toast.error('Failed to move file')
        }
      }
    }

    setTouchDrag(null)
    setDraggedItem(null)
  }

  return (
    <section className='flex flex-col pl-5  gap-0 pt-0'>
      <div className='px-5 '>
        <div className='w-full flex  justify-between items-center  '>
          <h2 className=' w-full text-2xl font-IBM'>{headerText}</h2>

          <div className=' flex w-full  items-center  gap-5'>
            <button
              onClick={() => {
                openFolderModal()
              }}
              className=' text-xs font-satoshi flex gap-2 shadow-sm shadow-black/40 bg-orange-400 hover:bg-amber-600 px-4 w-max cursor-pointer py-3 text-white items-center h-full rounded-xl'
            >
              <FolderCodeIcon className=' w-4 h-4' />
              New Folder
            </button>
            <button
              onClick={() => {
                openFileModal()
              }}
              className=' text-xs font-satoshi w-max  px-4 shadow-sm shadow-black/40 flex gap-2 bg-orange-400 hover:bg-amber-600 cursor-pointer py-3 text-white items-center h-full rounded-xl'
            >
              <FilePlusCornerIcon className=' w-4 h-4' />
              Add File
            </button>
            <div className=' w-70 border-slate-200 p-3 py-2.5   rounded-xl items-center gap-5 border flex'>
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
        className={`flex mt-0  relative justify-start  pt-5 pl-10 gap-y-5 overflow-hidden overflow-y-scroll ${
          actualPath == 'overview' ? 'h-75' : 'h-130'
        }  [scrollbar-width:thin] py-15 w-full gap-5 flex-wrap`}
      >
        {/* specific files in an opened folder  */}
        {openedFolder && id && (
          <section className=' cursor-pointer flex w-full gap-10'>
            {openedFolder?.files?.map(item => (
              <section
                key={item.id}
                draggable
                onDragStart={e => handleDragStart(e, { file: item }, 'file')}
                onTouchStart={e => handleTouchStart(e, { file: item }, 'file')}
                onClick={() => {
                  openFile(openedFolder.id, item.id)
                }}
                className=' pl-2 gap-2 h-26 w-35 flex flex-col items-start  '
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
                  <p className=' whitespace-nowrap'>{item.metaData.size}mb</p>
                </div>
              </section>
            ))}
          </section>
        )}
        {isFetching && (
          <>
            <div className='custom-loader absolute bottom-0 top-0 left-0 right-0 w-full '></div>

            {isLoading && (
              <section className='flex gap-5 flex-wrap'>
                {id ? (
                  [...Array(4)].map((_, i) => <FileSkeleton key={i} />)
                ) : (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <FolderSkeleton key={i} />
                    ))}
                  </>
                )}
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
                key={item.folder.id}
                className='w-30  cursor-pointer'
              >
                <Folder files={item?.folder.files} />
                <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                  <p className=' truncate'>{item.folder.metaData.name}</p>
                  <p>{item.folder.metaData.size}mb</p>
                </div>
              </div>
            ) : (
              !item.file?.folderId?.length > 0 && (
                <section
                  draggable
                  onDragStart={e => handleDragStart(e, item, 'file')}
                  onTouchStart={e => handleTouchStart(e, item, 'file')}
                  key={item.file.id}
                  onClick={() => {
                    openFile(null, item.file.id)
                  }}
                  className=' cursor-pointer pl-2 gap-2  h-26 w-32  flex flex-col items-start  '
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
                      {item.file.metaData.size}mb
                    </p>
                  </div>
                </section>
              )
            )
          )}
      </section>
    </section>
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

function FolderSkeleton () {
  return (
    <div className='w-30 animate-pulse'>
      <div className='bg-slate-200 rounded-xl w-full h-26 flex flex-col items-center justify-center'>
        <div className='w-12 h-12 bg-slate-300 rounded-lg mb-2' />
        <div className='w-20 h-3 bg-slate-300 rounded' />
      </div>
      <div className='flex w-full text-xs mt-2 items-center justify-center gap-1'>
        <div className='w-16 h-3 bg-slate-200 rounded' />
      </div>
    </div>
  )
}

function FileSkeleton () {
  return (
    <section className='pl-2 gap-2 h-26 w-32 flex flex-col items-start'>
      <div className='bg-slate-200 shadow-sm rounded-xl w-full h-full flex flex-col items-center justify-center p-4'>
        <div className='w-8 h-8 bg-slate-300 rounded mb-2' />
        <div className='w-20 h-3 bg-slate-300 rounded' />
      </div>
      <div className='flex w-full mt-1 pl-2 items-center justify-center gap-1'>
        <div className='w-14 h-2 bg-slate-200 rounded' />
      </div>
    </section>
  )
}
