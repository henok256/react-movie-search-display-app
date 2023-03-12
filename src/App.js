import {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

//http://www.omdbapi.com/?i=tt3896198&apikey=b260de69
const API_Key = 'http://www.omdbapi.com/?i=tt3896198&apikey=b260de69';


const App = ()=>{
    const [movies, setMovies]= useState([]);
    const [searchTerm, setSearchTerm]=useState('');
   
    const searchMovies = async (title)=>{
            const response = await fetch(`${API_Key}&s=${title}`);
            const data = await response.json();
            
            if(data.Search){
                setMovies(data.Search);
                console.log(data.Search)
            } else{
                setMovies([]);
                console.log("no movies found");
            }
           
        
        }
        console.log(`the length of the object ${movies.length}`);

    useEffect(()=>{
searchMovies("spiderman"
    );

    },[])
    console.log(`the ${searchTerm}`);
    return(
<div className='app'>
    <h1>MovieLand</h1> 
<div className="search">
    <input type="text" placeholder="search your movies here"
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}/>
   
<img src={SearchIcon} alt="search pic" onClick={() =>  searchMovies(searchTerm)} /> 
</div>
{
    movies && movies.length > 0 
    ?(<div className='container'>
        {movies.map((movie)=>(
         <MovieCard movie={movie} key={movie.imdbID}
         />
        ))}
    </div>
    ): searchTerm &&(
     <div className='empty'>
        <h2>No Movies Found</h2>
     </div>
    )
}
</div>
    );
}

export default App;