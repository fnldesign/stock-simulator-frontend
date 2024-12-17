import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRendererTerms = ({ filePath, termsName = 'Conteúdo' }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the Markdown file
    fetch(filePath)
      .then((response) => {
        if (!response.ok || response.headers.get('Content-Type') !== 'text/markdown') {
          throw new Error(`${termsName} não foi encontrado ou é inválido.`);
        }
        return response.text();
      })
      .then((text) => {
        // Verificar se o conteúdo é realmente Markdown
        if (text.includes('<!doctype html>')) {
          throw new Error(`Conteúdo inválido retornado. O ${termsName} está ausente ou incorreto.`);
        }
        setContent(text);
      })
      .catch((error) => {
        console.error(`Erro ao buscar o ${termsName}:`, error.message);
        setError(`Desculpe, não foi possível carregar o ${termsName}. Verifique e tente novamente.`);
      });
  }, [filePath, termsName]);

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
        <h2>Erro ao Carregar {termsName}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="markdown-container" style={{ padding: '20px' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRendererTerms;
