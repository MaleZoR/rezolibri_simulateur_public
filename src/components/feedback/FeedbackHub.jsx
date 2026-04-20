import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackList from './FeedbackList';
import FeedbackForm from './FeedbackForm';
import './FeedbackHub.css';

const FeedbackHub = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'new'
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      }
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchIssues();
    }
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bouton de déclenchement flottant */}
      {!isOpen && (
        <motion.button 
          className="feedback-hub-trigger"
          onClick={toggleSidebar}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bug size={30} />
        </motion.button>
      )}

      {/* Sidebar de feedback */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay flou */}
            <motion.div 
              className="feedback-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(71,0,102,0.1)',
                zIndex: 9999,
                pointerEvents: 'auto'
              }}
            />

            <motion.div 
              className="feedback-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="feedback-header">
                <h2>Feedback Hub</h2>
                <button className="close-btn" onClick={toggleSidebar}>
                  <X size={24} />
                </button>
              </div>

              <div className="feedback-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                  onClick={() => setActiveTab('list')}
                >
                  Retours existants
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                  onClick={() => setActiveTab('new')}
                >
                  Nouveau +
                </button>
              </div>

              <div className="feedback-content">
                {activeTab === 'list' ? (
                  <FeedbackList issues={issues} loading={loading} />
                ) : (
                  <FeedbackForm 
                    currentStep={currentStep} 
                    onSubmitted={() => {
                        // On attend un peu puis on revient à la liste
                        setTimeout(() => {
                           setActiveTab('list');
                           fetchIssues();
                        }, 3000);
                    }} 
                  />
                )}
              </div>

              <div style={{ padding: '1rem 2rem', fontSize: '0.7rem', opacity: 0.5, textAlign: 'center' }}>
                Mode Pré-prod • Sync GitHub ⚡
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackHub;
