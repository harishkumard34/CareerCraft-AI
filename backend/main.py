from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import RoadmapRequest, RoadmapResponse
from agent import generate_roadmap_with_gemini

app = FastAPI(
    title="AI Career Roadmap Generator API",
    version="1.0.0",
    description="Backend API powering personalized AI career roadmaps"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Career Roadmap AI Backend is running!"}

@app.post("/api/generate-roadmap", response_model=RoadmapResponse)
def generate_roadmap(request: RoadmapRequest):
    try:
        roadmap = generate_roadmap_with_gemini(request)
        return roadmap
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
