import axios from 'axios';
import { useState } from 'react';

const SearchArtists = ({ onSelectArtist }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchArtists = async () => {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            headers: {
                'Authorization': `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`
            }
        });
        setResults(response.data.artists.items);
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={searchArtists}>Buscar</button>
            <ul>
                {results.map(artist => (
                    <li key={artist.id} onClick={() => onSelectArtist(artist)}>
                        {artist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchArtists;