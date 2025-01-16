import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionInput } from './style/SectionInput.styled';
import ScrollReveal from 'scrollreveal';

function Main() {
  const [enemScore, setEnemScore] = useState('');
  const [correctWeight2, setCorrectWeight2] = useState('');
  const [correctWeight1, setCorrectWeight1] = useState('');
  const [essayScore, setEssayScore] = useState('');
  const [publicSchool, setPublicSchool] = useState(false);
  const [quota3, setQuota3] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      opacity: 0,
      interval: 200,
    });
  }, []);

  const calculateScore = () => {
    const weight2 = parseInt(correctWeight2) || 0;
    const weight1 = parseInt(correctWeight1) || 0;
    const essay = parseFloat(essayScore) || 0;
    const enem = parseFloat(enemScore) || 0;

    const NPC = (2 * weight2) + weight1;
    const P = (100 * NPC) / 64;

    let N;
    if (enemScore) {
      N = enem > P ? (4 * P + enem) / 5 : P;
    } else {
      N = P;
    }

    const NF = (8 * N + 2 * essay) / 10;

    let NFA = NF;
    if (publicSchool) {
      NFA *= 1.1;
    }
    if (quota3) {
      NFA *= 1.03;
    }

    setFinalScore(NFA.toFixed(2));
  };

  return (
    <>
      <h1 className="reveal" style={{ fontWeight: '900' }}>Calculadora de Nota - Fatec</h1>
      <SectionInput className="reveal">
        <label>Nota do ENEM (opcional): </label>
        <input
          style={{ width: '60vw' }}
          type="number"
          value={enemScore}
          class="form-control"
          onChange={(e) => setEnemScore(e.target.value)}
          placeholder="Digite a nota do ENEM"
        />
      </SectionInput>

      <SectionInput className="reveal">
        <label>Questões certas (peso 2): </label>
        <input
          type="number"
          maxLength={10}
          style={{ width: '60vw' }}
          value={correctWeight2}
          class="form-control"
          onChange={(e) => setCorrectWeight2(e.target.value)}
          placeholder="Ex: 3"
        />
      </SectionInput>

      <SectionInput className="reveal">
        <label>Questões certas (peso 1): </label>
        <input
          type="number"
          maxLength={44}
          style={{ width: '60vw' }}
          value={correctWeight1}
          class="form-control"
          onChange={(e) => setCorrectWeight1(e.target.value)}
          placeholder="Ex: 23"
        />
      </SectionInput>

      <SectionInput className="reveal">
        <label>Nota da redação: </label>
        <input
          type="number"
          style={{ width: '60vw' }}
          class="form-control"
          maxLength={100}
          value={essayScore}
          onChange={(e) => setEssayScore(e.target.value)}
          placeholder="Máximo: 100"
        />
      </SectionInput>

      <SectionInput className="reveal">
        <label>
          <input
            type="checkbox"
            checked={publicSchool}
            className='me-1'
            onChange={(e) => setPublicSchool(e.target.checked)}
          />
          Cursou ensino médio em escola pública
        </label>

        <label>
          <input
            type="checkbox"
            checked={quota3}
            className='me-1'
            onChange={(e) => setQuota3(e.target.checked)}
          />
          Cota de afrodescendente
        </label>
      </SectionInput>

      <button onClick={calculateScore} className='btn btn-primary reveal'>
        Calcular Nota
      </button>

      {finalScore !== null && (
        <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          Nota Final (NFA): {finalScore}
        </div>
      )}
    </>
  );
}

export default Main;
