// Mock AI service to simulate summary generation
export const generateSummary = async (transcript: string, prompt: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Mock different summary styles based on prompt
  if (prompt.toLowerCase().includes('bullet') || prompt.toLowerCase().includes('points')) {
    return `## Meeting Summary

**Key Discussion Points:**
• Revenue growth target of 15% for Q4 discussed and approved
• New product launch timeline moved to March 2024
• Budget allocation for marketing campaigns increased by $50k
• Team restructuring in engineering department proposed

**Action Items:**
• John to prepare detailed project timeline by Friday
• Sarah to coordinate with design team on new mockups
• Marketing team to present campaign proposal next week
• HR to draft job descriptions for new positions

**Decisions Made:**
• Approved additional hiring for development team
• Selected vendor for cloud infrastructure upgrade
• Agreed on quarterly review schedule

**Next Steps:**
• Schedule follow-up meeting for next Thursday
• Circulate meeting notes to all stakeholders
• Begin implementation of approved initiatives`;
  }
  
  if (prompt.toLowerCase().includes('executive') || prompt.toLowerCase().includes('leadership')) {
    return `## Executive Summary

**Strategic Overview:**
The meeting focused on Q4 performance optimization and strategic initiatives for 2024. Key decisions were made regarding resource allocation, product development, and organizational restructuring.

**Financial Impact:**
- Revenue target: 15% growth for Q4
- Additional marketing investment: $50,000
- Expected ROI from new initiatives: 25-30%

**Strategic Decisions:**
1. **Product Development:** New product launch timeline adjusted to March 2024 to ensure quality and market readiness
2. **Team Expansion:** Approved hiring for 3 additional developers and 2 marketing specialists
3. **Infrastructure:** Cloud upgrade approved with estimated cost savings of $20k annually

**Leadership Actions Required:**
- Executive approval needed for final budget allocations
- Board presentation scheduled for next month
- Quarterly performance review framework to be established`;
  }
  
  if (prompt.toLowerCase().includes('action') || prompt.toLowerCase().includes('tasks')) {
    return `## Action Items & Tasks

**Immediate Actions (This Week):**
• John Smith - Prepare detailed project timeline and resource requirements (Due: Friday)
• Sarah Johnson - Coordinate with design team for new product mockups (Due: Wednesday)
• Marketing Team - Present Q4 campaign proposal with budget breakdown (Due: Monday)

**Short-term Actions (Next 2 Weeks):**
• HR Department - Draft job descriptions for 5 new positions (Due: Next Friday)
• IT Team - Finalize cloud infrastructure upgrade specifications (Due: Week of 18th)
• Finance - Prepare budget reallocation documents (Due: Next Tuesday)

**Long-term Actions (Next Month):**
• Product Team - Complete user testing for new features
• Sales Team - Prepare Q1 2024 territory planning
• Leadership - Conduct quarterly performance reviews

**Follow-up Required:**
• Schedule follow-up meeting for December 14th
• Circulate meeting notes to all 15 attendees
• Create project tracking dashboard for new initiatives

**Accountability:**
Each action item has been assigned to specific team members with clear deadlines and success metrics.`;
  }
  
  // Default summary
  return `## Meeting Summary

This meeting covered several important topics and resulted in key decisions for the organization. The discussion included strategic planning, resource allocation, and project timelines.

**Main Topics Discussed:**
The team reviewed current project status, discussed upcoming milestones, and addressed resource needs. Several proposals were presented and evaluated based on their potential impact and feasibility.

**Key Outcomes:**
Multiple decisions were made regarding project priorities, budget allocations, and team assignments. The group agreed on next steps and established clear timelines for implementation.

**Action Items:**
Various team members were assigned specific tasks with defined deadlines. Follow-up meetings were scheduled to monitor progress and address any emerging issues.

**Next Steps:**
The team will reconvene to review progress and make any necessary adjustments to the planned initiatives.`;
};