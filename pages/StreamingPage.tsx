
import React from 'react';
import { Section } from '../components/Section';
import { MOCK_VIDEOS } from '../constants';
import { Video } from '../types';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/80" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);


const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer aspect-video">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon />
        </div>
        {video.isLive && <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">LIVE</div>}
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-semibold">{video.title}</h3>
            <p className="text-gray-300 text-sm">{video.streamer}</p>
        </div>
    </div>
);

const StreamingPage: React.FC = () => {
    const liveVideos = MOCK_VIDEOS.filter(v => v.isLive);
    const vodVideos = MOCK_VIDEOS.filter(v => !v.isLive);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section title="Live Now">
                 {liveVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                 ) : (
                    <p className="text-gray-400">No streams are live at the moment. Check back later!</p>
                 )}
            </Section>
            
            <Section title="Videos on Demand">
                {vodVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vodVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                     <p className="text-gray-400">No videos available yet.</p>
                )}
            </Section>
        </div>
    );
};

export default StreamingPage;
