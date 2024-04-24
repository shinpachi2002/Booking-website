import React from 'react'
import { useState } from 'react';
const PlaceGallery = ({place}) => {
    const [showallphotos, setShowallphotos] = useState(false);
    if (showallphotos) {
        return (
          <div className='absolute inset-0 bg-black min-h-screen'>
            <div className=' bg-black p-8 grid gap-4'>
              <div>
                <h2 className='text-3xl text-white mr-48'> Photos of{place.title}</h2>
                <button onClick={() => setShowallphotos(false)} className=' fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  Close photos
                </button>
              </div>
              {place?.addedphoto?.length > 0 && place.addedphoto.map(photo =>
              (<div>
                <img className="w-full" src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>)
              )}
            </div>
          </div>
        )
      }
  return (
    <div className='relative'>
    <div className='grid gap-2 rounded-2xl overflow-hidden grid-cols-[2fr_1fr]'>
      <div>{place.addedphoto?.[0] && (
        <div>
          <img onClick={()=>setShowallphotos(true)} className='cursor-pointer aspect-square object-cover' src={"http://localhost:4000/uploads/" + place.addedphoto[0]} alt="" />
        </div>
      )}</div>
      <div className='grid'>
        {place.addedphoto?.[1] && (
          <img onClick={()=>setShowallphotos(true)} className='cursor-pointer aspect-square object-cover' src={"http://localhost:4000/uploads/" + place.addedphoto[1]} alt="" />
        )}
        <div className='overflow-hidden'>
          {place.addedphoto?.[2] && (
            <img onClick={()=>setShowallphotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/" + place.addedphoto[2]} alt="" />
          )}
        </div>

      </div>
    </div>
    <button onClick={() => setShowallphotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-black'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
      Show more photos
    </button>
  </div>
  )
}

export default PlaceGallery
