import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Navbar from "../../components/Navbar";
import type { Route } from "./+types/home";
import Button from "../../components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
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
              <p>Supports JPG, PNG, formats up to 10MB</p>
            </div>

            <p>Upload Images</p>
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
            <div className="project-card group">

              <div className="preview">
                <img
                src="https://images.unsplash.com/photo-1721274506499-906b8188b7c3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Project Preview"
                />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>

              <div className="card-body">
                <div>
                  <h3>Project Alora</h3>
                  <div className="meta">
                    <Clock size={12}/>
                    <span>{new Date('01.01.2026').toLocaleDateString()}</span>
                    <span>By abhi</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
)
}
