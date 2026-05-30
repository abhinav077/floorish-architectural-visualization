import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Navbar from "../../components/Navbar";
import type { Route } from "./+types/home";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import { useNavigate } from "react-router";
import { MAX_UPLOAD_FILE_SIZE_MB } from "../../lib/constants";
import { useState } from "react";
import { createProject } from "../../lib/puter.action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState<DesignItem[]>([]);

  const handleUploadComplete = async (base64Image: string) => {
    const newID = Date.now().toString();
    const name = `Residence_${newID}`;

    const newItem = {
      id : newID, name, sourceImage: base64Image,
      renderedImage: undefined,
      timestamp : Date.now() 
    }

    const saved = await createProject({ item: newItem , visibility: "private" });

    if(!saved) {
      console.error("Failed to create project");
      return false;
    }

    setProjects((prev) => [saved, ...prev]);

    navigate(`/visualizer/${newID}`, {
      state: {
        initialImage: saved.sourceImage,
        initialRender: saved.renderedImage || null,
        name,
      },
    });

    return true;
  };

  return (
    <div className="home">
      <Navbar/>
      <section className="hero">
        <div className="announce">

          <div className="dot">
            <div className="pulse"></div>
          </div>

          <p>Introducing Floorish</p>
        </div>

        <h1>Design modern interiors with clarity and style.</h1>

        <p className="subtitle">Floorish is an AI-first design environment built to turn ideas into immersive spaces in seconds.</p>

        <div className="actions">
          <a href="/upload" className="cta">
            Start building <ArrowRight className="icon" />
          </a>

          <Button className="demo" variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>

        <div id="upload" className="upload-shell">
          <div className="grid-overlay"/>

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>

              <h2>Upload your floor plan</h2>
              <p>Supports JPG, PNG, formats up to {MAX_UPLOAD_FILE_SIZE_MB}MB</p>
            </div>

            <Upload onComplete={handleUploadComplete}/>
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your latest work and shared community projects all in one place.</p>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map(({ id, name, renderedImage, sourceImage, timestamp }) => (
              <div key={id} className="project-card group">
                <div className="preview">
                  <img
                  src={renderedImage || sourceImage}
                    alt="Project Preview"
                  />
                  <div className="badge">
                    <span>Community</span>
                  </div>
                </div>

                <div className="card-body">
                  <div>
                    <h3>{name}</h3>
                    <div className="meta">
                      <Clock size={12}/>
                      <span>{new Date(timestamp).toLocaleDateString()}</span>
                      <span>By abhi</span>
                    </div>
                  </div>
                  <div className="arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
)
}
