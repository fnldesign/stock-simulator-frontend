import React, { useEffect } from 'react';
import MarkdownRenderer from '../components/MarkdownRendererTerms';
import './TermsPage.css'; // Import CSS for styling

const TermsPage = () => {
  useEffect(() => {
    document.title = 'Stock Investment Simulation - Termos de Uso'; // Defina o novo título da página aqui
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <MarkdownRenderer filePath="/TERMS_OF_USE.md" termsName='Termos de Uso' />
    </div>
  );
};

export default TermsPage;
