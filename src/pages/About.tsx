import React from 'react';
import { ShieldCheck, Heart, FlaskConical, Award } from 'lucide-react';
import chipotle_ranch from '../assets/chipotle_ranch.png';
import { PageTransition } from '../components/PageTransition';

const PROMISES = [
  {
    icon: ShieldCheck,
    title: 'FSSAI Certified',
    body: 'State-licensed, NABL lab-tested. Every batch meets the highest food safety standards before it leaves our kitchen.',
  },
  {
    icon: Heart,
    title: '100% Vegetarian',
    body: 'No eggs, no animal fats — in any recipe, ever. Every sauce carries the green dot. Always.',
  },
  {
    icon: FlaskConical,
    title: 'No Chemical Nasties',
    body: 'Zero INS 102/110 artificial colors. Naturally acidified to pH < 4.5. Preserved through science, not chemistry.',
  },
  {
    icon: Award,
    title: 'Small-Batch Craft',
    body: 'Made in small batches. Tight runs mean we control every variable: texture, heat, and balance. Every time.',
  },
] as const;

const COMMITMENTS = [
  'Naturally Acidified',
  'NABL Lab Tested',
  'Regional Ingredients',
  'FSSAI State Licensed',
] as const;

export const About: React.FC = () => (
  <PageTransition>
    <div className="page-wrapper" style={{ paddingTop: '76px' }}>

      {/* ── Brand Story ── */}
      <section className="section">
        <div className="container about-grid">

          {/* Copy */}
          <div>
            <span className="section-label about-eyebrow">Our Story</span>
            <h1 className="about-title">
              Western Flavors.<br />
              <em>Indian</em> Soul.
            </h1>

            <div className="about-body">
              <p>
                Zesty Co. started with a simple observation: urban Indian food culture had fully embraced Western QSR flavors — buffalo wings, chipotle ranch, creamy dipping sauces — yet every bottled option on shelves was either an expensive import, packed with eggs, or laden with preservatives and artificial colors.
              </p>
              <p>
                We spent months in a trial kitchen working the recipes from scratch: eggless mayo bases using buttermilk and plant emulsifiers, natural acidity balanced through pH, heat levels tuned 30% higher for the Indian palate, and fresh garlic volumes dialed up to deliver that restaurant punch.
              </p>
              <p>
                The result: five launch sauces. Clean labels. Real ingredients. No compromise.
              </p>
            </div>

            {/* Promise cards */}
            <div className="promise-grid">
              {PROMISES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="promise-card">
                  <div className="promise-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="about-visual">
            <img
              src={chipotle_ranch}
              alt="Zesty Co. Smoky Chipotle Ranch — handcrafted small batch"
              className="about-img"
            />
            <div className="about-visual-badge">
              Handcrafted in Small Batches
            </div>
          </div>

        </div>
      </section>

      {/* ── Clean Label Commitment ── */}
      <section className="section-sm">
        <div className="container">
          <div className="commitment-strip">
            <span className="section-label">Manufacturing &amp; Quality</span>
            <h2 className="section-title">Our Clean-Label Commitment</h2>
            <p className="section-body" style={{ margin: '0 auto var(--space-8)' }}>
              We use natural preservation methods — controlling pH below 4.5 and regulating water activity — to achieve a 3–6 month room-temperature shelf life. No sodium benzoate, no potassium sorbate, no shortcuts.
            </p>
            <div className="commitment-badges">
              {COMMITMENTS.map((c) => (
                <span key={c} className="commitment-badge">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  </PageTransition>
);
