import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const FeedbackForm = ({ currentStep, onSubmitted }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const metadata = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      currentStep: currentStep || 'Accueil',
      screenResolution: `${window.innerWidth}x${window.innerHeight}`
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, metadata }),
      });

      if (!response.ok) {
        throw new Error('Impossible d\'envoyer le retour. Vérifie ta connexion.');
      }

      setSuccess(true);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <CheckCircle2 size={64} color="var(--accent-lime)" style={{ marginBottom: '1.5rem' }} />
        <h3>Merci !</h3>
        <p>Ton retour a été envoyé directement sur GitHub. Notre équipe de dev va s'en occuper.</p>
        <button 
          className="btn-primary" 
          style={{ marginTop: '2rem' }}
          onClick={() => {
            setSuccess(false);
            setTitle('');
            setBody('');
          }}
        >
          Envoyer un autre retour
        </button>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Explique-nous ce qui ne va pas ou ce qu'on peut améliorer. Les infos techniques sont ajoutées automatiquement.
      </p>

      <div className="form-group">
        <label htmlFor="title">Objet du retour</label>
        <input 
          id="title"
          className="feedback-input" 
          placeholder="Ex: Bug sur le calcul des charges"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Détails</label>
        <textarea 
          id="body"
          className="feedback-textarea" 
          placeholder="Décris le problème ou ta suggestion..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      {error && (
        <div style={{ color: '#cf222e', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <button className="submit-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>Envoi en cours <Loader2 className="animate-spin" size={18} /></>
        ) : (
          <>Envoyer le feedback <Send size={18} /></>
        )}
      </button>
    </form>
  );
};

export default FeedbackForm;
