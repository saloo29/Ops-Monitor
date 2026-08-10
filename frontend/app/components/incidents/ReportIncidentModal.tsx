import { useCreateIncident } from "@/app/hooks/useCreateIncident";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IncidentPriority } from '@/app/types/types';
import { PhotoIcon } from "@heroicons/react/24/solid";


interface ReportIncidentModalProps {
  isOpen : boolean;
  onClose : () => void;
}

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const TEAM = ['Infrastructure', 'Payments', 'Frontend', 'Backend', 'L2']

const ReportIncidentModal = ({ isOpen, onClose } : ReportIncidentModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IncidentPriority>('LOW');
  const [team, setTeam] = useState('');
  const {mutate, isPending } = useCreateIncident();

  if(!isOpen) return null;

  const handleOnSubmit = () => {
    if(!title.trim() || !description.trim()) return;

     mutate(
        {
          title, 
          description, 
          priority,
          status: 'OPEN'
        },
        {
          onSuccess: () => {
            setTitle('');
            setDescription('');
            setPriority('LOW');
            onClose();
          }
        }
      );
  };
 

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="relative flex h-full items-center justify-center p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" relative z-10 flex flex-col rounded-2xl
            bg-card border border-slate-200 dark:border-slate-700
            shadow-2xl w-full max-w-5xl mx-4 p-8 overlay">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h2 className="font-slate-800 text-lg font-semibold">
                      Report New Incident
                    </h2>
                    <p className="text-xs">Provide clear details and evidence for the responders.</p>
                  </div>
                  <button onClick={onClose} className="ml-4">
                    <XMarkIcon className="w-6 h-6 text-slate-500"/>
                  </button>
              </div>

              <div className="flex flex-2col justify-between gap-6">
                <div className="w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-semibold uppercase text-slate-500 tracking-tight">Title</label>
                    <input 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g API Gateway Timeout in US-East-1"
                      className="border border-slate-300 dark:border-slate-700 rounded-lg p-4 text-sm 
                      dark:bg-slate-800 bg-slate-100 focus:outline focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label className="text-xs font-mono text-semibold uppercase text-slate-500 tracking-tight">Description</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What is failing? What are the symptoms"
                      rows={4}
                      className="border border-slate-300 dark:border-slate-700 
                      rounded-lg p-4 text-sm dark:bg-slate-800 bg-slate-100 resize-none
                      focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="mt-4 flex flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-xs font-mono text-semibold uppercase text-slate-500 tracking-tight">Priority</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as IncidentPriority)}
                        className="border border-slate-300 dark:border-slate-700
                          rounded-md px-3 py-2 text-sm bg-card
                          focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {PRIORITIES.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label className="uppercase text-xs font-mono text-semibold text-slate-500">Team</label>
                      <select
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                        className="border border-slate-300 dark:border-slate-700
                          rounded-md px-3 py-2 text-sm bg-card
                          focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {TEAM.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div>
                    <label className="text-xs font-mono text-semibold uppercase text-slate-500 tracking-tight">Evidence & Screenshots</label>
                    <div className="border-2 border-dashed border-slate-500 hover:border-indigo-500
                      p-8 rounded-lg hover:bg-indigo-950/10 min-h-48
                      flex flex-col justify-center items-center
                    ">
                      <div className="w-10 h-10 rounded-full dark:bg-slate-700 bg-slate-300 flex justify-center items-center mb-2">
                        <PhotoIcon className="w-5 h-5 text-slate-800"/>
                      </div>                
                      <div className="text-center">
                        <p className="text-sm text-slate-400 font-medium">Click to upload or drag screenshots</p>
                        <p className="text-xs text-slate-600 mt-1">Supports PNG, JPG (Max 5MB per file)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border bg-slate-900 mt-2 mb-2"></div>
              
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOnSubmit}
                  disabled={isPending || !title.trim() || !description.trim()}
                  className="
                    px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700
                    text-white rounded-md font-medium transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isPending ? 'Submitting...' : 'Submit Incident Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportIncidentModal;