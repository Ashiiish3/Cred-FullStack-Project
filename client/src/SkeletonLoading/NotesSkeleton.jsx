import React from 'react'

export function NotesSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='skeleton-image'>
      </div>
      <div className='skeleton-title'>
      </div>
      <div className='skeleton-buttons'>
        <button className='circle'></button>
        <button className='box'></button>
        <button className='circle'></button>
      </div>
    </div>
  )
}