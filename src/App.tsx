import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InstanceView from "@/components/views/instance-view"
import LandingView from "@/components/views/landing-view"
import TutorialView from "@/components/views/tutorial-view"


// windows: (Get-ChildItem -File | ForEach-Object { '"{0}"' -f $_.Name }) -join ',' | ForEach-Object { "[{0}]" -f $_ }
export const EXISTING_FILES = [
  "tag.a.j.f.png", "tag.a.o.f.png", "tag.a.p.b.png", "tag.a.p.f.png", "tag.a.s.f.png", "tag.b.j.f.png",
  "tag.b.o.f.png", "tag.b.p.f.png", "tag.b.s.f.png", "tag.c.j.f.png", "tag.c.o.f.png", "tag.c.p.f.png",
  "tag.c.s.f.png", "tag.d.j.f.png", "tag.d.o.f.png", "tag.d.p.f.png", "tag.d.s.f.png", "tag.e.j.f.png",
  "tag.e.o.f.png", "tag.e.p.f.png", "tag.e.s.f.png", "tag.f.j.f.png", "tag.f.o.f.png", "tag.f.p.f.png",
  "tag.f.s.f.png", "tag.g.j.f.png", "tag.g.o.f.png", "tag.g.p.f.png", "tag.g.s.f.png", "tag.h.j.f.png",
  "tag.h.o.f.png", "tag.h.p.b.png", "tag.h.p.f.png", "tag.h.s.f.png", "tag.i.j.f.png", "tag.i.o.f.png",
  "tag.i.p.b.png", "tag.i.p.f.png", "tag.i.s.f.png", "tag.j.j.f.png", "tag.j.o.f.png", "tag.j.p.b.png",
  "tag.j.p.f.png", "tag.j.s.f.png", "tag.l.j.f.png", "tag.l.o.f.png", "tag.l.p.f.png", "tag.l.s.f.png",
  "tag.m.j.f.png", "tag.m.o.f.png", "tag.m.p.b.png", "tag.m.p.f.png", "tag.m.s.f.png", "tag.n.j.f.png",
  "tag.n.o.f.png", "tag.n.p.b.png", "tag.n.p.f.png", "tag.n.s.f.png"]
export const LETTERS = 'abcdefghijlmn';
export const LANDSCAPE_LETTERS = 'ijlm'







function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/vote" element={<InstanceView />} />
          <Route path="/tutorial" element={<TutorialView />} />
          <Route path="/" element={<LandingView/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App




