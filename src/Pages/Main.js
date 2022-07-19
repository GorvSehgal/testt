import { useState, useEffect, useRef } from 'react';
// import {data} from '../Data/Dummy'

const Main = () => {

  const [name, setName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [output, setOutput] = useState('')

// fetch('https://jsonplaceholder.typicode.com/albums')
//   .then((json) => setTitle(json,"json response"))
//   .catch(error => {
//     console.log(error)
//   });
function myFunction() {
    const element = document.getElementById("content");
    element.scrollIntoView();
  }

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
        setOutput(title)
      const results = title.filter((user) => {
        return user.title.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setOutput(results);
    } 
    else{
        setOutput(title)
    }
    setName(keyword);
  };

  useEffect(() => {
    if(name.length> 0){
        fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(
            (data) => {
                setTitle(data);
                setOutput(data)
                setIsLoaded(true);
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
            }
        )
    }
    if(name === ''){
        fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(
            (data) => {
                setTitle(data);
                setOutput(data)
                setIsLoaded(true);
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
            }
        )
    }
  }, [])
  


  return (
    <div className="container text-section">
        <div>
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />

{(isLoaded)?
      <div className="list">
        {output && output.length > 0 ? (
          output.map((user) => (
            <li key={user.id} className="list-item-content" dataId={user.id}>
              <span className="user-name">{user.title}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
      :"Loading............"}
      </div>
    </div>
  )
}

export default Main