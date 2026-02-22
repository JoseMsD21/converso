import { useState, useEffect } from 'react';
import chatService from '../services/chatService';

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await chatService.getConversations();
        setConversations(data?.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar conversaciones');
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, loading, error };
};

export default useConversations;
