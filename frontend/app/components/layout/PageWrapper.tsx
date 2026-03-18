'use client'

import React from 'react';

type WrapperProps = {
  children:  React.ReactNode,
  title?: string,
  description?: string
}

const PageWrapper = ({ children, title, description } : WrapperProps) => {
  return (
    <div className='min-h-screen px-12 py-6'>
      <div className='w-full max-w-350'>
        {(title || description) && (
          <div className='flex flex-col'>
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