import React, { useState } from 'react';

const NewDocumentForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar os dados do formulário
        console.log('Título:', title);
        console.log('Conteúdo:', content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="content">Conteúdo:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Criar Documento</button>
        </form>
    );
};

export default NewDocumentForm; 