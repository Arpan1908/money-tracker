

import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState([]);
  

  

  useEffect(() => {
    getData().then(info => {
      setInfo(info);
      
    });
  }, []);

  async function getData() {
    const url = "http://localhost:8000/api/info";
    const result = await fetch(url);
    return await result.json();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = 'http://localhost:8000/api/transaction';
    const price = item.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        item: item.substring(price.length + 1),
        description,
        time
      })
    })
      .then(response => {
        response.json().then(json => {
          setItem('');
          setTime('');
          setDescription('');
          console.log('result', json);
        });
      });
  }


  let totalPrice=0;
  for(const data of info){
    totalPrice+=data.price
  }
  return (
    <main className="">
      <h1 className="text-white text-center mt-20 text-3xl">${totalPrice}</h1>
      <form className="mt-20" onSubmit={handleSubmit}>
        <div className="basic">
          <input
            type="text"
            value={item}
            onChange={e => setItem(e.target.value)}
            placeholder={"200 on tv"}
            className="rounded-sm border-2 border-inherit"
          />
          <input
            type="datetime-local"
            className="rounded-sm border-2 border-inherit"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            id="name"
            name="name"
            required
            className="rounded-sm border-2 border-inherit"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white font-bold py-2 px-4 rounded bg-blue-500 w-full mt-5"
        >
          Add Transaction
        </button>
      </form>
      <div className="transactions mt-5">
        {info.length > 0 && info.map((item, index) => (
          <div key={index}>
            <div className="transaction flex p-5 justify-between">
              <div className="left">
                <div className="name text-xl">{item.item}</div>
                <div className="description text-l">{item.description}</div>
              </div>
              <div className="right text-right">
                <div className={item.price >= 0 ? "price text-green-500" : "price text-red-500"}>{item.price}</div>
                <div className="datetime">{item.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
