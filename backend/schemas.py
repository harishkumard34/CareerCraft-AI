from pydantic import BaseModel, Field
from typing import List, Optional

class RoadmapRequest(BaseModel):
    education: str
    education_detail: Optional[str] = ""
    skills: List[str] = Field(default_factory=list)
    custom_skills: Optional[str] = ""
    target_role: str
    custom_role: Optional[str] = ""
    hours_per_day: str
    days_per_week: str
    timeline: str
    goal: str

class ResourceItem(BaseModel):
    title: str
    platform: str
    url: Optional[str] = None
    type: str = "Video / Course"

class ProjectItem(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    deliverable: str

class PhaseItem(BaseModel):
    phase_number: int
    title: str
    duration: str
    focus_summary: str
    topics: List[str]
    resources: List[ResourceItem]
    project: ProjectItem
    milestone: str

class RoadmapResponse(BaseModel):
    role_title: str
    target_timeline: str
    commitment_summary: str
    overview: str
    phases: List[PhaseItem]
    job_readiness_checklist: List[str]
    motivational_tip: str
