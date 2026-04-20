import React from 'react';
import { MessageSquare, ExternalLink, Calendar, User } from 'lucide-react';

const FeedbackList = ({ issues, loading }) => {
  // Fonction pour extraire uniquement la description humaine et nettoyer le markdown
  const cleanBody = (text) => {
    if (!text) return "";
    
    // 1. On essaie d'extraire ce qu'il y a après "## Description"
    let cleanText = text;
    if (text.includes('## Description')) {
      cleanText = text.split('## Description')[1].split('---')[0].split('###')[0];
    }
    
    // 2. On supprime les artefacts Markdown résiduels
    return cleanText
      .replace(/[#*`]/g, '') // Supprime les #, * et backticks
      .replace(/!\[.*\]\(.*\)/g, '') // Supprime les liens images Markdown
      .trim();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner">Chargement des retours...</div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="empty-state">
        <MessageSquare size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <p>Aucun retour pour le moment.<br/>Sois le premier à en envoyer un !</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Consultez les retours déjà faits pour éviter les doublons.
      </p>
      {issues.map((issue) => (
        <div key={issue.id} className="feedback-item">
          <div className="feedback-item-header">
             <span className={`feedback-tag tag-${issue.state}`}>
              {issue.state === 'open' ? 'En cours' : 'Traité'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              {new Date(issue.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <h4>{issue.title}</h4>
          <p>{cleanBody(issue.body).substring(0, 120)}{cleanBody(issue.body).length > 120 ? '...' : ''}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <User size={12} />
              {issue.user}
            </span>
            <a 
              href={issue.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary-feedback"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
            >
              Voir sur GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
