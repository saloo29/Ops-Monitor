import { PlusIcon } from "lucide-react"
import { useState } from 'react'
import ReportIncidentModal from "../incidents/ReportIncidentModal"

const ReportIncidentButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return( 
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          bg-indigo-500 hover:bg-indigo-600
          flex items-center px-4 py-2 cursor-pointer
          rounded-full text-white font-semibold text-sm
          gap-1 shawdow-lg fixed bottom-12 right-10
          transition-colors
        "
      >
      <PlusIcon className="w-4 h-4" strokeWidth={2} />
        Report Incident
      </button>

      <div className="flex items-center justify-center h-screen">
        <ReportIncidentModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}      
        />
      </div>
    </>
  )
}

export default ReportIncidentButton;