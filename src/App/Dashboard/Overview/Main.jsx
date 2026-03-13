import {
  ChevronRight,
  FilePlusCornerIcon,
  FolderCodeIcon,
  Search
} from 'lucide-react'
import Folder from '../../../components/Folder'
import { PaperFile } from './Paper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toggleModals } from '../../../store/modalSlice'
export default function Main () {
  const { programs } = useSelector(state => state.files)
  const { id } = useParams()
  const dispatch = useDispatch()
  const openedFolder = useSelector(state =>
    state.files.programs.find(item => item.id == id)
  )

  const navigate = useNavigate()
  const location = useLocation()
  const actualPath = location.pathname.split('/').at(-1)
  const [loader, showLoader] = useState(true)

  const headerText =
    actualPath !== 'overview' ? 'Saved Resumes' : 'Recently Opened'

  useEffect(() => {
    setTimeout(() => {
      showLoader(false)
    }, 1000)
  }, [])

  function openFile (folderid, resumeid) {
    if (folderid == 0 || !folderid) {
      return navigate(`/dashboard/file/?resumeID=${resumeid}`)
    }
    navigate(`/dashboard/file/?folderID=${folderid}&resumeID=${resumeid}`)
  }

  function openFolder (item) {
    showLoader(true)

    setTimeout(() => {
      showLoader(false)
    }, 400)
    navigate(`/dashboard/folder/${item.id}`)
  }

  function openFileModal () {
    dispatch(toggleModals('uploadFile'))
  }
  function openFolderModal () {
    dispatch(toggleModals('folder'))
  }

  return (
    <section className='flex flex-col pl-5 gap-0 pt-0'>
      <div className='px-5 '>
        <div className='w-full flex  justify-between items-center  '>
          <h2 className=' w-full text-2xl font-IBM'>{headerText}</h2>

          <div className=' flex w-full items-center gap-5'>
            <button
              onClick={() => {
                openFolderModal()
              }}
              className=' text-xs font-satoshi flex gap-2 bg-orange-400 hover:bg-amber-600 px-4 w-max cursor-pointer py-3 text-white items-center h-full rounded-xl'
            >
              <FolderCodeIcon className=' w-4 h-4' />
              New Folder
            </button>
            <button
              onClick={() => {
                openFileModal()
              }}
              className=' text-xs font-satoshi w-max  px-4 flex gap-2 bg-orange-400 hover:bg-amber-600 cursor-pointer py-3 text-white items-center h-full rounded-xl'
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
              <ChevronRight className=' w-4 h-4' />{' '}
              <p className=' capitalize'>{openedFolder.name}</p>
            </>
          )}
        </div>
      </div>

      <section className='flex mt-0  relative justify-start  pt-5 pl-10 gap-y-5 overflow-y-scroll h-70 [scrollbar-width:thin] py-15 w-full gap-15 flex-wrap'>
        {openedFolder && (
          <section className=' flex w-full gap-10'>
            {openedFolder.files.map(item => (
              <PaperFile
                key={item.id}
                onClick={() => {
                  openFile(openedFolder.id, item.id)
                }}
                item={item}
              />
            ))}
          </section>
        )}
        {loader == true && (
          <div className='custom-loader absolute bottom-0  top-0 left-0 right-0 w-full '></div>
        )}

        {!loader &&
          !id &&
          programs.map(item =>
            item.type === 'folder' ? (
              <div
                onDoubleClick={() => {
                  openFolder(item)
                }}
                key={item.id}
                className='w-20 cursor-pointer'
              >
                <Folder files={item.files} />
                <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                  <p className=' truncate'>{item.name}</p>
                  <p>{item.size}mb</p>
                </div>
              </div>
            ) : (
              <PaperFile
                onClick={() => {
                  openFile(0, item.id)
                }}
                key={item.id}
                item={item}
              />
            )
          )}
      </section>
    </section>
  )
}
