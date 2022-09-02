import React, { useEffect, useState, useRef } from 'react'
// import { Outlet, Link } from "react-router-dom";
import HomeTable from '../src/components/Home/Table'

const Home = () => {
  const [pages, setPage] = useState([])
  const title = useRef();

  useEffect(() => {
    if (pages) {
      getPage();
    }
  }, [])

  const getPage = async () => {
    const fetchPage = await fetch(`https://server-web-builder.netlify.app/.netlify/functions/server/ui/all_page`);
    const dataPage = await fetchPage.json();
    setPage(dataPage);
  }

  const deletePage = async (id) => {
    if (window.confirm("Delete the item?")) {
      const del = await fetch(`https://server-web-builder.netlify.app/.netlify/functions/server/ui/delete/${id}`, {
        method: 'DELETE',
      });

      if (del) {
        getPage()
      }
    }
  }

  const addPage = async (event) => {
    event.preventDefault();
    const postData = {
      id: '654321',
      title: title.current.value
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    }

    const res = await fetch(`https://server-web-builder.netlify.app/.netlify/functions/server/ui/add`, requestOptions);

    if (res) {
      getPage();
    }
  }

  return (
    <div className='container px-4 lg:px-12 py-12'>
      <form onSubmit={addPage} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Page Title
        </label>
        <div className='flex gap-8'>
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={title} />
          <button type="submit" className='text-black border border-black font-bold py-2 px-4 rounded'>Add Page</button>
        </div>
      </form>
      <HomeTable data={pages} deletePage={deletePage} />
    </div >
  )
}

export default Home