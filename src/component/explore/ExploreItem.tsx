import React from 'react';

export const ExploreItem = ({ data }: { data: { id: string; title: string; description: string; image: string; created_at: string } }) => {
    return (
        <div className="explore-item">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <img src={data.image} alt={data.title} style={{ width: '100%', height: 'auto' }} />
            <p>Posted on: {data.created_at}</p>
        </div>
    );
};
