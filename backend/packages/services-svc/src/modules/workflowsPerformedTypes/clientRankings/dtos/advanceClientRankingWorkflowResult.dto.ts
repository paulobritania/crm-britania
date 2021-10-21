import { AdvanceWorkflowResultDto } from '../../../workflowsPerformed/dtos/advanceWorkflowResult.dto'
import { WorkflowClientRanking } from '../entities/workflowClientRanking.entity'

export class AdvanceClientRankingWorkflowResultDto extends AdvanceWorkflowResultDto {
  workflow: WorkflowClientRanking
}
