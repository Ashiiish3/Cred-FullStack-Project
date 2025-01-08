import React from 'react'

export default function AdminNotesSkeleton() {
    return (
        <div className='animate-pulse d-flex'>
            <div className='admin-skeleton-image'>
            </div>
            <div className='admin-skeleton-body'>
                <div className='admin-skeleton-title'></div>
                <div className='admin-skeleton-content'></div>
                <div className='admin-skeleton-buttons d-flex gap-3'>
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    )
}