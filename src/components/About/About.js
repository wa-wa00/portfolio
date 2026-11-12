import useInView from '../../hooks/useInView'
import './About.css'

const HIGHLIGHTS = [
  { title: 'Embedded & IoT Systems', desc: 'ESP32, sensor arrays, UART & micro-actuators' },
  { title: 'Edge AI & Computer Vision', desc: 'Real-time YOLOv8 detection & intelligent agents' },
  { title: 'CAD & 3D Prototyping', desc: 'Fusion 360 & functional printing (ASA/PETG)' },
]

const About = () => {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="section">
      <div ref={ref} className={`container fade-in ${inView ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-label">01 / About</p>
          <h2 className="section-title">Engineering from physical hardware to cloud intelligence.</h2>
        </div>

        <div className="section-body">
          <p className="about-p">
            I am an engineer who thrives at the intersection of embedded systems, AI, and scalable backend architectures.
            My expertise spans hardware prototyping (3D CAD, rapid additive manufacturing, PCB & sensor integration with ESP32/Raspberry Pi)
            to full-stack intelligence (real-time computer vision with YOLO, medical chatbots, and high-performance APIs).
          </p>
          <p className="about-p">
            Whether building an autonomous AI target-tracking turret, an intelligent smart helmet with crash diagnostics,
            or automated environmental controllers, I focus on building end-to-end solutions that are practical, robust, and innovative.
          </p>

          <ul className="highlights">
            {HIGHLIGHTS.map(({ title, desc }) => (
              <li key={title}>
                <span className="hl-title">{title}</span>
                <span className="hl-desc">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
