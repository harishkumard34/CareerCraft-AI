import os
import json
import signal
import threading
from dotenv import load_dotenv
from schemas import RoadmapRequest, RoadmapResponse

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

SYSTEM_PROMPT = """
You are an elite AI Career Mentor and Tech Roadmap Architect.
Your mission is to generate highly practical, structured, realistic, and motivating career roadmaps for students and tech switchers.

Always respond in valid, clean JSON matching this exact structure:
{
  "role_title": "string (e.g. AI / ML Engineer)",
  "target_timeline": "string (e.g. 1 Year)",
  "commitment_summary": "string (e.g. 2 hours/day · 5 days/week)",
  "overview": "string (2-3 sentences inspiring summary specifically tailored to their background and goal)",
  "phases": [
    {
      "phase_number": 1,
      "title": "Foundation & Core Fundamentals",
      "duration": "Month 1 - Month 3",
      "focus_summary": "Summary of core objective for this phase",
      "topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      "resources": [
        {"title": "freeCodeCamp Python / Web Course", "platform": "YouTube / freeCodeCamp", "url": "https://www.freecodecamp.org", "type": "Free Course"},
        {"title": "Kaggle Learn / Interactive docs", "platform": "Kaggle / Official Docs", "url": "https://www.kaggle.com/learn", "type": "Interactive"}
      ],
      "project": {
        "title": "Concrete Project Name",
        "description": "What to build and how it solves a real problem",
        "tech_stack": ["Tech1", "Tech2"],
        "deliverable": "Upload clean repo to GitHub with README & architecture diagram"
      },
      "milestone": "Share project demo on LinkedIn with hashtags #100DaysOfCode #TechCareer"
    }
  ],
  "job_readiness_checklist": [
    "Portfolio with 3 deployed projects with live demo links",
    "Polished resume highlighting key deliverables",
    "GitHub streak & active contributions",
    "Targeted networking & cold reachouts on LinkedIn"
  ],
  "motivational_tip": "A crisp, powerful piece of advice for consistency and avoiding tutorial hell."
}

Rules:
1. Divide the roadmap into 3 or 4 clear sequential phases based on timeline.
2. Consider their existing skills so you don't make them repeat basics if they already know them.
3. Recommend top quality free / accessible learning resources (e.g. YouTube freeCodeCamp, CS50, Coursera audits, Kaggle, official documentation).
4. Every phase MUST have a practical portfolio-grade project with clear deliverables.
5. Return ONLY raw JSON without markdown code fences or backticks.
"""

def generate_fallback_roadmap(request: RoadmapRequest) -> RoadmapResponse:
    """Fallback generator when API key is not provided or offline."""
    effective_role = request.custom_role if request.custom_role and request.custom_role.strip() else request.target_role
    all_skills = list(request.skills)
    if request.custom_skills and request.custom_skills.strip():
        all_skills.append(request.custom_skills.strip())
    skills_str = ", ".join(all_skills) if all_skills else "None yet"
    edu_str = f"{request.education} ({request.education_detail})" if request.education_detail else request.education

    return RoadmapResponse(
        role_title=effective_role,
        target_timeline=request.timeline,
        commitment_summary=f"{request.hours_per_day} · {request.days_per_week}",
        overview=f"Tailored path for your {edu_str} background aiming for {effective_role}. Building on your knowledge in {skills_str} to achieve: {request.goal}.",
        phases=[
            {
                "phase_number": 1,
                "title": "Foundation & Core Tools",
                "duration": "Month 1 - 2",
                "focus_summary": "Master core languages, version control, and essential problem-solving skills.",
                "topics": ["Programming Fundamentals & OOP", "Git & GitHub Workflow", "Data Structures Basics", "API & HTTP Fundamentals"],
                "resources": [
                    {"title": "freeCodeCamp Beginner to Pro Course", "platform": "YouTube", "url": "https://www.youtube.com/freecodecamp", "type": "Video Series"},
                    {"title": "Interactive Code Challenges & Labs", "platform": "LeetCode / HackerRank", "url": "https://leetcode.com", "type": "Practice"}
                ],
                "project": {
                    "title": f"CLI / Core Utility for {effective_role}",
                    "description": "Build an end-to-end data processing or utility script with clean modular architecture and unit tests.",
                    "tech_stack": ["Python / JS", "Git", "Markdown Docs"],
                    "deliverable": "Publish to GitHub with comprehensive documentation and setup guide."
                },
                "milestone": "Share repo link on LinkedIn with insights on what you learned during building."
            },
            {
                "phase_number": 2,
                "title": "Core Domain Mastery & Frameworks",
                "duration": "Month 3 - 5",
                "focus_summary": "Dive deep into the essential industry frameworks, databases, and architectural patterns.",
                "topics": ["Modern Frameworks & State Management", "Relational & NoSQL Databases", "RESTful & Async API Design", "Authentication & Security"],
                "resources": [
                    {"title": "Official Framework Documentation & Walkthroughs", "platform": "Official Docs", "url": "https://developer.mozilla.org", "type": "Documentation"},
                    {"title": "Full Stack / AI Deep Dive Masterclass", "platform": "YouTube & Coursera", "url": "https://coursera.org", "type": "Interactive Course"}
                ],
                "project": {
                    "title": f"Full-featured {effective_role} Showcase Project",
                    "description": "Construct a full web application or pipeline with database persistence, authentication, and responsive UI.",
                    "tech_stack": ["FastAPI / React / Node", "PostgreSQL", "Docker"],
                    "deliverable": "Deploy live on free cloud platforms (Render / Vercel) with public URL."
                },
                "milestone": "Record a 60-second Loom demo video and share it with tech communities."
            },
            {
                "phase_number": 3,
                "title": "Advanced Engineering & Industry Readiness",
                "duration": "Month 6 - Target",
                "focus_summary": "Scalability, CI/CD, cloud deployment, and rigorous interview prep.",
                "topics": ["Cloud Deployment & Containerization", "Performance Optimization & Caching", "System Design Fundamentals", "Mock Technical Interviews"],
                "resources": [
                    {"title": "System Design Primer & Architecture Case Studies", "platform": "GitHub & YouTube", "url": "https://github.com/donnemartin/system-design-primer", "type": "Guide"},
                    {"title": "Tech Interview Handbook", "platform": "Tech Interview Handbook", "url": "https://techinterviewhandbook.org", "type": "Interview Prep"}
                ],
                "project": {
                    "title": "Production-Ready Capstone Application",
                    "description": "Enterprise-grade system with background workers, caching, error logging, and CI/CD pipelines.",
                    "tech_stack": ["Cloud (AWS/GCP)", "Docker", "CI/CD Actions", "Redis"],
                    "deliverable": "Production deployed system with automated CI/CD and stress testing results."
                },
                "milestone": "Start sending targeted job applications and participating in open-source contributions."
            }
        ],
        job_readiness_checklist=[
            "3 polished GitHub repositories with live demo links and visual walkthroughs",
            "ATS-optimized single-page resume highlighting metrics and impact",
            "Active LinkedIn presence connecting with 5 tech recruiters or founders weekly",
            "Solved 50+ core domain algorithmic and system design interview questions"
        ],
        motivational_tip="Consistency beats intensity. 2 focused hours every single day will outpace a 10-hour binge once a week."
    )

def generate_roadmap_with_gemini(request: RoadmapRequest) -> RoadmapResponse:
    effective_role = request.custom_role if request.custom_role and request.custom_role.strip() else request.target_role
    all_skills = list(request.skills)
    if request.custom_skills and request.custom_skills.strip():
        all_skills.append(request.custom_skills.strip())
    skills_str = ", ".join(all_skills) if all_skills else "Beginner / None specified"
    edu_str = f"{request.education} ({request.education_detail})" if request.education_detail else request.education

    user_prompt = f"""
Generate an AI Career Roadmap for the following candidate profile:
- Education / Background: {edu_str}
- Current Skills & Tools: {skills_str}
- Target Role: {effective_role}
- Available Daily Study Time: {request.hours_per_day}
- Study Days Available: {request.days_per_week}
- Target Timeline: {request.timeline}
- Primary Career Goal: {request.goal}

Please produce a comprehensive, realistic multi-phase roadmap in strict JSON format.
"""

    if not GEMINI_API_KEY:
        return generate_fallback_roadmap(request)

    result_holder = {}

    def call_gemini():
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
        candidate_models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.5-pro']
        
        last_error = None
        for model_name in candidate_models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=user_prompt,
                    config={
                        'system_instruction': SYSTEM_PROMPT,
                        'response_mime_type': 'application/json',
                        'temperature': 0.65,
                    }
                )
                result_holder['data'] = json.loads(response.text)
                return
            except Exception as e:
                last_error = e
                print(f"Model {model_name} failed ({e}), trying next...")
        
        result_holder['error'] = str(last_error)

    # Run Gemini call in thread with 25s timeout (Render kills at 30s)
    thread = threading.Thread(target=call_gemini)
    thread.start()
    thread.join(timeout=25)

    if thread.is_alive():
        # Gemini timed out — return fallback immediately
        print("Gemini API timed out after 25s — returning fallback roadmap")
        return generate_fallback_roadmap(request)

    if 'error' in result_holder:
        print(f"Gemini API failed: {result_holder['error']} — returning fallback")
        return generate_fallback_roadmap(request)

    try:
        return RoadmapResponse(**result_holder['data'])
    except Exception as e:
        print(f"Response parse error: {e} — returning fallback")
        return generate_fallback_roadmap(request)
