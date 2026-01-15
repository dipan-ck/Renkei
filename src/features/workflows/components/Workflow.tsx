import React from 'react'
import { useSuspenseWorkflows } from '../server/hooks/useWorkflows'

function Workflow() {

    const workflows = useSuspenseWorkflows();
  return (
    <div>Workflow</div>
  )
}

export default Workflow