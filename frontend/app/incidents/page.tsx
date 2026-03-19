'use client'

import IncidentList from '../components/incidents/IncidentList'
import PageWrapper from '../components/layout/PageWrapper'

const Incident = () => {
  return (
    <PageWrapper
      title='Incident Explorer'
      description='Track and manage ongoing operational issues.'
    >
      <IncidentList />
    </PageWrapper>
  )
}

export default Incident;