import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {BrowserRouter, Routes, Route, Navigate, Fragment} from 'react-router-dom';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import '../main-view/main-view.scss'
import { ProfileView } from "../profile-view/profile-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";


export const MainView = () => { 
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(parsedUser ? parsedUser : null);
  const [token, setToken] = useState(storedToken? storedToken:null);
  const movies = useSelector((state) => {
    return state.movies.list;
  });
  const dispatch = useDispatch();
  
  

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  useEffect(() =>{
    if(!token) {
      return;
    }

    fetch('https://sargur-movies-9fe33be3ebb3.herokuapp.com/movie', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const moviesFromApi = data.map((movie) => {
        return {
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Director: {
            Name: movie.Director.Name
          },
          Genre: {
            Name: movie.Genre.Name
          },
          ImagePath: movie.ImagePath,
          Featured: movie.Featured.toString()    
        };
      });
      dispatch(setMovies({list: moviesFromApi}));
      console.log("Redux State:", movies);
    })
    .catch((error) => {
      console.error("Error fetching: ", error);
    });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="font-monospace">
        <Col className="mb-4">
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }} 
            />
        </Col>      
      </Row>
      <Row>
        <Routes className= "justify-content-md-center font-monospace">
          <Route
          path="/signup"
          element={
              <>
                {user ? (
                  <Navigate to="/" />
                  ) : (
                  <Col className="m-2" md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
          } />
          <Route 
          path= "/login"
          element={
            <>
            {user ? (
              <Navigate to ="/" />
            ) : (
              <Col className="m-2" md={5}>
                <LoginView 
                  onLoogedIn={(user,token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              </Col>
            )}
            </>
          }
          />  
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => {
                      return (
                        (
                          <Col className="mb-5" md={4} key={movie._id}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      )
                    }
                  </>
                )}
              </>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
                 ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                 ) : (
                  <Col>
                    <MovieView
                      movieList={movies}
                      user={user}
                      setUser={setUser}
                      token={token}                                 
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
          path="/profile"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col>
                <ProfileView
                key={movies._id}
                user={user}
                token={token}
                setUser={setUser}
                movies={movies}
                onLogout={onLogout}                 
                />
              </Col>
            )}
            </>
          }
          />
          
        </Routes>
        
      </Row>       

    </BrowserRouter>


  )

};


