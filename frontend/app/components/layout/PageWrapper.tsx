'use client'

import React from 'react';

type WrapperProps = {
  children:  React.ReactNode,
  title?: string,
  description?: string
}

const PageWrapper = ({ children, title, description } : WrapperProps) => {
  return (
    <div className='min-h-screen px-6 py-6'>
      <div className='w-full max-w-7xl mx-auto'>
        {(title || description) && (
          <div className='flex flex-col mb-6'>
            {title && <h1 className='font-bold text-2xl'>{title}</h1>}
            {description && (
              <p className='text-base text-muted-foreground'>{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;