import React from 'react'

export default function NoteDetailSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='noteDetails'>
        <div className='skeleton-detail-image'></div>
        <div className='skeleton-detail-title'></div>
        <div className='skeleton-detail-content'></div>
        <div className='skeleton-detail-content'></div>
      </div>
    </div>
  )
}