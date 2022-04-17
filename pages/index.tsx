import { useEffect, useState } from "react"
import {FaHeart} from "react-icons/fa"
import {ImCross} from "react-icons/im"

function MovieList(props : {movies: any, handleLike : any, like : boolean}) {

	return <>
		{props.movies.map((movie : any, index : any) => 
			<>
				<div>
					<img className="rounded-lg border-8 border-zinc-800 border-double shadow-xl drop-shadow-xl hover:scale-105 duration-700" 
						src={movie.Poster} alt="">
					</img>
					<div className="flex justify-center mt-4">
						<button className="rounded-full py-2 px-2 bg-red-600 text-zinc-300
										hover:bg-zinc-300 hover:text-red-600 duration-500"
								onClick={() => props.handleLike(movie)}				
						>
							{props.like === false ? <FaHeart className="text-2xl"/> : <ImCross className="text-2xl"/>}
						</button>
					</div>		
				</div>
			</>
		)}
	</>
}

function SearchBar(props:{search : string, setSearch : any}) {
	return <>
		<div className="flex justify-center mt-16">
			<input className="rounded-full px-4 py-4 bg-zinc-100 text-center text-xl font-movie border-2 border-zinc-800 w-96" 
					value={props.search} placeholder="Search movies..."
					onChange={(e) => props.setSearch(e.target.value)}
			/>
		</div>
		
	</>
}

function Header() {
	return <>
		<div className="flex justify-center items-center border-b-8 border-t-8 border-double  border-zinc-800 bg-zinc-200 py-8">
			<div className="bg-red-600 rounded-full w-20 h-20 mr-4 shadow-lg shadow-red-400
							hover:shadow-xl hover:shadow-red-500 hover:scale-110 duration-700"/>
			<div className="text-zinc-200 font-movie text-9xl tracking-wider text-shadow-xl">
				REC
			</div>
		</div>
	</>
}

function Movies() {
	return <>
		<div className="flex justify-center items-center border-b-8 border-t-8 border-double  border-zinc-800 bg-zinc-200">
			<div className="text-zinc-200 font-movie text-6xl tracking-wider text-shadow-xl py-7">
				MOVIES
			</div>
		</div>
	</>
}

function YourList() {
	return <>
		<div className="flex justify-center items-center border-b-8 border-t-8 border-double  border-zinc-800 bg-zinc-200">
			<div className="text-zinc-200 font-movie text-6xl tracking-wider text-shadow-xl py-7">
				YOUR LIST
			</div>
		</div>
	</>
}

function Footer() {
	return <>
		<div className="flex justify-center items-center border-b-8 border-t-8 border-double  border-zinc-800 bg-zinc-200 py-8 grow">
			<div className="text-zinc-200 font-movie text-6xl tracking-wider text-shadow-xl">
				CUT
			</div>
			<div className="bg-red-600 rounded-full w-12 h-12 ml-4 shadow-lg shadow-red-400
							hover:shadow-xl hover:shadow-red-500 hover:scale-110 duration-700"/>
		</div>
	</>
}

function Empty(props :{msg : string}) {
	return <>
	<div></div>
		<div className="flex justify-center">
			<h1 className="text-center font-movie text-xl italic">{props.msg}</h1>
		</div>
	</>
}

export default function Page() {

	const [movies, setMovies] = useState([])

	const [search, setSearch] = useState("")

	const [like, setLike] = useState([])

	const getQuery = async (search : string) => {
		const url = `http://www.omdbapi.com/?s=${search}&apikey=d56ca71b`
		const res = await fetch(url)
		const resJson = await res.json()
		if (resJson.Search) {
			setMovies(resJson.Search)
		}
	}

	useEffect (() => {
		getQuery(search)
	}, [search])

	const addLike = (movie : any) => {
		for (var i = 0 ; i < like.length ; i++) {
			if (like[i] === movie)
				return
		}
		const newLike : any = [...like, movie]
		setLike(newLike)
	}

	const removeLike = (movie : any) => {
		var newLike = [...like]
		for (var i = 0 ; i < newLike.length ; i++) {
			if (newLike[i] === movie)
				newLike.splice(i, 1)
		}
		setLike(newLike)
	}

  	return <>
		<Header/>
		<Movies/>
	  	<SearchBar search={search} setSearch={setSearch}/>
		<div className="flex justify-around">
			<div className="grid grid-cols-3 gap-12 m-8">
			{movies.length !== 0 ? <MovieList movies={movies} handleLike={addLike} like={false}/> : <Empty msg={"Find the next movie you are going to watch..."}/>}
		</div>
		</div>
		<YourList/>
		<div className="h-[25px]"/>
		<div className="flex justify-around">
			<div className="grid grid-cols-3 gap-12 m-8">
			{like.length !== 0 ? <MovieList movies={like} handleLike={removeLike} like={true}/> : <Empty msg={"Too many choices ? Save your desires to watch them later..."}/>}
		</div>
		</div>
		<div className="h-[25px]"/>
			<Footer/>
 	</>
}

