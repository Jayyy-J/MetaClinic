import React, { useState, useEffect } from 'react';
import { Box } from '@react-three/drei';

const HealthEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/health-events');
        if (!response.ok) {
          throw new Error('Failed to fetch health events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {events.map(event => (
        <Box
          key={event.id}
          position={[event.location.x, event.location.y, event.location.z]}
          onClick={() => alert(`Event: ${event.description}`)}
        >
          <meshStandardMaterial color={event.severity > 5 ? 'red' : 'yellow'} />
        </Box>
      ))}
    </>
  );
};

export default HealthEvents;
